"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DATES, DEMO_WEEK, HANDS_OFF_LEVELS } from "../../../lib/v2/demoWeek";
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
  INK,
  MUTED,
  LINE,
  LAVENDER,
} from "../../../components/v2/StationShell";
import { Toast } from "../../../components/v2/weekKit";

export default function StationWeekClient() {
  const router = useRouter();
  const p = usePlanner();
  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;

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
    if (DEMO_WEEK.gradingCount > 0 && items.length < 3) {
      items.push({
        id: "glance-grade",
        text: `${DEMO_WEEK.gradingCount} submissions are ready when you are — no rush.`,
        actionLabel: "Open grading",
        tone: "mint",
        onAction: () => p.setToast({ text: "Grading opens here next — skeleton for now." }),
      });
    }
    return items.slice(0, 3);
  }, [p.openSuggestions, cls?.name, p]);

  function onDrop(day, e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    p.setDragOverDay(null);
    if (id) p.moveTo(id, day);
  }

  function onHandsOff(key) {
    p.setLevel(key);
    const title = HANDS_OFF_LEVELS.find((l) => l.key === key)?.title || key;
    p.setToast({ text: `Weeks will run as: ${title}.` });
  }

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
              <HandsOffDial level={p.level} onChange={onHandsOff} />
            </div>
          </div>
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
            emptyLabel={`Nothing waiting for ${cls?.name || "this class"} this week. Nice.`}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0 18px" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 10 }}>
          {DAYS.map((d, i) => {
            const items = p.visible.filter((a) => a.day === i);
            const isToday = i === 2;
            const over = p.dragOverDay === i;
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
                  background: over ? "rgba(139,108,255,.08)" : "#FBFaff",
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
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Daily Focus →</div>
                </button>
                <div style={{ display: "grid", gap: 8 }}>
                  {items.map((act) => {
                    const sub = SUBJECTS[act.subject];
                    return (
                      <div
                        key={act.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", act.id);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onClick={() => router.push(`/v2/teacher/day?d=${i}&open=${act.id}`)}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                          background: "#fff",
                          border: `1px solid ${LINE}`,
                          borderRadius: 12,
                          padding: "8px 8px 8px 0",
                          cursor: "grab",
                        }}
                      >
                        <span style={{ width: 6, alignSelf: "stretch", background: sub.color, borderRadius: "12px 0 0 12px" }} />
                        <span style={{ color: MUTED, letterSpacing: 1, fontSize: 12, paddingTop: 4 }}>⋮⋮</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>{sub.name}</div>
                          <div style={{ fontSize: 13, fontWeight: 650, color: INK, lineHeight: 1.25 }}>{act.title}</div>
                        </div>
                      </div>
                    );
                  })}
                  {items.length === 0 && (
                    <div style={{ color: MUTED, fontSize: 12, padding: "8px 6px" }}>Nothing planned — open Daily Focus to add.</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ margin: "14px 0 0", color: MUTED, fontSize: 13 }}>
          Drag a tile to move it for {cls?.name || "this class"} only. Daily Focus is your teach-today home.
        </p>
      </Glass>
      <Toast toast={p.toast} />
    </StationShell>
  );
}