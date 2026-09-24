import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { loadStarChart } from "../../../../lib/starChart";

// SERVER ONLY. Teacher side of the Star Chart (Sept 24, 2026;
// FrequencyRush_Fluency_Expansion_v1.md §11.10c).
//
//   action "load"     -> every Frequency Rush word/fact this class has
//                        practiced, with each student's status per star
//   action "quickRun" -> assign one activity again to just the students who
//                        are stuck. My Missed Words brings their missed
//                        questions back first, marked SECOND CHANCE.
//
// Same access-token + admin-key + class-ownership pattern as the Sentence Sort board.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action, classId } = body;
  if (!accessToken || !action) return NextResponse.json({ error: "Missing action or session." }, { status: 400 });

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;
  if (!classId) return NextResponse.json({ error: "Pick a class." }, { status: 400 });
  const { data: cls } = await supabaseAdmin.from("classes").select("id, teacher_id").eq("id", classId).maybeSingle();
  if (!cls || cls.teacher_id !== teacherId) return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });

  if (action === "load") {
    try {
      const data = await loadStarChart(supabaseAdmin, { classId });
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({ error: "Couldn't load the Star Chart: " + err.message }, { status: 500 });
    }
  }

  if (action === "quickRun") {
    const caseStandard = String(body.caseStandard || "");
    const requested = Array.isArray(body.studentIds) ? body.studentIds.map(String) : [];
    const { data: caseRow } = await supabaseAdmin.from("cases").select("standard, engine").eq("standard", caseStandard).maybeSingle();
    if (!caseRow || caseRow.engine !== "frequency_rush") return NextResponse.json({ error: "That isn't a Frequency Rush activity." }, { status: 400 });
    const { data: roster } = await supabaseAdmin.from("students").select("id").eq("class_id", classId);
    const inClass = new Set((roster || []).map((s) => s.id));
    const studentIds = [...new Set(requested)].filter((id) => inClass.has(id));
    if (!studentIds.length) return NextResponse.json({ error: "Pick at least one student in this class." }, { status: 400 });

    // Keep the world and timer from the class's latest assignment of this activity.
    let { data: prior, error: priorError } = await supabaseAdmin
      .from("assignments").select("game_skin, question_seconds").eq("class_id", classId).eq("case_standard", caseStandard)
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (priorError && /question_seconds/i.test(priorError.message || "")) {
      ({ data: prior } = await supabaseAdmin
        .from("assignments").select("game_skin").eq("class_id", classId).eq("case_standard", caseStandard)
        .order("created_at", { ascending: false }).limit(1).maybeSingle());
    }
    const fields = { class_id: classId, case_standard: caseStandard, due_date: null };
    if (prior && prior.game_skin) fields.game_skin = prior.game_skin;
    if (prior && prior.question_seconds != null) fields.question_seconds = prior.question_seconds;

    const { data: created, error: createError } = await supabaseAdmin.from("assignments").insert(fields).select("id").single();
    if (createError) return NextResponse.json({ error: "Couldn't assign: " + createError.message }, { status: 500 });
    const { error: targetError } = await supabaseAdmin
      .from("assignment_students")
      .insert(studentIds.map((student_id) => ({ assignment_id: created.id, student_id })));
    if (targetError) {
      await supabaseAdmin.from("assignments").delete().eq("id", created.id);
      return NextResponse.json({ error: "Couldn't assign: " + targetError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, assignmentId: created.id, count: studentIds.length });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
