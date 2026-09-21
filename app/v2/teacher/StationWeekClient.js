"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DATES, DEMO_WEEK, HANDS_OFF_LEVELS } from "../../../lib/v2/demoWeek";
import { GRADING_INBOX_HREF, GRADING_INBOX_KEY, GRADING_STORAGE_KEY, getPendingCount, loadConfirmedIds } from "../../../lib/v2/demoGrading";
import {
  getWhoNeedsCountsByClass,
  getWhoNeedsMeCount,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../lib/v2/demoWhoNeedsMe";
import { LIVE_TEACH_HREF } from "../../../lib/v2/demoLiveTeach";
import {
  plannerProvenanceLabel,
  anyMintedProvenance,
  isProvenanceHelperDismissed,
  dismissProvenanceHelper,
  PROVENANCE_HELPER_TEXT,
} from "../../../lib/v2/demoLibrary";
import {
  getAllClearMorningLine,
  getLoopSoftest,
  REPORTS_HREF,
  DAY_HREF,
  checkInsHrefForPeriod,
  checkInsHrefForStandard,
  checkInsCtaLabel,
  softClusterDoors,
  isLoopAllClear,
  isStandardResolved,
  LOOP_REMEMBER_KEY,
  familyNoteSoftStoryHref,
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
  HandsOffDial,
  GLANCE,
  glanceChipStyle,
  SundayPreviewModal,
  SundayPreviewBanner,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  MINT,
} from "../../../components/v2/StationShell";
import { HowMyWeeksRunDrawer, WeeksRunEntry } from "../../../components/v2/HowMyWeeksRun";
import { AddActivityModal, AddActivityButton } from "../../../components/v2/AddActivityModal";
import { Toast } from "../../../components/v2/weekKit";

/**
 * CI2.0 This Week glance — INTUITIVE · fewer clicks.
 * Same calm loop voice as Daily Focus / Check-ins / Reports / Family note.
 * Top: quiet week/class story · who · next moves into existing doors.
 * Day columns + Publish / Sunday / dial stay secondary (plan depth).
 * Amber only when live Check-ins waiting > 0. No Demo shout.
 */
export default function StationWeekClient() {
  const router = useRouter();
  const p = usePlanner();
  const [gradePending, setGradePending] = useState(DEMO_WEEK.gradingCount);
  const [whoNeedsCount, setWhoNeedsCount] = useState(0);
  const [loopTick, setLoopTick] = useState(0);
  const [showProvenanceHelper, setShowProvenanceHelper] = useState(false);
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
      setLoopTick((t) => t + 1);
    };
    refresh();
    const onStorage = (e) => {
      if (
        !e.key ||
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === LOOP_REMEMBER_KEY ||
        e.key === "ci2.grading.confirmedIds" ||
        e.key === "ci2.teacher.classFilter"
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-loop-remember-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-loop-remember-updated", refresh);
    };
  }, [selectedClass]);

  useEffect(() => {
    const hasMinted = anyMintedProvenance(p.visible || p.activities || []);
    setShowProvenanceHelper(hasMinted && !isProvenanceHelperDismissed());
  }, [p.visible, p.activities]);

  function onDismissProvenanceHelper() {
    dismissProvenanceHelper();
    setShowProvenanceHelper(false);
  }

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
        : `Steady week for ${cls?.name || "this class"}.`);

  const softDoors =
    softOpen && loopSoftest?.softest
      ? softClusterDoors(loopSoftest.softest.softCluster || [], {
          standard: loopSoftest.softest.code,
          periodId: selectedClass,
        })
      : [];

  const softReportHref = loopSoftest?.href || REPORTS_HREF;
  const softReportLabel = loopSoftest?.softest?.code
    ? `${loopSoftest.softest.code} report`
    : "Reports";

  const dialSubjectLabel =
    p.subjectFilter === "all"
      ? p.multiSubject
        ? "All subjects here"
        : SUBJECTS[p.dialSubject]?.name || "Subject"
      : SUBJECTS[p.subjectFilter]?.name || "Subject";

  function onDrop(day, e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    p.setDragOverDay(null);
    if (id) p.moveTo(id, day);
  }

  function onHandsOff(key) {
    p.setLevel(key);
  }

  const levelMeta = HANDS_OFF_LEVELS.find((l) => l.key === p.level);

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
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

  return (
    <StationShell>
      <style>{`
        .tw-wrap{max-width:1100px;margin:0 auto;width:100%}
        .tw-story{
          margin-top:10px;padding:10px 12px;border-radius:12px;
          background:rgba(243,238,255,.45);border:1px solid ${LINE};
        }
        .tw-actions{
          margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;
        }
        .tw-needs{display:grid;gap:10px;margin-top:10px}
        .tw-plan{
          margin-top:14px;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;
          justify-content:space-between;
        }
        @media print {
          body * { visibility: hidden !important; }
          .ci2-week-print, .ci2-week-print * { visibility: visible !important; }
          .ci2-week-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            background: #fff !important;
            box-shadow: none !important;
            padding: 12px 16px !important;
          }
          .ci2-no-print { display: none !important; }
        }
      `}</style>
      <div className="ci2-no-print">
        <TeacherSubnav active="week" checkInsCount={whoNeedsCount} />
      </div>
      <div className="tw-wrap">
      <Glass>
        <div className="ci2-week-print">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
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
              This Week
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
              {DEMO_WEEK.label}
              {cls?.name ? ` · ${cls.name}` : ""}
              {" · Plan & publish · teach from Daily Focus"}
            </p>
            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
              {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
            </div>
          </div>
        </div>

        {/* Compact week / class story — same loop voice as Focus */}
        <section className="tw-story ci2-no-print" aria-label="Week story">
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

        {/* One clear next-move row — routes into existing loop doors */}
        <div className="tw-actions ci2-no-print" aria-label="Next move">
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

          <Link
            href={DAY_HREF}
            style={{ ...btnBase, ...(softOpen || waiting ? quietTertiary : softPrimary) }}
            title="Open Daily Focus — teach today"
          >
            Daily Focus →
          </Link>

          {!waiting && softOpen ? (
            <Link
              href={softReportHref}
              style={{ ...btnBase, ...quietTertiary }}
              title={`Softest report · TEKS ${loopSoftest?.softest?.code || ""}`}
            >
              {softReportLabel} →
            </Link>
          ) : null}

          {!waiting && softOpen ? (
            <Link
              href={familyNoteSoftStoryHref({
                standard: loopSoftest?.softest?.code || "5.6B",
                periodId: selectedClass,
                subject: loopSoftest?.softest?.subject || "science",
              })}
              style={{ ...btnBase, ...quietTertiary }}
              title="Family note · soft story · already knows who + why"
            >
              Family note
            </Link>
          ) : null}

          {gradePending > 0 ? (
            <Link
              href={GRADING_INBOX_HREF}
              style={{ ...btnBase, ...quietTertiary }}
              title="Open Grading inbox"
            >
              Grading · {gradePending}
            </Link>
          ) : (
            <Link
              href={GRADING_INBOX_HREF}
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

        {/* Soft cluster — who visible without hunting */}
        <section className="tw-needs ci2-no-print" aria-label="Needs you · who">
          {softOpen && loopSoftest?.softest ? (
            <>
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
                        Soft cluster ·{" "}
                        {loopSoftest.softest.subjectName ||
                          SUBJECTS[loopSoftest.softest.subject]?.name}{" "}
                        · {loopSoftest.softest.code}
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
                      href={DAY_HREF}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: MUTED,
                        textDecoration: "none",
                      }}
                      title="Teach from Daily Focus"
                    >
                      Daily Focus →
                    </Link>
                  </div>
                </div>
              </article>
            </>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 600,
                color: MUTED,
                paddingLeft: 2,
              }}
            >
              {allClear
                ? "Covered for now — soft stories landed. Plan the week when you are ready."
                : "Nothing soft waiting on the glance — use the board below to plan."}
            </p>
          )}
        </section>

        <ProvenanceHelperLine
          show={showProvenanceHelper}
          onDismiss={onDismissProvenanceHelper}
          text={PROVENANCE_HELPER_TEXT}
        />

        {p.sundayApplied && (
          <div
            className="ci2-no-print"
            style={{
              margin: "12px 0 0",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: MINT,
              border: `1px solid ${LINE}`,
              borderRadius: 999,
              padding: "6px 8px 6px 14px",
              fontSize: 13,
              fontWeight: 700,
              color: INK,
            }}
          >
            <span>From Sunday · on This Week</span>
            <button
              type="button"
              onClick={() => p.undoSundayToThisWeek()}
              title="Remove Sunday bridge tiles"
              style={{
                border: `1px solid ${LINE}`,
                background: "rgba(255,255,255,.9)",
                color: INK,
                borderRadius: 999,
                padding: "4px 12px",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Undo
            </button>
          </div>
        )}
        {p.needsSundayPreview && (
          <div className="ci2-no-print" style={{ marginTop: 14 }}>
            <SundayPreviewBanner onOpen={() => p.setShowSundayPreview(true)} acked={p.sundayAcked} onApplyToWeek={p.applySundayToThisWeek} applied={p.sundayApplied} />
          </div>
        )}

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

        {/* Plan tools — secondary to loop glance */}
        <div className="tw-plan ci2-no-print" aria-label="Plan tools">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
            <HandsOffDial level={p.level} onChange={onHandsOff} subjectLabel={dialSubjectLabel} />
            <WeeksRunEntry onOpen={() => p.setShowWeeksRun(true)} routineCount={p.enabledRoutineCount} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={handlePrint}
              title="Print a glance-first This Week sheet"
              style={{
                background: "#fff",
                color: INK,
                border: `1px solid ${LINE}`,
                borderRadius: 999,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Print
            </button>
            <AddActivityButton onClick={() => p.openAddActivity({ day: 2 })} />
            <button
              type="button"
              onClick={() => p.setShowSundayPreview(true)}
              style={{
                background: "#fff",
                color: LAVENDER,
                border: `1px solid ${LAVENDER}`,
                borderRadius: 999,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sunday preview
            </button>
            <button
              type="button"
              onClick={p.publish}
              style={{
                background: LAVENDER,
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "12px 22px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {p.published ? "Published" : "Publish week"}
            </button>
          </div>
        </div>

        <div
          className="ci2-no-print"
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
          Week board · plan
        </div>

        {p.openRoutineOffers?.[0] && (
          <div
            style={{
              margin: "0 0 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              background: p.openRoutineOffers[0].type === "hands_off_bump" ? MINT : "#FFF8EE",
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "10px 14px",
            }}
          >
            <div style={{ flex: 1, minWidth: 200, color: INK, fontSize: 14, lineHeight: 1.35 }}>
              <strong>SAM:</strong> {p.openRoutineOffers[0].text}
            </div>
            <button
              type="button"
              onClick={() => p.acceptRoutineOffer(p.openRoutineOffers[0])}
              style={{
                border: "none",
                background: LAVENDER,
                color: "#fff",
                borderRadius: 999,
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {p.openRoutineOffers[0].acceptLabel}
            </button>
            <button
              type="button"
              onClick={() => p.dismissRoutineOffer(p.openRoutineOffers[0].id)}
              style={{
                border: `1px solid ${LINE}`,
                background: "#fff",
                color: MUTED,
                borderRadius: 999,
                padding: "7px 12px",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Not now
            </button>
            <button
              type="button"
              onClick={() => p.setShowWeeksRun(true)}
              style={{
                border: "none",
                background: "transparent",
                color: LAVENDER,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "underline",
              }}
            >
              How my weeks run
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0 10px", alignItems: "center" }}>
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
              {p.levelsBySubject?.[key] === "run_for_me" ? " · auto" : ""}
            </Pill>
          ))}
        </div>

        {p.level === "run_for_me" && (
          <div
            style={{
              marginBottom: 12,
              fontSize: 13,
              color: "#2FA36B",
              background: MINT,
              borderRadius: 12,
              padding: "8px 12px",
              fontWeight: 600,
            }}
          >
            Run it is on for {dialSubjectLabel} — routines fill in automatically (auto tiles). Sunday preview is your safety net.
          </div>
        )}
        {p.level === "i_plan" && (
          <div
            style={{
              marginBottom: 12,
              fontSize: 13,
              color: MUTED,
              background: "#FBFaff",
              border: `1px dashed ${LINE}`,
              borderRadius: 12,
              padding: "8px 12px",
              fontWeight: 600,
            }}
          >
            I&apos;ll plan it — lean week on purpose. Use SAM suggestions to build; Publish when you&apos;re ready.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 10 }}>
          {DAYS.map((d, i) => {
            const items = p.visible.filter((a) => a.day === i);
            const isToday = i === 2;
            const over = p.dragOverDay === i;
            const noSchool = (DEMO_WEEK.noSchoolDays || []).includes(i);
            return (
              <div
                key={d}
                onDragOver={(e) => {
                  e.preventDefault();
                  p.setDragOverDay(i);
                }}
                onDragLeave={() => p.setDragOverDay(null)}
                onDrop={(e) => onDrop(i, e)}
                style={{
                  borderRadius: 18,
                  border: `2px solid ${over ? LAVENDER : isToday ? "#D9CFFF" : LINE}`,
                  background: over ? "rgba(139,108,255,.08)" : noSchool ? "#F7F4FF" : "#FBFaff",
                  padding: 8,
                  minHeight: 280,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 4, padding: "6px 2px 8px" }}>
                  <button
                    type="button"
                    onClick={() => router.push(`/v2/teacher/day?d=${i}`)}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      padding: "0 4px",
                    }}
                  >
                    <div style={{ fontWeight: 800, color: INK, fontSize: 16 }}>
                      {d} {DATES[i].split(" ")[1]}
                      {isToday && <span style={{ marginLeft: 6, color: LAVENDER, fontSize: 11 }}>TODAY</span>}
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>
                      {noSchool ? "No school (demo)" : "Daily Focus →"}
                    </div>
                  </button>
                  <AddActivityButton
                    compact
                    label="+"
                    onClick={() => p.openAddActivity({ day: i, subject: p.subjectFilter !== "all" ? p.subjectFilter : undefined })}
                  />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {items.map((act) => {
                    const sub = SUBJECTS[act.subject];
                    return (
                      <div
                        key={act.id}
                        draggable={!act.auto}
                        onDragStart={(e) => {
                          if (act.auto) return;
                          e.dataTransfer.setData("text/plain", act.id);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                          background: act.auto ? MINT : "#fff",
                          border: `1px solid ${LINE}`,
                          borderRadius: 12,
                          padding: "8px 8px 8px 0",
                          cursor: act.auto ? "pointer" : "grab",
                          boxShadow: act.auto ? "0 0 0 1px rgba(47,163,107,.15)" : "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => router.push(`/v2/teacher/day?d=${i}&open=${act.id}`)}
                          style={{
                            flex: 1,
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "inherit",
                            fontFamily: "inherit",
                            textAlign: "left",
                            minWidth: 0,
                          }}
                        >
                          <span style={{ width: 6, alignSelf: "stretch", background: sub.color, borderRadius: "12px 0 0 12px" }} />
                          <span style={{ color: MUTED, letterSpacing: 1, fontSize: 12, paddingTop: 4 }}>{act.auto ? "⟳" : "⋮⋮"}</span>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>
                              {sub.name}
                              {act.kind === "teach" ? " · Teach" : ""}
                              {act.auto ? " · auto" : ""}
                              {(() => {
                                const prov = plannerProvenanceLabel(act);
                                return prov ? ` · ${prov}` : "";
                              })()}
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 650, color: INK, lineHeight: 1.25 }}>{act.title}</div>
                          </div>
                        </button>
                        <div className="ci2-no-print" style={{ alignSelf: "center", marginRight: 4, display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, alignItems: "flex-end" }}>
                          <span
                            title={act.product || "Crystal Instruction"}
                            style={{
                              border: `1px dashed ${LINE}`,
                              background: "rgba(255,255,255,.88)",
                              color: MUTED,
                              borderRadius: 999,
                              padding: "3px 8px",
                              fontSize: 10,
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                              maxWidth: 110,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {act.product || "ClearLessons"}
                          </span>
                          {act.kind === "teach" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(LIVE_TEACH_HREF(act.id));
                              }}
                              title="Teach live"
                              style={{
                                border: `1px solid ${LINE}`,
                                background: "#fff",
                                color: GLANCE.teach.fg,
                                borderRadius: 999,
                                padding: "3px 8px",
                                fontSize: 10,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Teach
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ marginTop: 4 }}>
                    <AddActivityButton
                      compact
                      label="+ Add"
                      onClick={() => p.openAddActivity({ day: i, subject: p.subjectFilter !== "all" ? p.subjectFilter : undefined })}
                    />
                  </div>
                  {items.length === 0 && (
                    <div style={{ padding: "6px 4px", display: "grid", gap: 6 }}>
                      <div style={{ color: MUTED, fontSize: 11, lineHeight: 1.35 }}>
                        {p.level === "i_plan" ? "Open for your plan — light product placeholders:" : "Nothing planned — light product placeholders:"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {["ClearLessons", "ClearSheets", "ClearCenters", "ClassCade Showdown"].map((name) => (
                          <span
                            key={name}
                            style={{
                              border: `1px dashed ${LINE}`,
                              background: "rgba(255,255,255,.75)",
                              color: MUTED,
                              borderRadius: 999,
                              padding: "3px 7px",
                              fontSize: 10,
                              fontWeight: 650,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ margin: "14px 0 0", color: MUTED, fontSize: 13 }}>
          Drag a tile to move it for {cls?.name || "this class"} only. Dial: {levelMeta?.short || p.level}. Daily Focus is your teach-today home.
        </p>
        </div>
      </Glass>
      </div>
      <div className="ci2-no-print">
      <SundayPreviewModal
        open={p.showSundayPreview}
        onClose={() => p.setShowSundayPreview(false)}
        rows={p.outboundPreview}
        weekLabel={DEMO_WEEK.label}
        dialLevel={p.level}
        onChangeDay={(day) => {
          p.setShowSundayPreview(false);
          router.push(`/v2/teacher/day?d=${day}`);
        }}
        onAcknowledge={p.acknowledgeSundayPreview}
        onApplyToWeek={p.applySundayToThisWeek}
        applied={p.sundayApplied}
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
          p.setToast({ text: "Use the hands-off dial above to change how weeks run." });
        }}
      />
      <AddActivityModal
        open={p.showAddActivity}
        onClose={() => p.setShowAddActivity(false)}
        onAdd={(payload) => p.addActivity(payload)}
        subjects={p.setup.subjects}
        classes={p.setup.classes}
        multiClass={p.multiClass}
        defaults={p.addActivityDefaults}
      />
      <Toast toast={p.toast} />
      </div>
    </StationShell>
  );
}