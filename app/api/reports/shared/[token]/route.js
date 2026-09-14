import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

// SERVER ONLY, PUBLIC ROUTE — no login required. The token in the URL
// (app/report/[token]) IS the credential: anyone with a valid one can read
// this one student's report, nothing else. Uses the admin key because a
// public visitor has no Supabase session for RLS to key off of at all.
//
// This mirrors app/teacher/reports/student/[studentId]/page.js's load()
// almost line for line, on purpose — same report, same numbers, just
// computed server-side against a token instead of client-side against a
// signed-in teacher. Kept as its own copy rather than a shared import
// since one runs in the browser against the anon-key client and this one
// runs on the server against the admin client — same duplication choice
// already made between the class and student report pages themselves.
function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: "#22C55E" };
  if (avg >= 1.4) return { label: "Proficient", color: "#3D84F5" };
  if (avg >= 1.0) return { label: "Developing", color: "#8C52F2" };
  return { label: "Needs Support", color: "#E4574C" };
}

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
    return NextResponse.json({ error: "This share link isn't valid — it may have been reset by the teacher." }, { status: 404 });
  }

  const { data: cls } = await supabaseAdmin.from("classes").select("id, name, teacher_id").eq("id", student.class_id).maybeSingle();
  // `teachers` only carries `name`/`school` — a teacher's email lives in
  // Supabase Auth, not this table (see app/api/teacher-signup/route.js).
  // The public report only needs a name to credit, not an email address.
  const { data: teacherRow } = cls?.teacher_id
    ? await supabaseAdmin.from("teachers").select("name").eq("id", cls.teacher_id).maybeSingle()
    : { data: null };

  const { data: assignments } = await supabaseAdmin.from("assignments").select("id, case_standard, due_date, created_at").eq("class_id", student.class_id).order("created_at", { ascending: true });
  const assignmentIds = (assignments || []).map((a) => a.id);

  const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
  let caseTitleMap = {};
  if (caseStandards.length > 0) {
    const { data: cases } = await supabaseAdmin.from("cases").select("standard, title").in("standard", caseStandards);
    caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
  }

  let submissions = [];
  let targetRows = [];
  if (assignmentIds.length > 0) {
    const [{ data: subs }, { data: targets }] = await Promise.all([
      supabaseAdmin.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds),
      supabaseAdmin.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds),
    ]);
    submissions = subs || [];
    targetRows = targets || [];
  }

  const { data: tiers } = await supabaseAdmin.from("badge_tiers").select("*").order("sort_order");

  const targetsMap = {};
  targetRows.forEach((t) => {
    if (!targetsMap[t.assignment_id]) targetsMap[t.assignment_id] = new Set();
    targetsMap[t.assignment_id].add(t.student_id);
  });
  function appliesToStudent(assignmentId) {
    const targetSet = targetsMap[assignmentId];
    if (!targetSet || targetSet.size === 0) return true;
    return targetSet.has(student.id);
  }
  function assignmentTitle(a) {
    return caseTitleMap[a.case_standard] || a.case_standard || "Untitled";
  }

  const applicable = (assignments || []).filter((a) => appliesToStudent(a.id));
  const labels = applicable.map((a) => new Date(a.due_date || a.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
  const titles = applicable.map(assignmentTitle);

  const myScores = applicable.map((a) => {
    const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === student.id);
    if (!sub || !sub.released || sub.teacher_grade === null || sub.teacher_grade === undefined) return null;
    return Math.round((sub.teacher_grade / 2) * 100);
  });

  const classAvgSeries = applicable.map((a) => {
    const grades = submissions.filter((s) => s.assignment_id === a.id && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
    if (grades.length === 0) return null;
    return Math.round((grades.reduce((x, y) => x + y, 0) / grades.length / 2) * 100);
  });

  const missing = applicable.filter((a) => {
    const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === student.id);
    return !sub || !sub.submitted_at;
  }).map((a) => a.id);

  const graded = myScores.filter((v) => v !== null);
  const avgPct = graded.length > 0 ? Math.round(graded.reduce((a, b) => a + b, 0) / graded.length) : null;
  const band = avgPct !== null ? proficiencyBand(avgPct / 50) : null;

  const classGraded = classAvgSeries.filter((v) => v !== null);
  const classAveragePct = classGraded.length > 0 ? Math.round(classGraded.reduce((a, b) => a + b, 0) / classGraded.length) : null;

  const missionsCompleted = submissions.filter((s) => s.student_id === student.id && s.submitted_at && applicable.some((a) => a.id === s.assignment_id)).length;

  const standardKeys = [...new Set(applicable.map((a) => a.case_standard).filter(Boolean))];
  const standardRows = standardKeys.map((standard) => {
    const idsForStandard = applicable.filter((a) => a.case_standard === standard).map((a) => a.id);
    const grades = submissions.filter((s) => idsForStandard.includes(s.assignment_id) && s.student_id === student.id && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
    const title = caseTitleMap[standard] || standard;
    if (grades.length === 0) return { standard, title, avgPct: null, band: null };
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    return { standard, title, avgPct: Math.round((avg / 2) * 100), band: proficiencyBand(avg) };
  });

  const allTiers = tiers || [];
  const earnedTiers = allTiers.filter((t) => missionsCompleted >= t.threshold);
  const nextTier = allTiers.find((t) => missionsCompleted < t.threshold) || null;

  return NextResponse.json({
    studentName: student.first_name,
    className: cls?.name || "",
    teacherName: teacherRow?.name || "",
    crystalPoints: student.crystal_points || 0,
    earnedTiers,
    nextTier,
    assignmentCount: applicable.length,
    missionsCompleted,
    avgPct,
    band,
    classAveragePct,
    myScores,
    classAvgSeries,
    labels,
    titles,
    missingCount: missing.length,
    assignmentRows: applicable.map((a, i) => ({
      id: a.id,
      title: titles[i],
      standard: a.case_standard,
      dateLabel: labels[i],
      score: myScores[i],
      isMissing: missing.includes(a.id),
      band: myScores[i] !== null ? proficiencyBand(myScores[i] / 50) : null,
    })),
    standardRows,
  });
}
