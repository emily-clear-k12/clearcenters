"use client";
import Link from "next/link";

// One tab row across every ClearKeys teacher page (Sept 29, 2026). Same
// underline tabs as the rest of the teacher site (.cc-tabs), as links.
const TABS = [
  { key: "home", label: "Overview", href: "/teacher/clearkeys" },
  { key: "progress", label: "Class progress", href: "/teacher/typing-track" },
  { key: "report", label: "Report", href: "/teacher/clearkeys/report" },
  { key: "race", label: "Relay Race", href: "/teacher/relay-race" },
  { key: "texts", label: "My texts", href: "/teacher/typing-texts" },
  { key: "assign", label: "Assign readings", href: "/teacher/assign/new?product=keys" },
];

export default function ClearKeysTabs({ active, classId }) {
  return (
    <nav aria-label="ClearKeys pages" style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: "0 0 20px", borderBottom: "1px solid #e8e2f5" }}>
      {TABS.map((t) => {
        const joiner = t.href.includes("?") ? "&" : "?";
        const href = classId ? `${t.href}${joiner}classId=${classId}` : t.href;
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={href}
            aria-current={on ? "page" : undefined}
            style={{ font: "600 13px Inter, sans-serif", textDecoration: "none", padding: "12px 14px", marginBottom: -1, borderBottom: `3px solid ${on ? "#7645ce" : "transparent"}`, color: on ? "#713ace" : "#716384" }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
