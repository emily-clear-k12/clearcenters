"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DAY_NAMES, DATES, KINDS, PRODUCT_INFO, DEMO_WEEK, buildMorningCardDemo } from "../../../lib/v2/demoWeek";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  getPendingCount,
  loadConfirmedIds,
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
  whoNeedsGlanceText,
  WHO_NEEDS_ME_HREF,
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
  StationShell,
  Glass,
  Pill,
  TeacherSubnav,
  SetupSwitcher,
  MorningCard,
  SamGlance,
  SamBubble,
  ProvenanceHelperLine,
  RoomCards,
  SingleRoomLabel,
  HandsOffChip,
  WhoNeedsMeChip,
  TodayLoopStrip,
  SundayPreviewModal,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../components/v2/StationShell";
import { HowMyWeeksRunDrawer, WeeksRunEntry } from "../../../components/v2/HowMyWeeksRun";
import { AddActivityModal, AddActivityButton } from "../../../components/v2/AddActivityModal";
import { Toast } from "../../../components/v2/weekKit";

const AGENDA_LABELS = ["Now", "Next", "Later"];

export default function StationDayClient() {
  const router = useRouter();
  const params = useSearchParams();
  const p = usePlanner();
  const [gradePending, setGradePending] = useState(DEMO_WEEK.gradingCount);
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
    };
    refresh();
    const onStorage = (e) => {
      if (
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === FOCUS_BLOCKS_KEY ||
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
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-focus-blocks-updated", refresh);
    };
  }, [selectedClass, day]);
  const items = p.visible.filter((a) => a.day === day);
  // Agenda rise-to-top: teach first, then work/small — labeled Now → Next → Later
  const agenda = useMemo(() => {
    const teach = items.filter((a) => a.kind === "teach");
    const rest = items.filter((a) => a.kind !== "teach");
    return [...teach, ...rest];
  }, [items]);
  const minutes = items.reduce((s, a) => s + (a.minutes || 0), 0);
  const opened = items.find((a) => a.id === openId) || p.activities.find((a) => a.id === openId);
  const daySuggestions = p.openSuggestions.filter((s) => s.day === day || s.day == null);

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

  const glanceItems = useMemo(() => {
    const list = [];
    const className = cls?.name;
    // Check-ins first when kids are waiting (Emily max-3 glance rule)
    if (whoNeedsCount > 0) {
      list.push({
        id: "glance-who-needs",
        text: whoNeedsGlanceText(whoNeedsCount),
        actionLabel: "Check-ins",
        meaning: "needsYou",
        tone: "cream",
        href: WHO_NEEDS_ME_HREF,
      });
    }
    const suggestionSlots = Math.max(0, 2 - list.length);
    for (const s of daySuggestions.slice(0, suggestionSlots)) {
      list.push({
        id: s.id,
        text: s.text(className),
        actionLabel: s.action,
        meaning: "needsYou",
        tone: "cream",
        onAction: () => p.acceptSuggestion(s),
      });
    }
    if (gradePending > 0 && list.length < 3) {
      list.push({
        id: "glance-grade",
        text: `${gradePending} to grade — ready when you are, no rush.`,
        actionLabel: "Open grading",
        meaning: "toGrade",
        tone: "coral",
        href: GRADING_INBOX_HREF,
      });
    }
    return list.slice(0, 3);
  }, [daySuggestions, cls?.name, gradePending, whoNeedsCount]);

  const morningCard = useMemo(
    () =>
      buildMorningCardDemo({
        subjects: p.setup.subjects,
        classKey: selectedClass,
        className: cls?.name,
        subjectFilter: p.subjectFilter,
        agendaNow: agenda[0] || null,
      }),
    [p.setup.subjects, selectedClass, cls?.name, p.subjectFilter, agenda]
  );

  const morningDismissKey = `ci2.morning.dismissed.${DATES[day] || day}`;
  const [morningDismissed, setMorningDismissed] = useState(false);
  useEffect(() => {
    try {
      setMorningDismissed(window.localStorage.getItem(morningDismissKey) === "1");
    } catch {
      setMorningDismissed(false);
    }
  }, [morningDismissKey]);

  function dismissMorningCard() {
    try {
      window.localStorage.setItem(morningDismissKey, "1");
    } catch {
      /* ignore */
    }
    setMorningDismissed(true);
  }

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

  // SAM morning tip when Check-ins wait — once per day (no spam every render)
  const samMorningTipKey = `ci2.morning.samCheckInsTip.${DATES[day] || day}`;
  const [samMorningTip, setSamMorningTip] = useState(null);
  useEffect(() => {
    if (whoNeedsCount <= 0) {
      setSamMorningTip(null);
      return;
    }
    try {
      if (window.sessionStorage.getItem(samMorningTipKey) === "1") {
        setSamMorningTip(null);
        return;
      }
      window.sessionStorage.setItem(samMorningTipKey, "1");
    } catch {
      /* still show once this mount */
    }
    const line =
      whoNeedsCount === 1
        ? "1 Check-in ready when you are"
        : `${whoNeedsCount} Check-ins ready when you are`;
    setSamMorningTip(line);
  }, [whoNeedsCount, samMorningTipKey]);

  function openProject(act) {
    router.push(PROJECT_HREF(act.id));
  }

  function openLessonPlan(act) {
    router.push(LESSON_PLAN_HREF(act.id));
  }

  function openLiveTeach(act) {
    router.push(LIVE_TEACH_HREF(act.id));
  }

  // Today strip · Teach → live teach for primary teach block; else scroll to agenda.
  const primaryTeach = agenda.find((a) => a.kind === "teach") || null;
  const teachHref = primaryTeach
    ? LIVE_TEACH_HREF(primaryTeach.id)
    : "#today-teach";

  return (
    <StationShell>
      <TeacherSubnav active="day" gradeCount={gradePending} checkInsCount={whoNeedsCount} />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>Daily Focus</h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              Teach today · {DAY_NAMES[day]} · {DATES[day]} · {p.published ? "published" : "not published yet"} · {minutes} min
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
              {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
              <HandsOffChip level={p.level} onOpenPreview={() => p.setShowSundayPreview(true)} />
              <WhoNeedsMeChip count={whoNeedsCount} href={WHO_NEEDS_ME_HREF} />
              <WeeksRunEntry onOpen={() => p.setShowWeeksRun(true)} routineCount={p.enabledRoutineCount} />
            </div>
            <TodayLoopStrip
              planCount={items.length}
              teachCount={items.filter((a) => a.kind === "teach").length}
              checkCount={whoNeedsCount > 0 ? whoNeedsCount : gradePending}
              checkNeeds={whoNeedsCount > 0}
              planHref="/v2/teacher"
              teachHref={teachHref}
              checkHref={whoNeedsCount > 0 ? WHO_NEEDS_ME_HREF : GRADING_INBOX_HREF}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <AddActivityButton onClick={() => p.openAddActivity({ day })} />
            <button
              type="button"
              onClick={() => router.push("/v2/teacher")}
              style={{ background: "#fff", color: INK, border: "1px solid " + LINE, borderRadius: 999, padding: "10px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              This Week · plan
            </button>
          </div>
        </div>

        {p.multiClass && (
          <RoomCards
            classes={p.setup.classes}
            selectedKey={selectedClass}
            onSelect={p.setClassFilter}
            setup={p.setup}
            needsByClass={needsByClass}
          />
        )}

        <div style={{ marginTop: 14 }}>
          {!morningDismissed && (
            <MorningCard
              greeting={morningCard.greeting}
              agendaLine={morningCard.agendaLine}
              win={morningCard.win}
              watch={morningCard.watch}
              onDismiss={dismissMorningCard}
              checkInsCount={whoNeedsCount}
              checkInsHref={WHO_NEEDS_ME_HREF}
            />
          )}
          {samMorningTip && (
            <SamBubble text={samMorningTip} style={{ margin: "0 0 12px" }} />
          )}
          <ProvenanceHelperLine
            show={showProvenanceHelper}
            onDismiss={onDismissProvenanceHelper}
            text={PROVENANCE_HELPER_TEXT}
          />
          <SamGlance
            items={glanceItems}
            emptyLabel={`Nothing waiting for ${cls?.name || "this class"} today. Nice.`}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0 12px" }}>
          {p.multiSubject && (
            <Pill active={p.subjectFilter === "all"} onClick={() => p.setSubjectFilter("all")}>
              All subjects
            </Pill>
          )}
          {p.setup.subjects.map((key) => (
            <Pill key={key} active={p.subjectFilter === key || (!p.multiSubject && p.subjectFilter === "all")} onClick={() => p.setSubjectFilter(key)} color={SUBJECTS[key].color}>
              {SUBJECTS[key].name}
            </Pill>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {DAYS.map((label, i) => {
            const on = i === day;
            return (
              <button
                key={label}
                type="button"
                onClick={() => router.push("/v2/teacher/day?d=" + i)}
                style={{
                  borderRadius: 999,
                  padding: "7px 12px",
                  border: "1px solid " + (on ? LAVENDER : LINE),
                  background: on ? LAVENDER : "#fff",
                  color: on ? "#fff" : INK,
                  fontWeight: 700,
                  fontSize: 13,
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

        {/* Check-ins → Daily Focus pulls (amber glance) */}
        {focusBlocks.length > 0 && (
          <section aria-label="Small group and reteach from Check-ins" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 800, color: GLANCE.needsYou.fg, marginBottom: 10, fontSize: 13, letterSpacing: 0.4 }}>
              {day === FOCUS_TODAY_DAY
                ? "FROM CHECK-INS · TODAY"
                : day === FOCUS_TOMORROW_DAY
                  ? "FROM CHECK-INS · TOMORROW"
                  : "FROM CHECK-INS"}
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {focusBlocks.map((block) => (
                <div
                  key={block.id}
                  style={{
                    ...glanceCardStyle("needsYou"),
                    borderRadius: 16,
                    padding: "12px 14px",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    boxShadow: "0 6px 18px rgba(166,124,61,.1)",
                  }}
                >
                  <div
                    style={{
                      ...glanceChipStyle("needsYou"),
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 11,
                      fontWeight: 800,
                      flexShrink: 0,
                      letterSpacing: 0.3,
                    }}
                  >
                    {focusBlockKindLabel(block.kind).toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 16 }}>{block.title}</div>
                    <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
                      {focusBlockNamesLine(block)}
                      {block.standard ? ` · ${block.standard}` : ""}
                      {" · stub from Check-ins"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Now → Next → Later agenda (day-of home) */}
        <section id="today-teach" aria-label="Today's agenda">
          <div style={{ fontWeight: 800, color: INK, marginBottom: 10, fontSize: 13, letterSpacing: 0.4 }}>
            NOW → NEXT → LATER
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {agenda.length === 0 && (
              <div style={{ color: MUTED, fontSize: 14, padding: "12px 4px" }}>Nothing on the agenda for this room today.</div>
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
                    background: act.auto ? MINT : isNow ? SOFT_LAV : "#fff",
                    border: `1px solid ${isNow ? "#D9CFFF" : LINE}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: isNow ? "0 8px 22px rgba(139,108,255,.12)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isNow ? "rgba(139,108,255,.14)" : "#F7F4FF",
                      fontWeight: 800,
                      fontSize: 12,
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
                      padding: "12px 10px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{ width: 5, alignSelf: "stretch", background: sub.color, borderRadius: 4 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>
                        {sub.name} · {KINDS[act.kind]?.short || act.kind}
                        {act.auto ? " · auto" : ""}
                      </div>
                      <div style={{ fontWeight: 700, color: INK, fontSize: isNow ? 17 : 15 }}>{act.title}</div>
                      <div style={{ fontSize: 13, color: MUTED }}>
                        {act.minutes} min · {act.who}
                        {(() => {
                          const prov = plannerProvenanceLabel(act);
                          return prov ? ` · ${prov}` : "";
                        })()}
                      </div>
                    </div>
                  </button>
                  {act.kind === "teach" && (
                    <div style={{ alignSelf: "center", marginRight: 12, display: "flex", gap: 6, flexShrink: 0 }}>
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
                          padding: "8px 12px",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          whiteSpace: "nowrap",
                          boxShadow: isNow ? "0 6px 16px rgba(123,107,184,.22)" : "none",
                        }}
                      >
                        Teach live
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLessonPlan(act);
                        }}
                        title="Open lesson plan stub"
                        style={{
                          border: `1px solid ${GLANCE.teach.border}`,
                          background: GLANCE.teach.bg,
                          color: GLANCE.teach.fg,
                          borderRadius: 999,
                          padding: "8px 12px",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Lesson plan
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProject(act);
                        }}
                        title="Open project shell"
                        style={{
                          border: `1px solid ${GLANCE.project.border}`,
                          background: isNow ? GLANCE.project.fg : GLANCE.project.bg,
                          color: isNow ? "#fff" : GLANCE.project.fg,
                          borderRadius: 999,
                          padding: "8px 14px",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Project
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </Glass>

      {opened && (
        <Glass style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: SUBJECTS[opened.subject].color, textTransform: "uppercase" }}>
                {SUBJECTS[opened.subject].name} · {KINDS[opened.kind]?.label || opened.kind}
                {opened.auto ? " · auto" : ""}
              </div>
              <h2 style={{ margin: "4px 0", fontFamily: "'Poppins', sans-serif", color: INK }}>{opened.title}</h2>
              <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>
                {opened.minutes} min · {opened.who} · {PRODUCT_INFO[opened.product]?.about || opened.product}
              </p>
              <p style={{ margin: "8px 0 0", color: INK, fontSize: 14 }}>This is the live assignment for {cls?.name || "this class"}.</p>
              {opened.kind === "teach" && (
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => openLiveTeach(opened)}
                    style={{ background: GLANCE.teach.fg, color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 16px rgba(123,107,184,.22)" }}
                  >
                    Teach live
                  </button>
                  <button
                    type="button"
                    onClick={() => openLessonPlan(opened)}
                    style={{ background: GLANCE.teach.bg, color: GLANCE.teach.fg, border: `1px solid ${GLANCE.teach.border}`, borderRadius: 999, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Lesson plan
                  </button>
                  <button
                    type="button"
                    onClick={() => openProject(opened)}
                    style={{ background: GLANCE.project.fg, color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 16px rgba(91,79,154,.22)" }}
                  >
                    Project
                  </button>
                </div>
              )}
            </div>
            <button type="button" onClick={() => setOpenId(null)} style={{ border: "none", background: "transparent", cursor: "pointer", color: MUTED, fontWeight: 700 }}>
              Close
            </button>
          </div>
        </Glass>
      )}
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
        onOpenHandsOff={() => { p.setShowWeeksRun(false); router.push('/v2/teacher'); }}
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