import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { ROUND_SECONDS, getFrequencyRushWordSet } from "../../../../lib/cases/frequency-rush";
import { pointsForCorrectAnswer } from "../../../../lib/frequencyRushScoring";
import { getOutpostProgress } from "../../../../lib/outpostBuilder";

// Ends a Lock the Signal session. Every answer is re-scored here against the
// session's own server-generated word_order — never trusted from the client,
// same rule every other engine's submit route follows for its checkpoints.
//
// Sept 8, 2026 — Asteroid Run's Outpost Builder banking added. Hull and Fuel
// (§2.12/§2.14) are a pure client-side game-state layer on top of this same
// grading — they never change what's correct or what score is earned, only
// whether the run ends early. So `endedReason` below is accepted as
// reported (never re-derived server-side), the same trust level as any
// other purely cosmetic/flavor field in this app — it changes nothing about
// scoring or Outpost Builder banking, only which recap message the client
// shows. What actually gets banked is the server's own authoritative
// `score` for this run — "resources earned," per the design doc, banking
// in full even on an early eject (§2.12: "All Fuel/Resources earned before
// the eject are fully banked").
//
// Sept 9, 2026 — Asteroid Run now embeds Emily's "Pilot Edition" widget
// (public/games/asteroid-run.html) instead of a from-scratch React canvas.
// That widget builds its OWN round order internally (a fixed shuffle off
// the word pool we hand it via setWordBank) — it never sees or uses this
// route's `word_order`, so the roundIndex/word_order re-verification below
// can't apply to an asteroid_run session anymore. Grading for asteroid_run
// answers instead checks each answer's claimed `wordId` against the real
// word set for this assignment's unit (so a round can't be invented for a
// word that was never assigned), then recomputes correctness and every
// point server-side from `wordId === chosenWordId` and the same scoring
// formula as before — the one thing this can no longer catch is a
// devtools-level student directly forging a wordId/chosenWordId pair
// without ever seeing that round in the widget. Given every correct
// definition here is visible on-screen the moment it's answered anyway
// (nothing secret to leak) and Individual Practice is already unlimited-
// replay/low-stakes by design, that's an acceptable trade for using the
// widget file exactly as built rather than forking it.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { sessionId, answers, endedReason, fuelBonus } = await request.json();
  // Clamped, never trusted beyond this range — the same "cosmetic layer,
  // not a grading input" trust level as endedReason. Even a maximally
  // spoofed value only ever adds a small bonus to Outpost Builder banking,
  // never to the graded score/submissions record.
  const resolvedFuelBonus = Math.max(0, Math.min(60, Number(fuelBonus) || 0));
  // answers: [{ roundIndex, chosenWordId, responseTimeMs }]

  const { data: session } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .select("id, assignment_id, student_id, word_order, game_mode, ended_at")
    .eq("id", sessionId)
    .single();

  if (!session || session.student_id !== studentId) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }
  if (session.ended_at) {
    return NextResponse.json({ error: "This round is already finished." }, { status: 400 });
  }

  let streak = 0;
  let bestStreak = 0;
  let score = 0;
  const attemptRows = [];
  const perWordResults = [];

  if (session.game_mode === "asteroid_run") {
    // Widget-driven grading (see the Sept 9, 2026 note above) — validate
    // each answer's wordId against the real word set for this assignment's
    // unit, then re-derive correctness/points, same formula as the
    // roundIndex path below.
    //
    // Sept 9, 2026 — the "Adventure Edition" widget added 3 more question
    // formats (True/False, Frequency Fill, Odd Signal Out) on top of Lock
    // the Signal. For lock_signal, frequency_fill, and odd_signal_out, the
    // widget's own choiceId is still a real word id comparable to wordId
    // (the correct one), so `choiceId === wordId` is still a genuine
    // server-side check, same as before. True/False is the one real
    // exception: its choiceId is a boolean (true/false), not a word id —
    // whether it's correct depends on which OTHER word's definition got
    // randomly paired into that specific round, which only the widget
    // itself knows. For that one format only, this trusts the `correct`
    // flag the widget already computed during play, with the same wordId-
    // real-membership check above still standing as the actual anti-abuse
    // floor (a forged round still can't invent a word that was never
    // assigned) — the same trust trade-off already in place for every
    // format here, just now explicit about where it's real verification
    // vs. where it isn't.
    const { data: assignment } = await supabaseAdmin
      .from("assignments")
      .select("case_standard")
      .eq("id", session.assignment_id)
      .single();
    const { data: caseRow } = assignment
      ? await supabaseAdmin.from("cases").select("grade, subject, unit").eq("standard", assignment.case_standard).single()
      : { data: null };
    const validWords = caseRow ? await getFrequencyRushWordSet(caseRow) : [];
    const validWordIds = new Set(validWords.map((w) => w.id));

    // A sane cap against a runaway/forged answers array — the widget itself
    // only ever produces up to its own fixed round count per run.
    (answers || []).slice(0, 25).forEach((a) => {
      if (!validWordIds.has(a.wordId)) return; // not a real word from this unit — ignored, not trusted
      const correct = a.type === "true_false" ? a.correct === true : a.choiceId != null && a.choiceId === a.wordId;
      let pointsEarned = 0;
      if (correct) {
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
        pointsEarned = pointsForCorrectAnswer({ responseTimeMs: a.responseTimeMs, roundSeconds: ROUND_SECONDS, streakAfterThisAnswer: streak });
        score += pointsEarned;
      } else {
        streak = 0;
      }
      attemptRows.push({
        session_id: sessionId,
        word_id: a.wordId,
        correct,
        response_time_ms: a.responseTimeMs || null,
        points_earned: pointsEarned,
        streak_at_answer: streak,
      });
      perWordResults.push({ wordId: a.wordId, correct });
    });
  } else {
    const wordOrder = session.word_order || [];
    (answers || []).forEach((a) => {
      const promptWordId = wordOrder[a.roundIndex];
      if (!promptWordId) return; // outside this session's real order — ignored, not trusted
      const correct = a.chosenWordId === promptWordId;
      let pointsEarned = 0;
      if (correct) {
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
        pointsEarned = pointsForCorrectAnswer({ responseTimeMs: a.responseTimeMs, roundSeconds: ROUND_SECONDS, streakAfterThisAnswer: streak });
        score += pointsEarned;
      } else {
        streak = 0;
      }
      attemptRows.push({
        session_id: sessionId,
        word_id: promptWordId,
        correct,
        response_time_ms: a.responseTimeMs || null,
        points_earned: pointsEarned,
        streak_at_answer: streak,
      });
      perWordResults.push({ wordId: promptWordId, correct });
    });
  }

  if (attemptRows.length > 0) {
    const { error: attemptsError } = await supabaseAdmin.from("frequency_rush_attempts").insert(attemptRows);
    if (attemptsError) return NextResponse.json({ error: attemptsError.message }, { status: 500 });
  }

  const resolvedEndedReason = ["completed", "hull_breach", "out_of_fuel"].includes(endedReason) ? endedReason : "completed";

  const { error: sessionUpdateError } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .update({ score, best_streak: bestStreak, ended_reason: resolvedEndedReason, ended_at: new Date().toISOString() })
    .eq("id", sessionId);
  if (sessionUpdateError) return NextResponse.json({ error: sessionUpdateError.message }, { status: 500 });

  // Outpost Builder banking — Asteroid Run only for now (a future Signal
  // Match/untimed session wouldn't have a station to grow). Banks the full
  // authoritative score regardless of how the run ended, per §2.12/§2.14.
  let outpost = null;
  const resourcesBanked = score + (resolvedEndedReason === "completed" ? resolvedFuelBonus : 0);
  if (session.game_mode === "asteroid_run" && resourcesBanked > 0) {
    try {
      await supabaseAdmin.rpc("increment_outpost_resources", { p_student_id: studentId, p_amount: resourcesBanked });
    } catch (err) {
      // Never fail the whole submit over the cosmetic progression layer —
      // same "best-effort, not load-bearing" spirit as the daily-streak
      // bump below.
    }
  }
  if (session.game_mode === "asteroid_run") {
    const { data: student } = await supabaseAdmin.from("students").select("outpost_resources").eq("id", studentId).single();
    outpost = getOutpostProgress(student ? student.outpost_resources : 0);
  }

  // Same submissions-adjacent pattern every other engine uses, so Reports/
  // Progress pick this up for free with zero new UI. Individual Practice is
  // replayable, so this row always reflects the MOST RECENT play — the full
  // history across every replay lives in frequency_rush_sessions/_attempts,
  // which is what the Word Wall will aggregate from later.
  const correctCount = perWordResults.filter((r) => r.correct).length;
  const fields = {
    attempt2: `Frequency Rush (Lock the Signal): ${correctCount}/${perWordResults.length} correct, best streak ${bestStreak}, score ${score}.`,
    frequency_rush_data: { sessionId, score, bestStreak, correctCount, total: perWordResults.length, perWordResults },
    submitted_at: new Date().toISOString(),
  };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("assignment_id", session.assignment_id)
    .eq("student_id", studentId)
    .maybeSingle();

  if (existing) {
    await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("submissions").insert({ assignment_id: session.assignment_id, student_id: studentId, ...fields });
  }

  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // ignore — streak is a nice-to-have, not worth failing the submit over
  }

  return NextResponse.json({ success: true, score, resourcesBanked, bestStreak, correctCount, total: perWordResults.length, perWordResults, outpost });
}
