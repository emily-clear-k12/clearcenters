import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { nextGameState } from "../../../gear-locker/glow-garden/glowGardenLogic";

// Records the outcome of a planet mini-game round. Unlike /api/planets/visit
// (a one-time flag), this is called every time a student finishes a round —
// "cleared" is sticky (once true, always true) and "best_score" only ever
// increases, so replaying the game can never erase progress already made.
// The mini-game itself only ever saved to its own localStorage before this
// route existed, so this is the only place that result reaches the student's
// account.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey, gameKey, cleared, score } = await request.json();
  if (!planetKey || !gameKey) {
    return NextResponse.json({ error: "Missing planetKey or gameKey." }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("student_planet_games")
    .select("cleared, best_score")
    .eq("student_id", studentId)
    .eq("planet_key", planetKey)
    .eq("game_key", gameKey)
    .maybeSingle();

  const next = nextGameState(existing, { cleared, score });

  const { error } = await supabaseAdmin.from("student_planet_games").upsert(
    {
      student_id: studentId,
      planet_key: planetKey,
      game_key: gameKey,
      played: next.played,
      cleared: next.cleared,
      best_score: next.best_score,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "student_id,planet_key,game_key" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, cleared: next.cleared });
}
