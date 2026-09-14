import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

// SERVER ONLY. Bulk-adds students to a class in one request — the
// paste-a-list import on the Roster page sends here instead of looping
// individual client-side inserts, both so a partial failure can't leave an
// import half-done with no clear error, and so class ownership is verified
// with the admin key the same way as every other teacher-write route in
// this app (see app/api/teacher/assignment/delete/route.js's note on why —
// RLS has silently no-op'd writes before instead of failing loudly).
export async function POST(request) {
  const { classId, names, accessToken } = await request.json();

  if (!classId || !Array.isArray(names) || names.length === 0 || !accessToken) {
    return NextResponse.json({ error: "Missing class, names, or session." }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  const { data: cls, error: classError } = await supabaseAdmin
    .from("classes")
    .select("id, teacher_id")
    .eq("id", classId)
    .maybeSingle();
  if (classError || !cls || cls.teacher_id !== teacherId) {
    return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });
  }

  const cleanNames = names.map((n) => (n || "").trim()).filter(Boolean);
  if (cleanNames.length === 0) {
    return NextResponse.json({ error: "No names to add." }, { status: 400 });
  }
  if (cleanNames.length > 100) {
    return NextResponse.json({ error: "That's a lot at once — try 100 or fewer names per import." }, { status: 400 });
  }

  const rows = cleanNames.map((first_name) => ({ class_id: classId, first_name, pin: generatePin() }));

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("students")
    .insert(rows)
    .select("id, first_name, pin");

  if (insertError) {
    return NextResponse.json({ error: "Couldn't add students: " + insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, students: inserted });
}
