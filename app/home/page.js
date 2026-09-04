import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
import { HOME_BACKGROUNDS } from "../../lib/homeBackgrounds";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  // Sept 4, 2026: one of several Home backgrounds, picked at random by
  // student-login and held for the whole session (HOME_BACKGROUNDS is
  // that route's list, imported rather than duplicated so there's one
  // source of truth). Re-validated against the real list here rather than
  // trusting the cookie value directly — a stale value from before this
  // feature shipped, or anything unexpected, just falls back to the
  // original background instead of passing an arbitrary string into an
  // image src.
  const cookieBg = cookieStore.get("cc_home_bg")?.value;
  const homeBackground = HOME_BACKGROUNDS.includes(cookieBg) ? cookieBg : HOME_BACKGROUNDS[0];

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days, class_id")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: studentClass } = await supabaseAdmin
    .from("classes")
    .select("name, class_code")
    .eq("id", student.class_id)
    .single();

  const assignments = await getVisibleAssignmentsForStudent(studentId, student.class_id);

  // Only count real, final submissions — not draft rows created by
  // autosave while a student is still mid-activity (see the submitted_at
  // fix in /api/submission/save).
  const { count: missionsCompleted } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId)
    .not("submitted_at", "is", null);

  // Badge tiers: also fetched by app/gear-locker/page.js (Crystal Vault),
  // which is the full badge collection now. Home only needs this to show
  // the student's current tier icon next to their name in the header tile
  // (Aug 27) — it's a much smaller use of the same data, not a duplicate
  // of the Crystal Vault feature.
  const { data: badgeTiers } = await supabaseAdmin
    .from("badge_tiers")
    .select("*")
    .order("sort_order");

  return (
    <HomeClient
      student={student}
      studentClass={studentClass}
      assignments={assignments || []}
      missionsCompleted={missionsCompleted || 0}
      badgeTiers={badgeTiers || []}
      homeBackground={homeBackground}
    />
  );
}
