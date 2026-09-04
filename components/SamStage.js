"use client";

import React from "react";
import { getSamSkin, getSamStateAsset, FALLBACK_ICON } from "../lib/samSkins";

// Sept 4, 2026 — S.A.M.'s standalone "companion" presence, as opposed to
// the small chat-avatar-style <SamIcon> instances that sit next to hint
// text inside activities (those stay small on purpose — they're reading
// as part of a sentence, not as a character on screen).
//
// Built because Emily flagged that every existing S.A.M. instance was a
// 58-64px button stuffed in a corner — too small for the new animation
// packs (720x560 renders with real motion) to read at all. This renders
// S.A.M. much bigger (default 150px).
//
// Sept 4, 2026 (later same day, part 2) — real animated art wired in.
// Two stacked layers, both absolutely positioned at `inset: 0` with
// `object-fit: contain` inside the same `size` x `size` box:
//   1. the skin's animated platform WebP (the surface S.A.M. floats on)
//   2. the skin's animated WebP for the current `state` (defaults "idle")
// Both layers in a skin's set share the same 720x560 source canvas (every
// file Emily sent was checked), so scaling them identically this way
// lines them up correctly with no per-skin offset math. If a skin is ever
// missing its platform art, this falls back to the original CSS-only
// blurred shadow ellipse instead of leaving S.A.M. floating with nothing
// under it.
//
// `state` picks which of the 6 animated states plays (idle, moving,
// celebrating, thinking, helping, sleeping) — see getSamStateAsset in
// lib/samSkins.js. Nothing calls this with anything but the default
// "idle" yet; wiring real state changes to real trigger moments (a hint
// requested, a correct answer, a page transition, etc.) is a separate,
// not-yet-scoped follow-up — see SAM_Companion_Concept_v1.md.
export default function SamStage({ skinKey, alt = "S.A.M.", size = 150, state = "idle", onClick, style = {} }) {
  const skin = getSamSkin(skinKey);
  const charSrc = getSamStateAsset(skin, state);
  const platformSrc = skin && skin.platform;

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
      {platformSrc ? (
        <img
          src={platformSrc}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
        />
      ) : (
        // Fallback "platform" — a soft blurred shadow anchoring S.A.M. to
        // one spot — only used if a skin somehow has no platform art.
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
      )}
      <img
        src={charSrc}
        alt={alt}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_ICON;
        }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
      />
    </button>
  );
}
