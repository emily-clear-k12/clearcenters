import { NextResponse } from "next/server";

const MAYA = "class-elar-4";

export async function GET(request) {
  const who = new URL(request.url).searchParams.get("who");
  if (who === "leave") {
    const res = NextResponse.redirect(new URL("/demo", request.url));
    res.cookies.set("cc_demo", "", { path: "/", maxAge: 0 });
    res.cookies.set("cc_student_id", "", { path: "/", maxAge: 0 });
    return res;
  }
  const student = who === "student";
  const res = NextResponse.redirect(new URL(student ? "/home" : "/teacher", request.url));
  res.cookies.set("cc_demo", "1", { path: "/", httpOnly: false });
  if (student) res.cookies.set("cc_student_id", MAYA, { path: "/", httpOnly: false });
  else res.cookies.set("cc_student_id", "", { path: "/", maxAge: 0 });
  return res;
}
