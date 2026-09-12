import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { SAM_SKINS } from "../../../../lib/samSkins";
import { DEV_FORCE_UNLOCK_ALL } from "../../../../lib/devFlags";

// Sept 4, 2026 — first real API piece of the S.A.M. expansion (see
// SAM_Companion_Concept_v1.md). Modeled on app/api/student/set-background,
// with one real difference: backgrounds are all open to every student, but
// S.A.M. skins are gated by crystal_points thresholds, so this route
// re-checks the real unlock server-side rather than trusting the picker UI
// — a raw request naming a locked skin is rejected outright, not just kept
// out of the normal UI.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { skin: skinKey } = await request.json();
  const skin = SAM_SKINS.find((s) => s.key === skinKey);
  if (!skin) {
    return NextResponse.json({ error: "Not a recognized S.A.M. skin." }, { status: 400 });
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("crystal_points, teacher_unlocked_sam_skins")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  // Sept 4, 2026 — a skin is unlocked either by hitting its crystal_points
  // threshold OR by a teacher granting it directly (Feature B, the Rewards
  // modal's Skin tab) — either path is enough, checked the same way the
  // picker UI checks it in HomeClient.js.
  //
  // Sept 12, 2026: DEV_FORCE_UNLOCK_ALL (lib/devFlags.js) skips this check
  // entirely, matching the picker UI's bypass in HomeClient.js — otherwise
  // a student could see every skin unlocked there and then have equipping
  // one silently rejected here, same bug this exact flag already fixed
  // once for the Galaxy Hub world pages.
  const teacherUnlocked = (student.teacher_unlocked_sam_skins || []).includes(skinKey);
  if (!DEV_FORCE_UNLOCK_ALL && (student.crystal_points || 0) < skin.threshold && !teacherUnlocked) {
    return NextResponse.json({ error: "That S.A.M. skin isn't unlocked yet." }, { status: 403 });
  }

  const { error } = await supabaseAdmin
    .from("students")
    .update({ equipped_sam_skin: skinKey })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
