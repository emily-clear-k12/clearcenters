"use client";

// CI2.0 sandbox bar — a slim strip at the very top of every page that lets
// Emily flip between the current site (A) and the new CI2.0 pages (B).
//
// SAFETY: this bar only renders when NEXT_PUBLIC_SANDBOX is "true". That
// variable is set ONLY for the ci2-sandbox preview site in Vercel, never for
// the live site, so the live site never shows this bar even if this code is
// someday merged into main. All CI2.0 pages live under /v2, and app/v2/layout.js
// hides them (404) anywhere the sandbox flag is off.

import Link from "next/link";
import { usePathname } from "next/navigation";

export const IS_SANDBOX = process.env.NEXT_PUBLIC_SANDBOX === "true";

// Which CI2.0 (B) page matches which current (A) page. Add a line here each
// time a new CI2.0 page is built. Anything not listed goes to the CI2.0 home.
const A_TO_B = {
  "/teacher": "/v2/teacher",
  "/home": "/v2/student",
};

function matchingB(pathname) {
  if (A_TO_B[pathname]) return A_TO_B[pathname];
  const hit = Object.keys(A_TO_B)
    .sort((a, b) => b.length - a.length)
    .find((a) => pathname.startsWith(a + "/"));
  return hit ? A_TO_B[hit] : "/v2";
}

function matchingA(pathname) {
  const pair = Object.entries(A_TO_B).find(([, b]) => pathname === b || pathname.startsWith(b + "/"));
  return pair ? pair[0] : "/";
}

export default function SandboxBar() {
  const pathname = usePathname() || "/";
  if (!IS_SANDBOX) return null;

  const onB = pathname === "/v2" || pathname.startsWith("/v2/");
  const aHref = onB ? matchingA(pathname) : pathname;
  const bHref = onB ? pathname : matchingB(pathname);

  const pill = (active) => ({
    padding: "4px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    color: active ? "#fff" : "#4B3F72",
    background: active ? "#7C5CFF" : "transparent",
    border: "1px solid #7C5CFF",
  });

  return (
    <div
      role="navigation"
      aria-label="Sandbox version switcher"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "6px 12px",
        background: "#FFF6D6",
        borderBottom: "1px solid #E8D48A",
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        color: "#4B3F72",
        flexWrap: "wrap",
      }}
    >
      <strong>SANDBOX</strong>
      <span style={{ opacity: 0.75 }}>made-up data · not the live site</span>
      <Link href={aHref} style={pill(!onB)}>A · Current site</Link>
      <Link href={bHref} style={pill(onB)}>B · CI2.0</Link>
    </div>
  );
}
