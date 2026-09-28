import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getExpeditionQuest } from "../../../../lib/cases/expedition-station/catalog";
import { gradeExpeditionTask, summarizeExpedition } from "../../../../lib/cases/expedition-station/index.server";
import { reflectionFrom, withFirstTry } from "../../../../lib/reflection";

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
    .select("id, expedition_station_data, attempt1, submitted_at, revision_requested")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.expedition_station_data) || {
    briefed: false,
    cards: {},
    meters: { ...quest.meterStart },
  };

  if (body.action === "turnin") {
    const reflection = reflectionFrom(body);
    if (reflection.error) return NextResponse.json({ error: reflection.error }, { status: 400 });
    if (!prior.questDone) return NextResponse.json({ error: "Finish the quest first." }, { status: 400 });
    const keep = !!(existing && (existing.revision_requested || existing.submitted_at));
    const payload = withFirstTry(prior, prior, existing && existing.attempt1, keep);
    const row = {
      expedition_station_data: payload,
      checklist: reflection.checklist,
      self_confidence: reflection.self_confidence,
      revision_requested: false,
      submitted_at: new Date().toISOString(),
    };
    if (existing) await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
    return NextResponse.json({ ok: true, turnedIn: true });
  }

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

  // Sept 26, 2026: acts open in order. A task in act 2 or 3 is only gradable
  // once the act before it is finished (and the act is playable).
  const task = quest.tasks[taskId];
  const priorCards = prior.cards || {};
  const actDoneIn = (cardMap, actNum) => {
    const act = quest.acts && quest.acts[actNum];
    if (!act) return false;
    return [...act.tasks, act.challenge].every((id) => cardMap[id] && cardMap[id].done);
  };
  const playable = Array.isArray(quest.playableActs) ? quest.playableActs : [];
  if (!playable.includes(task.act) || (task.act > 1 && !actDoneIn(priorCards, task.act - 1))) {
    return NextResponse.json({ error: "That part of the quest isn't open yet." }, { status: 403 });
  }

  const graded = gradeExpeditionTask(assignment.case_standard, taskId, body);
  if (!graded) return NextResponse.json({ error: "That task isn't ready yet." }, { status: 404 });

  const cards = { ...priorCards };

  if (!graded.ok) {
    return NextResponse.json({
      ok: false,
      hint: graded.hint,
      feedback: graded.feedback,
      needsWritten: graded.needsWritten || false,
      step: graded.step || null,
      wrongItems: graded.wrongItems || null,
    });
  }

  // Partial multi-step (scoops, steps, parts): don't mark done yet
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
  const wasDone = !!(cards[taskId] && cards[taskId].done);
  cards[taskId] = {
    done: true,
    stars,
    sure,
    written: graded.teacherWritten || body.written || null,
    at: new Date().toISOString(),
    wrongTries: Number(body.wrongTries) || 0,
    usedHint: !!body.usedHint,
  };

  // Recompute meters from every completed card, in task order
  const meters = { ...quest.meterStart };
  Object.keys(quest.tasks)
    .map(Number)
    .sort((x, y) => x - y)
    .forEach((id) => {
      if (!cards[id] || !cards[id].done) return;
      const t = quest.tasks[id];
      if (!t || !t.meter) return;
      if (t.meter.heat) meters.heat = Math.min(100, meters.heat + t.meter.heat);
      if (t.meter.supplies) meters.supplies += t.meter.supplies;
      if (t.discovery) meters.journal += 1;
    });

  const actsDone = [1, 2, 3].filter((n) => actDoneIn(cards, n));
  const actComplete = !wasDone && actDoneIn(cards, task.act) && !actDoneIn(priorCards, task.act);
  const questDone = playable.length > 0 && playable.every((n) => actsDone.includes(n));

  const payload = {
    briefed: true,
    cards,
    meters,
    act1Done: actsDone.includes(1),
    actsDone,
    questDone,
    savedAt: new Date().toISOString(),
    title: quest.title,
  };
  if (prior.firstTry) payload.firstTry = prior.firstTry;

  const summary = summarizeExpedition(quest, cards);
  const row = {
    expedition_station_data: payload,
    attempt1: summary.text,
    ai_score: questDone ? summary.score : null,
  };

  if (existing) {
    await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("submissions").insert({
      assignment_id: assignmentId,
      student_id: studentId,
      ...row,
    });
  }

  if (actComplete) {
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
    completedAct: actComplete ? task.act : null,
    questDone,
    data: payload,
  });
}
