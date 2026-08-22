import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(request) {
  const { classCode, firstName, pin } = await request.json();

  if (!classCode || !firstName || !pin) {
    return NextResponse.json({ error: "Missing class code, first name, or PIN." }, { status: 400 });
  }

  // 1. Find the class by its code.
  const { data: classRow, error: classError } = await supabaseAdmin
    .from("classes")
    .select("id, name")
    .eq("class_code", classCode.trim().toUpperCase())
    .single();

  if (classError || !classRow) {
    return NextResponse.json({ error: "That class code doesn't match anything. Check with your teacher." }, { status: 401 });
  }

  // 2. Find the student in that class by first name + PIN.
  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days")
    .eq("class_id", classRow.id)
    .ilike("first_name", firstName.trim())
    .eq("pin", pin.trim())
    .single();

  if (studentError || !student) {
    return NextResponse.json({ error: "That name and PIN don't match. Try again or ask your teacher." }, { status: 401 });
  }

  // 3. Success — set a simple session cookie identifying this student.
  // NOTE: for the pilot this is a lightweight session, good enough for a
  // classroom setting. A wider rollout should upgrade this to a signed,
  // expiring session token rather than a raw student id in a cookie.
  const response = NextResponse.json({ success: true, student });
  response.cookies.set("cc_student_id", student.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours — a school day
  });
  return response;
}
