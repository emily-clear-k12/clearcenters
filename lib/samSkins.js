// Sept 4, 2026 — S.A.M.'s equippable skins, the first real piece of the
// S.A.M. expansion Emily asked for (see SAM_Companion_Concept_v1.md). Same
// shape as HOME_BACKGROUNDS and badgeTiers: one flat list, each skin
// gated by a threshold on the same crystal_points currency everything else
// in the app already uses — deliberately NOT a separate S.A.M.-only points
// economy, so the number on screen always means the same thing everywhere.
//
// `image` points at where the real art SHOULD live once Emily supplies it,
// even though most of these files don't exist yet — components/SamIcon.js
// falls back to the classic default bot if a skin's file 404s, so this
// list can ship today and every skin "just works" the moment real files
// land at these exact paths, with no further code change.
//
// Thresholds below (0/50/150/400) are placeholders, not a locked decision
// — deliberately reusing the *shape* of the badge-tier/planet unlock curve
// (a handful of thresholds spread across the low hundreds) rather than
// inventing new numbers from nothing. If Emily wants these to match the
// real badge_tiers thresholds instead, swap the numbers here (or ask
// Claude to) — nothing else in the app needs to change for that.
export const SAM_SKINS = [
  { key: "classic", name: "Classic S.A.M.", image: "/icons/robot_point.png", threshold: 0 },
  { key: "scout", name: "Scout S.A.M.", image: "/icons/sam_scout.png", threshold: 50 },
  { key: "cadet", name: "Cadet S.A.M.", image: "/icons/sam_cadet.png", threshold: 150 },
  { key: "commander", name: "Commander S.A.M.", image: "/icons/sam_commander.png", threshold: 400 },
];

export const DEFAULT_SAM_SKIN = "classic";

export function getSamSkin(key) {
  return SAM_SKINS.find((s) => s.key === key) || SAM_SKINS.find((s) => s.key === DEFAULT_SAM_SKIN) || SAM_SKINS[0];
}

export function isSamSkinUnlocked(skin, crystalPoints) {
  return (crystalPoints || 0) >= skin.threshold;
}
