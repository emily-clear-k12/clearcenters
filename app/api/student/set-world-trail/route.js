import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getWorldStory } from "../../../../lib/worldStories";

// Sept 5, 2026 — equips (or clears, with planetKey: null) a world's S.A.M.
// trail cosmetic. A trail is "owned" the moment that world's story has
// been read (student_planet_visits.story_read_at) — this re-verifies that
// server-side rather than trusting the settings-panel UI, same pattern as
// set-sam-skin's threshold re-check.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey } = await request.json();

  if (planetKey !== null) {
    if (!getWorldStory(planetKey)) {
      return NextResponse.json({ error: "Not a recognized world trail." }, { status: 400 });
    }
    const { data: visit } = await supabaseAdmin
      .from("student_planet_visits")
      .select("story_read_at")
      .eq("student_id", studentId)
      .eq("planet_key", planetKey)
      .maybeSingle();

    if (!visit?.story_read_at) {
      return NextResponse.json({ error: "That world's trail isn't unlocked yet." }, { status: 403 });
    }
  }

  const { error } = await supabaseAdmin
    .from("students")
    .update({ equipped_world_trail: planetKey })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
