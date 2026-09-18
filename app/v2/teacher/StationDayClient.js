"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DAY_NAMES, DATES, KINDS, PRODUCT_INFO, DEMO_WEEK } from "../../../lib/v2/demoWeek";
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
  HandsOffChip,
  SundayPreviewModal,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
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
  const day = Math.min(4, Math.max(0, Number(params.get("d") ?? 2)));
  const [openId, setOpenId] = useState(params.get("open"));
  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;
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
    return map;
  }, [p.setup.classes, p.openSuggestions]);

  const glanceItems = useMemo(() => {
    const list = [];
    const className = cls?.name;
    for (const s of daySuggestions.slice(0, 2)) {
      list.push({
        id: s.id,
        text: s.text(className),
        actionLabel: s.action,
        tone: "cream",
        onAction: () => p.acceptSuggestion(s),
      });
    }
    if (gradePending > 0 && list.length < 3) {
      list.push({
        id: "glance-grade",
        text: `${gradePending} to grade — ready when you are, no rush.`,
        actionLabel: "Open grading",
        tone: "mint",
        href: GRADING_INBOX_HREF,
      });
    }
    return list.slice(0, 3);
  }, [daySuggestions, cls?.name, gradePending]);

  function projectStub(title) {
    p.setToast({ text: `Would project "${title}" — skeleton` });
  }

  return (
    <StationShell>
      <TeacherSubnav active="day" />
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
              <WeeksRunEntry onOpen={() => p.setShowWeeksRun(true)} routineCount={p.enabledRoutineCount} />
            </div>
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

        {/* Now → Next → Later agenda (day-of home) */}
        <section aria-label="Today's agenda">
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
                      </div>
                    </div>
                  </button>
                  {act.kind === "teach" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        projectStub(act.title);
                      }}
                      title="Project (skeleton)"
                      style={{
                        alignSelf: "center",
                        marginRight: 12,
                        border: `1px solid ${LINE}`,
                        background: isNow ? LAVENDER : "#fff",
                        color: isNow ? "#fff" : LAVENDER,
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
                <button
                  type="button"
                  onClick={() => projectStub(opened.title)}
                  style={{ marginTop: 12, background: LAVENDER, color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Project
                </button>
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
        onChangeDay={(d) => {
          p.setShowSundayPreview(false);
          router.push(`/v2/teacher/day?d=${d}`);
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