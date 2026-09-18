"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DATES, DEMO_WEEK, HANDS_OFF_LEVELS } from "../../../lib/v2/demoWeek";
import { GRADING_INBOX_HREF, getPendingCount, loadConfirmedIds } from "../../../lib/v2/demoGrading";
import {
  StationShell,
  Glass,
  Pill,
  TeacherSubnav,
  SetupSwitcher,
  SamGlance,
  RoomCards,
  SingleRoomLabel,
  HandsOffDial,
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

export default function StationWeekClient() {
  const router = useRouter();
  const p = usePlanner();
  const [gradePending, setGradePending] = useState(DEMO_WEEK.gradingCount);
  useEffect(() => {
    setGradePending(getPendingCount(loadConfirmedIds()));
    const onStorage = (e) => {
      if (e.key === "ci2.grading.confirmedIds") setGradePending(getPendingCount(loadConfirmedIds()));
    };
    const refresh = () => setGradePending(getPendingCount(loadConfirmedIds()));
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
    };
  }, []);
  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;

  const dialSubjectLabel =
    p.subjectFilter === "all"
      ? p.multiSubject
        ? "All subjects here"
        : SUBJECTS[p.dialSubject]?.name || "Subject"
      : SUBJECTS[p.subjectFilter]?.name || "Subject";

  const needsByClass = useMemo(() => {
    const map = {};
    for (const c of p.setup.classes) map[c.key] = 0;
    for (const s of p.openSuggestions) {
      if (s.classKey && map[s.classKey] != null) map[s.classKey] += 1;
    }
    return map;
  }, [p.setup.classes, p.openSuggestions]);

  const glanceItems = useMemo(() => {
    const items = [];
    const className = cls?.name;
    for (const s of p.openSuggestions.slice(0, 2)) {
      items.push({
        id: s.id,
        text: s.text(className),
        actionLabel: s.action,
        tone: "cream",
        onAction: () => p.acceptSuggestion(s),
      });
    }
    if (gradePending > 0 && items.length < 3) {
      items.push({
        id: "glance-grade",
        text: `${gradePending} to grade — ready when you are, no rush.`,
        actionLabel: "Open grading",
        tone: "mint",
        href: GRADING_INBOX_HREF,
      });
    }
    return items.slice(0, 3);
  }, [p.openSuggestions, cls?.name, gradePending]);

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

  return (
    <StationShell>
      <TeacherSubnav active="week" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>This Week</h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              {DEMO_WEEK.label} · Plan & publish · then teach from Daily Focus
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
              {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
              <HandsOffDial level={p.level} onChange={onHandsOff} subjectLabel={dialSubjectLabel} />
              <WeeksRunEntry onOpen={() => p.setShowWeeksRun(true)} routineCount={p.enabledRoutineCount} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <AddActivityButton onClick={() => p.openAddActivity({ day: 2 })} label="+ Add" />
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

        {p.needsSundayPreview && (
          <div style={{ marginTop: 14 }}>
            <SundayPreviewBanner onOpen={() => p.setShowSundayPreview(true)} acked={p.sundayAcked} />
          </div>
        )}

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
          <SamGlance
            items={glanceItems}
            emptyLabel={
              p.level === "i_plan"
                ? `Suggestions are ready for ${cls?.name || "this class"} — build from here.`
                : `Nothing waiting for ${cls?.name || "this class"} this week. Nice.`
            }
          />
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
                <button
                  type="button"
                  onClick={() => router.push(`/v2/teacher/day?d=${i}`)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "6px 6px 10px",
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
                        onClick={() => router.push(`/v2/teacher/day?d=${i}&open=${act.id}`)}
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
                        <span style={{ width: 6, alignSelf: "stretch", background: sub.color, borderRadius: "12px 0 0 12px" }} />
                        <span style={{ color: MUTED, letterSpacing: 1, fontSize: 12, paddingTop: 4 }}>{act.auto ? "⟳" : "⋮⋮"}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>
                            {sub.name}
                            {act.auto ? " · auto" : ""}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 650, color: INK, lineHeight: 1.25 }}>{act.title}</div>
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
                    <div style={{ color: MUTED, fontSize: 12, padding: "8px 6px" }}>
                      {p.level === "i_plan" ? "Open for your plan — add here or from Daily Focus." : "Nothing planned — tap + Add."}
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
      </Glass>
      <SundayPreviewModal
        open={p.showSundayPreview}
        onClose={() => p.setShowSundayPreview(false)}
        rows={p.outboundPreview}
        weekLabel={DEMO_WEEK.label}
        onChangeDay={(day) => {
          p.setShowSundayPreview(false);
          router.push(`/v2/teacher/day?d=${day}`);
        }}
        onAcknowledge={p.acknowledgeSundayPreview}
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
    </StationShell>
  );
}