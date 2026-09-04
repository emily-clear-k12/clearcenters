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
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { background } = await request.json();
  if (!HOME_BACKGROUNDS.includes(background)) {
    return NextResponse.json({ error: "Not a recognized background." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("students")
    .update({ home_background: background })
    .eq("id", studentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
