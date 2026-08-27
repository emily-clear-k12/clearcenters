import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Records a single "discovery" hotspot a student has found on a planet's
// free-play scene (Glow Garden's 3 click-to-explore pins, to start — pure
// exploration, not tied to academic progress). Safe to call again for the
// same discovery; the unique (student_id, planet_key, discovery_key)
// constraint just no-ops on a repeat, same idempotent pattern as
// /api/planets/visit.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey, discoveryKey } = await request.json();
  if (!planetKey || !discoveryKey) {
    return NextResponse.json({ error: "Missing planetKey or discoveryKey." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("student_planet_discoveries")
    .upsert(
      { student_id: studentId, planet_key: planetKey, discovery_key: discoveryKey },
      { onConflict: "student_id,planet_key,discovery_key", ignoreDuplicates: true }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
