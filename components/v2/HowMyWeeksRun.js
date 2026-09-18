"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADD_TYPES,
  applyBlankChange,
  openOffers,
  pickerOptions,
  routineSentenceParts,
} from "../../lib/v2/routines";
import { SUBJECTS, handsOffLevelMeta } from "../../lib/v2/demoWeek";
import { INK, MUTED, LINE, LAVENDER, MINT, CREAM, SOFT_LAV } from "./StationShell";

/**
 * How my weeks run — drawer with routine sentence chips + SAM offers.
 * Tap a blank → small picker. Link to Sunday preview.
 */
export function HowMyWeeksRunDrawer({
  open,
  onClose,
  routines,
  subjects,
  dialLevel,
  onUpdateRoutine,
  onAddRoutine,
  onToggleRoutine,
  onAcceptOffer,
  onDismissOffer,
  dismissedOffers,
  onOpenSundayPreview,
  onApplyToWeek,
  sundayApplied,
  onOpenHandsOff,
}) {
  const [picker, setPicker] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) setPicker(null);
  }, [open]);

  useEffect(() => {
    if (!picker) return;
    const close = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setPicker(null);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [picker]);

  if (!open) return null;

  const active = (routines || []).filter((r) => subjects.includes(r.subject));
  const offers = openOffers(dismissedOffers, subjects);
  const meta = handsOffLevelMeta(dialLevel);

  function openPickerFor(routineId, blank, e) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPicker({
      routineId,
      blank,
      top: rect.bottom + 6,
      left: Math.min(rect.left, (typeof window !== "undefined" ? window.innerWidth : 400) - 220),
    });
  }

  function choose(value) {
    if (!picker) return;
    const r = active.find((x) => x.id === picker.routineId);
    if (!r) return;
    onUpdateRoutine(applyBlankChange(r, picker.blank, value));
    setPicker(null);
  }

  const pickerOpts = picker ? pickerOptions(picker.blank, subjects) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How my weeks run"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,36,89,.40)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 45,
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(440px, 100vw)",
          height: "100%",
          background: "#FBFaff",
          borderLeft: `1px solid ${LINE}`,
          boxShadow: "-16px 0 48px rgba(46,36,89,.22)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <header style={{ padding: "18px 18px 12px", borderBottom: `1px solid ${LINE}`, background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 22, color: INK }}>
                How my weeks run
              </h2>
              <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 13, lineHeight: 1.4 }}>
                Routines read like a sentence — tap a blank to change it.
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

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
              background: SOFT_LAV,
              borderRadius: 12,
              padding: "10px 12px",
              border: `1px solid ${LINE}`,
            }}
          >
            <span style={{ fontSize: 13, color: INK, fontWeight: 650, flex: 1, minWidth: 160 }}>
              Hands-off: <strong>{meta?.short || meta?.title || dialLevel}</strong>
              {meta?.dialHint ? <span style={{ color: MUTED, fontWeight: 500 }}> · {meta.dialHint}</span> : null}
            </span>
            {onOpenHandsOff && (
              <button type="button" onClick={onOpenHandsOff} style={chipBtn()}>
                Change dial
              </button>
            )}
          </div>
        </header>

        <div style={{ flex: 1, overflow: "auto", padding: "14px 16px 24px" }}>
          <section aria-label="Weekly routines">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: INK, letterSpacing: 0.3 }}>
                WEEKLY ROUTINES
              </h3>
              <span style={{ fontSize: 12, color: MUTED }}>{active.filter((r) => r.enabled).length} on</span>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {active.length === 0 && (
                <div style={{ color: MUTED, fontSize: 14, padding: "8px 2px" }}>
                  No routines for this setup yet — add one below.
                </div>
              )}
              {active.map((r) => (
                <RoutineSentenceChip
                  key={r.id}
                  routine={r}
                  onBlankClick={(blank, e) => openPickerFor(r.id, blank, e)}
                  onToggle={() => onToggleRoutine(r.id)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onAddRoutine}
              style={{
                marginTop: 12,
                width: "100%",
                border: `1px dashed ${LAVENDER}`,
                background: "#fff",
                color: LAVENDER,
                borderRadius: 14,
                padding: "12px 14px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              + Add routine
            </button>
          </section>

          {offers.length > 0 && (
            <section aria-label="SAM offers" style={{ marginTop: 22 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 800, color: INK, letterSpacing: 0.3 }}>
                SAM NOTICED
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                {offers.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      background: o.type === "hands_off_bump" ? MINT : CREAM,
                      border: `1px solid ${LINE}`,
                      borderRadius: 14,
                      padding: "12px 12px 10px",
                    }}
                  >
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.4, marginBottom: 10 }}>{o.text}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button type="button" onClick={() => onAcceptOffer(o)} style={primaryBtn()}>
                        {o.acceptLabel}
                      </button>
                      <button type="button" onClick={() => onDismissOffer(o.id)} style={chipBtn()}>
                        Not now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{ marginTop: 22 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 800, color: INK, letterSpacing: 0.3 }}>
              SAFETY NET
            </h3>
            <p style={{ margin: "0 0 10px", color: MUTED, fontSize: 13, lineHeight: 1.4 }}>
              Sunday preview already covers what goes out — peek anytime before assigns run.
            </p>
            {onOpenSundayPreview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSundayPreview();
                }}
                style={primaryBtn()}
              >
                Preview what goes out
              </button>
            )}
            {onApplyToWeek && (
              <button
                type="button"
                onClick={() => {
                  onApplyToWeek();
                  onClose();
                }}
                style={chipBtn()}
              >
                {sundayApplied ? "Applied to This Week ✓" : "Apply to This Week"}
              </button>
            )}
          </section>

          <p style={{ marginTop: 20, fontSize: 12, color: MUTED, lineHeight: 1.4 }}>
            Target activities from any product ({ADD_TYPES.map((a) => a.label).join(", ")}). Real auto-assign is still a
            stub — the board reflects routines when Plan for me / Run it is on.
          </p>
        </div>

        {picker && (
          <div
            role="listbox"
            aria-label={`Choose ${picker.blank}`}
            style={{
              position: "fixed",
              top: picker.top,
              left: Math.max(8, picker.left),
              zIndex: 50,
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderRadius: 12,
              boxShadow: "0 12px 32px rgba(46,36,89,.22)",
              padding: 6,
              minWidth: 180,
              maxWidth: 260,
              maxHeight: 240,
              overflow: "auto",
            }}
          >
            {pickerOpts.map((o) => (
              <button
                key={o.key}
                type="button"
                role="option"
                onClick={() => choose(o.key)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  padding: "8px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 650,
                  color: INK,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = SOFT_LAV;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {o.color && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: o.color,
                      marginRight: 8,
                    }}
                  />
                )}
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoutineSentenceChip({ routine, onBlankClick, onToggle }) {
  const parts = routineSentenceParts(routine);
  const sub = SUBJECTS[routine.subject];
  const off = !routine.enabled;

  return (
    <div
      style={{
        background: off ? "#F4F1FA" : "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        padding: "12px 12px 10px",
        opacity: off ? 0.72 : 1,
        boxShadow: off ? "none" : "0 4px 14px rgba(46,36,89,.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8, alignItems: "center" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: sub?.color || MUTED,
            textTransform: "uppercase",
            letterSpacing: 0.3,
          }}
        >
          {sub?.name || routine.subject}
          {off ? " · off" : ""}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={routine.enabled}
          style={{
            border: `1px solid ${routine.enabled ? LAVENDER : LINE}`,
            background: routine.enabled ? "rgba(139,108,255,.10)" : "#fff",
            color: routine.enabled ? LAVENDER : MUTED,
            borderRadius: 999,
            padding: "3px 10px",
            fontWeight: 700,
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {routine.enabled ? "On" : "Off"}
        </button>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: INK, fontWeight: 500 }}>
        {parts.map((part, i) => {
          if (!part.blank) return <span key={i}>{part.text}</span>;
          return (
            <button
              key={i}
              type="button"
              onClick={(e) => onBlankClick(part.blank, e)}
              disabled={off}
              title={`Change ${part.blank}`}
              style={{
                display: "inline",
                border: "none",
                borderBottom: `2px solid ${sub?.color || LAVENDER}`,
                background: "rgba(139,108,255,.08)",
                color: INK,
                fontWeight: 800,
                fontSize: 14,
                fontFamily: "inherit",
                cursor: off ? "default" : "pointer",
                padding: "0 3px",
                borderRadius: 4,
                lineHeight: 1.4,
              }}
            >
              {part.text}
            </button>
          );
        })}
      </p>
    </div>
  );
}

export function WeeksRunEntry({ onOpen, routineCount }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: `1px solid ${LINE}`,
        background: "#fff",
        color: INK,
        borderRadius: 999,
        padding: "6px 12px",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
      title="Weekly routines & how weeks run"
    >
      How my weeks run
      {routineCount != null && routineCount > 0 ? <span style={{ color: LAVENDER }}>· {routineCount}</span> : null}
    </button>
  );
}

function primaryBtn() {
  return {
    border: "none",
    background: LAVENDER,
    color: "#fff",
    borderRadius: 999,
    padding: "8px 14px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}

function chipBtn() {
  return {
    border: `1px solid ${LINE}`,
    background: "#fff",
    color: INK,
    borderRadius: 999,
    padding: "7px 12px",
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
