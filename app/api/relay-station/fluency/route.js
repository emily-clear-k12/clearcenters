import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { computeRun, computeStars, meetsAccuracy, applyAccommodations, cleanTimeline, TRACK_LEVELS, CRYSTALS } from "../../../../lib/cases/relay-station";
import { getFluencyLevel, normalizeFluency, FLUENCY_LAST } from "../../../../lib/cases/relay-station/fluency";
import { recordTypingTime } from "../../../../lib/clearkeysServer";

// ClearKeys Fluency levels 21-40 (Sept 29, 2026). Student side: save one run.
// The server re-scores the raw counts against the level's own text, like the
// Foundations Track. Passing needs the accuracy AND speed goal.
export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const level = getFluencyLevel(body.level);
  if (!level) return NextResponse.json({ error: "That level doesn't exist." }, { status: 400 });
  const result = body.result || {};

  const { data: row, error: readError } = await supabaseAdmin
    .from("relay_station_progress")
    .select("student_id, current_level, completed_at, accommodations, fluency")
    .eq("student_id", studentId)
    .maybeSingle();
  if (readError) {
    return NextResponse.json({ error: /fluency/i.test(readError.message || "") ? "Fluency isn't switched on yet. Ask your teacher." : "Couldn't save." }, { status: 500 });
  }
  const trackDone = row && (row.completed_at || row.current_level > TRACK_LEVELS.length);
  if (!trackDone) return NextResponse.json({ error: "Finish the Foundations Track first." }, { status: 403 });

  const fl = normalizeFluency(row.fluency);
  if (level.n > fl.current) return NextResponse.json({ error: "That level is still locked." }, { status: 403 });

  const goals = applyAccommodations(level.goals, row.accommodations);
  const chars = level.text.length;
  const ms = Math.max(1000, Number(result.ms) || 0);
  const errors = Math.max(0, Math.floor(Number(result.errors) || 0));
  const keystrokes = Math.max(chars + errors, Math.floor(Number(result.keystrokes) || 0));
  const { wpm, accuracy, accuracyExact } = computeRun({ chars, keystrokes, errors, ms });
  const stars = computeStars(goals, wpm, accuracyExact);
  const passed = meetsAccuracy(goals, accuracyExact) && wpm >= goals.wpm;
  const finishedAt = new Date().toISOString();
  const run = { wpm, accuracy, stars, errors, timeline: cleanTimeline(result.timeline, chars), finishedAt };

  const key = String(level.n);
  const prev = fl.results[key] || null;
  const better = !prev || stars > (prev.stars || 0) || (stars === (prev.stars || 0) && wpm > (prev.wpm || 0));
  const attempts = ((prev && prev.attempts) || 0) + 1;
  let record;
  if (passed && (!prev || !prev.passed || better)) {
    record = { passed: true, stars, wpm, accuracy, errors, timeline: run.timeline, passedAt: (prev && prev.passedAt) || finishedAt };
  } else if (prev && prev.passed) {
    record = { ...prev };
  } else {
    record = { passed: false, stars: Math.max(stars, (prev && prev.stars) || 0), wpm, accuracy, errors };
  }
  record.attempts = attempts;
  record.lastTryAt = finishedAt;
  const results = { ...fl.results, [key]: record };
  const leveledUp = passed && level.n === fl.current;
  const current = leveledUp ? Math.min(fl.current + 1, FLUENCY_LAST + 1) : fl.current;

  const { error: upError } = await supabaseAdmin
    .from("relay_station_progress")
    .update({ fluency: { current, results }, updated_at: finishedAt })
    .eq("student_id", studentId);
  if (upError) return NextResponse.json({ error: "Couldn't save." }, { status: 500 });

  const newStars = Math.max(0, (record.stars || 0) - ((prev && prev.stars) || 0));
  const crystalsEarned = newStars * CRYSTALS.perNewStar + (leveledUp && level.n === FLUENCY_LAST ? CRYSTALS.trackComplete : 0);
  if (crystalsEarned) {
    try { await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: crystalsEarned }); } catch (e) { /* never fail a save over a reward */ }
  }
  await recordTypingTime(studentId, ms);
  return NextResponse.json({ success: true, passed, leveledUp, isNewBest: passed && better, best: record.passed ? record : null, crystalsEarned, promotedTo: null, fluency: { current, results } });
}
