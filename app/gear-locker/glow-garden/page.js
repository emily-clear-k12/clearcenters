import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import GlowGardenClient from "./GlowGardenClient";

const PLANET_KEY = "glow_garden";
const GAME_KEY = "catch_glow_sprites";

// Glow Garden's own scene — replaces the generic PlanetDetailModal for this
// one planet only (see GearLockerClient.js's openPlanet, which routes here
// instead of opening the modal). Every other planet is untouched and still
// opens the modal. This is the pilot for a per-planet "arrival scene"; the
// other 5 planets stay on the generic modal until/unless Emily asks to
// build theirs out too.
export default async function GlowGardenPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: planet } = await supabaseAdmin
    .from("planets")
    .select("*")
    .eq("planet_key", PLANET_KEY)
    .single();

  // A student who lands on this URL directly before actually unlocking the
  // planet gets bounced back to the map — same "you can't be here yet"
  // guard the rest of the app uses redirect() for.
  if (!planet || student.crystal_points < planet.threshold) {
    redirect("/gear-locker");
  }

  // First real visit here also counts as "visiting" the planet on the map
  // (same idempotent upsert /api/planets/visit does for every other
  // planet's modal) — done directly here since this page already has an
  // admin client and doesn't need a client-side round trip for it.
  await supabaseAdmin
    .from("student_planet_visits")
    .upsert(
      { student_id: studentId, planet_key: PLANET_KEY },
      { onConflict: "student_id,planet_key", ignoreDuplicates: true }
    );

  const { data: discoveries } = await supabaseAdmin
    .from("student_planet_discoveries")
    .select("discovery_key")
    .eq("student_id", studentId)
    .eq("planet_key", PLANET_KEY);

  const { data: gameRow } = await supabaseAdmin
    .from("student_planet_games")
    .select("played, cleared, best_score")
    .eq("student_id", studentId)
    .eq("planet_key", PLANET_KEY)
    .eq("game_key", GAME_KEY)
    .maybeSingle();

  return (
    <GlowGardenClient
      planet={planet}
      crystalPoints={student.crystal_points}
      discoveredKeys={(discoveries || []).map((d) => d.discovery_key)}
      gameCleared={Boolean(gameRow?.cleared)}
      gamePlayed={Boolean(gameRow?.played)}
    />
  );
}
