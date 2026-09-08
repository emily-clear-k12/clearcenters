import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { ROUND_SECONDS } from "../../../../lib/cases/frequency-rush";
import { pointsForCorrectAnswer } from "../../../../lib/frequencyRushScoring";

// Ends a Lock the Signal session. Every answer is re-scored here against the
// session's own server-generated word_order — never trusted from the client,
// same rule every other engine's submit route follows for its checkpoints.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { sessionId, answers } = await request.json();
  // answers: [{ roundIndex, chosenWordId, responseTimeMs }]

  const { data: session } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .select("id, assignment_id, student_id, word_order, ended_at")
    .eq("id", sessionId)
    .single();

  if (!session || session.student_id !== studentId) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }
  if (session.ended_at) {
    return NextResponse.json({ error: "This round is already finished." }, { status: 400 });
  }

  const wordOrder = session.word_order || [];
  let streak = 0;
  let bestStreak = 0;
  let score = 0;
  const attemptRows = [];
  const perWordResults = [];

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

  if (attemptRows.length > 0) {
    const { error: attemptsError } = await supabaseAdmin.from("frequency_rush_attempts").insert(attemptRows);
    if (attemptsError) return NextResponse.json({ error: attemptsError.message }, { status: 500 });
  }

  const { error: sessionUpdateError } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .update({ score, best_streak: bestStreak, ended_at: new Date().toISOString() })
    .eq("id", sessionId);
  if (sessionUpdateError) return NextResponse.json({ error: sessionUpdateError.message }, { status: 500 });

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

  return NextResponse.json({ success: true, score, bestStreak, correctCount, total: perWordResults.length, perWordResults });
}
