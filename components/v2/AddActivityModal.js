"use client";

import { useEffect, useState } from "react";
import { ADD_TYPES } from "../../lib/v2/routines";
import { SUBJECTS, DAY_NAMES } from "../../lib/v2/demoWeek";
import { INK, MUTED, LINE, LAVENDER, SOFT_LAV } from "./StationShell";

/**
 * Skeleton + Add assignment picker for This Week / Daily Focus.
 * Type · subject · day · period (if multi-class) → adds a demo tile.
 */
export function AddActivityModal({
  open,
  onClose,
  onAdd,
  subjects,
  classes,
  multiClass,
  defaults,
}) {
  const firstSubject = subjects?.[0] || "math";
  const firstClass = classes?.[0]?.key || "A";

  const [typeKey, setTypeKey] = useState("lesson");
  const [subject, setSubject] = useState(firstSubject);
  const [day, setDay] = useState(2);
  const [classKey, setClassKey] = useState("all");

  useEffect(() => {
    if (!open) return;
    setTypeKey(defaults?.typeKey || "lesson");
    setSubject(defaults?.subject || firstSubject);
    setDay(defaults?.day != null ? defaults.day : 2);
    setClassKey(defaults?.classKey || (multiClass ? firstClass : "all"));
  }, [open, defaults, firstSubject, firstClass, multiClass]);

  if (!open) return null;

  function submit(e) {
    e?.preventDefault?.();
    onAdd({ typeKey, subject, day: Number(day), classKey: multiClass ? classKey : "all" });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add assignment"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,36,89,.40)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 46,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{
          background: "rgba(255,255,255,.97)",
          borderRadius: 22,
          padding: "22px 22px 18px",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 24px 60px rgba(46,36,89,.28)",
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 22, color: INK }}>+ Add assignment</h2>
            <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 13 }}>
              Skeleton picker — drops a demo tile on the board.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ border: "none", background: "transparent", color: MUTED, fontWeight: 700, cursor: "pointer", fontSize: 20 }}
          >
            ×
          </button>
        </div>

        <fieldset style={{ border: "none", margin: "16px 0 0", padding: 0 }}>
          <legend style={legendStyle()}>Type</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ADD_TYPES.map((t) => {
              const on = t.key === typeKey;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTypeKey(t.key)}
                  aria-pressed={on}
                  style={{
                    border: `1px solid ${on ? LAVENDER : LINE}`,
                    background: on ? LAVENDER : "#fff",
                    color: on ? "#fff" : INK,
                    borderRadius: 999,
                    padding: "7px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", margin: "14px 0 0", padding: 0 }}>
          <legend style={legendStyle()}>Subject</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(subjects || []).map((k) => {
              const on = k === subject;
              const sub = SUBJECTS[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSubject(k)}
                  aria-pressed={on}
                  style={{
                    border: `1px solid ${on ? LAVENDER : LINE}`,
                    background: on ? "rgba(139,108,255,.12)" : "#fff",
                    color: INK,
                    borderRadius: 999,
                    padding: "7px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: sub?.color || LAVENDER }} />
                  {sub?.name || k}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", margin: "14px 0 0", padding: 0 }}>
          <legend style={legendStyle()}>Day</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DAY_NAMES.map((name, i) => {
              const on = i === Number(day);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setDay(i)}
                  aria-pressed={on}
                  style={{
                    border: `1px solid ${on ? LAVENDER : LINE}`,
                    background: on ? LAVENDER : "#fff",
                    color: on ? "#fff" : INK,
                    borderRadius: 999,
                    padding: "7px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </fieldset>

        {multiClass && (
          <fieldset style={{ border: "none", margin: "14px 0 0", padding: 0 }}>
            <legend style={legendStyle()}>Period</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                type="button"
                onClick={() => setClassKey("all")}
                aria-pressed={classKey === "all"}
                style={periodBtn(classKey === "all")}
              >
                All periods
              </button>
              {(classes || []).map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setClassKey(c.key)}
                  aria-pressed={classKey === c.key}
                  style={periodBtn(classKey === c.key)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: INK,
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Add to board
          </button>
        </div>
      </form>
    </div>
  );
}

/** Lavender glass + Add CTA used in headers and per-day columns. */
export function AddActivityButton({ onClick, label = "+ Add", compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${LAVENDER}`,
        background: "rgba(139,108,255,.10)",
        color: LAVENDER,
        borderRadius: 999,
        padding: compact ? "5px 10px" : "10px 16px",
        fontWeight: 700,
        fontSize: compact ? 12 : 14,
        cursor: "pointer",
        fontFamily: "inherit",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 14px rgba(139,108,255,.12)",
      }}
    >
      {label}
    </button>
  );
}

function legendStyle() {
  return {
    fontSize: 12,
    fontWeight: 800,
    color: MUTED,
    letterSpacing: 0.3,
    marginBottom: 8,
    padding: 0,
  };
}

function periodBtn(on) {
  return {
    border: `1px solid ${on ? LAVENDER : LINE}`,
    background: on ? SOFT_LAV : "#fff",
    color: INK,
    borderRadius: 999,
    padding: "7px 12px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
