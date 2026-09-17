"use client";

// CI2.0 sandbox bar — a slim strip at the very top of every page that lets
// Emily flip between the current site (A) and the approved CI2.0 pages (B).
// Legacy concept paths still map back to B, but are no longer offered as a tab.
//
// SAFETY: this bar only renders when NEXT_PUBLIC_SANDBOX is "true". That
// variable is set ONLY for the ci2-sandbox preview site in Vercel, never for
// the live site, so the live site never shows this bar even if this code is
// someday merged into main. CI2.0 pages live under /v2 (B) and /v2c (C); each
// folder's layout.js hides them (404) anywhere the sandbox flag is off.

import Link from "next/link";
import { usePathname } from "next/navigation";

export const IS_SANDBOX = process.env.NEXT_PUBLIC_SANDBOX === "true";

// Which CI2.0 page matches which current (A) page. Add a line here each
// time a new CI2.0 page is built. B lives under /v2, C mirrors B's pages
// under /v2c (same foundation, different look). Anything not listed goes to
// that version's home.
const A_TO_B = {
  "/teacher": "/v2/teacher",
  "/home": "/v2/student",
};

function versionOf(pathname) {
  if (pathname === "/v2c" || pathname.startsWith("/v2c/")) return "C";
  if (pathname === "/v2" || pathname.startsWith("/v2/")) return "B";
  return "A";
}

// Turn any page into its "B path" (the shared key for B and C).
function toBPath(pathname, version) {
  if (version === "B") return pathname;
  if (version === "C") return "/v2" + pathname.slice("/v2c".length);
  if (A_TO_B[pathname]) return A_TO_B[pathname];
  const hit = Object.keys(A_TO_B)
    .sort((x, y) => y.length - x.length)
    .find((x) => pathname.startsWith(x + "/"));
  return hit ? A_TO_B[hit] : "/v2";
}

function bToA(bPath) {
  const pair = Object.entries(A_TO_B).find(([, b]) => bPath === b || bPath.startsWith(b + "/"));
  return pair ? pair[0] : "/";
}

export default function SandboxBar() {
  const pathname = usePathname() || "/";
  if (!IS_SANDBOX) return null;

  const version = versionOf(pathname);
  const bPath = toBPath(pathname, version);
  const hrefs = {
    A: version === "A" ? pathname : bToA(bPath),
    B: bPath,
  };

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
      <Link href={hrefs.A} style={pill(version === "A")}>A · Current site</Link>
      <Link href={hrefs.B} style={pill(version === "B")}>B · CI2.0</Link>
    </div>
  );
}
