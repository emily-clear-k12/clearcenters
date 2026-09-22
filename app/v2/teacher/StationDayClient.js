"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import {
  SUBJECTS,
  KINDS,
  PRODUCT_INFO,
  DEMO_WEEK,
} from "../../../lib/v2/demoWeek";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  getPendingCount,
  loadConfirmedIds,
} from "../../../lib/v2/demoGrading";
import {
  FOCUS_BLOCKS_KEY,
  getWhoNeedsMeCount,
  readFocusBlocksForDay,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../lib/v2/demoWhoNeedsMe";
import { PROJECT_HREF } from "../../../lib/v2/demoProject";
import { LESSON_PLAN_HREF } from "../../../lib/v2/demoLessonPlan";
import { LIVE_TEACH_HREF } from "../../../lib/v2/demoLiveTeach";
import {
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
  checkInsCtaLabel,
  softClusterDoors,
  isLoopAllClear,
  isStandardResolved,
  LOOP_REMEMBER_KEY,
  familyNoteSoftStoryHref,
  softStoryStudentDoorHref,
} from "../../../lib/v2/demoLoopSeams";
import {
  StationShell,
  TeacherSubnav,
  SundayPreviewModal,
  INK,
  MUTED,
  LINE,
  GLANCE,
} from "../../../components/v2/StationShell";
import { HowMyWeeksRunDrawer } from "../../../components/v2/HowMyWeeksRun";
import { AddActivityModal } from "../../../components/v2/AddActivityModal";
import DayBridge from "../../../components/v2/DayBridge";
import { Toast } from "../../../components/v2/weekKit";

/** Today: current lesson + teacher-controlled day timeline, with existing loop and planning doors. */
export default function StationDayClient() {
  const router = useRouter();
  const detailDialog = useRef(null);
  const params = useSearchParams();
  const p = usePlanner();
  const [gradePending, setGradePending] = useState(DEMO_WEEK.gradingCount);
  const [loopTick, setLoopTick] = useState(0);
  const [whoNeedsCount, setWhoNeedsCount] = useState(0);
  const [focusBlocks, setFocusBlocks] = useState([]);
  const requestedDay = Number(params.get("d") ?? 2);
  const day = Number.isFinite(requestedDay)
    ? Math.min(4, Math.max(0, Math.trunc(requestedDay)))
    : 2;
  const [openId, setOpenId] = useState(params.get("open"));
  const cls =
    p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass =
    p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;

  useEffect(() => {
    const refresh = () => {
      setGradePending(getPendingCount(loadConfirmedIds()));
      setWhoNeedsCount(
        getWhoNeedsMeCount(undefined, undefined, {
          classFilter: selectedClass,
          inheritPeriodId: selectedClass || "A",
        }),
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

  const items = p.visible.filter(
    (a) =>
      a.day === day &&
      (a.classes === "all" || a.classes?.includes(selectedClass)),
  );
  // Preserve each subject's planned activity order instead of moving all teaching to the front.
  const agenda = p.setup.subjects.flatMap((subject) =>
    items.filter((a) => a.subject === subject),
  );
  const minutes = items.reduce((s, a) => s + (a.minutes || 0), 0);
  const opened =
    items.find((a) => a.id === openId) ||
    p.activities.find((a) => a.id === openId);

  // loopTick keeps remember / resolve / all-clear voice in sync.
  void loopTick;
  const loopSoftest = useMemo(
    () => (loopTick > 0 ? getLoopSoftest() : null),
    [loopTick],
  );
  const allClear = loopTick > 0 ? isLoopAllClear() : false;
  const waiting = whoNeedsCount > 0;
  const softOpen =
    !allClear &&
    loopSoftest?.softest &&
    loopSoftest.urgency !== "cooled" &&
    !isStandardResolved(loopSoftest.softest.code);

  const checkInsDoor = checkInsHrefForPeriod(selectedClass);

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

  const softReportHref = loopSoftest?.href || REPORTS_HREF;
  const softReportLabel = loopSoftest?.softest?.code
    ? `${loopSoftest.softest.code} report`
    : "Reports";

  const gradingDoor = GRADING_INBOX_HREF;

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

  useEffect(() => {
    if (opened && detailDialog.current && !detailDialog.current.open)
      detailDialog.current.showModal();
  }, [opened]);

  return (
    <StationShell>
      <TeacherSubnav
        active="day"
        gradeCount={gradePending}
        checkInsCount={whoNeedsCount}
      />
      <DayBridge
        p={p}
        day={day}
        cls={cls}
        selectedClass={selectedClass}
        agenda={agenda}
        minutes={minutes}
        waiting={waiting}
        whoNeedsCount={whoNeedsCount}
        softOpen={softOpen}
        loopSoftest={loopSoftest}
        softDoors={softDoors}
        checkInsDoor={checkInsDoor}
        gradingDoor={gradingDoor}
        gradePending={gradePending}
        softReportHref={softReportHref}
        focusBlocks={focusBlocks}
        classStory={classStory}
        showProvenanceHelper={showProvenanceHelper}
        onDismissProvenanceHelper={onDismissProvenanceHelper}
        provenanceText={PROVENANCE_HELPER_TEXT}
        onOpen={setOpenId}
        onTeach={openLiveTeach}
        onLesson={openLessonPlan}
        onDay={(d) => router.push("/v2/teacher/day?d=" + d)}
      />
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {opened && (
          <dialog
            ref={detailDialog}
            aria-labelledby="day-lesson-detail"
            onCancel={() => setOpenId(null)}
            style={{
              border: "1px solid #E4DEF4",
              borderRadius: 22,
              width: "min(760px, calc(100vw - 48px))",
              maxHeight: "75vh",
              padding: 24,
              color: INK,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: SUBJECTS[opened.subject].color,
                    textTransform: "uppercase",
                  }}
                >
                  {SUBJECTS[opened.subject].name} ·{" "}
                  {KINDS[opened.kind]?.label || opened.kind}
                  {opened.auto ? " · auto" : ""}
                </div>
                <h2
                  id="day-lesson-detail"
                  style={{
                    margin: "4px 0",
                    fontFamily: "'Poppins', sans-serif",
                    color: INK,
                  }}
                >
                  {opened.title}
                </h2>
                <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>
                  {opened.minutes} min · {opened.who} ·{" "}
                  {PRODUCT_INFO[opened.product]?.about || opened.product}
                </p>
                <p style={{ margin: "8px 0 0", color: INK, fontSize: 14 }}>
                  Planned for {cls?.name || "this class"}.
                </p>
                {opened.kind === "teach" && (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
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
          </dialog>
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
          gradingLabel:
            gradePending > 0 ? `Grading · ${gradePending}` : "Grading",
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
        onAdd={(payload) =>
          p.addActivity({ ...payload, day: payload.day ?? day })
        }
        subjects={p.setup.subjects}
        classes={p.setup.classes}
        multiClass={p.multiClass}
        defaults={p.addActivityDefaults || { day }}
      />
      <Toast toast={p.toast} />
    </StationShell>
  );
}
