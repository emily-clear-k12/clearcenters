"use client";

import { useEffect, useState } from "react";
import {
  DEMO_WORD_CHIPS,
  loadStudentTools,
  saveStudentTools,
  selectWordChip,
  toggleHighlightStub,
  toggleReadAloudFake,
  wordChipById,
  STUDENT_TOOLS_KEY,
  TOOLS_SAM_TIP_LINE,
  shouldShowToolsSamTip,
  markToolsSamTipSeen,
} from "../../lib/v2/demoStudentTools";
import {
  loadStudentPrefs,
  TEXT_SIZE_CLASS,
  textSizeFontPx,
  playCalmClick,
} from "../../lib/v2/demoStudentPrefs";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const LAVENDER = "#8B6CFF";
const CREAM = "#FFF8EE";
const SOFT_LAV = "#F3EEFF";
const AMBER_FG = "#A67C3D";
const AMBER_BG = "rgba(255, 236, 210, 0.88)";
const AMBER_BORDER = "rgba(212, 168, 98, 0.42)";

/**
 * Student glass Tools stub — read-aloud (fake play), word chips, highlight.
 * Used as page body or inline panel from My Day / activity.
 */
export default function StudentToolsPanel({
  compact = false,
  onClose = null,
  backHref = "/v2/student",
}) {
  const [state, setState] = useState(() => ({ ...loadStudentTools(), hydrated: false }));
  const [textSize, setTextSize] = useState(() => loadStudentPrefs().textSize || "M");
  const [samTip, setSamTip] = useState(null);

  function refresh() {
    setState({ ...loadStudentTools(), hydrated: true });
  }

  function refreshPrefs() {
    setTextSize(loadStudentPrefs().textSize || "M");
  }

  useEffect(() => {
    refresh();
    refreshPrefs();
    playCalmClick(); // Tools open — calm click when soundOn
    // First Tools open per session/kid — one calm SAM line (not spammy).
    // Defer session mark so React Strict Mode remount still shows the tip once.
    let tipTimer = null;
    if (shouldShowToolsSamTip()) {
      setSamTip(TOOLS_SAM_TIP_LINE);
      tipTimer = setTimeout(() => markToolsSamTipSeen(), 400);
    }
    const onStorage = (e) => {
      if (!e.key || e.key === STUDENT_TOOLS_KEY) refresh();
      if (!e.key || e.key.startsWith("ci2.student.prefs.")) refreshPrefs();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-student-tools-updated", refresh);
    window.addEventListener("ci2-student-prefs-updated", refreshPrefs);
    return () => {
      if (tipTimer) clearTimeout(tipTimer);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-student-tools-updated", refresh);
      window.removeEventListener("ci2-student-prefs-updated", refreshPrefs);
    };
  }, []);

  const chip = wordChipById(state.selectedChipId);

  function playReadAloud() {
    setState({ ...toggleReadAloudFake(), hydrated: true });
  }

  function onChip(id) {
    setState({ ...selectWordChip(id), hydrated: true });
  }

  function onHighlight() {
    setState({ ...toggleHighlightStub(), hydrated: true });
  }

  function resetTools() {
    setState({
      ...saveStudentTools({
        readAloudPlaying: false,
        selectedChipId: null,
        highlightOn: false,
      }),
      hydrated: true,
    });
  }

  const sizeClass = TEXT_SIZE_CLASS[textSize] || TEXT_SIZE_CLASS.M;

  return (
    <div
      className={sizeClass}
      data-ci2-text-size={textSize}
      style={{
        background: "rgba(255,255,255,.88)",
        border: `1px solid ${LINE}`,
        borderRadius: 22,
        padding: compact ? "16px 16px 18px" : "22px 20px 24px",
        boxShadow: "0 12px 36px rgba(139,108,255,.14)",
        backdropFilter: "blur(10px)",
        fontSize: `${textSizeFontPx(textSize)}px`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: LAVENDER, letterSpacing: 0.4 }}>TOOLS · STUB</div>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              margin: "4px 0 0",
              fontSize: compact ? 22 : 26,
              color: INK,
            }}
          >
            Calm helpers
          </h2>
          <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 14, lineHeight: 1.4 }}>
            Read aloud, word chips, and a soft highlight — practice only. Real voice comes later.
          </p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} style={ghostBtn()}>
            Close
          </button>
        ) : null}
      </div>

      {samTip ? (
        <div
          role="status"
          style={{
            marginTop: 14,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            background: "rgba(255,255,255,.88)",
            border: `1px solid ${LINE}`,
            borderRadius: 16,
            padding: "10px 12px",
          }}
        >
          <div
            aria-hidden
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "linear-gradient(145deg, #B8A4FF, #8B6CFF)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            SAM
          </div>
          <p style={{ margin: 0, color: INK, fontSize: 14, lineHeight: 1.4, paddingTop: 6 }}>{samTip}</p>
        </div>
      ) : null}

      {/* Read aloud */}
      <section aria-label="Read aloud" style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.3, marginBottom: 8 }}>
          READ ALOUD
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            background: state.readAloudPlaying ? SOFT_LAV : CREAM,
            border: `1px solid ${state.readAloudPlaying ? "#D9CFFF" : LINE}`,
            borderRadius: 16,
            padding: "12px 14px",
          }}
        >
          <button
            type="button"
            onClick={playReadAloud}
            style={{
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 16px rgba(139,108,255,.28)",
            }}
          >
            {state.readAloudPlaying ? "Pause · fake" : "Play · fake"}
          </button>
          <span style={{ fontSize: 13, color: INK, fontWeight: 600 }}>
            {state.readAloudPlaying
              ? "Pretend voice is reading… (no audio yet)"
              : "Tap play for a pretend read-aloud."}
          </span>
        </div>
      </section>

      {/* Word chips */}
      <section aria-label="Word chips" style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.3, marginBottom: 8 }}>
          WORD CHIPS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DEMO_WORD_CHIPS.map((c) => {
            const on = state.selectedChipId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onChip(c.id)}
                style={{
                  border: on ? `2px solid ${LAVENDER}` : `1px solid ${LINE}`,
                  background: on ? SOFT_LAV : "#fff",
                  color: INK,
                  borderRadius: 999,
                  padding: "8px 14px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {c.word}
              </button>
            );
          })}
        </div>
        {chip && (
          <div
            role="status"
            style={{
              marginTop: 10,
              background: SOFT_LAV,
              border: `1px solid #E8E0FF`,
              borderRadius: 14,
              padding: "10px 12px",
              fontSize: 14,
              color: INK,
            }}
          >
            <strong>{chip.word}</strong> — {chip.hint}
          </div>
        )}
      </section>

      {/* Highlight stub */}
      <section aria-label="Highlight" style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.3, marginBottom: 8 }}>
          HIGHLIGHT · STUB
        </div>
        <button
          type="button"
          onClick={onHighlight}
          style={{
            border: `1px solid ${state.highlightOn ? AMBER_BORDER : LINE}`,
            background: state.highlightOn ? AMBER_BG : "#fff",
            color: state.highlightOn ? AMBER_FG : INK,
            borderRadius: 999,
            padding: "9px 16px",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {state.highlightOn ? "Highlight on · amber" : "Turn highlight on"}
        </button>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 14,
            lineHeight: 1.5,
            color: INK,
            background: state.highlightOn ? AMBER_BG : "transparent",
            borderRadius: 12,
            padding: state.highlightOn ? "10px 12px" : 0,
            border: state.highlightOn ? `1px solid ${AMBER_BORDER}` : "none",
          }}
        >
          {state.highlightOn ? (
            <>
              Sample line with a soft{" "}
              <mark style={{ background: "rgba(255, 214, 140, 0.85)", color: INK, padding: "0 3px", borderRadius: 4 }}>
                amber wash
              </mark>{" "}
              — real text select comes later.
            </>
          ) : (
            "When you turn it on, a soft amber wash marks a sample line (demo only)."
          )}
        </p>
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20, alignItems: "center" }}>
        <button type="button" onClick={resetTools} style={ghostBtn()}>
          Reset tools
        </button>
        {!onClose && backHref ? (
          <a href={backHref} style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            ← Back
          </a>
        ) : null}
        <span style={{ fontSize: 12, color: MUTED }}>Saved on this device</span>
      </div>
    </div>
  );
}

function ghostBtn() {
  return {
    border: `1px solid ${LINE}`,
    background: "rgba(255,255,255,.85)",
    color: INK,
    borderRadius: 999,
    padding: "8px 14px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
