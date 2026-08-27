import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import GearLockerClient from "./GearLockerClient";

// Renamed in spirit (not on disk) to the "Galaxy Hub" as of Aug 27 — this
// page used to be the Crystal Vault room-decorating shop; it's now a
// planet-unlock map. Kept at the same file names and the same /gear-locker
// route on purpose, same reasoning as the earlier Crystal Vault rename:
// avoid touching routing/links for something that's cosmetic to a student.
export default async function GearLockerPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: planets } = await supabaseAdmin
    .from("planets")
    .select("*")
    .order("sort_order");

  const { data: visits } = await supabaseAdmin
    .from("student_planet_visits")
    .select("planet_key")
    .eq("student_id", studentId);

  // Same badge_tiers table Home and My Progress use — only needed here for
  // the "Badges Earned" count in the stats panel. The actual badge
  // browsing UI moved to its own page (app/badges) as of this rebuild.
  const { data: badgeTiers } = await supabaseAdmin
    .from("badge_tiers")
    .select("*")
    .order("sort_order");

  // Powers the "Crystal Log" popup — same table and shape My Progress's
  // growth chart uses.
  const { data: pointsHistory } = await supabaseAdmin
    .from("crystal_points_history")
    .select("amount, new_total, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <GearLockerClient
      student={student}
      planets={planets || []}
      visitedPlanetKeys={(visits || []).map((v) => v.planet_key)}
      badgeTiers={badgeTiers || []}
      pointsHistory={pointsHistory || []}
    />
  );
}
