import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Sept 4, 2026 — Teacher-facing S.A.M. expansion, Feature B (see
// SAM_Companion_Concept_v1.md §9/§10). Marks a S.A.M. shoutout as seen once
// the student dismisses the note on Home, so it never shows twice. Scoped
// to the logged-in student's own id — a student can only ever mark their
// own shoutouts seen, never another student's by guessing an id.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { shoutoutId } = await request.json();
  if (!shoutoutId) {
    return NextResponse.json({ error: "Missing shoutoutId." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("sam_shoutouts")
    .update({ seen_at: new Date().toISOString() })
    .eq("id", shoutoutId)
    .eq("student_id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
