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
// Sept 4, 2026 (later same day, part 2) — real animated art wired in: the
// skin's animated WebP for the current `state` (defaults "idle"),
// absolutely positioned at `inset: 0` with `object-fit: contain` inside
// the `size` x `size` box.
//
// Sept 16, 2026 — the platform is gone. S.A.M. used to render as two
// stacked layers, with the skin's animated platform WebP (a disc/surface
// to sit or float on) under the character, plus a CSS blurred-shadow
// ellipse as a fallback for any skin missing that art. Emily doesn't want
// it in any context — it had already been switched off case-by-case on
// SamGuide and was meant to be off on Home too (it wasn't — the prop was
// never actually passed there, so the disc was still showing on the
// student home screen). Rather than keep a per-caller opt-out that's easy
// to forget, the layer and the `showPlatform` prop are both removed, so
// every S.A.M. everywhere reads as genuinely floating.
//
// Nothing about the character itself changed. The platform art and the
// character art were always separate files drawn on a shared 720x560
// canvas, so dropping the platform layer leaves S.A.M. at the exact same
// size and position in the box as before — just with nothing under it.
// The art is still listed in lib/samSkins.js (`platform` /
// `platformPoster`) if this is ever wanted back.
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
