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

  const cookieBg = cookieStore.get("cc_home_bg")?.value;

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days, class_id, home_background, equipped_sam_skin, sam_nickname, teacher_unlocked_sam_skins")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // Sept 4, 2026: which of the several Home backgrounds this student sees.
  // A student's own saved choice (set via the Home settings panel, stored
  // durably on students.home_background) always wins once they've made one.
  // Until then, fall back to the per-login random pick from student-login
  // (held in the cc_home_bg cookie for the session). Both values are
  // re-validated against the real HOME_BACKGROUNDS list here rather than
  // trusted directly — a stale cookie from before this feature shipped, a
  // removed background, or anything unexpected just falls back to the
  // original background instead of passing an arbitrary string into an
  // image src.
  const homeBackground = HOME_BACKGROUNDS.includes(student.home_background)
    ? student.home_background
    : HOME_BACKGROUNDS.includes(cookieBg)
    ? cookieBg
    : HOME_BACKGROUNDS[0];

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

  // Sept 4, 2026 — Teacher-facing S.A.M. expansion, Feature B: a teacher can
  // send an encouraging note "as S.A.M." from the Rewards modal. At most one
  // unseen note is ever surfaced at a time (oldest-unseen-first would let
  // them pile up unreadably, so newest wins and older unseen ones are simply
  // superseded) — shown once on Home, then marked seen so it never repeats.
  const { data: shoutout } = await supabaseAdmin
    .from("sam_shoutouts")
    .select("id, message, created_at")
    .eq("student_id", studentId)
    .is("seen_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <HomeClient
      student={student}
      studentClass={studentClass}
      assignments={assignments || []}
      missionsCompleted={missionsCompleted || 0}
      badgeTiers={badgeTiers || []}
      homeBackground={homeBackground}
      shoutout={shoutout || null}
    />
  );
}
