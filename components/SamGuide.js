"use client";

import React, { useEffect, useRef, useState } from "react";
import SamStage from "./SamStage";

/**
 * SamGuide — reusable floating S.A.M. companion (Briefings-first).
 *
 * Speech bubble: navy comms plate by default (side). Field Brief pages pass
 * bubblePlacement="above" for a light teal plate sitting over S.A.M. so it
 * does not cover the story text.
 */
const DEFAULT_HOME = { right: 18, bottom: 18 };

const COMMS = {
  navy: "#0D1B2A",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  violet: "#7B5DFF",
  teal: "#E6F8F9",
  tealInk: "#00C2C7",
  ink: "#1F2A44",
};

function resolveAnchor(anchors, key) {
  if (!key) return anchors?.home || DEFAULT_HOME;
  return anchors?.[key] || anchors?.home || DEFAULT_HOME;
}

function toPositionStyle(pos) {
  const style = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
  };
  if (pos.top != null) style.top = typeof pos.top === "number" ? `${pos.top}px` : pos.top;
  if (pos.right != null) style.right = typeof pos.right === "number" ? `${pos.right}px` : pos.right;
  if (pos.bottom != null) style.bottom = typeof pos.bottom === "number" ? `${pos.bottom}px` : pos.bottom;
  if (pos.left != null) style.left = typeof pos.left === "number" ? `${pos.left}px` : pos.left;
  if (pos.top == null && pos.bottom == null) style.bottom = "18px";
  if (pos.left == null && pos.right == null) style.right = "18px";
  return style;
}

export default function SamGuide({
  skinKey,
  alt = "S.A.M.",
  size = 110,
  anchors = { home: DEFAULT_HOME },
  activeAnchor = "home",
  line = "",
  state = "idle",
  tipOnTap = "",
  onDismiss,
  onTap,
  fixed = true,
  zIndex = 30,
  bubbleSide = "left",
  bubblePlacement = "side",
}) {
  const [displayAnchor, setDisplayAnchor] = useState(activeAnchor);
  const [animState, setAnimState] = useState(state === "moving" ? "idle" : state);
  const [showLine, setShowLine] = useState(Boolean(line));
  const [tapTip, setTapTip] = useState("");
  const transitTimer = useRef(null);
  const prevAnchor = useRef(activeAnchor);

  useEffect(() => {
    if (activeAnchor === prevAnchor.current) {
      if (state !== "moving") setAnimState(state);
      return;
    }
    prevAnchor.current = activeAnchor;
    setAnimState("moving");
    if (transitTimer.current) clearTimeout(transitTimer.current);
    requestAnimationFrame(() => setDisplayAnchor(activeAnchor));
    transitTimer.current = setTimeout(() => {
      const settle =
        state === "celebrating" || state === "thinking" || state === "helping"
          ? state
          : "helping";
      setAnimState(settle);
    }, 520);
    return () => {
      if (transitTimer.current) clearTimeout(transitTimer.current);
    };
  }, [activeAnchor, state]);

  useEffect(() => {
    setShowLine(Boolean(line));
    if (line) setTapTip("");
  }, [line]);

  const pos = toPositionStyle(resolveAnchor(anchors, displayAnchor));
  const bubbleText = tapTip || line;
  const visibleBubble = showLine && bubbleText;
  const fromLeft = bubbleSide === "left";
  const above = bubblePlacement === "above";

  function handleTap() {
    if (onTap) onTap();
    if (tipOnTap) {
      setTapTip(tipOnTap);
      setShowLine(true);
      setAnimState("thinking");
    }
  }

  function handleDismiss(e) {
    e?.stopPropagation?.();
    setShowLine(false);
    setTapTip("");
    if (onDismiss) onDismiss();
  }

  const bubbleStyle = above
    ? {
        position: "absolute",
        left: "50%",
        bottom: size + 6,
        transform: "translateX(-50%)",
        width: 260,
        maxWidth: "min(280px, 72vw)",
        background: COMMS.teal,
        borderRadius: 14,
        border: `1.5px solid ${COMMS.tealInk}`,
        boxShadow: "0 8px 20px rgba(13,27,42,.12)",
        padding: "10px 28px 12px 14px",
        fontSize: 14,
        color: COMMS.ink,
        lineHeight: 1.4,
        fontFamily: "'Poppins', system-ui, sans-serif",
        fontWeight: 500,
        textAlign: "left",
      }
    : {
        position: "absolute",
        bottom: size * 0.35,
        ...(fromLeft ? { right: size + 8, left: "auto" } : { left: size + 8, right: "auto" }),
        width: 208,
        maxWidth: "min(220px, 42vw)",
        background: COMMS.navy,
        borderRadius: 14,
        border: `1.5px solid ${COMMS.gold}`,
        boxShadow: "0 8px 24px rgba(123,93,255,.28), 0 10px 22px rgba(13,27,42,.35)",
        padding: fromLeft ? "10px 28px 12px 14px" : "10px 14px 12px 28px",
        fontSize: 13,
        color: COMMS.cream,
        lineHeight: 1.35,
        fontFamily: "'Poppins', system-ui, sans-serif",
        fontWeight: 500,
        textAlign: "left",
      };

  const accentStyle = {
    position: "absolute",
    top: 10,
    bottom: 10,
    width: 2,
    background: above ? COMMS.tealInk : COMMS.gold,
    borderRadius: 2,
    left: 8,
  };

  const tailStyle = above
    ? {
        position: "absolute",
        left: "50%",
        bottom: -5,
        width: 10,
        height: 10,
        background: COMMS.teal,
        borderRight: `1.5px solid ${COMMS.tealInk}`,
        borderBottom: `1.5px solid ${COMMS.tealInk}`,
        transform: "translateX(-50%) rotate(45deg)",
      }
    : {
        position: "absolute",
        bottom: 16,
        width: 10,
        height: 10,
        background: COMMS.navy,
        borderRight: `1.5px solid ${COMMS.gold}`,
        borderBottom: `1.5px solid ${COMMS.gold}`,
        transform: fromLeft ? "rotate(-45deg)" : "rotate(135deg)",
        ...(fromLeft ? { right: -6 } : { left: -6 }),
      };

  const labelColor = above ? COMMS.tealInk : COMMS.gold;

  return (
    <div
      style={{
        position: fixed ? "fixed" : "absolute",
        zIndex,
        transition: "top 0.5s ease, right 0.5s ease, bottom 0.5s ease, left 0.5s ease",
        ...pos,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", pointerEvents: "auto" }}>
        <SamStage
          skinKey={skinKey}
          alt={alt}
          size={size}
          state={animState}
          onClick={handleTap}
        />
        {visibleBubble && (
          <div style={bubbleStyle} role="status">
            <div style={accentStyle} aria-hidden="true" />
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.4,
                textTransform: "uppercase",
                color: labelColor,
                marginBottom: 4,
                paddingRight: 8,
              }}
            >
              {alt || "S.A.M."}
            </div>
            <div style={{ paddingRight: 4 }}>{bubbleText}</div>
            <button
              type="button"
              aria-label="Dismiss tip"
              onClick={handleDismiss}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 24,
                height: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: labelColor,
                fontSize: 16,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
            <div style={tailStyle} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
