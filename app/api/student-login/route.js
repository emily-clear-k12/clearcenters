import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { HOME_BACKGROUNDS } from "../../../lib/homeBackgrounds";

// Sept 4, 2026 (Emily's ask): Home's background is now one of several
// (see lib/homeBackgrounds.js), picked at random each time a student
// actually logs in, and held steady for that whole session — a page
// refresh or clicking around the app should NOT reshuffle it, only a
// fresh login should. Tying the pick to this route (the one place a new
// session actually begins) gets that for free: it's chosen once here and
// carried in its own cookie alongside the session cookie, with the same
// lifetime, so it naturally "expires" the same time the session does.

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

  // 2. Find the student in that class by first name + PIN. Only an active
  // student can log in — Roster Management (app/teacher/roster/[classId])
  // "removes" a student by flipping this flag rather than deleting their
  // row, so a removed student's history stays intact but their login stops
  // working immediately. Falls back to skipping this check if the
  // `active` column doesn't exist yet (migration not run) so login never
  // breaks outright over it — see Teacher_SiteWide_Redesign_Plan.md's
  // "SQL delivered ≠ SQL run" note for why this fallback pattern exists.
  let { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days")
    .eq("class_id", classRow.id)
    .ilike("first_name", firstName.trim())
    .eq("pin", pin.trim())
    .eq("active", true)
    .maybeSingle();

  if (studentError) {
    // A bad `active` filter fails loudly (Postgres error), not just an
    // empty result — that's the "migration not run yet" case. Falls back
    // to the same lookup without it so login never breaks outright over a
    // pending migration; a since-deactivated student just isn't blocked
    // until the migration runs, same trade-off Overview's classes query
    // makes for `planet_key`.
    console.error("Student login's 'active' filter failed — falling back without it. Run the students.active migration in Teacher_SiteWide_Redesign_Plan.md if this persists:", studentError);
    const fallback = await supabaseAdmin
      .from("students")
      .select("id, first_name, crystal_points, streak_days")
      .eq("class_id", classRow.id)
      .ilike("first_name", firstName.trim())
      .eq("pin", pin.trim())
      .maybeSingle();
    student = fallback.data;
  }

  if (!student) {
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

  // Random Home background for this session (see HOME_BACKGROUNDS above)
  // — same cookie lifetime as the session itself, so it lives and dies
  // with the login, not with individual page loads.
  const homeBackground = HOME_BACKGROUNDS[Math.floor(Math.random() * HOME_BACKGROUNDS.length)];
  response.cookies.set("cc_home_bg", homeBackground, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
