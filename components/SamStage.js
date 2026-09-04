"use client";

import React from "react";
import SamIcon from "./SamIcon";

// Sept 4, 2026 — S.A.M.'s standalone "companion" presence, as opposed to
// the small chat-avatar-style <SamIcon> instances that sit next to hint
// text inside activities (those stay small on purpose — they're reading
// as part of a sentence, not as a character on screen).
//
// Built because Emily flagged that every existing S.A.M. instance was a
// 58-64px button stuffed in a corner — too small for the new animation
// packs (720x560 renders with real motion) to read at all. This renders
// S.A.M. much bigger (default 150px) with a soft blurred "grounding"
// shadow beneath it, so it reads as standing in a real spot on the
// screen rather than floating at an arbitrary size — a CSS-only platform,
// no art asset required, so it ships today independent of Emily's art.
//
// `state` is accepted but not used yet — SamIcon only ever renders a
// static skin image right now. Once all 4 skins have full animation packs
// (only Cosmic does as of Sept 4 — see SAM_Companion_Concept_v1.md §9
// idea #2), this is the prop that will pick idle/thinking/celebrating/etc.
// Kept here now, even unused, specifically so wiring real animations in
// later means changing what this component does with `state`, not
// re-finding and re-editing every place S.A.M.'s companion appears.
export default function SamStage({ skinKey, alt = "S.A.M.", size = 150, state = "idle", onClick, style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        width: size,
        height: size,
        background: "none",
        border: "none",
        padding: 0,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {/* The "platform" — a soft blurred shadow anchoring S.A.M. to one
          spot, instead of it looking like it's floating in empty space.
          Sized and positioned relative to `size` so it scales with S.A.M.
          wherever this component is used. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: size * 0.04,
          transform: "translateX(-50%)",
          width: size * 0.62,
          height: size * 0.14,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(13,20,35,.32), rgba(13,20,35,0) 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: size * 0.08,
        }}
      >
        <SamIcon skinKey={skinKey} alt={alt} size={size * 0.88} />
      </div>
    </button>
  );
}
