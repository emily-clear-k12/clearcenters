import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Sept 4, 2026 — lets a student give S.A.M. their own nickname, from the
// new "Customize S.A.M." section of the Home settings panel. Zero art
// required, so this ships alongside the skin system as a free personalization
// win. An empty/whitespace-only value is stored as null, which every
// display spot (SamIcon's callers) treats as "just call it S.A.M." — so
// clearing the field is a real, supported way to go back to the default,
// not an error state.
const MAX_NICKNAME_LENGTH = 20;

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { nickname } = await request.json();
  const trimmed = typeof nickname === "string" ? nickname.trim() : "";

  if (trimmed.length > MAX_NICKNAME_LENGTH) {
    return NextResponse.json({ error: `Keep it under ${MAX_NICKNAME_LENGTH} characters.` }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("students")
    .update({ sam_nickname: trimmed || null })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, nickname: trimmed || null });
}
