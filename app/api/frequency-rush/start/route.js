import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getFrequencyRushWordSet, buildLockTheSignalRounds, DEFAULT_ROUNDS, ROUND_SECONDS } from "../../../../lib/cases/frequency-rush";

// Starts one Lock the Signal / Individual Practice session. Called fresh
// every time a student plays OR replays — replays are unlimited by design
// (§2.2), and each one gets its own session row + its own server-generated
// round order, same as the first play.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId } = await request.json();

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, case_standard")
    .eq("id", assignmentId)
    .single();
  if (!assignment) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const { data: caseRow } = await supabaseAdmin
    .from("cases")
    .select("grade, subject, unit, engine")
    .eq("standard", assignment.case_standard)
    .single();
  if (!caseRow || caseRow.engine !== "frequency_rush") {
    return NextResponse.json({ error: "Not a Frequency Rush case." }, { status: 400 });
  }

  let words;
  try {
    words = await getFrequencyRushWordSet(caseRow);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  if (words.length === 0) {
    return NextResponse.json({ error: "This unit's word set isn't loaded yet." }, { status: 404 });
  }

  // Sane cap even against a tiny word bank (an early unit might only have a
  // handful of words) — still a real round, never an infinite loop.
  const roundCount = Math.min(DEFAULT_ROUNDS, Math.max(6, words.length * 2));
  const rounds = buildLockTheSignalRounds(words, roundCount);
  const wordOrder = rounds.map((r) => r.promptWordId);

  const { data: session, error: sessionError } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .insert({
      assignment_id: assignmentId,
      student_id: studentId,
      mode: "individual",
      format: "lock_signal",
      length_type: "rounds",
      length_value: rounds.length,
      word_order: wordOrder,
    })
    .select()
    .single();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  return NextResponse.json({
    sessionId: session.id,
    roundSeconds: ROUND_SECONDS,
    // promptWordId IS included, same convention Mission Map's checkpoints
    // use — the client needs it immediately to give the student real-time
    // correct/incorrect + streak feedback (§2.1, §2.13a). The submit route
    // below re-verifies every answer against the session's own stored
    // word_order regardless of what the client reports, so this is about
    // enabling instant feedback, not a secrecy boundary.
    rounds: rounds.map((r) => ({ promptWordId: r.promptWordId, word: r.word, choices: r.choices })),
  });
}
