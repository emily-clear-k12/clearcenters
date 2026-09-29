import { NextResponse } from "next/server";
import { isSandboxHost, SANDBOX_URL } from "../../../../lib/demo/site";
import { DEMO_STUDENTS } from "../../../../lib/demo/barrons";

// Signs the browser in as Mrs. Barrons or one of her sample students.
// Only at the sandbox address: on the live site this sends you there instead.
export async function GET(request) {
  const url = new URL(request.url);
  if (!isSandboxHost(request.headers.get("host"))) {
    return NextResponse.redirect(`${SANDBOX_URL}/sandbox`);
  }
  const who = url.searchParams.get("who");
  if (who === "leave") {
    const res = NextResponse.redirect(new URL("/demo", request.url));
    res.cookies.set("cc_demo", "", { path: "/", maxAge: 0 });
    res.cookies.set("cc_student_id", "", { path: "/", maxAge: 0 });
    return res;
  }
  const student = who === "student";
  const n = Number(url.searchParams.get("n") ?? 4);
  const index = Number.isInteger(n) && n >= 0 && n < DEMO_STUDENTS.length ? n : 4;
  const res = NextResponse.redirect(new URL(student ? "/home" : "/teacher", request.url));
  res.cookies.set("cc_demo", "1", { path: "/", httpOnly: false });
  if (student) res.cookies.set("cc_student_id", `class-elar-${index}`, { path: "/", httpOnly: false });
  else res.cookies.set("cc_student_id", "", { path: "/", maxAge: 0 });
  return res;
}
