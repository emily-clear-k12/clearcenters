import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getWorldStory } from "../../../../lib/worldStories";
import WorldRewardStationClient from "./WorldRewardStationClient";

// Sept 5, 2026 — the unified "world reward station" page every Galaxy Hub
// planet now routes to once unlocked, replacing both the old generic
// PlanetDetailModal-for-unlocked-planets behavior AND Glow Garden's old
// bespoke page/component (retired outright, per Emily's "don't want to
// keep any of the old stuff, let's build going forward") — see
// GearLockerClient.js's openPlanet() and SAM_Companion_Concept_v1.md.
//
// One dynamic route serves all 6 planet_keys: a world with a real story in
// lib/worldStories.js (Lumara, today — the reference build) gets the full
// story -> trail/background unlock -> paid game flow; a world without one
// yet renders the same page shell with a "coming soon" state instead of
// erroring, so every portal is clickable today even before its own story
// and game exist.
export default async function WorldPage({ params }) {
  const planetKey = params.planetKey;
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  // Same defensive fallback as app/home/page.js — equipped_world_trail is
  // a brand-new column; a missing/not-yet-cached column here degrades to
  // "no trail shown" instead of bouncing the student back to /login.
  let { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, equipped_world_trail")
    .eq("id", studentId)
    .single();

  if (studentError) {
    const fallback = await supabaseAdmin
      .from("students")
      .select("id, first_name, crystal_points")
      .eq("id", studentId)
      .single();
    student = fallback.data ? { ...fallback.data, equipped_world_trail: null } : fallback.data;
    studentError = fallback.error;
  }

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: planet } = await supabaseAdmin
    .from("planets")
    .select("*")
    .eq("planet_key", planetKey)
    .single();

  // A student who lands on this URL directly before actually unlocking the
  // planet (or an unrecognized planetKey) gets bounced back to the map —
  // same "you can't be here yet" guard the rest of the app uses redirect()
  // for.
  if (!planet || student.crystal_points < planet.threshold) {
    redirect("/gear-locker");
  }

  // Counts as a real visit the moment the page loads — same idempotent
  // upsert every planet used to record via /api/planets/visit, done
  // directly here since this page already has an admin client (same
  // pattern Glow Garden's old page.js used).
  await supabaseAdmin
    .from("student_planet_visits")
    .upsert({ student_id: studentId, planet_key: planetKey }, { onConflict: "student_id,planet_key", ignoreDuplicates: true });

  const { data: visit } = await supabaseAdmin
    .from("student_planet_visits")
    .select("story_read_at")
    .eq("student_id", studentId)
    .eq("planet_key", planetKey)
    .maybeSingle();

  const story = getWorldStory(planetKey);

  let gameState = null;
  if (story?.game) {
    const { data: gameRow } = await supabaseAdmin
      .from("student_planet_games")
      .select("unlocked_at, played, cleared, best_score")
      .eq("student_id", studentId)
      .eq("planet_key", planetKey)
      .eq("game_key", story.game.key)
      .maybeSingle();
    gameState = {
      unlocked: Boolean(gameRow?.unlocked_at),
      played: Boolean(gameRow?.played),
      cleared: Boolean(gameRow?.cleared),
      bestScore: gameRow?.best_score || 0,
    };
  }

  return (
    <WorldRewardStationClient
      planet={planet}
      story={story}
      storyRead={Boolean(visit?.story_read_at)}
      crystalPoints={student.crystal_points}
      equippedWorldTrail={student.equipped_world_trail}
      gameState={gameState}
    />
  );
}
