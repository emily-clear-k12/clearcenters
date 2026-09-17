"use client";

// Version C · Teacher · This Week — starting point for the bold concept.
// It already runs on the shared planner foundation (usePlanner), so every
// number below is live and matches Version B. The design itself is still to
// be decided with Emily.

import Link from "next/link";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DEMO_WEEK } from "../../../lib/v2/demoWeek";

export default function ConceptPlannerClient() {
  const p = usePlanner();
  const minutes = p.visible.reduce((m, x) => m + x.minutes, 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 16px",
        fontFamily: "'Inter', sans-serif",
        background: "radial-gradient(circle at 15% 25%, #FFE3F3 0, transparent 40%), radial-gradient(circle at 85% 20%, #DDF4FF 0, transparent 45%), linear-gradient(160deg, #F6F0FF, #FFF9EE)",
        color: "#2A2350",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: "#8C52F2", textTransform: "uppercase" }}>Version C · This Week</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(32px, 6vw, 56px)", margin: "8px 0" }}>Week of {DEMO_WEEK.label}</h1>
        <p style={{ color: "#5E577F", fontSize: 17 }}>The bold design goes here. It already runs on the same planner as Version B:</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", margin: "24px 0" }}>
          {[
            [p.visible.length, "activities"],
            [minutes, "minutes planned"],
            [p.openSuggestions.length, "SAM suggestions"],
            [p.setup.classes.length, "classes"],
          ].map(([n, label]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 24, padding: "18px 24px", boxShadow: "0 12px 40px rgba(140,82,242,.16)", minWidth: 150 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 36, fontWeight: 700 }}>{n}</div>
              <div style={{ color: "#5E577F" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {p.setup.subjects.map((k) => (
            <span key={k} style={{ background: SUBJECTS[k].color, color: "#fff", borderRadius: 999, padding: "6px 14px", fontWeight: 700 }}>
              {SUBJECTS[k].name}
            </span>
          ))}
        </div>
        <p style={{ marginTop: 28 }}>
          <Link href="/v2c" style={{ color: "#8C52F2", fontWeight: 700 }}>
            Back to Version C home
          </Link>
        </p>
      </div>
    </main>
  );
}
