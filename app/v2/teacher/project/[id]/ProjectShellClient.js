"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  CREAM,
} from "../../../../../components/v2/StationShell";
import {
  assignProjectToMyDay,
  getProjectShell,
  isProjectAssigned,
  PROJECT_ASSIGNED_KEY,
} from "../../../../../lib/v2/demoProject";

/**
 * CI2.0 Project-on-teach shell (skeleton).
 * Title · TEKS stub · days span · evidence product · Assign to My Day → localStorage.
 */
export default function ProjectShellClient({ projectId }) {
  const router = useRouter();
  const shell = useMemo(() => getProjectShell(projectId), [projectId]);
  const [assigned, setAssigned] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setAssigned(isProjectAssigned(projectId));
    const refresh = () => setAssigned(isProjectAssigned(projectId));
    const onStorage = (e) => {
      if (!e.key || e.key === PROJECT_ASSIGNED_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-project-assigned", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-project-assigned", refresh);
    };
  }, [projectId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  if (!shell) {
    return (
      <StationShell>
        <TeacherSubnav active="day" />
        <Glass>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28, color: INK }}>
            Project not found
          </h1>
          <p style={{ color: MUTED, marginTop: 8 }}>
            That teach block isn’t in the demo week. Head back to Daily Focus and tap Project on a teach card.
          </p>
          <Link
            href="/v2/teacher/day?d=2"
            style={{
              display: "inline-block",
              marginTop: 14,
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← Daily Focus
          </Link>
        </Glass>
      </StationShell>
    );
  }

  function handleAssign() {
    assignProjectToMyDay(shell);
    setAssigned(true);
    setToast({ text: "Assigned to My Day (this browser) — shows as a Later · Project card for students." });
  }

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: shell.subjectColor, textTransform: "uppercase", letterSpacing: 0.3 }}>
              Project shell · {shell.subjectName}
              {shell.isTeach ? " · teach heart" : " · not a teach block"}
            </div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 0", fontSize: 32, color: INK }}>
              {shell.title}
            </h1>
            <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 14 }}>
              Lightweight multi-day / evidence vibe — skeleton only. Not a full project builder.
            </p>
          </div>
          <Link
            href={shell.backHref}
            style={{
              background: "#fff",
              color: INK,
              border: `1px solid ${LINE}`,
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "inherit",
            }}
          >
            ← Daily Focus
          </Link>
        </div>

        {!shell.isTeach && (
          <div
            style={{
              marginTop: 14,
              background: CREAM,
              border: `1px solid #E8D9A8`,
              borderRadius: 14,
              padding: "12px 14px",
              color: INK,
              fontSize: 14,
            }}
          >
            Project is meant for <strong>teach</strong> blocks. This one is “{shell.kind}” — shell still opens so you can poke around.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
            marginTop: 18,
          }}
        >
          <MetaCard label="TEKS" value={shell.teksLabel} hint="Stub — wire real standards later" />
          <MetaCard
            label="Days"
            value={shell.span.label}
            hint={shell.span.dateRange || shell.dayLabel}
          />
          <MetaCard
            label="Starts"
            value={shell.dayLabel}
            hint={`${shell.minutes} min · ${shell.who}`}
          />
        </div>

        <div
          style={{
            marginTop: 16,
            background: SOFT_LAV,
            border: `1px solid #D9CFFF`,
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: LAVENDER, letterSpacing: 0.4 }}>
            EVIDENCE PRODUCT
          </div>
          <div style={{ fontWeight: 700, color: INK, fontSize: 17, marginTop: 4 }}>{shell.evidence.title}</div>
          <p style={{ margin: "8px 0 0", color: MUTED, fontSize: 14, lineHeight: 1.45 }}>
            {shell.evidence.body}
          </p>
          {shell.productAbout && (
            <p style={{ margin: "10px 0 0", color: INK, fontSize: 13 }}>
              From teach product · {shell.product}: {shell.productAbout}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18, alignItems: "center" }}>
          <button
            type="button"
            onClick={handleAssign}
            style={{
              border: "none",
              background: assigned ? MINT : LAVENDER,
              color: assigned ? INK : "#fff",
              borderRadius: 999,
              padding: "12px 20px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: assigned ? "none" : "0 6px 18px rgba(139,108,255,.28)",
            }}
          >
            {assigned ? "Assigned to My Day ✓" : "Assign to My Day"}
          </button>
          <button
            type="button"
            onClick={() => router.push(shell.backHref)}
            style={{
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: INK,
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Back to Daily Focus
          </button>
          <span style={{ color: MUTED, fontSize: 13 }}>
            {assigned
              ? "Student My Day will show a Later · Project card (same browser)."
              : "Writes localStorage only — calm stub, no LMS blast."}
          </span>
        </div>
      </Glass>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: INK,
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            maxWidth: 420,
            zIndex: 50,
            boxShadow: "0 12px 32px rgba(46,36,89,.35)",
          }}
        >
          {toast.text}
        </div>
      )}
    </StationShell>
  );
}

function MetaCard({ label, value, hint }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        padding: "12px 14px",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontWeight: 700, color: INK, fontSize: 15, marginTop: 4 }}>{value}</div>
      {hint && <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}