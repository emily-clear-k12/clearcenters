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
} from "../../../../components/v2/StationShell";
import {
  getReportsStub,
  softClassPctLabel,
  softNeedsLabel,
  isSoftStandardRow,
} from "../../../../lib/v2/demoReports";
import { FAMILY_NOTE_HREF, FAMILY_NOTE_DEFAULT_ID } from "../../../../lib/v2/demoFamilyNote";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
  TEACHER_SETUP_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../lib/v2/demoWeek";

/**
 * CI2.0 Reports by standard — same calm home as Daily Focus
 * (Daily Focus → Check-ins → Grading → Reports).
 * Compact teach-spine + side rail; slim agenda-like rows (no full-bleed tiles).
 * Soft demo bars + one live Check-ins waiting spark (same browser, same period lens).
 * One specific SAM takeaway on the softest demo standard + next-move CTA;
 * soft rows open Check-ins (same period lens) -- not a gradebook.
 */
export default function ReportsClient() {
  const stub = getReportsStub();
  const [liveCheckIns, setLiveCheckIns] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [periodLabel, setPeriodLabel] = useState(null);

  useEffect(() => {
    const refresh = () => {
      try {
        const period = readSelectedClassFilter();
        const pid = period && period !== "all" ? period : null;
        setPeriodId(pid);
        if (pid) {
          const setupKey =
            (typeof window !== "undefined" &&
              window.localStorage.getItem(TEACHER_SETUP_KEY)) ||
            "self";
          const setup = TEACHER_SETUPS[setupKey] || TEACHER_SETUPS.self;
          const cls = setup.classes.find((c) => c.key === pid);
          setPeriodLabel(cls?.name || `Period ${pid}`);
        } else {
          setPeriodLabel(null);
        }
        setLiveCheckIns(
          getWhoNeedsMeCount(undefined, undefined, {
            classFilter: period,
            inheritPeriodId: period || "A",
          })
        );
      } catch {
        setLiveCheckIns(0);
        setPeriodId(null);
        setPeriodLabel(null);
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

  const waiting = typeof liveCheckIns === "number" && liveCheckIns > 0;

  const liveLabel =
    liveCheckIns == null
      ? "Check-ins · …"
      : liveCheckIns === 0
        ? "Clear · 0 waiting"
        : `${liveCheckIns} waiting · live`;

  const quietProvenance = {
    color: MUTED,
    background: SOFT_LAV,
    border: `1px solid ${LINE}`,
  };

  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
    boxShadow: "none",
  };

  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
    boxShadow: "none",
  };

  const calmSecondary = {
    background: GLANCE.ready.bg,
    color: GLANCE.ready.fg,
    border: `1px solid ${GLANCE.ready.border}`,
  };

  const tertiary = {
    color: MUTED,
    background: "rgba(255,255,255,.88)",
    border: `1px solid ${LINE}`,
  };

  const btnBase = {
    borderRadius: 999,
    padding: "10px 16px",
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const checkInsCta = (
    <Link
      key="check-ins"
      href={checkInsHref}
      style={{
        ...btnBase,
        ...(waiting ? amberPrimary : calmSecondary),
        width: "100%",
      }}
      title={
        waiting
          ? "Open Check-ins — live waiting count needs you"
          : "Open Check-ins — clear right now"
      }
    >
      Check-ins →
    </Link>
  );

  const dailyFocusCta = (
    <Link
      key="daily-focus"
      href={stub.dayHref}
      style={{
        ...btnBase,
        ...(waiting ? calmSecondary : softPrimary),
        width: "100%",
      }}
      title="Back to teach today · Daily Focus"
    >
      ← Daily Focus
    </Link>
  );

  const familyNoteCta = (
    <Link
      key="family-note"
      href={FAMILY_NOTE_HREF(FAMILY_NOTE_DEFAULT_ID)}
      title="Family note stub — after a kid needs a quiet word home"
      style={{
        ...btnBase,
        ...tertiary,
        fontWeight: 700,
        width: "100%",
      }}
    >
      Family note
    </Link>
  );

  const softest = stub.softest;
  const softestNextMoveCta = softest ? (
    <Link
      key="softest-next"
      href={checkInsHref}
      style={{
        ...btnBase,
        ...softPrimary,
        width: "100%",
      }}
      title={`Next move on softest demo standard · TEKS ${softest.code}`}
    >
      {stub.softestNextMoveLabel} →
    </Link>
  ) : null;

  // Primary = next move on softest demo standard; secondary stay hub links.
  // Amber still only on live Check-ins waiting > 0 (checkInsCta / spark).
  const secondaryStack = waiting
    ? [checkInsCta, dailyFocusCta, familyNoteCta]
    : [dailyFocusCta, checkInsCta, familyNoteCta];
  const ctaStack = softestNextMoveCta
    ? [softestNextMoveCta, ...secondaryStack]
    : secondaryStack;

  const glassQuiet = {
    background: "rgba(255,255,255,.82)",
    border: `1px solid ${LINE}`,
    borderRadius: 16,
  };

  return (
    <StationShell active="grow">
      <style>{`
        .rep-wrap{max-width:900px;margin:0 auto;width:100%}
        .rep-bento{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,320px);gap:16px;align-items:start}
        .rep-rail{display:flex;flex-direction:column;gap:12px;position:sticky;top:12px}
        .rep-rows{display:flex;flex-direction:column;gap:8px}
        @media (max-width:720px){
          .rep-bento{grid-template-columns:1fr}
          .rep-rail{position:static}
        }
      `}</style>
      <TeacherSubnav active="reports" />
      <div className="rep-wrap">
        <Glass style={{ padding: "18px 18px 16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <div style={{ minWidth: 0, flex: "1 1 220px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: GLANCE.ready.fg,
                  textTransform: "uppercase",
                  letterSpacing: 0.35,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 7,
                    height: 7,
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
                  margin: "6px 0 0",
                  fontSize: 23,
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.25,
                  letterSpacing: -0.2,
                }}
              >
                {stub.title}
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: MUTED,
                  lineHeight: 1.4,
                  maxWidth: 420,
                }}
              >
                {stub.samLine}
              </p>
            </div>
            <div
              role="status"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
                ...quietProvenance,
              }}
            >
              {stub.honesty || "Demo data · not live yet"}
            </div>
          </div>

          <div className="rep-bento">
            {/* Left: compact standards list */}
            <section aria-label="Standards at a glance" className="rep-rows">
              {stub.rows.map((row) => {
                const soft = isSoftStandardRow(row);
                const rowInner = (
                  <>
                    <span
                      aria-hidden
                      style={{
                        width: 5,
                        flexShrink: 0,
                        background: row.subjectColor,
                        opacity: 0.9,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "10px 12px",
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ minWidth: 0, flex: "1 1 160px" }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: MUTED,
                            textTransform: "uppercase",
                            letterSpacing: 0.2,
                          }}
                        >
                          {row.subjectName} · TEKS {row.code}
                        </div>
                        <div
                          style={{
                            marginTop: 2,
                            fontWeight: 700,
                            color: INK,
                            fontSize: 14,
                            lineHeight: 1.3,
                          }}
                        >
                          {row.plain}
                        </div>
                        <div
                          style={{
                            marginTop: 3,
                            fontSize: 11,
                            fontWeight: 600,
                            color: MUTED,
                            lineHeight: 1.3,
                          }}
                        >
                          {softNeedsLabel(row.needsCheckIn)}
                          {soft ? " · Open Check-ins →" : ""}
                        </div>
                        {/* Thin glance bar — not a fat card fill */}
                        <div
                          aria-hidden
                          style={{
                            marginTop: 7,
                            height: 4,
                            borderRadius: 999,
                            background: "rgba(247,244,255,.9)",
                            border: `1px solid ${LINE}`,
                            overflow: "hidden",
                            maxWidth: 220,
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.max(4, Math.min(100, row.classPct))}%`,
                              height: "100%",
                              borderRadius: 999,
                              background: GLANCE.ready.fg,
                              opacity: 0.7,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          ...glanceChipStyle("ready"),
                          borderRadius: 999,
                          padding: "5px 10px",
                          flexShrink: 0,
                        }}
                      >
                        {softClassPctLabel(row.classPct)}
                      </span>
                    </div>
                  </>
                );
                const rowStyle = {
                  display: "flex",
                  gap: 0,
                  alignItems: "stretch",
                  background: "rgba(255,255,255,.92)",
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: soft ? "pointer" : "default",
                };
                return soft ? (
                  <Link
                    key={row.id}
                    href={checkInsHref}
                    title={`Open Check-ins for TEKS ${row.code} (same period lens)`}
                    style={rowStyle}
                  >
                    {rowInner}
                  </Link>
                ) : (
                  <article key={row.id} style={rowStyle}>
                    {rowInner}
                  </article>
                );
              })}
            </section>

            {/* Right rail: summary · live Check-ins · CTAs */}
            <aside className="rep-rail" aria-label="Reports side rail">
              <div style={{ ...glassQuiet, padding: "12px 14px" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: MUTED,
                    textTransform: "uppercase",
                  }}
                >
                  At a glance
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <Chip label={`${stub.summary.standards} standards`} />
                  <Chip
                    label={`~${stub.summary.avgClassPct}% ready`}
                    tone="ready"
                  />
                  {softest ? (
                    <Chip label={`Softest · ${softest.code}`} />
                  ) : null}
                </div>
                {softest ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12,
                      fontWeight: 600,
                      color: MUTED,
                      lineHeight: 1.4,
                    }}
                  >
                    Next · {softest.code} — {softNeedsLabel(softest.needsCheckIn)}
                  </p>
                ) : null}
                {periodLabel ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12,
                      fontWeight: 600,
                      color: MUTED,
                      lineHeight: 1.4,
                    }}
                  >
                    Period · {periodLabel}
                  </p>
                ) : null}
              </div>

              <Link
                href={checkInsHref}
                title="Open Check-ins (live waiting count · same period lens)"
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: waiting
                    ? `1px solid ${GLANCE.needsYou.border}`
                    : `1px solid ${LINE}`,
                  background: waiting
                    ? GLANCE.needsYou.bg
                    : "rgba(255,255,255,.82)",
                  color: INK,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: waiting ? GLANCE.needsYou.fg : MUTED,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: waiting
                        ? GLANCE.needsYou.fg
                        : GLANCE.ready.fg,
                      boxShadow: waiting
                        ? `0 0 0 3px ${GLANCE.needsYou.bg}`
                        : "none",
                    }}
                  />
                  CHECK-INS
                </div>
                <div style={{ fontWeight: 700, marginTop: 4, fontSize: 15 }}>
                  {liveLabel}
                </div>
              </Link>

              <div
                style={{
                  ...glassQuiet,
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {ctaStack}
              </div>

              <p
                style={{
                  margin: 0,
                  color: MUTED,
                  fontSize: 11,
                  lineHeight: 1.45,
                  padding: "0 2px",
                }}
              >
                Soft demo by standard — not a live gradebook. Live spark opens
                Check-ins with the same period lens.
              </p>
            </aside>
          </div>
        </Glass>
      </div>
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
