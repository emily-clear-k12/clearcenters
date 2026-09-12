import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getFrequencyRushWordSet, getFrequencyRushClassificationSet, buildLockTheSignalRounds, DEFAULT_ROUNDS, ROUND_SECONDS } from "../../../../lib/cases/frequency-rush";
import { getOutpostProgress } from "../../../../lib/outpostBuilder";

// Starts one Lock the Signal / Individual Practice session. Called fresh
// every time a student plays OR replays — replays are unlimited by design
// (§2.2), and each one gets its own session row + its own server-generated
// round order, same as the first play.
//
// Sept 8, 2026 — Asteroid Run: Individual Practice's default visual/game
// skin (design doc §2.5, §2.6). The round loop and scoring underneath are
// completely unchanged; this just (a) tags the session with which game
// skin is wrapping it, for analytics/session history, and (b) hands the
// client the student's current Outpost Builder standing so the intro
// screen can show "your station" before the run even starts.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { assignmentId, gameMode } = body;
  // Asteroid Run is the default/only Individual Practice game mode for now
  // (design doc: "Individual Practice defaults to Asteroid Run for timed
  // play") — accepting it as a param rather than hardcoding keeps this
  // route ready for Signal Match or a future mode selector without another
  // route change.
  const resolvedGameMode = gameMode || "asteroid_run";

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

  // Sept 12, 2026 — Sort & Classify, plumbing-only pass (design doc note
  // pending). Always attempted, never blocking: a unit with no authored
  // classify content yet just gets an empty array, same graceful-absence
  // behavior as Odd Signal Out's oddGroups.
  const classifications = await getFrequencyRushClassificationSet(caseRow);

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
      game_mode: resolvedGameMode,
      length_type: "rounds",
      length_value: rounds.length,
      word_order: wordOrder,
    })
    .select()
    .single();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("outpost_resources")
    .eq("id", studentId)
    .single();
  const outpost = getOutpostProgress(student ? student.outpost_resources : 0);

  return NextResponse.json({
    sessionId: session.id,
    roundSeconds: ROUND_SECONDS,
    gameMode: resolvedGameMode,
    outpost,
    // promptWordId IS included, same convention Mission Map's checkpoints
    // use — the client needs it immediately to give the student real-time
    // correct/incorrect + streak feedback (§2.1, §2.13a). The submit route
    // below re-verifies every answer against the session's own stored
    // word_order regardless of what the client reports, so this is about
    // enabling instant feedback, not a secrecy boundary.
    rounds: rounds.map((r) => ({ promptWordId: r.promptWordId, word: r.word, choices: r.choices })),
    // Sept 9, 2026 — the embedded Asteroid Run widget (public/games/
    // asteroid-run.html) builds its own rounds internally from a flat word
    // pool via its window.AsteroidRun.setWordBank() API, rather than using
    // `rounds` above. This is that same unit's word set, unmodified, so the
    // client can hand it straight to the widget.
    //
    // Sept 9, 2026 — `sentence` added so Frequency Fill can blank the word
    // out of a real-context sentence. Sept 10, 2026 — pass the full
    // `sentences` list when authored, so Asteroid Run can rotate among
    // several classroom examples for the SAME vocabulary word (more
    // question variety without inventing uncovered terms). Still include
    // a single `sentence` (random pick) for backward compatibility.
    words: words.map((w) => {
      const list = (Array.isArray(w.sentences) ? w.sentences : [w.sentences])
        .filter((s) => typeof s === "string" && s.trim())
        .map((s) => s.trim());
      if (!list.length) return { id: w.id, word: w.word, definition: w.definition };
      const sentence = list[Math.floor(Math.random() * list.length)];
      return {
        id: w.id,
        word: w.word,
        definition: w.definition,
        sentence,
        ...(list.length > 1 ? { sentences: list } : {}),
      };
    }),
    // Sept 12, 2026 — handed straight to the widget's
    // window.AsteroidRun.setClassificationBank() as-is; that call already
    // validates shape (id/prompt/categories/items), so no reshaping needed
    // here. Empty array when this unit has no authored classify content —
    // the client only calls setClassificationBank when this is non-empty.
    classifications,
  });
}
