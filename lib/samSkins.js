// Sept 4, 2026 — S.A.M.'s equippable skins, the first real piece of the
// S.A.M. expansion Emily asked for (see SAM_Companion_Concept_v1.md). Same
// shape as HOME_BACKGROUNDS and badgeTiers: one flat list, each skin
// gated by a threshold on the same crystal_points currency everything else
// in the app already uses — deliberately NOT a separate S.A.M.-only points
// economy, so the number on screen always means the same thing everywhere.
//
// `image` points at where the real art SHOULD live once Emily supplies it,
// even though most of these files don't exist yet — components/SamIcon.js
// falls back to FALLBACK_ICON (below) if a skin's file 404s, so this list
// can ship today and every skin "just works" the moment real files land at
// these exact paths, with no further code change.
//
// Renamed Sept 4 (later same day) from Classic/Scout/Cadet/Commander to
// Cosmic/Verdant/Crystal/Comet to match Emily's actual art (a starfield
// ring bot, a leaf/nature bot, a gem-crusted bot, a speed/comet-trail bot)
// instead of a generic military-rank progression that didn't fit any of
// them. Safe to rename freely — nothing in the app hardcodes these key
// strings anywhere outside this file; every consumer looks skins up by
// this list (see FALLBACK_ICON note below for the one thing that DID need
// care when renaming: the default skin no longer doubles as the universal
// safety-net image).
//
// Thresholds below (0/50/150/400) are placeholders, not a locked decision
// — deliberately reusing the *shape* of the badge-tier/planet unlock curve
// (a handful of thresholds spread across the low hundreds) rather than
// inventing new numbers from nothing. If Emily wants these to match the
// real badge_tiers thresholds instead, swap the numbers here (or ask
// Claude to) — nothing else in the app needs to change for that.
export const SAM_SKINS = [
  { key: "cosmic", name: "Cosmic S.A.M.", image: "/icons/sam_cosmic.png", threshold: 0 },
  { key: "verdant", name: "Verdant S.A.M.", image: "/icons/sam_verdant.png", threshold: 50 },
  { key: "crystal", name: "Crystal S.A.M.", image: "/icons/sam_crystal.png", threshold: 150 },
  { key: "comet", name: "Comet S.A.M.", image: "/icons/sam_comet.png", threshold: 400 },
];

export const DEFAULT_SAM_SKIN = "cosmic";

// The one guaranteed-to-exist S.A.M. image in the whole app — the plain
// icon that's been live since before this skin system existed. Every
// skin above (including the default, "cosmic") now points at real art
// Emily hasn't uploaded yet, so this is deliberately NOT the same as
// "whatever the default skin's image is" — if it were, and that default
// skin's own file 404s, the fallback would point at itself and fail
// forever, showing a broken image everywhere S.A.M. appears. Kept as a
// named export specifically so SamIcon.js (and anywhere else that needs a
// guaranteed-safe S.A.M. image, like the Rewards modal's skin picker) can
// use this exact path as the true safety net, independent of which skin
// is nominally "default."
export const FALLBACK_ICON = "/icons/robot_point.png";

export function getSamSkin(key) {
  return SAM_SKINS.find((s) => s.key === key) || SAM_SKINS.find((s) => s.key === DEFAULT_SAM_SKIN) || SAM_SKINS[0];
}

export function isSamSkinUnlocked(skin, crystalPoints) {
  return (crystalPoints || 0) >= skin.threshold;
}
