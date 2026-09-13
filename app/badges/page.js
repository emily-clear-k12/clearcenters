import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import BadgesClient from "./BadgesClient";

// New as of the Aug 27 Galaxy Hub rebuild — badges used to live inside the
// Crystal Vault page (the "Your Badges" section). That page is now the
// planet-unlock Galaxy Hub and doesn't have room for it, and the new Galaxy
// Hub nav bar links to a standalone "Badges" page, so this pulls that exact
// section out into its own route.
//
// Sept 13 — the "redo badges based on missions completed rather than
// crystals" plan mentioned above landed. Tiers now gate on missionsCompleted
// (see below), not crystal_points.
export default async function BadgesPage() {
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

  const { data: badgeTiers } = await supabaseAdmin
    .from("badge_tiers")
    .select("*")
    .order("sort_order");

  // Sept 13 — badges now gate on missions completed rather than crystal
  // points (see this file's own comment above — this is that plan landing).
  // Same "only real, final submissions" definition used everywhere else
  // (Home, My Progress, the teacher's student report).
  const { count: missionsCompleted } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId)
    .not("submitted_at", "is", null);

  return <BadgesClient student={student} badgeTiers={badgeTiers || []} missionsCompleted={missionsCompleted || 0} />;
}
