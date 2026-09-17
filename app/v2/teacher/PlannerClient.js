"use client";

// CI2.0 · Teacher · This Week — the five-day planner (prototype, pretend data).
//
// Design decisions (Emily, Sept 16 2026):
// - Day-by-day structure. Inside each day, activities are grouped BY SUBJECT,
//   with "Teach together", "Student work" and "Small group" kept together so
//   a teacher reads one subject's plan in one place.
// - The calendar sits on one mostly opaque, pale panel; the space art stays
//   visible around the edges. Dark text, larger titles, subject color as a
//   narrow stripe plus a small label.
// - Fits the teacher's assignment: only her subjects; a subject filter when
//   she teaches more than one; compact subject sections for self-contained
//   teachers that expand when needed.
// - Subjects and classes are separate controls. Shared lessons are planned
//   once for selected classes; small groups and reteach stay class-specific.
// - SAM is one compact strip. Suggestions sit beside the subject and day they
//   belong to. Grading stays reachable but never blocks publishing.
// - Clicking an activity opens details in a side panel; the week stays
//   visible. Activities move by dragging or with "Move to…".
// - Publish week is the main action, with wording about which classes it
//   affects and when student work opens.

import { useEffect } from "react";
import { usePlanner } from "../../../lib/v2/usePlanner";
import SamIcon from "../../../components/SamIcon";
import { COLORS } from "../../../lib/teacherTheme";
import { Button, LevelDrawer, Toast, PageShell } from "../../../components/v2/weekKit";
import {
  SUBJECTS,
  DAYS,
  DAY_NAMES,
  DATES,
  KINDS,
  DEMO_WEEK,
  TEACHER_SETUPS,
  PRODUCT_INFO,
} from "../../../lib/v2/demoWeek";

const INK = COLORS.textDark;
const MUTED = "#5E577F";
const PAPER = "rgba(252,251,255,.97)";
const LINE = "#E6E1F5";
const KIND_ORDER = { teach: 0, work: 1, small: 2 };

// ---------- small helpers ----------

function classNames(classes, setup) {
  if (classes === "all") return ""; // shared with every class: the default, so no label
  const names = setup.classes.filter((c) => classes.includes(c.key)).map((c) => c.name);
  return names.length ? `${names.join(", ")} only` : "";
}

function Chip({ active, onClick, children, color }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: "pointer",
        color: active ? "#fff" : INK,
        background: active ? INK : "#fff",
        border: `1px solid ${active ? INK : LINE}`,
      }}
    >
      {color && <span style={{ width: 9, height: 9, borderRadius: 999, background: color }} />}
      {children}
    </button>
  );
}

function MenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: "none",
        padding: "7px 10px",
        borderRadius: 8,
        fontSize: 14,
        color: INK,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F3EFFC")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}

// ---------- activity row ----------

function ActivityRow({ act, setup, compact, selected, onOpen, onMoveTo, menuOpen, onMenu, isRoutine }) {
  const cls = classNames(act.classes, setup);
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", act.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 4,
        borderRadius: 10,
        background: act.isNew ? "#EAFBF1" : selected ? "#F1ECFF" : "#fff",
        border: `1px solid ${act.isNew ? "#86E0A8" : selected ? "#B9A6F5" : LINE}`,
        cursor: "grab",
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(act.id)}
        style={{
          flex: 1,
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: compact ? "7px 4px 7px 10px" : "9px 4px 9px 10px",
          cursor: "pointer",
          fontFamily: "inherit",
          color: INK,
          minWidth: 0,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {compact ? KINDS[act.kind].short : KINDS[act.kind].label}
          {isRoutine && <span style={{ marginLeft: 6, color: "#6D3FD9" }}>· Routine</span>}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginTop: 1 }}>{act.title}</div>
        {compact ? (
          <div style={{ fontSize: 12, color: MUTED }}>
            {act.minutes} min{act.who !== "Everyone" ? ` · ${act.who}` : ""}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>
            {act.minutes} min · {act.who}
            {cls && ` · ${cls}`}
          </div>
        )}
      </button>
      <button
        type="button"
        aria-label={`More options for ${act.title}`}
        aria-expanded={menuOpen}
        onClick={(e) => {
          e.stopPropagation();
          onMenu(menuOpen ? null : act.id);
        }}
        style={{ background: "transparent", border: "none", padding: "8px", cursor: "pointer", color: MUTED, fontSize: 16, lineHeight: 1, borderRadius: 8 }}
      >
        ⋯
      </button>
      {menuOpen && (
        <div
          role="menu"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 4,
            top: 34,
            zIndex: 15,
            background: "#fff",
            border: `1px solid ${LINE}`,
            borderRadius: 12,
            boxShadow: "0 12px 30px rgba(42,35,80,.18)",
            padding: 6,
            minWidth: 170,
          }}
        >
          <MenuItem onClick={() => onOpen(act.id)}>Open details</MenuItem>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", padding: "8px 10px 4px" }}>Move to…</div>
          {DAYS.map((d, i) =>
            i === act.day ? null : (
              <MenuItem key={d} onClick={() => onMoveTo(act.id, i)}>
                {DAY_NAMES[i]}
              </MenuItem>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ---------- suggestion ----------

function SuggestionCard({ sug, setup, onAccept, onDismiss }) {
  const cls = sug.classKey ? setup.classes.find((c) => c.key === sug.classKey) || setup.classes[0] : null;
  const clsName = cls && setup.classes.length > 1 ? cls.name : "";
  return (
    <div style={{ borderRadius: 10, border: "1px solid #F5C58B", background: "#FFF7ED", padding: "9px 10px", display: "flex", gap: 8, alignItems: "flex-start" }}>
      <SamIcon skinKey="cosmic" size={24} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9A4A00", textTransform: "uppercase", letterSpacing: 0.5 }}>SAM suggests</div>
        <div style={{ fontSize: 14, color: INK, lineHeight: 1.35, margin: "2px 0 8px" }}>{sug.text(clsName)}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Button onClick={onAccept} style={{ padding: "5px 12px" }}>
            {sug.action}
          </Button>
          <Button kind="quiet" style={{ color: MUTED, padding: "5px 6px" }} onClick={onDismiss}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------- subject section inside a day ----------

function SubjectSection({ subjectKey, acts, suggestions, setup, compact, onToggleCompact, showEmpty, hideHeader, ctx }) {
  const subject = SUBJECTS[subjectKey];
  const total = acts.reduce((m, x) => m + x.minutes, 0);
  const expanded = !compact || suggestions.length > 0;

  if (!acts.length && !suggestions.length) {
    if (!showEmpty) return null;
    return (
      <div style={{ borderLeft: `4px solid ${subject.color}55`, padding: "4px 0 4px 10px", fontSize: 13, color: MUTED }}>
        <span style={{ fontWeight: 700, color: subject.color }}>{subject.name}</span> · nothing planned
      </div>
    );
  }

  return (
    <section style={{ borderLeft: `4px solid ${subject.color}`, paddingLeft: 10 }}>
      {!hideHeader && (
      <button
        type="button"
        onClick={onToggleCompact}
        disabled={!ctx.canCompact}
        aria-expanded={expanded}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "0 0 6px",
          cursor: ctx.canCompact ? "pointer" : "default",
          fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 800, color: subject.color, textTransform: "uppercase", letterSpacing: 0.6 }}>{subject.name}</span>
        <span style={{ fontSize: 12, color: MUTED }}>
          {total} min{ctx.canCompact ? (expanded ? " ▾" : " ▸") : ""}
        </span>
      </button>
      )}
      <div style={{ display: "grid", gap: 6 }}>
        {acts.map((act) => (
          <ActivityRow
            key={act.id}
            act={act}
            setup={setup}
            compact={!expanded}
            selected={ctx.selectedId === act.id}
            onOpen={ctx.openDetails}
            onMoveTo={ctx.moveTo}
            menuOpen={ctx.menuId === act.id}
            onMenu={ctx.setMenuId}
            isRoutine={ctx.routineIds.includes(act.id)}
          />
        ))}
        {suggestions.map((s) => (
          <SuggestionCard key={s.id} sug={s} setup={setup} onAccept={() => ctx.acceptSuggestion(s)} onDismiss={() => ctx.dismissSuggestion(s.id)} />
        ))}
      </div>
    </section>
  );
}

// ---------- details side panel ----------

function Detail({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 15, color: INK, marginTop: 2, lineHeight: 1.4 }}>{children}</div>
    </div>
  );
}

function DetailsPanel({ act, setup, onClose, onMoveTo, onRemove, onPreview, onToggleClass }) {
  useEffect(() => {
    if (!act) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act, onClose]);

  if (!act) return null;
  const subject = SUBJECTS[act.subject];
  const info = PRODUCT_INFO[act.product] || {};
  const multiClass = setup.classes.length > 1;
  const classSelected = (key) => act.classes === "all" || act.classes.includes(key);

  return (
    <aside
      aria-label="Activity details"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(400px, 100%)",
        background: "#FDFCFF",
        boxShadow: "-12px 0 40px rgba(42,35,80,.22)",
        zIndex: 25,
        display: "flex",
        flexDirection: "column",
        borderLeft: `6px solid ${subject.color}`,
      }}
    >
      <div style={{ padding: "18px 20px", borderBottom: `1px solid ${LINE}`, display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: subject.color, textTransform: "uppercase", letterSpacing: 0.6 }}>
            {subject.name} · {KINDS[act.kind].label}
          </div>
          <h2 style={{ margin: "4px 0 0", fontFamily: "'Poppins', sans-serif", fontSize: 22, color: INK, lineHeight: 1.25 }}>{act.title}</h2>
          <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>
            {DAY_NAMES[act.day]}, {DATES[act.day]} · {act.minutes} min
          </div>
        </div>
        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          style={{ background: "transparent", border: "none", fontSize: 24, color: MUTED, cursor: "pointer", alignSelf: "flex-start", lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: "16px 20px", overflowY: "auto", display: "grid", gap: 18, alignContent: "start" }}>
        <Detail label="What it is">
          <strong>{act.product}</strong> · {info.about}
        </Detail>
        <Detail label="Who">{act.who}</Detail>
        {act.standard && <Detail label="Standard">TEKS {act.standard}</Detail>}

        {multiClass && (
          <Detail label="Classes">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
              {setup.classes.map((c) => (
                <Chip key={c.key} active={classSelected(c.key)} onClick={() => onToggleClass(act.id, c.key)}>
                  {classSelected(c.key) ? "✓ " : ""}
                  {c.name}
                </Chip>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>
              Planned once; choose which classes get it. Pacing changes and small groups stay class-specific.
            </div>
          </Detail>
        )}

        <Detail label="Move to">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            {DAYS.map((d, i) => (
              <Chip key={d} active={i === act.day} onClick={() => i !== act.day && onMoveTo(act.id, i)}>
                {d}
              </Chip>
            ))}
          </div>
        </Detail>
      </div>

      <div style={{ marginTop: "auto", padding: "14px 20px", borderTop: `1px solid ${LINE}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button kind="primary" style={{ padding: "9px 18px", fontSize: 14 }} onClick={onPreview}>
          Preview activity
        </Button>
        <Button onClick={() => onRemove(act.id)}>Remove from week</Button>
      </div>
    </aside>
  );
}

// ---------- page ----------

export default function PlannerClient() {
  const {
    setupKey,
    setSetupKey,
    setup,
    activities,
    handled,
    routineIds,
    classFilter,
    setClassFilter,
    subjectFilter,
    setSubjectFilter,
    expandedSections,
    setExpandedSections,
    selectedId,
    setSelectedId,
    menuId,
    setMenuId,
    dragOverDay,
    setDragOverDay,
    level,
    setLevel,
    showLevels,
    setShowLevels,
    published,
    toast,
    setToast,
    flashDays,
    multiSubject,
    multiClass,
    canCompact,
    levelTitle,
    shownSubjects,
    visible,
    openSuggestions,
    selected,
    classList,
    moveTo,
    remove,
    toggleClass,
    acceptSuggestion,
    dismissSuggestion,
    publish,
    showSuggestions,
  } = usePlanner();

  const ctx = {
    selectedId,
    openDetails: (id) => {
      setSelectedId(id);
      setMenuId(null);
    },
    moveTo,
    menuId,
    setMenuId,
    routineIds,
    acceptSuggestion,
    dismissSuggestion,
    canCompact,
  };

  const suggestionCount = openSuggestions.length;
  const oneSubject = SUBJECTS[setup.subjects[0]];

  return (
    <PageShell>
      {/* Sandbox-only: preview the planner for different teaching assignments */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <label
          htmlFor="setup"
          style={{
            background: "rgba(255,255,255,.92)",
            border: "1px dashed #B9A6F5",
            borderRadius: 999,
            padding: "5px 6px 5px 14px",
            color: INK,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            flexWrap: "wrap",
          }}
        >
          <strong>Sandbox · Preview as:</strong>
          <select
            id="setup"
            value={setupKey}
            onChange={(e) => setSetupKey(e.target.value)}
            style={{ border: `1px solid ${LINE}`, borderRadius: 999, padding: "4px 10px", fontFamily: "inherit", fontSize: 13, color: INK, background: "#fff" }}
          >
            {Object.entries(TEACHER_SETUPS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ background: PAPER, borderRadius: 20, boxShadow: "0 16px 50px rgba(60,40,130,.22)" }}>
        {/* Header */}
        <div
          style={{
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Button aria-label="Previous week" onClick={() => setToast({ text: "Other weeks open in a later CI2.0 build." })}>
              ‹
            </Button>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", margin: 0, color: INK }}>This Week · {DEMO_WEEK.label}</h1>
            <Button aria-label="Next week" onClick={() => setToast({ text: "Other weeks open in a later CI2.0 build." })}>
              ›
            </Button>
            <button
              type="button"
              onClick={() => setShowLevels(true)}
              style={{ background: "#F3EFFC", border: "none", borderRadius: 999, padding: "6px 12px", fontSize: 13, color: INK, cursor: "pointer", fontFamily: "inherit" }}
            >
              {levelTitle} · <span style={{ color: "#6D3FD9", fontWeight: 700 }}>Change</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            {published ? (
              <span style={{ fontWeight: 700, color: "#15803D", background: "#DCFCE7", borderRadius: 999, padding: "10px 18px" }}>✓ Week published</span>
            ) : (
              <Button kind="primary" onClick={publish}>
                Publish week
              </Button>
            )}
            <span style={{ fontSize: 12, color: MUTED, textAlign: "right" }}>For {classList} · student work opens Mon, Oct 6 at 7:00 AM</span>
          </div>
        </div>

        {/* Controls + SAM strip */}
        <div
          style={{
            padding: "12px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            borderBottom: `1px solid ${LINE}`,
            background: "#FAF8FF",
          }}
        >
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            {multiClass && (
              <div role="group" aria-label="Class" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Chip active={classFilter === "all"} onClick={() => setClassFilter("all")}>
                  All my classes
                </Chip>
                {setup.classes.map((c) => (
                  <Chip key={c.key} active={classFilter === c.key} onClick={() => setClassFilter(c.key)}>
                    {c.name}
                  </Chip>
                ))}
              </div>
            )}
            {multiClass && multiSubject && <span aria-hidden="true" style={{ width: 1, height: 24, background: LINE }} />}
            {multiSubject ? (
              <div role="group" aria-label="Subject" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Chip active={subjectFilter === "all"} onClick={() => setSubjectFilter("all")}>
                  All subjects
                </Chip>
                {setup.subjects.map((k) => (
                  <Chip key={k} active={subjectFilter === k} color={SUBJECTS[k].color} onClick={() => setSubjectFilter(k)}>
                    {SUBJECTS[k].name}
                  </Chip>
                ))}
              </div>
            ) : (
              <span style={{ fontSize: 14, color: MUTED, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: oneSubject.color }} />
                <strong style={{ color: INK }}>{oneSubject.name}</strong> · Unit: {oneSubject.unit}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: INK }}>
              <SamIcon skinKey="cosmic" size={26} />
              <span>Your week is ready to review.</span>
              {suggestionCount > 0 && (
                <button
                  type="button"
                  onClick={showSuggestions}
                  style={{
                    background: "#FFF1E0",
                    border: "1px solid #F5C58B",
                    borderRadius: 999,
                    padding: "2px 10px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#9A4A00",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {suggestionCount} suggestion{suggestionCount === 1 ? "" : "s"}
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setToast({ text: "Grading opens in the Check area in a later CI2.0 build." })}
              style={{ background: "transparent", border: "none", color: "#6D3FD9", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: 0 }}
            >
              {DEMO_WEEK.gradingCount} to grade →
            </button>
          </div>
        </div>

        {/* Five-day planner */}
        <div className="v2-planner-scroll">
          <div className="v2-planner-grid">
            {DAYS.map((d, dayIndex) => {
              const dayActs = visible.filter((x) => x.day === dayIndex);
              const dayMinutes = dayActs.reduce((m, x) => m + x.minutes, 0);
              const hasSuggestion = openSuggestions.some((s) => s.day === dayIndex);
              return (
                <section
                  key={d}
                  id={`day-${dayIndex}`}
                  aria-label={`${DAY_NAMES[dayIndex]}, ${DATES[dayIndex]}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dragOverDay !== dayIndex) setDragOverDay(dayIndex);
                  }}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setDragOverDay(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverDay(null);
                    moveTo(e.dataTransfer.getData("text/plain"), dayIndex);
                  }}
                  style={{
                    background: dragOverDay === dayIndex ? "#EFE9FF" : "#F6F4FB",
                    border: `1px solid ${dragOverDay === dayIndex ? "#B9A6F5" : LINE}`,
                    borderRadius: 14,
                    padding: 12,
                    display: "grid",
                    gap: 14,
                    alignContent: "start",
                    minHeight: 220,
                    boxShadow: flashDays && hasSuggestion ? "0 0 0 3px #F5A55B" : "none",
                    transition: "box-shadow .2s",
                  }}
                >
                  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <h2 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", fontSize: 18, color: INK }}>
                      {DAY_NAMES[dayIndex]} <span style={{ fontWeight: 500, color: MUTED, fontSize: 14 }}>{DATES[dayIndex]}</span>
                    </h2>
                    <span style={{ fontSize: 12, color: MUTED, whiteSpace: "nowrap" }}>{dayMinutes} min</span>
                  </header>
                  {shownSubjects.map((sk) => {
                    const acts = dayActs.filter((x) => x.subject === sk).sort((p, q) => KIND_ORDER[p.kind] - KIND_ORDER[q.kind]);
                    const sugs = openSuggestions.filter((s) => s.subject === sk && s.day === dayIndex);
                    const key = `${dayIndex}-${sk}`;
                    const compact = canCompact && subjectFilter === "all" && !expandedSections[key];
                    return (
                      <SubjectSection
                        key={sk}
                        subjectKey={sk}
                        acts={acts}
                        suggestions={sugs}
                        setup={setup}
                        compact={compact}
                        showEmpty={shownSubjects.length === 2}
                        hideHeader={shownSubjects.length === 1}
                        onToggleCompact={() => setExpandedSections((o) => ({ ...o, [key]: !o[key] }))}
                        ctx={ctx}
                      />
                    );
                  })}
                  {dayActs.length === 0 && shownSubjects.length === 1 && (
                    <div style={{ fontSize: 14, color: MUTED }}>Nothing planned. Drag an activity here.</div>
                  )}
                </section>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "8px 22px 16px", fontSize: 13, color: MUTED, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <span>Click an activity for details · Drag it to another day, or use ⋯ → Move to</span>
          {canCompact && subjectFilter === "all" && <span>Subjects are compact · click a subject name to see details</span>}
        </div>
      </div>

      <style>{`
        .v2-planner-scroll { overflow-x: auto; padding: 16px 22px 6px; }
        .v2-planner-grid { display: grid; grid-template-columns: repeat(5, minmax(210px, 1fr)); gap: 12px; align-items: start; min-width: 1100px; }
        @media (max-width: 720px) {
          .v2-planner-scroll { overflow-x: visible; padding: 12px; }
          .v2-planner-grid { grid-template-columns: 1fr; min-width: 0; }
        }
      `}</style>

      <DetailsPanel
        act={selected}
        setup={setup}
        onClose={() => setSelectedId(null)}
        onMoveTo={moveTo}
        onRemove={remove}
        onPreview={() => setToast({ text: "Activity preview opens in a later CI2.0 build." })}
        onToggleClass={toggleClass}
      />
      {showLevels && <LevelDrawer level={level} onChoose={setLevel} onClose={() => setShowLevels(false)} />}
      <Toast toast={toast} />
    </PageShell>
  );
}
