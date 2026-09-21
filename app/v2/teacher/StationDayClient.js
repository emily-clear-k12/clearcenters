"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DAY_NAMES, DATES, KINDS, PRODUCT_INFO, DEMO_WEEK } from "../../../lib/v2/demoWeek";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  getPendingCount,
  loadConfirmedIds,
  gradingInboxHref,
} from "../../../lib/v2/demoGrading";
import {
  FOCUS_BLOCKS_KEY,
  FOCUS_TODAY_DAY,
  FOCUS_TOMORROW_DAY,
  focusBlockKindLabel,
  focusBlockNamesLine,
  getWhoNeedsCountsByClass,
  getWhoNeedsMeCount,
  readFocusBlocksForDay,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../lib/v2/demoWhoNeedsMe";
import { PROJECT_HREF } from "../../../lib/v2/demoProject";
import { LESSON_PLAN_HREF } from "../../../lib/v2/demoLessonPlan";
import { LIVE_TEACH_HREF } from "../../../lib/v2/demoLiveTeach";
import {
  plannerProvenanceLabel,
  anyMintedProvenance,
  isProvenanceHelperDismissed,
  dismissProvenanceHelper,
  PROVENANCE_HELPER_TEXT,
} from "../../../lib/v2/demoLibrary";
import { writeSundayPendingUndo } from "../../../lib/v2/demoSundayBridge";
import {
  getAllClearMorningLine,
  getLoopSoftest,
  REPORTS_HREF,
  DAY_HREF,
  checkInsHrefForPeriod,
  checkInsHrefForStandard,
  checkInsCtaLabel,
  focusBlocksSectionLabel,
  focusBlockProvenanceLine,
  softClusterDoors,
  isLoopAllClear,
  isStandardResolved,
  hasReteachOnToday,
  LOOP_REMEMBER_KEY,
  familyNoteSoftStoryHref,
  softStoryStudentDoorHref,
} from "../../../lib/v2/demoLoopSeams";
import {
  StationShell,
  Glass,
  Pill,
  TeacherSubnav,
  SetupSwitcher,
  ProvenanceHelperLine,
  RoomCards,
  SingleRoomLabel,
  HandsOffChip,
  SundayPreviewModal,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../components/v2/StationShell";
import { HowMyWeeksRunDrawer, WeeksRunEntry } from "../../../components/v2/HowMyWeeksRun";
import { AddActivityModal, AddActivityButton } from "../../../components/v2/AddActivityModal";
import { Toast } from "../../../components/v2/weekKit";

const AGENDA_LABELS = ["Now", "Next", "Later"];

/**
 * CI2.0 Daily Focus glance — INTUITIVE · fewer clicks.
 * Top: quiet class/day story. Main: needs-you (soft cluster + focus blocks) with who named.
 * Slim next-move row. Agenda / teach depth secondary. No MorningCard + SamGlance + CTA rail stack.
 * Amber only when live Check-ins waiting > 0. No Demo shout.
 */
export default function StationDayClient() {
  const router = useRouter();
  const params = useSearchParams();
  const p = usePlanner();
  const [gradePending, setGradePending] = useState(DEMO_WEEK.gradingCount);
  const [loopTick, setLoopTick] = useState(0);
  const [whoNeedsCount, setWhoNeedsCount] = useState(0);
  const [focusBlocks, setFocusBlocks] = useState([]);
  const day = Math.min(4, Math.max(0, Number(params.get("d") ?? 2)));
  const [openId, setOpenId] = useState(params.get("open"));
  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;

  useEffect(() => {
    const refresh = () => {
      setGradePending(getPendingCount(loadConfirmedIds()));
      setWhoNeedsCount(
        getWhoNeedsMeCount(undefined, undefined, {
          classFilter: selectedClass,
          inheritPeriodId: selectedClass || "A",
        })
      );
      setFocusBlocks(readFocusBlocksForDay(day, selectedClass || "all"));
      setLoopTick((t) => t + 1);
    };
    refresh();
    const onStorage = (e) => {
      if (
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === FOCUS_BLOCKS_KEY ||
        e.key === LOOP_REMEMBER_KEY ||
        e.key === "ci2.teacher.classFilter"
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-focus-blocks-updated", refresh);
    window.addEventListener("ci2-loop-remember-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-focus-blocks-updated", refresh);
      window.removeEventListener("ci2-loop-remember-updated", refresh);
    };
  }, [selectedClass, day]);

  const items = p.visible.filter((a) => a.day === day);
  const agenda = useMemo(() => {
    const teach = items.filter((a) => a.kind === "teach");
    const rest = items.filter((a) => a.kind !== "teach");
    return [...teach, ...rest];
  }, [items]);
  const minutes = items.reduce((s, a) => s + (a.minutes || 0), 0);
  const opened = items.find((a) => a.id === openId) || p.activities.find((a) => a.id === openId);

  const needsByClass = useMemo(() => {
    const map = {};
    for (const c of p.setup.classes) map[c.key] = 0;
    for (const s of p.openSuggestions) {
      if (s.classKey && map[s.classKey] != null) map[s.classKey] += 1;
    }
    const whoBy = getWhoNeedsCountsByClass(Object.keys(map));
    for (const k of Object.keys(map)) map[k] += whoBy[k] || 0;
    return map;
  }, [p.setup.classes, p.openSuggestions]);

  // loopTick keeps remember / resolve / all-clear voice in sync.
  void loopTick;
  const loopSoftest = useMemo(() => getLoopSoftest(), [loopTick]);
  const allClear = typeof window !== "undefined" ? isLoopAllClear() : false;
  const waiting = whoNeedsCount > 0;
  const softOpen =
    !allClear &&
    loopSoftest?.softest &&
    loopSoftest.urgency !== "cooled" &&
    !isStandardResolved(loopSoftest.softest.code);

  const checkInsDoor = (() => {
    const code = loopSoftest?.softest?.code || null;
    if (code) return checkInsHrefForStandard(code, { periodId: selectedClass });
    return checkInsHrefForPeriod(selectedClass);
  })();

  const classStory = allClear
    ? getAllClearMorningLine({ className: cls?.name })
    : loopSoftest?.samStory ||
      (loopSoftest?.whoLine
        ? `${loopSoftest.readiness} · ${loopSoftest.whoLine} on TEKS ${loopSoftest.softest.code}.`
        : `Steady day for ${cls?.name || "this class"}.`);

  const softDoors =
    softOpen && loopSoftest?.softest
      ? softClusterDoors(loopSoftest.softest.softCluster || [], {
          standard: loopSoftest.softest.code,
          periodId: selectedClass,
        })
      : [];

  const reteachOnToday =
    softOpen && loopSoftest?.softest?.code
      ? hasReteachOnToday(loopSoftest.softest.code) ||
        focusBlocks.some(
          (b) =>
            b &&
            (b.fromReports || b.source === "reports") &&
            String(b.standard || "").toUpperCase() ===
              String(loopSoftest.softest.code).toUpperCase()
        )
      : focusBlocks.some((b) => b && (b.fromReports || b.source === "reports" || b.kind === "reteach"));

  const softReportHref = loopSoftest?.href || REPORTS_HREF;
  const softReportLabel = loopSoftest?.softest?.code
    ? `${loopSoftest.softest.code} report`
    : "Reports";

  const gradingDoor =
    softOpen && loopSoftest?.softest?.code
      ? gradingInboxHref({ standard: loopSoftest.softest.code })
      : GRADING_INBOX_HREF;

  // One-time provenance helper (quiet; localStorage dismiss)
  const [showProvenanceHelper, setShowProvenanceHelper] = useState(false);
  useEffect(() => {
    const hasMinted = anyMintedProvenance(items);
    setShowProvenanceHelper(hasMinted && !isProvenanceHelperDismissed());
  }, [items]);

  function onDismissProvenanceHelper() {
    dismissProvenanceHelper();
    setShowProvenanceHelper(false);
  }

  function openProject(act) {
    router.push(PROJECT_HREF(act.id));
  }
  function openLessonPlan(act) {
    router.push(LESSON_PLAN_HREF(act.id));
  }
  function openLiveTeach(act) {
    router.push(LIVE_TEACH_HREF(act.id));
  }

  const btnBase = {
    borderRadius: 999,
    padding: "9px 14px",
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    cursor: "pointer",
    border: "none",
  };
  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
  };
  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
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

  const needsScanEmpty = !softOpen && focusBlocks.length === 0;

  return (
    <StationShell>
      <style>{`
        .df-wrap{max-width:960px;margin:0 auto;width:100%}
        .df-story{
          margin-top:10px;padding:10px 12px;border-radius:12px;
          background:rgba(243,238,255,.45);border:1px solid ${LINE};
        }
        .df-actions{
          margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;
        }
        .df-needs{
          display:grid;gap:10px;margin-top:10px;
        }
        .df-agenda{
          display:grid;gap:10px;margin-top:10px;
        }
        .df-filters{
          display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px;
        }
      `}</style>
      <TeacherSubnav active="day" gradeCount={gradePending} checkInsCount={whoNeedsCount} />
      <div className="df-wrap">
        <Glass style={{ padding: "16px 16px 14px" }}>
          {/* Title · setup — short hierarchy */}
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
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: INK,
                  letterSpacing: -0.2,
                  lineHeight: 1.25,
                }}
              >
                Daily Focus
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
                {DAY_NAMES[day]} · {DATES[day]}
                {cls?.name ? ` · ${cls.name}` : ""}
                {" · "}
                {p.published ? "published" : "not published yet"}
                {" · "}
                {minutes} min
              </p>
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
                {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <HandsOffChip level={p.level} onOpenPreview={() => p.setShowSundayPreview(true)} />
              <WeeksRunEntry onOpen={() => p.setShowWeeksRun(true)} routineCount={p.enabledRoutineCount} />
            </div>
          </div>

          {/* Compact class / day story — not a hero essay */}
          <section className="df-story" aria-label="Class story">
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

          {/* One clear next-move row — no stacked CTA chrome */}
          <div className="df-actions" aria-label="Next move">
            {waiting ? (
              <Link
                href={checkInsDoor}
                style={{ ...btnBase, ...amberPrimary }}
                title="Open Check-ins — live waiting needs you"
              >
                {checkInsCtaLabel(whoNeedsCount)} →
              </Link>
            ) : softOpen ? (
              <Link
                href={checkInsDoor}
                style={{ ...btnBase, ...softPrimary }}
                title={
                  loopSoftest?.whoLine
                    ? `Sit Check-ins · ${loopSoftest.whoLine}`
                    : "Sit Check-ins with soft cluster"
                }
              >
                {loopSoftest?.whoLine
                  ? `Sit · ${loopSoftest.whoLine.split(" · ").slice(0, 2).join(" · ")}`
                  : checkInsCtaLabel(whoNeedsCount)}{" "}
                →
              </Link>
            ) : (
              <Link
                href={checkInsDoor}
                style={{ ...btnBase, ...calmSecondary }}
                title="Open Check-ins — clear right now"
              >
                {checkInsCtaLabel(whoNeedsCount)} →
              </Link>
            )}

            {reteachOnToday ? (
              <a
                href="#df-needs"
                style={{ ...btnBase, ...calmSecondary }}
                title="Reteach / small group already on today's Focus"
              >
                Reteach on today
              </a>
            ) : null}

            {!waiting && softOpen ? (
              <Link
                href={softReportHref}
                style={{ ...btnBase, ...quietTertiary }}
                title={`Softest report · TEKS ${loopSoftest?.softest?.code || ""}`}
              >
                {softReportLabel} →
              </Link>
            ) : null}

            {gradePending > 0 ? (
              <Link
                href={gradingDoor}
                style={{ ...btnBase, ...quietTertiary }}
                title="Open Grading inbox"
              >
                Grading · {gradePending}
              </Link>
            ) : (
              <Link
                href={gradingDoor}
                style={{ ...btnBase, ...quietTertiary }}
                title="Open Grading inbox"
              >
                Grading
              </Link>
            )}

            {!softOpen ? (
              <Link
                href={REPORTS_HREF}
                style={{ ...btnBase, ...quietTertiary }}
                title="Open Reports glance"
              >
                Reports
              </Link>
            ) : null}
          </div>

          <ProvenanceHelperLine
            show={showProvenanceHelper}
            onDismiss={onDismissProvenanceHelper}
            text={PROVENANCE_HELPER_TEXT}
          />

          {p.multiClass && (
            <div style={{ marginTop: 12 }}>
              <RoomCards
                classes={p.setup.classes}
                selectedKey={selectedClass}
                onSelect={p.setClassFilter}
                setup={p.setup}
                needsByClass={needsByClass}
              />
            </div>
          )}

          <div className="df-filters" aria-label="Day and subject filters">
            {p.multiSubject && (
              <Pill active={p.subjectFilter === "all"} onClick={() => p.setSubjectFilter("all")}>
                All subjects
              </Pill>
            )}
            {p.setup.subjects.map((key) => (
              <Pill
                key={key}
                active={p.subjectFilter === key || (!p.multiSubject && p.subjectFilter === "all")}
                onClick={() => p.setSubjectFilter(key)}
                color={SUBJECTS[key].color}
              >
                {SUBJECTS[key].name}
              </Pill>
            ))}
            <span style={{ width: 1, height: 22, background: LINE, margin: "0 2px" }} aria-hidden />
            {DAYS.map((label, i) => {
              const on = i === day;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => router.push("/v2/teacher/day?d=" + i)}
                  style={{
                    borderRadius: 999,
                    padding: "6px 11px",
                    border: "1px solid " + (on ? LAVENDER : LINE),
                    background: on ? LAVENDER : "rgba(255,255,255,.9)",
                    color: on ? "#fff" : INK,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {label} {DATES[i].split(" ")[1]}
                  {i === 2 ? " · TODAY" : ""}
                </button>
              );
            })}
          </div>

          {/* Main scan — what needs her + who, without a click */}
          <section id="df-needs" aria-label="Needs you" style={{ marginTop: 16 }}>
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
              Needs you · who
            </div>
            <div className="df-needs">
              {softOpen && loopSoftest?.softest ? (
                <article
                  style={{
                    display: "flex",
                    gap: 0,
                    alignItems: "stretch",
                    background: "rgba(255,248,240,.92)",
                    border: `1px solid ${GLANCE.needsYou.border}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    minHeight: 88,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 5,
                      flexShrink: 0,
                      background: SUBJECTS[loopSoftest.softest.subject]?.color || LAVENDER,
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
                          Soft cluster · {loopSoftest.softest.subjectName || SUBJECTS[loopSoftest.softest.subject]?.name} ·{" "}
                          {loopSoftest.softest.code}
                        </div>
                        <div
                          style={{
                            marginTop: 3,
                            fontWeight: 700,
                            color: INK,
                            fontSize: 14,
                            lineHeight: 1.3,
                          }}
                        >
                          {loopSoftest.softest.plain || "Needs a look"}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          ...glanceChipStyle(
                            loopSoftest.readiness === "Mostly clear" ? "ready" : "needsYou"
                          ),
                          borderRadius: 999,
                          padding: "4px 8px",
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {loopSoftest.readiness || "Needs a look"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: MUTED,
                        lineHeight: 1.35,
                      }}
                    >
                      {softDoors.length ? (
                        <>
                          {softDoors.map((d, i) => (
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
                      ) : (
                        loopSoftest.whoLine || "Soft cluster"
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        alignItems: "center",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Link
                        href={softReportHref}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: LAVENDER,
                          textDecoration: "none",
                        }}
                        title="Depth · softest report"
                      >
                        Open report →
                      </Link>
                      <Link
                        href={familyNoteSoftStoryHref({
                          standard: loopSoftest?.softest?.code || "5.6B",
                          periodId: selectedClass,
                          subject: loopSoftest?.softest?.subject || "science",
                        })}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                          textDecoration: "none",
                        }}
                        title="Family note · soft story · already knows who + why"
                      >
                        Family note →
                      </Link>
                      <Link
                        href={softStoryStudentDoorHref({
                          standard: loopSoftest?.softest?.code || "5.6B",
                          names: loopSoftest?.softest?.softCluster,
                        })}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                          textDecoration: "none",
                        }}
                        title="Student My Day · soft cast · TEKS context"
                      >
                        My Day →
                      </Link>
                    </div>
                  </div>
                </article>
              ) : null}

              {focusBlocks.length > 0 && (
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: GLANCE.needsYou.fg,
                      marginBottom: 8,
                      fontSize: 11,
                      letterSpacing: 0.35,
                    }}
                  >
                    {focusBlocksSectionLabel(focusBlocks, day, {
                      todayDay: FOCUS_TODAY_DAY,
                      tomorrowDay: FOCUS_TOMORROW_DAY,
                    })}
                  </div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {focusBlocks.map((block) => {
                      const blockDoors = softClusterDoors(block.studentNames || [], {
                        standard: block.standard || undefined,
                        periodId: selectedClass,
                      });
                      const covered =
                        block.standard && isStandardResolved(block.standard);
                      return (
                        <div
                          key={block.id}
                          style={{
                            ...glanceCardStyle(covered ? "ready" : "needsYou"),
                            borderRadius: 14,
                            padding: "10px 12px",
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                            boxShadow: covered
                              ? "none"
                              : "0 4px 14px rgba(166,124,61,.08)",
                          }}
                        >
                          <div
                            style={{
                              ...glanceChipStyle(covered ? "ready" : "needsYou"),
                              borderRadius: 999,
                              padding: "5px 9px",
                              fontSize: 10,
                              fontWeight: 800,
                              flexShrink: 0,
                              letterSpacing: 0.3,
                            }}
                          >
                            {focusBlockKindLabel(block.kind).toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontWeight: 800, color: INK, fontSize: 15 }}>
                              {block.title}
                            </div>
                            <div style={{ fontSize: 12, color: MUTED, marginTop: 2, lineHeight: 1.4 }}>
                              {blockDoors.length ? (
                                <>
                                  {blockDoors.map((d, i) => (
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
                              ) : (
                                focusBlockNamesLine(block)
                              )}
                              {block.standard ? ` · ${block.standard}` : ""}
                              {" · "}
                              {focusBlockProvenanceLine(block)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {needsScanEmpty ? (
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: `1px solid ${LINE}`,
                    background: "rgba(255,255,255,.9)",
                    color: MUTED,
                    fontSize: 13,
                    lineHeight: 1.4,
                  }}
                >
                  {allClear
                    ? "Nothing soft waiting — covered for now. Teach spine below when you are ready."
                    : `Nothing waiting for ${cls?.name || "this class"} right now.`}
                </div>
              ) : null}
            </div>
          </section>

          {/* Secondary — teach spine (depth via click / Teach live) */}
          <section id="today-teach" aria-label="Today's agenda" style={{ marginTop: 18 }}>
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
              Today · teach
            </div>
            <div className="df-agenda">
              {agenda.length === 0 && (
                <div style={{ color: MUTED, fontSize: 14, padding: "8px 2px" }}>
                  Nothing on the agenda for this room today.
                </div>
              )}
              {agenda.map((act, idx) => {
                const sub = SUBJECTS[act.subject];
                const label = idx < 3 ? AGENDA_LABELS[idx] : "Later";
                const isNow = idx === 0;
                return (
                  <div
                    key={act.id}
                    style={{
                      display: "flex",
                      gap: 0,
                      alignItems: "stretch",
                      background: isNow ? SOFT_LAV : "rgba(255,255,255,.92)",
                      border: `1px solid ${isNow ? "#D9CFFF" : LINE}`,
                      borderRadius: 14,
                      overflow: "hidden",
                      boxShadow: isNow ? "0 6px 18px rgba(139,108,255,.10)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isNow ? "rgba(139,108,255,.14)" : "rgba(247,244,255,.65)",
                        fontWeight: 800,
                        fontSize: 11,
                        color: isNow ? LAVENDER : MUTED,
                        letterSpacing: 0.3,
                      }}
                    >
                      {label}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenId(act.id)}
                      style={{
                        flex: 1,
                        display: "flex",
                        gap: 10,
                        textAlign: "left",
                        background: "transparent",
                        border: "none",
                        padding: "11px 10px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          alignSelf: "stretch",
                          background: sub.color,
                          borderRadius: 4,
                          opacity: 0.85,
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: MUTED,
                            textTransform: "uppercase",
                            letterSpacing: 0.2,
                          }}
                        >
                          {sub.name} · {KINDS[act.kind]?.short || act.kind}
                          {act.auto ? " · auto" : ""}
                        </div>
                        <div style={{ fontWeight: 700, color: INK, fontSize: isNow ? 16 : 14 }}>
                          {act.title}
                        </div>
                        <div style={{ fontSize: 12, color: MUTED }}>
                          {act.minutes} min · {act.who}
                          {(() => {
                            const prov = plannerProvenanceLabel(act);
                            return prov ? ` · ${prov}` : "";
                          })()}
                        </div>
                      </div>
                    </button>
                    {act.kind === "teach" && (
                      <div
                        style={{
                          alignSelf: "center",
                          marginRight: 10,
                          display: "flex",
                          gap: 6,
                          flexShrink: 0,
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLiveTeach(act);
                          }}
                          title="Open teach live present mode"
                          style={{
                            border: isNow ? "none" : `1px solid ${GLANCE.teach.border}`,
                            background: isNow ? GLANCE.teach.fg : GLANCE.teach.bg,
                            color: isNow ? "#fff" : GLANCE.teach.fg,
                            borderRadius: 999,
                            padding: "7px 12px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Teach live
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quiet add / plan — not a hunting rail */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
              paddingTop: 10,
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <AddActivityButton onClick={() => p.openAddActivity({ day })} />
            <button
              type="button"
              onClick={() => router.push("/v2/teacher")}
              style={{
                background: "#fff",
                color: MUTED,
                border: "1px solid " + LINE,
                borderRadius: 999,
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              This Week · plan
            </button>
            <button
              type="button"
              onClick={() => p.setShowSundayPreview(true)}
              style={{
                border: `1px solid ${LINE}`,
                background: "rgba(255,255,255,.9)",
                color: MUTED,
                borderRadius: 999,
                padding: "8px 12px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sunday preview
            </button>
          </div>
        </Glass>

        {opened && (
          <Glass style={{ marginTop: 14, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: SUBJECTS[opened.subject].color,
                    textTransform: "uppercase",
                  }}
                >
                  {SUBJECTS[opened.subject].name} · {KINDS[opened.kind]?.label || opened.kind}
                  {opened.auto ? " · auto" : ""}
                </div>
                <h2 style={{ margin: "4px 0", fontFamily: "'Poppins', sans-serif", color: INK }}>
                  {opened.title}
                </h2>
                <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>
                  {opened.minutes} min · {opened.who} ·{" "}
                  {PRODUCT_INFO[opened.product]?.about || opened.product}
                </p>
                <p style={{ margin: "8px 0 0", color: INK, fontSize: 14 }}>
                  This is the live assignment for {cls?.name || "this class"}.
                </p>
                {opened.kind === "teach" && (
                  <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => openLiveTeach(opened)}
                      style={{
                        background: GLANCE.teach.fg,
                        color: "#fff",
                        border: "none",
                        borderRadius: 999,
                        padding: "8px 16px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Teach live
                    </button>
                    <button
                      type="button"
                      onClick={() => openLessonPlan(opened)}
                      style={{
                        background: GLANCE.teach.bg,
                        color: GLANCE.teach.fg,
                        border: `1px solid ${GLANCE.teach.border}`,
                        borderRadius: 999,
                        padding: "8px 16px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Lesson plan
                    </button>
                    <button
                      type="button"
                      onClick={() => openProject(opened)}
                      style={{
                        background: GLANCE.project.fg,
                        color: "#fff",
                        border: "none",
                        borderRadius: 999,
                        padding: "8px 16px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Project
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: MUTED,
                  fontWeight: 700,
                }}
              >
                Close
              </button>
            </div>
          </Glass>
        )}
      </div>

      <SundayPreviewModal
        open={p.showSundayPreview}
        onClose={() => p.setShowSundayPreview(false)}
        rows={p.outboundPreview}
        weekLabel={DEMO_WEEK.label}
        dialLevel={p.level}
        onChangeDay={(d) => {
          p.setShowSundayPreview(false);
          router.push(`/v2/teacher/day?d=${d}`);
        }}
        onAcknowledge={p.acknowledgeSundayPreview}
        onApplyToWeek={() => {
          const blocks = p.applySundayToThisWeek();
          writeSundayPendingUndo({
            count: Array.isArray(blocks) ? blocks.length : 0,
            at: Date.now(),
          });
          router.push("/v2/teacher");
        }}
        applied={p.sundayApplied}
        loopGlance={{
          story: classStory,
          softOpen,
          waiting,
          whoNeedsCount,
          softest: loopSoftest?.softest
            ? {
                code: loopSoftest.softest.code,
                plain: loopSoftest.softest.plain,
                subject: loopSoftest.softest.subject,
                subjectName: loopSoftest.softest.subjectName,
                softCluster: loopSoftest.softest.softCluster,
              }
            : null,
          readiness: loopSoftest?.readiness,
          whoLine: loopSoftest?.whoLine,
          softDoors,
          checkInsHref: checkInsDoor,
          checkInsLabel: waiting
            ? checkInsCtaLabel(whoNeedsCount)
            : softOpen && loopSoftest?.whoLine
              ? `Sit · ${loopSoftest.whoLine.split(" · ").slice(0, 2).join(" · ")}`
              : checkInsCtaLabel(whoNeedsCount),
          dayHref: DAY_HREF,
          weekHref: "/v2/teacher",
          reportHref: softOpen ? softReportHref : REPORTS_HREF,
          reportLabel: softReportLabel,
          familyNoteHref: softOpen
            ? familyNoteSoftStoryHref({
                standard: loopSoftest?.softest?.code || "5.6B",
                periodId: selectedClass,
                subject: loopSoftest?.softest?.subject || "science",
              })
            : null,
          gradingHref: gradingDoor,
          gradingLabel: gradePending > 0 ? `Grading · ${gradePending}` : "Grading",
        }}
      />
      <HowMyWeeksRunDrawer
        open={p.showWeeksRun}
        onClose={() => p.setShowWeeksRun(false)}
        routines={p.routines}
        subjects={p.setup.subjects}
        dialLevel={p.level}
        onUpdateRoutine={p.updateRoutine}
        onAddRoutine={p.addRoutine}
        onToggleRoutine={p.toggleRoutine}
        onAcceptOffer={p.acceptRoutineOffer}
        onDismissOffer={p.dismissRoutineOffer}
        dismissedOffers={p.dismissedOffers}
        onOpenSundayPreview={() => p.setShowSundayPreview(true)}
        onApplyToWeek={p.applySundayToThisWeek}
        sundayApplied={p.sundayApplied}
        onOpenHandsOff={() => {
          p.setShowWeeksRun(false);
          router.push("/v2/teacher");
        }}
      />
      <AddActivityModal
        open={p.showAddActivity}
        onClose={() => p.setShowAddActivity(false)}
        onAdd={(payload) => p.addActivity({ ...payload, day: payload.day ?? day })}
        subjects={p.setup.subjects}
        classes={p.setup.classes}
        multiClass={p.multiClass}
        defaults={p.addActivityDefaults || { day }}
      />
      <Toast toast={p.toast} />
    </StationShell>
  );
}
