import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { buildStudentReport } from "../../../../../lib/studentReport";

// Public, read-only data for one student's shared report (app/report/[token]).
// No sign-in: the token in the link is the only key, checked here.
// Sept 29, 2026: built with lib/studentReport.js, the same builder the
// teacher's own report page uses, so the two always match. Only released
// grades count.
export async function GET(request, { params }) {
  const { token } = params;
  if (!token) {
    return NextResponse.json({ error: "Missing share link." }, { status: 400 });
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, crystal_points")
    .eq("share_token", token)
    .maybeSingle();
  if (studentError || !student) {
    return NextResponse.json({ error: "This share link isn't valid. The teacher may have reset it." }, { status: 404 });
  }

  const { data: cls } = await supabaseAdmin.from("classes").select("id, name, teacher_id").eq("id", student.class_id).maybeSingle();
  const [{ data: teacherRow }, { data: students }, { data: assignments }, { data: tiers }] = await Promise.all([
    cls?.teacher_id ? supabaseAdmin.from("teachers").select("name").eq("id", cls.teacher_id).maybeSingle() : { data: null },
    supabaseAdmin.from("students").select("*").eq("class_id", student.class_id),
    supabaseAdmin.from("assignments").select("id, case_standard, class_id, game_skin, due_date, created_at").eq("class_id", student.class_id),
    supabaseAdmin.from("badge_tiers").select("*").order("sort_order"),
  ]);
  const ids = (assignments || []).map((a) => a.id);
  const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
  const [targetResult, subResult, caseResult] = await Promise.all([
    ids.length ? supabaseAdmin.from("assignment_students").select("assignment_id, student_id").in("assignment_id", ids) : { data: [] },
    ids.length ? supabaseAdmin.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested").in("assignment_id", ids) : { data: [] },
    standards.length ? supabaseAdmin.from("cases").select("standard, title, engine, subject, learning_target").in("standard", standards) : { data: [] },
  ]);
  let cases = caseResult.data;
  if (caseResult.error && standards.length) cases = (await supabaseAdmin.from("cases").select("standard, title, engine, subject").in("standard", standards)).data;

  const report = buildStudentReport({
    studentId: student.id,
    className: cls?.name || "",
    teacherName: teacherRow?.name || "",
    students: students || [],
    assignments: assignments || [],
    targets: targetResult.data || [],
    submissions: subResult.data || [],
    cases: cases || [],
    tiers: tiers || [],
    crystalPoints: student.crystal_points || 0,
  });
  if (!report) return NextResponse.json({ error: "Couldn't build this report." }, { status: 500 });
  return NextResponse.json(report);
}
