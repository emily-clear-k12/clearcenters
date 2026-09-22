import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { resolveRelayStationLesson } from "../../../../lib/relayStationServer";
import {
  getTrackLevelLesson,
  computeStars,
  computeRun,
  meetsAccuracy,
  isCheckpointLevel,
  rankFor,
  CRYSTALS,
  applyAccommodations,
  cleanTimeline,
} from "../../../../lib/cases/relay-station";

// Relay Station (typing center) submit — added Sept 22, 2026.
// Design doc: claude/RelayStation_Digital_Design_v1.md.
//
// Two modes, decided by the assignment's lesson:
//
//   READING (single passage): one `submissions` row per (assignment,
//   student) keeping the BEST run. First finish sets submitted_at, same as
//   every other engine, so it leaves the student's mission list.
//
//   FOUNDATIONS TRACK: the body carries `level`. Progress lives in
//   `relay_station_progress` (one row per STUDENT, not per assignment). A
//   run at the student's current level with accuracy >= the pass goal moves
//   them up one level. Replaying an already-passed level can only improve
//   its stars. The track's `submissions` row stays a draft (submitted_at
//   null) so the assignment stays on the mission list until all 20 levels
//   are passed — then it's stamped submitted.
//
// In both modes WPM / accuracy / stars are recomputed here from the raw
// counts against the lesson's own goals, rather than trusting the client.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { assignmentId, result, level } = body || {};
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

  // Built-in lessons AND teacher custom texts (DB) resolve here.
  const lesson = await resolveRelayStationLesson(assignment.case_standard);
  if (!lesson) {
    return NextResponse.json({ error: "This typing lesson isn't set up yet." }, { status: 404 });
  }

  if (lesson.isTrack) {
    return handleTrackRun({ studentId, assignmentId, track: lesson, level, result });
  }
  return handleReadingRun({ studentId, assignmentId, lesson, result });
}

// Clean + recompute one run against a passage's own text and goals.
function scoreRun(passage, result) {
  const chars = passage.text.length;
  const ms = Math.max(1000, Number(result.ms) || 0);
  const errors = Math.max(0, Math.floor(Number(result.errors) || 0));
  const keystrokes = Math.max(chars + errors, Math.floor(Number(result.keystrokes) || 0));
  const { wpm, accuracy, accuracyExact } = computeRun({ chars, keystrokes, errors, ms });
  const stars = computeStars(passage.goals, wpm, accuracyExact);
  const troubleKeys = Array.isArray(result.troubleKeys)
    ? result.troubleKeys
        .slice(0, 5)
        .filter((t) => t && typeof t.key === "string" && t.key.length === 1)
        .map((t) => ({ key: t.key, count: Math.max(0, Math.floor(Number(t.count) || 0)) }))
    : [];
  const bestCombo = Math.max(0, Math.min(chars, Math.floor(Number(result.bestCombo) || 0)));
  // Ghost racer: per-character timeline, kept only if it's well-formed.
  const timeline = cleanTimeline(result.timeline, chars);
  return { wpm, accuracy, accuracyExact, stars, errors, keystrokes, chars, ms, troubleKeys, bestCombo, timeline, finishedAt: new Date().toISOString() };
}

function isBetter(run, prev) {
  return !prev || run.stars > prev.stars || (run.stars === prev.stars && run.wpm > prev.wpm);
}

function keyLabel(k) {
  return { " ": "Space", "\n": "Enter", "\t": "Tab" }[k] || k;
}

async function writeSubmission({ assignmentId, studentId, fields }) {
  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();
  if (existing) {
    return supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
  }
  return supabaseAdmin.from("submissions").insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
}

// ---------------------------------------------------------------- READING
async function handleReadingRun({ studentId, assignmentId, lesson, result }) {
  // Wave 1: teacher-set accommodations (lower pass bar) apply to readings too.
  const { data: accRow } = await supabaseAdmin
    .from("relay_station_progress")
    .select("accommodations")
    .eq("student_id", studentId)
    .maybeSingle();
  const goals = applyAccommodations(lesson.goals, accRow && accRow.accommodations);
  const passage = { ...lesson, goals };
  const run = { lessonCode: lesson.code, kind: lesson.kind, goals, ...scoreRun(passage, result) };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, relay_station_data")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prevData = (existing && existing.relay_station_data) || {};
  const isNewBest = isBetter(run, prevData.best);
  const best = isNewBest ? run : prevData.best;
  const attempts = (prevData.attempts || 0) + 1;

  const summary =
    `Relay Station (${lesson.code}, ${lesson.title}): best run ${"★".repeat(best.stars)} — ` +
    `${best.wpm} WPM, ${best.accuracy}% accuracy, ${best.errors} errors` +
    (best.troubleKeys.length ? `; trouble keys: ${best.troubleKeys.map((t) => keyLabel(t.key)).join(" ")}` : "") +
    `. ${attempts} attempt${attempts === 1 ? "" : "s"}.`;

  const { error } = await writeSubmission({
    assignmentId,
    studentId,
    fields: {
      attempt2: summary,
      // The ghost timeline lives only on `best` (it's what students race).
      relay_station_data: { best, last: { ...run, timeline: undefined }, attempts },
      submitted_at: new Date().toISOString(),
      revision_requested: false,
    },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await bumpStreak(studentId);
  // Gamification: 1 crystal for every star earned for the first time.
  const crystalsEarned = isNewBest ? Math.max(0, best.stars - ((prevData.best && prevData.best.stars) || 0)) * CRYSTALS.perNewStar : 0;
  await awardCrystals(studentId, crystalsEarned);
  return NextResponse.json({ success: true, run, best, isNewBest, crystalsEarned });
}

// ------------------------------------------------------------------ TRACK
async function handleTrackRun({ studentId, assignmentId, track, level, result }) {
  const total = track.levels.length;
  const levelNum = Math.floor(Number(level) || 0);
  const passage = getTrackLevelLesson(track, levelNum);
  if (!passage) {
    return NextResponse.json({ error: "That level doesn't exist." }, { status: 400 });
  }

  const { data: row, error: readError } = await supabaseAdmin
    .from("relay_station_progress")
    .select("student_id, current_level, level_results, completed_at, accommodations")
    .eq("student_id", studentId)
    .maybeSingle();
  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const currentLevel = row ? row.current_level : 1;
  if (levelNum > currentLevel) {
    return NextResponse.json({ error: "That level is still locked." }, { status: 403 });
  }

  passage.goals = applyAccommodations(passage.goals, row && row.accommodations);
  const run = scoreRun(passage, result);
  // Pass bar rises with the level (90 / 95 / 100) — passage.goals carries it.
  const passed = meetsAccuracy(passage.goals, run.accuracyExact);
  const results = { ...((row && row.level_results) || {}) };
  const prev = results[String(levelNum)] || null;
  const isNewBest = passed && isBetter(run, prev && prev.passed ? prev : null);
  const prevStars = prev && prev.passed ? prev.stars : 0;

  // Per-level record. A level's stars only ever go up; attempts always count.
  const attempts = ((prev && prev.attempts) || 0) + 1;
  let record;
  if (isNewBest) {
    record = { passed: true, stars: run.stars, wpm: run.wpm, accuracy: run.accuracy, errors: run.errors, troubleKeys: run.troubleKeys, bestCombo: Math.max(run.bestCombo, (prev && prev.bestCombo) || 0), timeline: run.timeline, passedAt: (prev && prev.passedAt) || run.finishedAt };
  } else if (prev && prev.passed) {
    record = { ...prev };
  } else {
    // Not passed yet: keep the latest try so the teacher sees where they are.
    record = { passed: false, stars: 0, wpm: run.wpm, accuracy: run.accuracy, errors: run.errors, troubleKeys: run.troubleKeys };
  }
  record.attempts = attempts;
  record.lastTryAt = run.finishedAt;
  results[String(levelNum)] = record;

  const leveledUp = passed && levelNum === currentLevel;
  const newCurrent = leveledUp ? currentLevel + 1 : currentLevel;
  const justCompleted = leveledUp && newCurrent > total;
  const completedAt = (row && row.completed_at) || (justCompleted ? run.finishedAt : null);

  const progressRow = {
    student_id: studentId,
    current_level: newCurrent,
    level_results: results,
    completed_at: completedAt,
    updated_at: run.finishedAt,
  };
  const { error: upsertError } = await supabaseAdmin
    .from("relay_station_progress")
    .upsert(progressRow, { onConflict: "student_id" });
  if (upsertError) return NextResponse.json({ error: upsertError.message }, { status: 500 });

  // Mirror a short summary onto the assignment's submission row so the
  // existing teacher views (Submissions, reports) show where the student is.
  const passedCount = Math.min(newCurrent - 1, total);
  const totalStars = Object.values(results).reduce((n, r) => n + (r.passed ? r.stars : 0), 0);
  const summary = completedAt
    ? `Typing Foundations Track: COMPLETE — all ${total} levels passed, ${totalStars} of ${total * 3} stars.`
    : `Typing Foundations Track: on Level ${newCurrent} of ${total} (${track.levels[newCurrent - 1].title}) — ${passedCount} passed, ${totalStars} stars.`;
  const { error: subError } = await writeSubmission({
    assignmentId,
    studentId,
    fields: {
      attempt2: summary,
      relay_station_data: { track: true, currentLevel: newCurrent, passedCount, totalStars, completedAt },
      submitted_at: completedAt ? completedAt : null,
      revision_requested: false,
    },
  });
  if (subError) console.error("Relay Station: couldn't mirror track summary to submissions:", subError.message);

  if (passed) await bumpStreak(studentId);

  // Gamification: crystals for first-time stars, a checkpoint bonus when a
  // unit is cleared (which is also a rank promotion), and a finish bonus.
  const newStars = isNewBest ? Math.max(0, run.stars - prevStars) : 0;
  // Checkpoint bonus only the FIRST time a unit is cleared (a teacher moving
  // a student back for review shouldn't re-pay it).
  const checkpointCleared = leveledUp && isCheckpointLevel(levelNum) && !(prev && prev.passed);
  const crystalsEarned =
    newStars * CRYSTALS.perNewStar +
    (checkpointCleared ? CRYSTALS.checkpoint : 0) +
    (justCompleted ? CRYSTALS.trackComplete : 0);
  await awardCrystals(studentId, crystalsEarned);

  return NextResponse.json({
    success: true,
    run,
    passed,
    leveledUp,
    isNewBest,
    best: record.passed ? record : null,
    progress: { current_level: newCurrent, level_results: results, completed_at: completedAt },
    crystalsEarned,
    promotedTo: checkpointCleared ? rankFor(newCurrent) : null,
  });
}

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount });
  } catch (err) {
    // a missed reward is never worth failing the submit over
  }
}

async function bumpStreak(studentId) {
  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // streak is a nice-to-have, never worth failing the submit over
  }
}
