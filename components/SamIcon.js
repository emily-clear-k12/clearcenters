"use client";

import React, { useState, useEffect } from "react";
import { SAM_SKINS, DEFAULT_SAM_SKIN } from "../lib/samSkins";

// Sept 4, 2026 — the one shared S.A.M. face. Replaces the 9 copy-pasted
// <img src="/icons/robot_point.png"> instances that used to be scattered
// across Home, Missions, and all 4 activity engines (Group Chat's
// ActivityClient, Signal Check, Mission Map, Simulation Lab) — see
// SAM_Companion_Concept_v1.md §6, which flagged that exact copy-paste as
// the thing standing between "S.A.M. is an icon" and "S.A.M. is a real,
// skinnable character." Every future engine should import THIS component
// from day one instead of adding its own <img> tag.
//
// `skinKey` is a student's students.equipped_sam_skin (resolved server-side
// by whichever page.js fetched the student row, then passed down as a
// prop — this component never fetches anything itself). Renders that
// skin's art, falling back to the default classic bot if skinKey is
// missing/unrecognized, or if the real art file for an otherwise-valid
// skin hasn't actually been uploaded yet (onError swap) — so this ships
// today and every skin "just works" the moment Emily drops real files at
// the paths listed in lib/samSkins.js, no code change needed then.
export default function SamIcon({ skinKey, size = 40, alt = "S.A.M.", style = {} }) {
  const skin = SAM_SKINS.find((s) => s.key === skinKey) || getDefaultSkin();
  const fallbackSkin = getDefaultSkin();
  const [failed, setFailed] = useState(false);

  // Reset the "art failed to load" flag whenever the actual skin changes
  // (e.g. a student equips something new and this component re-renders
  // with a different skinKey) rather than getting stuck showing the
  // fallback forever after one earlier 404.
  useEffect(() => {
    setFailed(false);
  }, [skin.image]);

  function getDefaultSkin() {
    return SAM_SKINS.find((s) => s.key === DEFAULT_SAM_SKIN) || SAM_SKINS[0];
  }

  const src = failed ? fallbackSkin.image : skin.image;

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, ...style }}
      onError={() => setFailed(true)}
    />
  );
}
