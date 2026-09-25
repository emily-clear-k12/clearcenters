import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getExpeditionQuest } from "../../../../lib/cases/expedition-station/catalog";
import { gradeExpeditionTask, summarizeExpedition } from "../../../../lib/cases/expedition-station/index.server";

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount });
  } catch (err) {
    // a missed reward is never worth failing the turn-in over
  }
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const assignmentId = body.assignmentId;
  if (!assignmentId) return NextResponse.json({ error: "Missing the assignment." }, { status: 400 });

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  const quest = getExpeditionQuest(assignment.case_standard);
  if (!quest) return NextResponse.json({ error: "That quest isn't wired up yet." }, { status: 404 });

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, expedition_station_data, submitted_at")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.expedition_station_data) || {
    briefed: false,
    cards: {},
    meters: { ...quest.meterStart },
  };

  // Mark briefing seen (autosave)
  if (body.action === "brief") {
    const payload = { ...prior, briefed: true, savedAt: new Date().toISOString() };
    const row = { expedition_station_data: payload };
    if (existing) {
      await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
    } else {
      await supabaseAdmin.from("submissions").insert({
        assignment_id: assignmentId,
        student_id: studentId,
        ...row,
      });
    }
    return NextResponse.json({ ok: true, data: payload });
  }

  const taskId = Number(body.taskId);
  if (!taskId || !quest.tasks[taskId]) {
    return NextResponse.json({ error: "Missing the task." }, { status: 400 });
  }

  const graded = gradeExpeditionTask(assignment.case_standard, taskId, body);
  if (!graded) return NextResponse.json({ error: "That task isn't ready yet." }, { status: 404 });

  const cards = { ...(prior.cards || {}) };
  const task = quest.tasks[taskId];

  if (!graded.ok) {
    return NextResponse.json({
      ok: false,
      hint: graded.hint,
      feedback: graded.feedback,
      needsWritten: graded.needsWritten || false,
      step: graded.step || null,
    });
  }

  // Partial multi-step (scoops missing, challenge step 1): don't mark done yet
  if (graded.next) {
    return NextResponse.json({
      ok: true,
      partial: true,
      next: graded.next,
      step: graded.step,
      feedback: graded.feedback,
    });
  }

  const stars = graded.stars || 1;
  const sure = body.sure || null;
  cards[taskId] = {
    done: true,
    stars,
    sure,
    written: graded.teacherWritten || body.written || null,
    at: new Date().toISOString(),
    wrongTries: Number(body.wrongTries) || 0,
    usedHint: !!body.usedHint,
  };

  // Recompute meters from completed Act 1 cards in number order (end totals match)
  const meters = { ...quest.meterStart };
  [1, 2, 3, 4, 5].forEach((id) => {
    if (!cards[id] || !cards[id].done) return;
    const t = quest.tasks[id];
    if (!t || !t.meter) return;
    if (t.meter.heat) meters.heat = Math.min(100, meters.heat + t.meter.heat);
    if (t.meter.supplies) meters.supplies += t.meter.supplies;
    if (t.discovery) meters.journal += 1;
  });

  const act1Cards = [1, 2, 3, 4];
  const act1Done = act1Cards.every((id) => cards[id] && cards[id].done);
  const challengeDone = !!(cards[5] && cards[5].done);
  const actComplete = act1Done && challengeDone;

  const payload = {
    briefed: true,
    cards,
    meters,
    act1Done: actComplete,
    savedAt: new Date().toISOString(),
    title: quest.title,
  };

  const summary = summarizeExpedition(quest, cards);
  const row = {
    expedition_station_data: payload,
    attempt1: summary.text,
    ai_score: actComplete ? summary.score : null,
  };

  if (actComplete && !(existing && existing.submitted_at)) {
    row.submitted_at = new Date().toISOString();
  }

  if (existing) {
    await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("submissions").insert({
      assignment_id: assignmentId,
      student_id: studentId,
      ...row,
    });
  }

  if (actComplete && !(existing && existing.submitted_at)) {
    await awardCrystals(studentId, Math.max(5, stars * 2));
  }

  return NextResponse.json({
    ok: true,
    stars,
    feedback: graded.feedback,
    discovery: task.discovery || null,
    meter: task.meter || null,
    meters,
    actComplete,
    data: payload,
  });
}
