import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getWorldStory } from "../../../../lib/worldStories";

// Crystals a student pays to unlock a world's game — Emily's ask: "just
// like if they visited the planet and wanted to do something there is a
// ticket price." Same spirit as every other placeholder number in this
// app (skin thresholds, the hint-flag count): easy to retune later, not a
// locked decision.
const GAME_TICKET_COST = 1;

// Sept 5, 2026 — the paid "ticket" gate on a world's embedded game.
// Re-checks crystal_points server-side rather than trusting the client,
// then spends the ticket by calling the EXISTING increment_crystal_points
// RPC (the same one the teacher Rewards modal's Points tab already uses)
// with a NEGATIVE amount — that function already just adds whatever
// amount it's given to crystal_points, so "spending" needed no new
// database function, only a new caller. Idempotent: a student who already
// unlocked this game is never charged twice, even on a double-click or a
// retried request.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey } = await request.json();
  const story = planetKey ? getWorldStory(planetKey) : null;
  if (!story?.game) {
    return NextResponse.json({ error: "This world doesn't have a game yet." }, { status: 400 });
  }
  const gameKey = story.game.key;

  const { data: existingGame } = await supabaseAdmin
    .from("student_planet_games")
    .select("unlocked_at, played, cleared, best_score")
    .eq("student_id", studentId)
    .eq("planet_key", planetKey)
    .eq("game_key", gameKey)
    .maybeSingle();

  if (existingGame?.unlocked_at) {
    return NextResponse.json({ success: true, alreadyUnlocked: true });
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("crystal_points")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }
  if ((student.crystal_points || 0) < GAME_TICKET_COST) {
    return NextResponse.json({ error: "Not enough crystals yet." }, { status: 403 });
  }

  const { error: spendError } = await supabaseAdmin.rpc("increment_crystal_points", {
    p_student_id: studentId,
    p_amount: -GAME_TICKET_COST,
  });
  if (spendError) {
    return NextResponse.json({ error: spendError.message }, { status: 500 });
  }

  const { error: unlockError } = await supabaseAdmin.from("student_planet_games").upsert(
    {
      student_id: studentId,
      planet_key: planetKey,
      game_key: gameKey,
      played: Boolean(existingGame?.played),
      cleared: Boolean(existingGame?.cleared),
      best_score: existingGame?.best_score || 0,
      unlocked_at: new Date().toISOString(),
    },
    { onConflict: "student_id,planet_key,game_key" }
  );

  if (unlockError) {
    return NextResponse.json({ error: unlockError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, alreadyUnlocked: false });
}
