import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("cc_student_id", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire immediately
  });
  // Clear the per-session Home background pick too (Sept 4, 2026) — not
  // strictly required since student-login overwrites it fresh on every
  // login anyway, but keeps a logged-out state fully clean.
  response.cookies.set("cc_home_bg", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
