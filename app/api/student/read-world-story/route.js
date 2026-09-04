import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getWorldStory } from "../../../../lib/worldStories";

// Sept 5, 2026 — marks that a student has read a world's "learn about this
// world" story. This is the single trigger for that world's whole
// reward-station payoff (its S.A.M. trail + its earned Home background —
// see WorldRewardStationClient.js and SAM_Companion_Concept_v1.md).
// Idempotent: calling it again after story_read_at is already set just
// returns success without touching the timestamp, so re-reading a story
// never resets or re-fires anything.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey } = await request.json();
  if (!planetKey || !getWorldStory(planetKey)) {
    return NextResponse.json({ error: "This world doesn't have a story yet." }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("student_planet_visits")
    .select("story_read_at")
    .eq("student_id", studentId)
    .eq("planet_key", planetKey)
    .maybeSingle();

  if (existing?.story_read_at) {
    return NextResponse.json({ success: true, alreadyRead: true });
  }

  const { error } = await supabaseAdmin
    .from("student_planet_visits")
    .upsert(
      { student_id: studentId, planet_key: planetKey, story_read_at: new Date().toISOString() },
      { onConflict: "student_id,planet_key" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, alreadyRead: false });
}
