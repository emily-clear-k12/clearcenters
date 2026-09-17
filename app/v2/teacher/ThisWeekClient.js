"use client";

// CI2.0 · Teacher · This Week (prototype with pretend data).
//
// The design rules this screen follows (from the CI2.0 Foundation Brainstorm):
// - One slim row per subject. A ready subject stays collapsed with a green
//   check; only a subject that needs the teacher asks for attention.
// - "Needs you" never shows more than 3 things.
// - Features appear where they're needed (reteach sits beside the data,
//   the routine offer sits inside the subject that triggered it).
// - One obvious main button (Publish week); undo instead of "Are you sure?"
// - Positive-and-honest voice ("aren't there yet", never "failed").

import { useMemo, useState, useEffect } from "react";
import V2TopBar from "../../../components/v2/V2TopBar";
import SamIcon from "../../../components/SamIcon";
import { COLORS, panelStyle, sceneWrapperStyle, sceneCanvasStyle } from "../../../lib/teacherTheme";
import {
  SUBJECT_COLORS,
  DAYS,
  DEMO_TEACHER,
  DEMO_WEEK,
  DEMO_SUBJECTS,
  DEMO_OTHER_NEEDS,
  HANDS_OFF_LEVELS,
} from "../../../lib/v2/demoWeek";

const BG = "/teacher/console/bg-platform-room.jpg";
const MAX_NEEDS = 3;

const PRODUCT_TAG = {
  ClearLessons: "Lesson",
  ClearSheets: "Sheet",
  ClearCenters: "Center",
  CrystalQuest: "Quest",
  "ClassCade Showdown": "Showdown",
  CrystalChecks: "CrystalCheck",
};

function StatusChip({ status }) {
  const map = {
    ready: { label: "✓ Ready", color: "#15803D", bg: "#DCFCE7" },
    needs_you: { label: "⚠ 1 thing", color: "#9A4A00", bg: "#FFEAD2" },
    paused: { label: "⏸ Paused", color: COLORS.textMuted, bg: "#ECE9F5" },
  };
  const s = map[status] || map.ready;
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: s.color,
        background: s.bg,
        borderRadius: 999,
        padding: "3px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function Button({ children, onClick, kind = "secondary", style = {}, ...rest }) {
  const kinds = {
    primary: { background: COLORS.violet, color: "#fff", border: `1px solid ${COLORS.violet}` },
    secondary: { background: "#fff", color: COLORS.textDark, border: `1px solid ${COLORS.border}` },
    quiet: { background: "transparent", color: COLORS.violet, border: "1px solid transparent" },
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding: kind === "primary" ? "11px 22px" : "7px 14px",
        fontSize: kind === "primary" ? 15 : 13,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        ...kinds[kind],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function summarize(items) {
  // "Lesson 4 · Skill Builder Practice · Showdown Fri"
  return items
    .slice(0, 3)
    .map((i) => (i.product === "ClassCade Showdown" ? `Showdown ${DAYS[i.day]}` : i.title.split(":")[0]))
    .join(" · ") + (items.length > 3 ? ` · +${items.length - 3} more` : "");
}

function WeekGrid({ items, color }) {
  const lanes = [
    { key: "whole", label: "Whole group" },
    { key: "student", label: "Student work" },
  ];
  return (
    <div style={{ overflowX: "auto", marginTop: 14 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px repeat(5, minmax(120px, 1fr))",
          gap: 8,
          minWidth: 760,
        }}
      >
        <div />
        {DAYS.map((d) => (
          <div key={d} style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {d}
          </div>
        ))}
        {lanes.map((lane) => (
          <LaneRow key={lane.key} lane={lane} items={items.filter((i) => i.lane === lane.key)} color={color} />
        ))}
      </div>
    </div>
  );
}

function LaneRow({ lane, items, color }) {
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textDark, paddingTop: 8 }}>{lane.label}</div>
      {DAYS.map((d, dayIndex) => {
        const dayItems = items.filter((i) => i.day === dayIndex);
        return (
          <div
            key={d}
            style={{
              minHeight: 64,
              borderRadius: 12,
              background: dayItems.length ? "transparent" : "rgba(255,255,255,.45)",
              border: dayItems.length ? "none" : "1px dashed rgba(140,82,242,.25)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {dayItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  borderLeft: `4px solid ${color}`,
                  padding: "8px 10px",
                  boxShadow: "0 2px 8px rgba(80,60,150,.08)",
                  outline: item.isNew ? `2px solid ${COLORS.success}` : "none",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  {PRODUCT_TAG[item.product] || item.product}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textDark, lineHeight: 1.3 }}>{item.title}</div>
                {item.who && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{item.who}</div>}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function SubjectRow({ subject, open, onToggle, onResolveNeed, routineState, onRoutine }) {
  const color = SUBJECT_COLORS[subject.key];
  return (
    <section
      style={{
        ...panelStyle(color, { padding: 0, overflow: "hidden" }),
        borderLeft: `6px solid ${color}`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
          color: COLORS.textDark,
        }}
      >
        <div style={{ minWidth: 170 }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18 }}>{subject.name}</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>
            {subject.unit} · {subject.unitWeek}
          </div>
        </div>
        <StatusChip status={subject.status} />
        <div style={{ flex: 1, minWidth: 200, fontSize: 14, color: COLORS.textMuted }}>{summarize(subject.items)}</div>
        <span aria-hidden="true" style={{ fontSize: 18, color: COLORS.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
          ⌄
        </span>
      </button>

      {subject.need && !subject.need.resolved && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            margin: "0 20px 14px",
            padding: "10px 14px",
            borderRadius: 12,
            background: "#FFF4E6",
            border: `1px solid ${COLORS.warning}66`,
            fontSize: 14,
          }}
        >
          <span style={{ flex: 1, minWidth: 200 }}>{subject.need.text}</span>
          <Button kind="secondary" onClick={onResolveNeed}>
            {subject.need.action}
          </Button>
        </div>
      )}

      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {subject.routineOffer && routineState !== "dismissed" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(140,82,242,.08)",
                fontSize: 14,
              }}
            >
              <SamIcon skinKey="cosmic" size={26} />
              {routineState === "saved" ? (
                <span style={{ flex: 1 }}>
                  <strong>Routine saved:</strong> every Monday, Skill Builder Practice for all students.
                </span>
              ) : (
                <>
                  <span style={{ flex: 1, minWidth: 200 }}>{subject.routineOffer}</span>
                  <Button kind="secondary" onClick={() => onRoutine("saved")}>
                    Yes, make it a routine
                  </Button>
                  <Button kind="quiet" onClick={() => onRoutine("dismissed")}>
                    Not now
                  </Button>
                </>
              )}
            </div>
          )}
          <WeekGrid items={subject.items} color={SUBJECT_COLORS[subject.key]} />
        </div>
      )}
    </section>
  );
}

function LevelDrawer({ level, onChoose, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How my weeks run"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(42,35,80,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#FBF9FF", borderRadius: 18, padding: 24, maxWidth: 520, width: "100%", boxShadow: "0 20px 60px rgba(42,35,80,.3)" }}
      >
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px", color: COLORS.textDark }}>How my weeks run</h2>
        <p style={{ margin: "0 0 16px", color: COLORS.textMuted, fontSize: 14 }}>You can change this anytime.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {HANDS_OFF_LEVELS.map((l) => {
            const selected = l.key === level;
            return (
              <button
                key={l.key}
                type="button"
                onClick={() => onChoose(l.key)}
                aria-pressed={selected}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: selected ? "rgba(140,82,242,.10)" : "#fff",
                  border: `2px solid ${selected ? COLORS.violet : COLORS.border}`,
                  color: COLORS.textDark,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{l.body}</div>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <Button kind="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ThisWeekClient() {
  const [subjects, setSubjects] = useState(DEMO_SUBJECTS);
  const [openKey, setOpenKey] = useState(null);
  const [routine, setRoutine] = useState("offered");
  const [level, setLevel] = useState(DEMO_WEEK.handsOffLevel);
  const [showLevels, setShowLevels] = useState(false);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const needs = useMemo(() => {
    const subjectNeeds = subjects
      .filter((s) => s.need && !s.need.resolved)
      .map((s) => ({ key: s.key, text: `${s.name}: ${s.need.text}`, action: s.need.action, subjectKey: s.key }));
    return [...subjectNeeds, ...DEMO_OTHER_NEEDS].slice(0, MAX_NEEDS);
  }, [subjects]);

  const readyCount = subjects.filter((s) => s.status === "ready").length;
  const itemCount = subjects.reduce((n, s) => n + s.items.length, 0);
  const levelTitle = HANDS_OFF_LEVELS.find((l) => l.key === level)?.title;

  function resolveNeed(subjectKey) {
    setSubjects((prev) =>
      prev.map((s) =>
        s.key === subjectKey
          ? {
              ...s,
              status: "ready",
              need: { ...s.need, resolved: true },
              items: [...s.items, { ...s.need.adds, isNew: true }],
            }
          : s
      )
    );
    setOpenKey(subjectKey);
    setToast({ text: "Reteach added for Wednesday.", undo: () => undoNeed(subjectKey) });
  }

  function undoNeed(subjectKey) {
    setSubjects((prev) => prev.map((s) => (s.key === subjectKey ? DEMO_SUBJECTS.find((d) => d.key === subjectKey) : s)));
    setToast(null);
  }

  function handleNeedAction(need) {
    if (need.subjectKey) return resolveNeed(need.subjectKey);
    setToast({ text: `"${need.action}" opens in a later CI2.0 build.` });
  }

  function publish() {
    setPublished(true);
    setToast({ text: `Week published. ${itemCount} items go out Monday at 7:00 AM.`, undo: () => { setPublished(false); setToast(null); } });
  }

  const allReady = readyCount === subjects.length;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas }}>
      <V2TopBar active="plan" teacherName={DEMO_TEACHER.name} />

      <div style={sceneWrapperStyle({ minHeight: "calc(100vh - 60px)" })}>
        <div aria-hidden="true" style={sceneCanvasStyle(BG)} />
        <main style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "28px 16px 80px" }}>
          {/* Header */}
          <div style={{ ...panelStyle(COLORS.violet, { padding: "16px 18px" }), display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <Button kind="secondary" aria-label="Previous week" onClick={() => setToast({ text: "Other weeks open in a later CI2.0 build." })}>
                  ‹
                </Button>
                <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 5vw, 32px)", margin: 0, color: COLORS.textDark }}>
                  This Week · {DEMO_WEEK.label}
                </h1>
                <Button kind="secondary" aria-label="Next week" onClick={() => setToast({ text: "Other weeks open in a later CI2.0 build." })}>
                  ›
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setShowLevels(true)}
                style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,.8)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  padding: "4px 12px",
                  fontSize: 13,
                  color: COLORS.textDark,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                How my weeks run: <strong>{levelTitle}</strong> · Change
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {published ? (
                <span style={{ fontWeight: 700, color: "#15803D", background: "#DCFCE7", borderRadius: 999, padding: "10px 18px" }}>
                  ✓ Published · goes out Mon 7:00 AM
                </span>
              ) : (
                <Button kind="primary" onClick={publish}>
                  Publish week
                </Button>
              )}
            </div>
          </div>

          {/* SAM morning line */}
          <div style={{ ...panelStyle(COLORS.violet, { padding: "14px 18px", marginTop: 20 }), display: "flex", alignItems: "center", gap: 12 }}>
            <SamIcon skinKey="cosmic" size={40} />
            <div style={{ fontSize: 15 }}>
              <strong>Good morning, {DEMO_TEACHER.firstName}!</strong>{" "}
              {allReady
                ? "All 4 subjects are ready. Review anything you like, then publish."
                : `${readyCount} of ${subjects.length} subjects are ready. One thing needs you before you publish.`}
            </div>
          </div>

          {/* Needs you */}
          <section style={{ ...panelStyle(COLORS.warning, { padding: "16px 18px", marginTop: 14 }) }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 16, color: COLORS.textDark }}>Needs you</h2>
            {needs.length === 0 ? (
              <p style={{ margin: 0, color: COLORS.textMuted }}>Nothing right now. You're all set.</p>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
                {needs.map((n) => (
                  <li key={n.key} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ color: COLORS.warning, fontWeight: 800 }}>•</span>
                    <span style={{ flex: 1, minWidth: 200, fontSize: 14 }}>{n.text}</span>
                    <Button kind="secondary" onClick={() => handleNeedAction(n)}>
                      {n.action}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Subjects */}
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {subjects.map((s) => (
              <SubjectRow
                key={s.key}
                subject={s}
                open={openKey === s.key}
                onToggle={() => setOpenKey(openKey === s.key ? null : s.key)}
                onResolveNeed={() => resolveNeed(s.key)}
                routineState={routine}
                onRoutine={setRoutine}
              />
            ))}
          </div>

          <p style={{ marginTop: 18, fontSize: 13, color: COLORS.textMuted, textAlign: "center" }}>
            Prototype with pretend data. Click a subject to see its week.
          </p>
        </main>
      </div>

      {showLevels && <LevelDrawer level={level} onChoose={setLevel} onClose={() => setShowLevels(false)} />}

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            background: COLORS.textDark,
            color: "#fff",
            borderRadius: 999,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 14,
            boxShadow: "0 10px 30px rgba(42,35,80,.35)",
            zIndex: 30,
            maxWidth: "calc(100% - 32px)",
          }}
        >
          <span>{toast.text}</span>
          {toast.undo && (
            <button
              type="button"
              onClick={toast.undo}
              style={{ background: "transparent", border: "none", color: COLORS.teal, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}
            >
              Undo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
