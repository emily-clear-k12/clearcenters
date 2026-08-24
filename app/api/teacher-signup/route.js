import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

// Lets a teacher create their own account, gated by a shared team passcode
// (set as the TEAM_SIGNUP_CODE environment variable in Vercel). Anyone who
// knows the passcode can create an account; nobody else can.
export async function POST(request) {
  try {
    const { name, school, email, password, teamCode } = await request.json();

    if (!process.env.TEAM_SIGNUP_CODE) {
      return NextResponse.json(
        { error: "Sign-up isn't set up yet. Ask your admin to add the TEAM_SIGNUP_CODE setting." },
        { status: 500 }
      );
    }

    if (!teamCode || teamCode !== process.env.TEAM_SIGNUP_CODE) {
      return NextResponse.json(
        { error: "That team code isn't right. Check with whoever shared it with you." },
        { status: 401 }
      );
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are all required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password needs to be at least 8 characters." }, { status: 400 });
    }

    // Create the real login (Supabase Auth), skipping email confirmation since
    // this is an internal team tool, not a public sign-up flow.
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      const message = createError.message?.toLowerCase().includes("already been registered")
        ? "There's already an account with that email. Try signing in instead."
        : createError.message || "Couldn't create that account.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    // Link the new login to a teacher profile row.
    const { error: teacherError } = await supabaseAdmin
      .from("teachers")
      .insert({ id: userData.user.id, name, school: school || null });

    if (teacherError) {
      // Don't leave a login with no teacher profile behind it.
      await supabaseAdmin.auth.admin.deleteUser(userData.user.id);
      return NextResponse.json({ error: "Couldn't finish setting up the account. Try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
