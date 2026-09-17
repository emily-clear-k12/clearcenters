"use client";

// CI2.0 · shared building blocks for teacher pages (buttons, toast with
// undo, the "How my weeks run" dialog, and the page frame with the
// ClearCenters space art around the edges).

import V2TopBar from "./V2TopBar";
import { COLORS, sceneWrapperStyle, sceneCanvasStyle } from "../../lib/teacherTheme";
import { DEMO_TEACHER, HANDS_OFF_LEVELS } from "../../lib/v2/demoWeek";

const BG = "/teacher/console/bg-platform-room.jpg";

export function Button({ children, onClick, kind = "secondary", style = {}, ...rest }) {
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

export function LevelDrawer({ level, onChoose, onClose }) {
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


export function Toast({ toast }) {
  if (!toast) return null;
  return (
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
  );
}

export function PageShell({ children, maxWidth = 1480 }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas }}>
      <V2TopBar active="plan" teacherName={DEMO_TEACHER.name} />
      <div style={sceneWrapperStyle({ minHeight: "calc(100vh - 60px)" })}>
        <div aria-hidden="true" style={sceneCanvasStyle(BG)} />
        <main style={{ position: "relative", maxWidth, margin: "0 auto", padding: "20px clamp(12px, 2.5vw, 32px) 80px" }}>{children}</main>
      </div>
    </div>
  );
}
