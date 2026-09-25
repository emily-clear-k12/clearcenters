import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { ROUND_SECONDS, getFrequencyRushWordSet, getClassifyBanksForCase } from "../../../../lib/cases/frequency-rush";
import { pointsForCorrectAnswer } from "../../../../lib/frequencyRushScoring";
import { getOutpostProgress } from "../../../../lib/outpostBuilder";
import { getSkillSet, recomputeSkillItem } from "../../../../lib/frequencyRushSkills";
import { isCustomListCode, recomputeCustomItem } from "../../../../lib/frequencyRushCustomLists";
import {
  isDailyCode,
  loadDailyContext,
  recomputeDailyItem,
  dailyItemId,
  loadDailyDates,
  dailyStreakAfter,
  getPersonalBest,
  DAILY_MIN_ANSWERS,
  centralDateKey,
} from "../../../../lib/frequencyRushDaily";

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
  let skillSet = null; // set below when this assignment is a skill set (Sept 24)
  let speedWindowSeconds = ROUND_SECONDS; // teacher's question timer, if set (Sept 24)
  let dailyCtx = null; // set when this is a Daily Warm-up run (Sept 24, step 6)
  let caseStandard = null;
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
    //
    // Sept 12, 2026 — sort_bins: choiceId is a bin id; correctness is
    // recomputed server-side from file banks (choiceId === correctBinId).
    // Attempts store word_id as null so vocab FK rows stay intact.
    let { data: assignment, error: assignmentError } = await supabaseAdmin
      .from("assignments")
      .select("case_standard, question_seconds")
      .eq("id", session.assignment_id)
      .single();
    if (assignmentError && /question_seconds/i.test(assignmentError.message || "")) {
      ({ data: assignment } = await supabaseAdmin
        .from("assignments")
        .select("case_standard")
        .eq("id", session.assignment_id)
        .single());
    }
    // Sept 24, 2026 — the speed bonus is measured against the teacher's
    // question timer when there is one, and the old 8 seconds when there isn't.
    const teacherSeconds = Math.max(0, Math.min(60, Number(assignment?.question_seconds) || 0));
    speedWindowSeconds = teacherSeconds > 0 ? teacherSeconds : ROUND_SECONDS;
    const { data: caseRow } = assignment
      ? await supabaseAdmin
          .from("cases")
          .select("grade, subject, unit, standard")
          .eq("standard", assignment.case_standard)
          .single()
      : { data: null };
    const validWords = caseRow ? await getFrequencyRushWordSet(caseRow) : [];
    const validWordIds = new Set(validWords.map((w) => w.id));
    const caseKey = caseRow
      ? {
          grade: caseRow.grade,
          subject: caseRow.subject,
          unit: caseRow.unit,
          standard: caseRow.standard || assignment.case_standard,
        }
      : null;
    // Sept 24, 2026 — skill sets: generated items are graded by recomputing
    // the answer from the item id (lib/frequencyRushSkills.js). Nothing is
    // looked up in a file bank, and an id outside the assigned set is ignored.
    const skillStandard = caseRow ? caseRow.standard || assignment.case_standard : null;
    skillSet = skillStandard ? getSkillSet(skillStandard) : null;
    // Sept 24, 2026 — a teacher's own word list: grade against the saved list.
    let customList = null;
    if (!skillSet && isCustomListCode(skillStandard)) {
      const { data: list } = await supabaseAdmin
        .from("frequency_rush_custom_lists")
        .select("standard, title, words, include_meaning, include_spelling")
        .eq("standard", skillStandard)
        .maybeSingle();
      if (list) {
        customList = list;
        skillSet = { kind: "custom", title: `My List: ${list.title}` };
      }
    }
    caseStandard = skillStandard;
    // Sept 24, 2026 (step 6) — Daily Warm-up: each question is graded by the
    // activity it came from, and only activities assigned to this class count.
    if (isDailyCode(skillStandard)) {
      const { data: me } = await supabaseAdmin.from("students").select("class_id").eq("id", studentId).single();
      dailyCtx = me ? await loadDailyContext(supabaseAdmin, me.class_id) : null;
      skillSet = { kind: "daily", title: "Daily Warm-up" };
    }
    let sortBinById = new Map();
    if (caseKey && !skillSet) {
      try {
        const { sortBins } = await getClassifyBanksForCase(caseKey);
        sortBinById = new Map((sortBins || []).map((item) => [String(item.id), item]));
      } catch (err) {
        console.error("Frequency Rush: couldn't load sort_bins for submit:", err.message);
      }
    }

    // A sane cap against a runaway/forged answers array — the widget itself
    // only ever produces up to its own fixed round count per run.
    for (const a of (answers || []).slice(0, 25)) {
      if (a?.type === "sort_bins") {
        const itemId = a.itemId ?? a.questionId;
        if (itemId == null) continue;
        const item = dailyCtx
          ? await recomputeDailyItem(supabaseAdmin, itemId, dailyCtx)
          : customList
          ? recomputeCustomItem(customList, itemId)
          : skillSet
            ? recomputeSkillItem(skillStandard, itemId)
            : sortBinById.get(String(itemId));
        if (!item) continue; // not a real item from this unit's banks, or not part of this skill set
        const correct = a.choiceId != null && String(a.choiceId) === String(item.correctBinId);
        let pointsEarned = 0;
        if (correct) {
          streak += 1;
          bestStreak = Math.max(bestStreak, streak);
          pointsEarned = pointsForCorrectAnswer({
            responseTimeMs: a.responseTimeMs,
            roundSeconds: speedWindowSeconds,
            streakAfterThisAnswer: streak,
          });
          score += pointsEarned;
        } else {
          streak = 0;
        }
        // Minimal safe persist: leave word_id null (sort items are not vocab
        // UUIDs). Requires frequency_rush_attempts.word_id to be nullable.
        attemptRows.push({
          session_id: sessionId,
          word_id: null,
          // Sept 24, 2026 — which fact/item this was ("mul:7x8"), so My
          // Missed Words and the Fact Wall can track single items later.
          // Daily Warm-up answers keep where they came from: "dm|<case>|<key>".
          item_key: dailyCtx ? dailyItemId(item.caseStandard, item.key) : String(item.id),
          correct,
          response_time_ms: a.responseTimeMs || null,
          points_earned: pointsEarned,
          streak_at_answer: streak,
        });
        perWordResults.push({ itemId: dailyCtx ? dailyItemId(item.caseStandard, item.key) : item.id, type: "sort_bins", correct, choiceId: a.choiceId });
        continue;
      }

      if (!validWordIds.has(a.wordId)) continue; // not a real word from this unit — ignored, not trusted
      const correct = a.type === "true_false" ? a.correct === true : a.choiceId != null && a.choiceId === a.wordId;
      let pointsEarned = 0;
      if (correct) {
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
        pointsEarned = pointsForCorrectAnswer({
          responseTimeMs: a.responseTimeMs,
          roundSeconds: speedWindowSeconds,
          streakAfterThisAnswer: streak,
        });
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
    }
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
        pointsEarned = pointsForCorrectAnswer({
          responseTimeMs: a.responseTimeMs,
          roundSeconds: ROUND_SECONDS,
          streakAfterThisAnswer: streak,
        });
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
    let { error: attemptsError } = await supabaseAdmin.from("frequency_rush_attempts").insert(attemptRows);
    // Sept 24, 2026 — item_key is a new column (add_frequency_rush_skills.sql).
    // If that SQL hasn't run yet, save the attempts without it rather than
    // failing every sort run (the Sept 4 login outage lesson, §9.16).
    if (attemptsError && /item_key/i.test(attemptsError.message || "")) {
      console.error("Frequency Rush: item_key column missing — run add_frequency_rush_skills.sql. Saving without it.");
      const fallbackRows = attemptRows.map(({ item_key, ...rest }) => rest);
      ({ error: attemptsError } = await supabaseAdmin.from("frequency_rush_attempts").insert(fallbackRows));
    }
    if (attemptsError) return NextResponse.json({ error: attemptsError.message }, { status: 500 });
  }

  const resolvedEndedReason = ["completed", "hull_breach", "out_of_fuel"].includes(endedReason) ? endedReason : "completed";

  // Sept 24, 2026 (step 6) — beat-your-best: compare with this student's
  // earlier runs of the same activity (read before this run is saved).
  const prevBest = caseStandard ? await getPersonalBest(supabaseAdmin, { studentId, caseStandard, excludeSessionId: sessionId }) : null;
  // Daily Warm-up: the days already done, before this run counts.
  const dailyDates = dailyCtx ? await loadDailyDates(supabaseAdmin, { studentId, caseStandard, excludeSessionId: sessionId }) : null;

  const sessionUpdate = { score, best_streak: bestStreak, ended_reason: resolvedEndedReason, ended_at: new Date().toISOString() };
  // A warm-up counts for the day once at least DAILY_MIN_ANSWERS questions
  // were answered; length_value records how many were, so loadDailyDates
  // can tell a real warm-up from one quit at the start.
  if (dailyCtx) sessionUpdate.length_value = perWordResults.length;
  const { error: sessionUpdateError } = await supabaseAdmin
    .from("frequency_rush_sessions")
    .update(sessionUpdate)
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

  const personalBest = prevBest
    ? {
        score: Math.max(prevBest.score, score),
        streak: Math.max(prevBest.streak, bestStreak),
        previousScore: prevBest.score,
        previousStreak: prevBest.streak,
        firstRun: prevBest.runs === 0,
        newScore: prevBest.runs > 0 && score > prevBest.score,
        newStreak: prevBest.runs > 0 && bestStreak > prevBest.streak,
      }
    : null;

  // Daily Warm-up streak + crystals (same rewards as Relay's Daily Transmission).
  let daily = null;
  if (dailyCtx) {
    const today = centralDateKey();
    const counts = perWordResults.length >= DAILY_MIN_ANSWERS;
    const after = dailyStreakAfter(dailyDates, today);
    daily = counts
      ? { counted: true, firstToday: after.firstToday, streak: after.streak, bestStreak: after.bestStreak, totalDays: after.totalDays, crystalsEarned: after.crystals }
      : { counted: false, needed: DAILY_MIN_ANSWERS, firstToday: after.firstToday, streak: after.firstToday ? after.streak - 1 : after.streak, totalDays: after.totalDays - (after.firstToday ? 1 : 0), crystalsEarned: 0 };
    if (daily.crystalsEarned > 0) {
      try {
        await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: daily.crystalsEarned });
      } catch (err) {
        // a missed reward is never worth failing the submit over
      }
    }
  }

  const fields = {
    attempt2: `Frequency Rush (${skillSet ? skillSet.title : "Lock the Signal"}): ${correctCount}/${perWordResults.length} correct, best streak ${bestStreak}, score ${score}.`,
    frequency_rush_data: { sessionId, score, bestStreak, correctCount, total: perWordResults.length, perWordResults },
    submitted_at: new Date().toISOString(),
  };
  if (daily) {
    // The warm-up stays on the mission list every day, so it's never "turned in".
    fields.attempt2 = `Daily Warm-up: ${daily.totalDays} day${daily.totalDays === 1 ? "" : "s"} done, current streak ${Math.max(0, daily.streak)} (best ${daily.bestStreak}). Last warm-up: ${correctCount}/${perWordResults.length} correct, score ${score}.`;
    fields.frequency_rush_data = { ...fields.frequency_rush_data, daily };
    fields.submitted_at = null;
  }

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

  return NextResponse.json({ success: true, score, resourcesBanked, bestStreak, correctCount, total: perWordResults.length, perWordResults, outpost, personalBest, daily });
}
