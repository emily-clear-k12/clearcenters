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
  softAssignmentGlanceLine,
  REPORTS_STANDARD_HREF,
  REPORTS_ASSIGNMENT_HREF,
} from "../../../../lib/v2/demoReports";
import { checkInsCtaLabel, FAMILY_NOTE_STORY_ID, checkInsHrefForStandard, softClusterDoors, rememberAwareSamStory, getLoopSoftest, isStandardResolved } from "../../../../lib/v2/demoLoopSeams";
import { FAMILY_NOTE_HREF } from "../../../../lib/v2/demoFamilyNote";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
  TEACHER_SETUP_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../lib/v2/demoWeek";

/**
 * CI2.0 Reports — memorable class story (not a demo chip wall).
 * Signature: SAM story card → connected skill↔evidence trail → softest next-move.
 * Softest CTA → standard report; Check-ins secondary; amber only when live waiting > 0.
 */
export default function ReportsClient() {
  const stub = getReportsStub();
  const samStory = stub.softest
    ? rememberAwareSamStory(stub.softest, null)
    : stub.samStory;
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

  const softestCode = stub.softest?.code || null;
  const checkInsHref = softestCode
    ? checkInsHrefForStandard(softestCode, { periodId })
    : periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : stub.checkInsHref || CHECK_INS_HREF;
  const softestDoors = softClusterDoors(stub.softest?.softCluster || [], {
    standard: softestCode,
    periodId,
  });

  const waiting = typeof liveCheckIns === "number" && liveCheckIns > 0;

  const liveLabel =
    liveCheckIns == null
      ? "Check-ins · …"
      : liveCheckIns === 0
        ? "Clear · 0 waiting"
        : `${liveCheckIns} waiting · live`;

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
      {checkInsCtaLabel(liveCheckIns)} →
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
      href={FAMILY_NOTE_HREF(FAMILY_NOTE_STORY_ID)}
      title="Family note for Sofia — same 5.6B cluster as Check-ins"
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
  // Needs-you CTA advances past a resolved softest; drill-in / SAM still see raw softest.
  const needsYouLoop =
    typeof window !== "undefined" ? getLoopSoftest() : null;
  const nextMove =
    softest && isStandardResolved(softest.code) && needsYouLoop?.softest
      ? needsYouLoop.softest
      : softest;
  const nextMoveHref = nextMove
    ? REPORTS_STANDARD_HREF(nextMove.code)
    : stub.softestHref;
  const nextMoveLabel =
    nextMove && softest && nextMove.code !== softest.code
      ? `Open ${nextMove.code} report`
      : stub.softestNextMoveLabel;
  const softestNextMoveCta = nextMove ? (
    <Link
      key="softest-next"
      href={nextMoveHref}
      style={{
        ...btnBase,
        ...softPrimary,
        width: "100%",
      }}
      title={`Next move · open softest standard report · TEKS ${nextMove.code}`}
    >
      {nextMoveLabel} →
    </Link>
  ) : null;

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

  const storyTrail = stub.storyTrail || [];

  return (
    <StationShell active="grow">
      <style>{`
        .rep-wrap{max-width:900px;margin:0 auto;width:100%}
        .rep-bento{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,320px);gap:16px;align-items:start}
        .rep-rail{display:flex;flex-direction:column;gap:12px;position:sticky;top:12px}
        .rep-trail{display:flex;flex-direction:column;gap:10px}
        .sam-story{
          background:linear-gradient(135deg,rgba(243,238,255,.95),rgba(255,255,255,.9));
          border:1px solid ${LINE};
          border-radius:18px;
          padding:16px 18px;
          box-shadow:0 10px 28px rgba(108,92,160,.06);
        }
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
              marginBottom: 12,
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
                  margin: "4px 0 0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: MUTED,
                  letterSpacing: 0.1,
                }}
              >
                {stub.honesty}
                {periodLabel ? ` · ${periodLabel}` : ""}
              </p>
            </div>
          </div>

          {/* Signature: SAM story card */}
          <section className="sam-story" aria-label="SAM class story">
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.4,
                color: LAVENDER,
                textTransform: "uppercase",
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
                  borderRadius: 2,
                  background: LAVENDER,
                  opacity: 0.85,
                }}
              />
              SAM · story
            </div>
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: INK,
                lineHeight: 1.55,
                maxWidth: 640,
              }}
            >
              {samStory}
            </p>
            {softest ? (
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Link
                  href={stub.softestHref || REPORTS_STANDARD_HREF(softest.code)}
                  style={{
                    ...btnBase,
                    ...softPrimary,
                    padding: "8px 14px",
                    fontSize: 12,
                  }}
                >
                  {stub.softestNextMoveLabel} →
                </Link>
                {softestDoors.length ? (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: MUTED,
                      display: "inline-flex",
                      flexWrap: "wrap",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    Soft cluster ·{" "}
                    {softestDoors.map((d, i) => (
                      <span key={d.name} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        {i > 0 ? <span aria-hidden>·</span> : null}
                        <Link
                          href={d.href}
                          title={`Open ${d.name}'s grades`}
                          style={{
                            color: LAVENDER,
                            fontWeight: 800,
                            textDecoration: "none",
                            borderBottom: `1px dashed ${LINE}`,
                          }}
                        >
                          {d.name}
                        </Link>
                      </span>
                    ))}
                  </span>
                ) : stub.softestWho ? (
                  <span style={{ fontSize: 12, fontWeight: 600, color: MUTED }}>
                    Soft cluster · {stub.softestWho}
                  </span>
                ) : null}
              </div>
            ) : null}
          </section>

          <div className="rep-bento" style={{ marginTop: 16 }}>
            {/* Connected story trail: skill + evidence as one narrative */}
            <section aria-label="Class story trail" className="rep-trail">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: MUTED,
                  textTransform: "uppercase",
                  paddingLeft: 2,
                }}
              >
                Skill ↔ evidence
              </div>
              {storyTrail.map((item) => {
                const row = item.standard;
                const soft = isSoftStandardRow(row);
                return (
                  <article
                    key={row.id}
                    style={{
                      display: "flex",
                      gap: 0,
                      alignItems: "stretch",
                      background: soft
                        ? "rgba(255,248,240,.92)"
                        : "rgba(255,255,255,.94)",
                      border: soft
                        ? `1px solid ${GLANCE.needsYou.border}`
                        : `1px solid ${LINE}`,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 5,
                        flexShrink: 0,
                        background: row.subjectColor,
                        opacity: 0.9,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0, padding: "12px 14px" }}>
                      <Link
                        href={item.href}
                        title={`Open standard report · TEKS ${row.code}`}
                        style={{ textDecoration: "none", color: "inherit", display: "block" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ minWidth: 0, flex: "1 1 180px" }}>
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
                                marginTop: 3,
                                fontWeight: 700,
                                color: INK,
                                fontSize: 14,
                                lineHeight: 1.35,
                              }}
                            >
                              {row.plain}
                            </div>
                            <div
                              style={{
                                marginTop: 4,
                                fontSize: 12,
                                fontWeight: 600,
                                color: MUTED,
                                lineHeight: 1.35,
                              }}
                            >
                              {item.readiness}
                              {" · "}
                              {(item.standard?.softCluster || []).length ? (
                                softClusterDoors(item.standard.softCluster, {
                                  standard: item.standard.code,
                                  periodId,
                                }).map((d, i) => (
                                  <span key={d.name}>
                                    {i > 0 ? " · " : ""}
                                    <Link
                                      href={d.href}
                                      onClick={(e) => e.stopPropagation()}
                                      title={`Open ${d.name}`}
                                      style={{
                                        color: LAVENDER,
                                        fontWeight: 800,
                                        textDecoration: "none",
                                        borderBottom: `1px dashed ${LINE}`,
                                      }}
                                    >
                                      {d.name}
                                    </Link>
                                  </span>
                                ))
                              ) : item.whoLine ? (
                                item.whoLine
                              ) : (
                                item.needsHint
                              )}
                              {" · "}
                              <span style={{ color: LAVENDER }}>Open report →</span>
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              ...glanceChipStyle(soft ? "needsYou" : "ready"),
                              borderRadius: 999,
                              padding: "5px 10px",
                              flexShrink: 0,
                            }}
                          >
                            {softClassPctLabel(row.classPct)}
                          </span>
                        </div>
                      </Link>
                      {item.evidence ? (
                        <Link
                          href={item.evidenceHref}
                          title={`Evidence · ${item.evidence.title}`}
                          style={{
                            marginTop: 10,
                            display: "block",
                            textDecoration: "none",
                            color: "inherit",
                            padding: "9px 11px",
                            borderRadius: 12,
                            background: "rgba(247,244,255,.75)",
                            border: `1px dashed ${LINE}`,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              letterSpacing: 0.3,
                              color: LAVENDER,
                              textTransform: "uppercase",
                            }}
                          >
                            Evidence · {item.evidence.when || "recent"}
                          </div>
                          <div
                            style={{
                              marginTop: 2,
                              fontSize: 13,
                              fontWeight: 700,
                              color: INK,
                            }}
                          >
                            {item.evidence.title}
                          </div>
                          <div
                            style={{
                              marginTop: 2,
                              fontSize: 11,
                              fontWeight: 600,
                              color: MUTED,
                            }}
                          >
                            {item.evidenceLine || softAssignmentGlanceLine(item.evidence)}{" "}
                            · See work →
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Right rail: live Check-ins · CTAs — fewer meta chips */}
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
                  Next move
                </div>
                {softest ? (
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      fontWeight: 600,
                      color: INK,
                      lineHeight: 1.45,
                    }}
                  >
                    {isStandardResolved(softest.code)
                      ? `Landed · ${softest.code}`
                      : `Softest · ${softest.code}`}
                    {softestDoors.length ? (
                      <>
                        {" · "}
                        {softestDoors.map((d, i) => (
                          <span key={d.name}>
                            {i > 0 ? " · " : ""}
                            <Link
                              href={d.href}
                              title={`Open ${d.name}`}
                              style={{
                                color: LAVENDER,
                                fontWeight: 800,
                                textDecoration: "none",
                                borderBottom: `1px dashed ${LINE}`,
                              }}
                            >
                              {d.name}
                            </Link>
                          </span>
                        ))}
                      </>
                    ) : stub.softestWho ? (
                      ` · ${stub.softestWho}`
                    ) : (
                      ""
                    )}
                    {" — "}
                    {isStandardResolved(softest.code)
                      ? "you're covered · still findable"
                      : softNeedsLabel(softest.needsCheckIn).toLowerCase()}
                  </p>
                ) : (
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      fontWeight: 600,
                      color: MUTED,
                    }}
                  >
                    Class looking steady
                  </p>
                )}
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: MUTED,
                  }}
                >
                  {stub.summary.avgReadiness || softClassPctLabel(stub.summary.avgClassPct)}{" "}
                  overall · {stub.summary.standards} skills
                </p>
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
                One story — tap a skill or its evidence for the full report.
                Live spark opens Check-ins with the same period lens.
              </p>
            </aside>
          </div>
        </Glass>
      </div>
    </StationShell>
  );
}
