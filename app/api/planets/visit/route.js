import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Records that a student has actually opened a planet's arrival scene at
// least once. Fires the first time a student views an unlocked planet;
// safe to call again on every subsequent visit — the unique
// (student_id, planet_key) constraint just no-ops on a repeat.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { planetKey } = await request.json();
  if (!planetKey) {
    return NextResponse.json({ error: "Missing planetKey." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("student_planet_visits")
    .upsert({ student_id: studentId, planet_key: planetKey }, { onConflict: "student_id,planet_key", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
