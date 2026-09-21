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
  GLANCE,
  glanceChipStyle,
} from "../../../../components/v2/StationShell";
import {
  getReportsStub,
  softClassPctLabel,
  isSoftStandardRow,
  REPORTS_STANDARD_HREF,
} from "../../../../lib/v2/demoReports";
import {
  checkInsCtaLabel,
  checkInsHrefForStandard,
  softStoryStudentDoorHref,
  softClusterDoors,
  rememberAwareSamStory,
  getLoopSoftest,
  isStandardResolved,
  isLoopAllClear,
  getAllClearSurfaceLine,
  familyNoteSoftStoryHref,
} from "../../../../lib/v2/demoLoopSeams";
import { GRADING_INBOX_HREF, gradingInboxHref } from "../../../../lib/v2/demoGrading";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
  TEACHER_SETUP_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../lib/v2/demoWeek";

/**
 * CI2.0 Reports glance — INTUITIVE · fewer clicks.
 * Top: quiet class story (one line). Main: standards grid (readiness + who, no open).
 * Evidence / graph / contributing work live on standard drill-in only.
 * Amber only when live Check-ins waiting > 0. No Demo shout. No new settings.
 */
export default function ReportsClient() {
  const stub = getReportsStub();
  const [liveCheckIns, setLiveCheckIns] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [periodLabel, setPeriodLabel] = useState(null);
  const [loopTick, setLoopTick] = useState(0);

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
    const bumpLoop = () => setLoopTick((n) => n + 1);
    window.addEventListener("ci2-loop-remember-updated", bumpLoop);
    window.addEventListener("ci2-grading-updated", bumpLoop);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-loop-remember-updated", bumpLoop);
      window.removeEventListener("ci2-grading-updated", bumpLoop);
    };
  }, []);

  const softestCode = stub.softest?.code || null;
  const checkInsHref = softestCode
    ? checkInsHrefForStandard(softestCode, { periodId })
    : periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : stub.checkInsHref || CHECK_INS_HREF;
  const gradingDoor = softestCode
    ? gradingInboxHref({ standard: softestCode })
    : GRADING_INBOX_HREF;

  const waiting = typeof liveCheckIns === "number" && liveCheckIns > 0;
  // loopTick keeps all-clear / Landed voice in sync after resolve.
  void loopTick;
  const allClear = typeof window !== "undefined" ? isLoopAllClear() : false;
  const classStory = allClear
    ? getAllClearSurfaceLine("reports")
    : stub.softest
      ? rememberAwareSamStory(stub.softest, null)
      : stub.samStory;

  const softest = stub.softest;
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

  const btnBase = {
    borderRadius: 999,
    padding: "9px 14px",
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
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
  const quietTertiary = {
    color: MUTED,
    background: "rgba(255,255,255,.88)",
    border: `1px solid ${LINE}`,
    fontWeight: 700,
  };

  // Soft-open first, then softest readiness, then code — scan path without hunting.
  const standardRows = [...(stub.rows || [])].sort((a, b) => {
    const aOpen = isSoftStandardRow(a) && !isStandardResolved(a.code) ? 0 : 1;
    const bOpen = isSoftStandardRow(b) && !isStandardResolved(b.code) ? 0 : 1;
    if (aOpen !== bOpen) return aOpen - bOpen;
    const pct = (Number(a.classPct) || 0) - (Number(b.classPct) || 0);
    if (pct !== 0) return pct;
    return String(a.code).localeCompare(String(b.code));
  });

  function readinessWord(row) {
    if (isStandardResolved(row.code)) return "Landed";
    return softClassPctLabel(row.classPct);
  }

  function chipTone(row) {
    if (isStandardResolved(row.code)) return "ready";
    const word = softClassPctLabel(row.classPct);
    if (word === "Needs a look") return "needsYou";
    if (word === "Mixed") return "needsYou";
    return "ready";
  }

  return (
    <StationShell active="grow">
      <style>{`
        .rep-wrap{max-width:960px;margin:0 auto;width:100%}
        .rep-story{
          margin-top:10px;padding:10px 12px;border-radius:12px;
          background:rgba(243,238,255,.45);border:1px solid ${LINE};
        }
        .rep-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:12px;
          margin-top:14px;
        }
        .rep-actions{
          margin-top:14px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;
        }
        @media (max-width:900px){
          .rep-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media (max-width:560px){
          .rep-grid{grid-template-columns:1fr}
        }
      `}</style>
      <TeacherSubnav active="reports" />
      <div className="rep-wrap">
        <Glass style={{ padding: "16px 16px 14px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-start",
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
                  fontSize: 22,
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
                {" · "}
                {stub.summary?.avgReadiness || softClassPctLabel(stub.summary?.avgClassPct)}
                {" · "}
                {stub.summary?.standards || standardRows.length} skills
              </p>
            </div>
          </div>

          {/* Compact class story — not a hero essay */}
          <section className="rep-story" aria-label="Reports">
            <p
              style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: INK,
                lineHeight: 1.45,
              }}
            >
              {classStory}
            </p>
          </section>

          {/* One clear next move — no stacked CTA chrome */}
          <div className="rep-actions" aria-label="Next move">
            {waiting ? (
              <Link
                href={checkInsHref}
                style={{ ...btnBase, ...amberPrimary }}
                title="Open Check-ins — live waiting needs you"
              >
                {checkInsCtaLabel(liveCheckIns)} →
              </Link>
            ) : nextMove && !allClear ? (
              <Link
                href={nextMoveHref}
                style={{ ...btnBase, ...softPrimary }}
                title={`Next move · softest report · TEKS ${nextMove.code}`}
              >
                {nextMoveLabel} →
              </Link>
            ) : (
              <Link
                href={checkInsHref}
                style={{ ...btnBase, ...calmSecondary }}
                title="Open Check-ins — clear right now"
              >
                {checkInsCtaLabel(liveCheckIns)} →
              </Link>
            )}
            {!waiting && nextMove && !allClear ? (
              <Link
                href={checkInsHref}
                style={{ ...btnBase, ...calmSecondary }}
                title="Open Check-ins"
              >
                {checkInsCtaLabel(liveCheckIns)} →
              </Link>
            ) : null}
            <Link
              href={gradingDoor}
              style={{ ...btnBase, ...quietTertiary }}
              title="Open Grading inbox"
            >
              Grading
            </Link>
            {!allClear && nextMove ? (
              <Link
                href={familyNoteSoftStoryHref({
                  standard: nextMove.code,
                  periodId,
                  subject: nextMove.subject,
                })}
                style={{ ...btnBase, ...quietTertiary }}
                title={`Family note · ${nextMove.code} soft story · already knows who + why`}
              >
                Family note
              </Link>
            ) : null}
            {!allClear && nextMove ? (
              <Link
                href={softStoryStudentDoorHref({
                  standard: nextMove.code,
                  names: nextMove.softCluster,
                })}
                style={{ ...btnBase, ...quietTertiary }}
                title={`Student My Day · ${nextMove.code} soft cast`}
              >
                My Day
              </Link>
            ) : null}
            <Link
              href={stub.dayHref}
              style={{ ...btnBase, ...quietTertiary }}
              title="Back to Daily Focus"
            >
              ← Daily Focus
            </Link>
          </div>

          {/* Standards glance — readiness + who without opening */}
          <section aria-label="Standards glance">
            <div
              style={{
                marginTop: 16,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.35,
                color: MUTED,
                textTransform: "uppercase",
                paddingLeft: 2,
              }}
            >
              Standards · scan the room
            </div>
            <div className="rep-grid">
              {standardRows.map((row) => {
                const softOpen =
                  isSoftStandardRow(row) && !isStandardResolved(row.code);
                const word = readinessWord(row);
                const tone = chipTone(row);
                const doors = softClusterDoors(row.softCluster || [], {
                  standard: row.code,
                  periodId,
                });
                return (
                  <article
                    key={row.id}
                    style={{
                      display: "flex",
                      gap: 0,
                      alignItems: "stretch",
                      background: softOpen
                        ? "rgba(255,248,240,.92)"
                        : "rgba(255,255,255,.94)",
                      border: softOpen
                        ? `1px solid ${GLANCE.needsYou.border}`
                        : `1px solid ${LINE}`,
                      borderRadius: 14,
                      overflow: "hidden",
                      minHeight: 118,
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
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "11px 12px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <Link
                        href={REPORTS_STANDARD_HREF(row.code)}
                        title={`Open standard report · TEKS ${row.code}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "block",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 8,
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 800,
                                color: MUTED,
                                textTransform: "uppercase",
                                letterSpacing: 0.2,
                              }}
                            >
                              {row.subjectName} · {row.code}
                            </div>
                            <div
                              style={{
                                marginTop: 3,
                                fontWeight: 700,
                                color: INK,
                                fontSize: 13,
                                lineHeight: 1.3,
                              }}
                            >
                              {row.plain}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              ...glanceChipStyle(tone),
                              borderRadius: 999,
                              padding: "4px 8px",
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {word}
                          </span>
                        </div>
                      </Link>

                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: MUTED,
                          lineHeight: 1.35,
                          marginTop: "auto",
                        }}
                      >
                        {doors.length ? (
                          <>
                            {doors.map((d, i) => (
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
                        ) : word === "Landed" || word === "Mostly clear" ? (
                          "Looking clear"
                        ) : (
                          "No named kids yet"
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <Link
                          href={REPORTS_STANDARD_HREF(row.code)}
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: LAVENDER,
                            textDecoration: "none",
                          }}
                          title={`Depth · report, evidence, class shape · ${row.code}`}
                        >
                          Open report →
                        </Link>
                        {softOpen ? (
                          <Link
                            href={familyNoteSoftStoryHref({
                              standard: row.code,
                              periodId,
                              subject: row.subject,
                            })}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: MUTED,
                              textDecoration: "none",
                            }}
                            title={`Family note · ${row.code} soft story · who + why filled`}
                          >
                            Family note →
                          </Link>
                        ) : null}
                        {softOpen ? (
                          <Link
                            href={softStoryStudentDoorHref({
                              standard: row.code,
                              names: row.softCluster,
                            })}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: MUTED,
                              textDecoration: "none",
                            }}
                            title={`Student My Day · ${row.code} soft cast`}
                          >
                            My Day →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <p
            style={{
              margin: "14px 0 0",
              color: MUTED,
              fontSize: 11,
              lineHeight: 1.45,
              padding: "0 2px",
            }}
          >
            Softest + who are on the cards — click a standard only for depth
            (story, evidence, class shape). Live spark opens Check-ins with the
            same period lens.
          </p>
        </Glass>
      </div>
    </StationShell>
  );
}
