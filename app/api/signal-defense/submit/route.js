import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Signal Defense submit - minimal persistence so a finished run shows up
// for teachers the same way Frequency Rush / Simulation Lab do: one
// `submissions` row per (assignment, student), always reflecting the MOST
// RECENT completed mission. The widget grades answers client-side during
// play (answer key ships in the public bank), so this route stores the
// summary + per-question result log the widget emits via onComplete -
// same trust level Frequency Rush already accepts for widget-driven
// endedReason / cosmetic fields. No separate sessions table in this pass.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json();
  const { assignmentId, caseStandard, result } = body || {};

  if (!assignmentId || !result || typeof result !== "object") {
    return NextResponse.json({ error: "Missing assignment or result." }, { status: 400 });
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, class_id")
    .eq("id", studentId)
    .single();

  if (!student) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .single();

  if (!assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const score = Math.max(0, Number(result.score) || 0);
  const correct = Math.max(0, Number(result.correct) || 0);
  const attempted = Math.max(0, Number(result.attempted) || 0);
  const bestStreak = Math.max(0, Number(result.bestStreak) || 0);
  const questionsSeen = Math.max(0, Number(result.questionsSeen) || 0);
  const reason = result.reason === "completed" ? "completed" : "regroup";
  const win = reason === "completed";
  const standard = caseStandard || assignment.case_standard || null;

  const summary =
    `Signal Defense (${standard || "unknown"}): ${correct}/${attempted} correct` +
    `, score ${score}, best streak ${bestStreak}, ${questionsSeen} questions seen` +
    `, ${win ? "outpost secured" : "regroup"}.`;

  const fields = {
    attempt2: summary,
    signal_defense_data: {
      caseStandard: standard,
      reason,
      win,
      score,
      correct,
      attempted,
      bestStreak,
      questionsSeen,
      personalSalvage: Math.max(0, Number(result.personalSalvage) || 0),
      teamSignals: Math.max(0, Number(result.teamSignals) || 0),
      rescued: Math.max(0, Number(result.rescued) || 0),
      health: Math.max(0, Number(result.health) || 0),
      wave: Math.max(0, Number(result.wave) || 0),
      unitId: result.unitId || null,
      confidence: result.confidence || null,
      results: Array.isArray(result.results) ? result.results : [],
    },
    submitted_at: new Date().toISOString(),
    revision_requested: false,
  };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin
      .from("submissions")
      .insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // ignore - streak is a nice-to-have, not worth failing the submit over
  }

  return NextResponse.json({
    success: true,
    score,
    correct,
    attempted,
    bestStreak,
    reason,
  });
}
