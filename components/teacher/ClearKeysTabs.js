"use client";
import Link from "next/link";

// One strip across every ClearKeys teacher page (Sept 29, 2026), so the
// typing tools live in one place instead of five.
const TABS = [
  { key: "home", label: "ClearKeys home", href: "/teacher/clearkeys" },
  { key: "progress", label: "Class progress", href: "/teacher/typing-track" },
  { key: "race", label: "Relay Race", href: "/teacher/relay-race" },
  { key: "texts", label: "My texts", href: "/teacher/typing-texts" },
  { key: "assign", label: "Assign readings", href: "/teacher/assign/new?product=keys" },
];

export default function ClearKeysTabs({ active, classId }) {
  return (
    <nav aria-label="ClearKeys" style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "4px 0 18px" }}>
      {TABS.map((t) => {
        const joiner = t.href.includes("?") ? "&" : "?";
        const href = classId ? `${t.href}${joiner}classId=${classId}` : t.href;
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={href}
            aria-current={on ? "page" : undefined}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              border: `1px solid ${on ? "#7541cf" : "#e0d8f0"}`,
              background: on ? "#7541cf" : "#fff",
              color: on ? "#fff" : "#3b2a66",
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
