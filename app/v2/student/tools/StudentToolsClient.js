"use client";

import Link from "next/link";
import StudentToolsPanel from "../../../../components/v2/StudentToolsPanel";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const WARM_BG = "linear-gradient(165deg, #F6F0FF 0%, #FFF9EE 55%, #F3EEFF 100%)";

/**
 * Full-page Student Tools shell — glass look matching My Day / activity.
 */
export default function StudentToolsClient() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: WARM_BG,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <Link
            href="/v2/student"
            style={{
              border: `1px solid ${LINE}`,
              background: "rgba(255,255,255,.8)",
              color: INK,
              borderRadius: 999,
              padding: "8px 14px",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ← My Day
          </Link>
          <span style={{ fontSize: 13, color: MUTED, alignSelf: "center" }}>Leo · Room 12</span>
        </div>
        <StudentToolsPanel backHref="/v2/student" />
      </div>
    </main>
  );
}
