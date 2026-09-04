import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { HOME_BACKGROUNDS } from "../../../../lib/homeBackgrounds";

// Sept 4, 2026 — lets a logged-in student set a PERMANENT Home background
// choice from the new gear-icon settings panel (HomeClient.js), saved on
// students.home_background. This is separate from the session-scoped
// random pick student-login/route.js makes at login time (cc_home_bg
// cookie): once a student has a saved choice here, app/home/page.js always
// prefers it over the cookie — see the precedence comment there. Modeled
// on the existing app/api/gear/equip/route.js pattern (cookie-authenticated
// student updates their own personalization choice).
//
// Sept 5, 2026 — widened for EARNED world backgrounds (the Galaxy Hub
// world-reward-station work, SAM_Companion_Concept_v1.md). The 6 original
// HOME_BACKGROUNDS stay free for everyone, validated exactly as before. A
// `worldKey` instead of a raw `background` path is how an earned
// background is requested — this route resolves the real image_path from
// the planets table itself and re-checks server-side that this student
// has actually read that world's story (student_planet_visits.
// story_read_at) rather than trusting any path a client could otherwise
// just type in directly.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { background, worldKey } = await request.json();
  let resolvedBackground = null;

  if (worldKey) {
    const { data: visit } = await supabaseAdmin
      .from("student_planet_visits")
      .select("story_read_at")
      .eq("student_id", studentId)
      .eq("planet_key", worldKey)
      .maybeSingle();

    if (!visit?.story_read_at) {
      return NextResponse.json({ error: "That background isn't unlocked yet." }, { status: 403 });
    }

    const { data: planet } = await supabaseAdmin
      .from("planets")
      .select("image_path")
      .eq("planet_key", worldKey)
      .single();

    if (!planet?.image_path) {
      return NextResponse.json({ error: "That world doesn't have a background image." }, { status: 400 });
    }
    resolvedBackground = planet.image_path;
  } else if (HOME_BACKGROUNDS.includes(background)) {
    resolvedBackground = background;
  } else {
    return NextResponse.json({ error: "Not a recognized background." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("students")
    .update({ home_background: resolvedBackground })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
