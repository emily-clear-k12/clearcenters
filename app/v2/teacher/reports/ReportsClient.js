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
  TEACHER_SETUP_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../lib/v2/demoWeek";

/**
 * CI2.0 Reports by standard — Grow glance inside the same teacher home
 * (Daily Focus → Check-ins → Grading → Reports). Soft demo bars + one live
 * Check-ins waiting spark (same browser, same period lens).
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
        ? "Check-ins waiting · 0 · live"
        : `Check-ins waiting · ${liveCheckIns} · live`;

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
    padding: "11px 18px",
    fontWeight: 800,
    fontSize: 14,
    textDecoration: "none",
  };

  const checkInsCta = (
    <Link
      key="check-ins"
      href={checkInsHref}
      style={{
        ...btnBase,
        ...(waiting ? amberPrimary : calmSecondary),
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
      }}
    >
      Family note
    </Link>
  );

  // Primary = Check-ins when waiting > 0; otherwise soft Daily Focus.
  const ctaRow = waiting
    ? [checkInsCta, dailyFocusCta, familyNoteCta]
    : [dailyFocusCta, checkInsCta, familyNoteCta];

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
            fontWeight: 700,
            ...quietProvenance,
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
            title="Open Check-ins (live waiting count · same period lens)"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 800,
              borderRadius: 999,
              padding: "5px 11px",
              ...glanceChipStyle(waiting ? "needsYou" : "ready"),
              boxShadow: waiting ? "0 0 0 1px rgba(232, 168, 74, 0.35)" : "none",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: waiting ? GLANCE.needsYou.fg : GLANCE.ready.fg,
                boxShadow: waiting ? `0 0 0 3px ${GLANCE.needsYou.bg}` : "none",
              }}
            />
            {liveLabel}
          </Link>
        </div>

        {periodLabel ? (
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 12,
              fontWeight: 600,
              color: MUTED,
              lineHeight: 1.4,
            }}
          >
            Period lens · {periodLabel} — same filter as Check-ins & Daily Focus
          </p>
        ) : null}

        <section
          aria-label="Standards at a glance"
          style={{ marginTop: 20, display: "grid", gap: 12 }}
        >
          {stub.rows.map((row) => {
            // Demo rows stay calm — soft glass / ready wash; soft text only.
            const card = glanceCardStyle("ready");
            const barColor = GLANCE.ready.fg;
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
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        ...glanceChipStyle("ready"),
                        borderRadius: 999,
                        padding: "6px 12px",
                      }}
                    >
                      {softClassPctLabel(row.classPct)}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        ...quietProvenance,
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
          {ctaRow}
        </div>

        <p style={{ margin: "16px 0 0", color: MUTED, fontSize: 12, lineHeight: 1.45 }}>
          Soft demo by standard (not a live gradebook). When someone needs you, the live{" "}
          <strong>Check-ins</strong> spark opens the same period lens — then a kid, a family note,
          or back to <strong>Daily Focus</strong> to teach today.
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
