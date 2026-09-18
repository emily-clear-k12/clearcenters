"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../../components/v2/StationShell";
import {
  getReportsStub,
  softClassPctLabel,
  softNeedsLabel,
} from "../../../../lib/v2/demoReports";
import { FAMILY_NOTE_HREF, FAMILY_NOTE_DEFAULT_ID } from "../../../../lib/v2/demoFamilyNote";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
} from "../../../../lib/v2/demoWhoNeedsMe";

/**
 * CI2.0 Reports by standard — glance-first stub (not a spreadsheet).
 * Honesty first: demo bars + one real Check-ins waiting spark (same browser, period-aware).
 */
export default function ReportsClient() {
  const stub = getReportsStub();
  const [liveCheckIns, setLiveCheckIns] = useState(null);
  const [periodId, setPeriodId] = useState(null);

  useEffect(() => {
    const refresh = () => {
      try {
        const period = readSelectedClassFilter();
        setPeriodId(period && period !== "all" ? period : null);
        setLiveCheckIns(
          getWhoNeedsMeCount(undefined, undefined, {
            classFilter: period,
            inheritPeriodId: period || "A",
          })
        );
      } catch {
        setLiveCheckIns(0);
        setPeriodId(null);
      }
    };
    refresh();
    const onStorage = (e) => {
      if (
        !e.key ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === "ci2.grading.inbox" ||
        e.key === "ci2.grading.confirmedIds" ||
        e.key === "ci2.teacher.classFilter" ||
        e.key === "ci2.teacher.setupKey"
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
    };
  }, []);

  const checkInsHref =
    periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : stub.checkInsHref || CHECK_INS_HREF;

  const liveLabel =
    liveCheckIns == null
      ? "Check-ins · …"
      : liveCheckIns === 0
        ? "Check-ins waiting · 0 · live"
        : `Check-ins waiting · ${liveCheckIns} · live`;

  return (
    <StationShell active="grow">
      <TeacherSubnav active="reports" />
      <Glass style={{ padding: "22px 22px 20px" }}>
        <div
          role="status"
          style={{
            marginBottom: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 999,
            padding: "7px 14px",
            fontSize: 13,
            fontWeight: 800,
            ...glanceChipStyle("needsYou"),
          }}
        >
          {stub.honesty || "Demo data · not live yet"}
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: GLANCE.ready.fg,
            textTransform: "uppercase",
            letterSpacing: 0.3,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: GLANCE.ready.fg,
              opacity: 0.85,
            }}
          />
          Grow · Reports
        </div>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            margin: "10px 0 0",
            fontSize: 30,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.2,
          }}
        >
          {stub.title}
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: INK,
            lineHeight: 1.35,
          }}
        >
          {stub.samLine}
        </p>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Chip label={`${stub.summary.standards} standards · demo`} />
          <Chip label={`~${stub.summary.avgClassPct}% class ready · demo`} tone="ready" />
          <Link
            href={checkInsHref}
            title="Open Check-ins (live waiting count · this browser)"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 800,
              borderRadius: 999,
              padding: "5px 11px",
              ...glanceChipStyle(
                liveCheckIns && liveCheckIns > 0 ? "needsYou" : "ready"
              ),
              boxShadow:
                liveCheckIns && liveCheckIns > 0
                  ? "0 0 0 1px rgba(232, 168, 74, 0.35)"
                  : "none",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background:
                  liveCheckIns && liveCheckIns > 0
                    ? GLANCE.needsYou.fg
                    : GLANCE.ready.fg,
                boxShadow:
                  liveCheckIns && liveCheckIns > 0
                    ? `0 0 0 3px ${GLANCE.needsYou.bg}`
                    : "none",
              }}
            />
            {liveLabel}
          </Link>
        </div>

        <section
          aria-label="Standards at a glance"
          style={{ marginTop: 20, display: "grid", gap: 12 }}
        >
          {stub.rows.map((row) => {
            const needs = row.needsCheckIn > 0;
            const barColor = needs ? GLANCE.needsYou.fg : GLANCE.ready.fg;
            const card = glanceCardStyle(needs ? "needsYou" : "ready");
            return (
              <article
                key={row.id}
                style={{
                  ...card,
                  borderRadius: 18,
                  padding: "14px 16px",
                  display: "grid",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: row.subjectColor,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                      }}
                    >
                      {row.subjectName} · TEKS {row.code}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontWeight: 700,
                        color: INK,
                        fontSize: 16,
                        lineHeight: 1.3,
                      }}
                    >
                      {row.plain}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        ...glanceChipStyle(needs ? "needsYou" : "ready"),
                        borderRadius: 999,
                        padding: "6px 12px",
                      }}
                    >
                      {softClassPctLabel(row.classPct)}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        ...glanceChipStyle(needs ? "needsYou" : "ready"),
                        borderRadius: 999,
                        padding: "6px 12px",
                      }}
                    >
                      {softNeedsLabel(row.needsCheckIn)}
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(255,255,255,.72)",
                    border: `1px solid ${LINE}`,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(4, Math.min(100, row.classPct))}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: barColor,
                      opacity: 0.72,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </section>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href={checkInsHref}
            style={{
              background: GLANCE.needsYou.bg,
              color: GLANCE.needsYou.fg,
              border: `1px solid ${GLANCE.needsYou.border}`,
              borderRadius: 999,
              padding: "11px 18px",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Check-ins →
          </Link>
          <Link
            href={FAMILY_NOTE_HREF(FAMILY_NOTE_DEFAULT_ID)}
            title="Open Family note stub (demo kid)"
            style={{
              background: GLANCE.ready.bg,
              color: GLANCE.ready.fg,
              border: `1px solid ${GLANCE.ready.border}`,
              borderRadius: 999,
              padding: "11px 18px",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Family note
          </Link>
          <Link
            href={stub.dayHref}
            style={{
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "11px 18px",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(139,108,255,.28)",
            }}
          >
            ← Daily Focus
          </Link>
        </div>

        <p style={{ margin: "16px 0 0", color: MUTED, fontSize: 12, lineHeight: 1.45 }}>
          Honesty pass — bars and per-standard cues are soft demo stubs (no fake kid counts). The{" "}
          <strong>Check-ins waiting · live</strong> spark is a real same-browser count (period lens when
          set) — tap it to open Check-ins.
        </p>
      </Glass>
    </StationShell>
  );
}

function Chip({ label, tone }) {
  const style = tone
    ? glanceChipStyle(tone)
    : { color: MUTED, background: SOFT_LAV, border: `1px solid ${LINE}` };
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 999,
        padding: "5px 11px",
        ...style,
      }}
    >
      {label}
    </span>
  );
}
