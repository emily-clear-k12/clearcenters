// Sept 4, 2026 — S.A.M.'s equippable skins, the first real piece of the
// S.A.M. expansion Emily asked for (see SAM_Companion_Concept_v1.md). Same
// shape as HOME_BACKGROUNDS and badgeTiers: one flat list, each skin
// gated by a threshold on the same crystal_points currency everything else
// in the app already uses — deliberately NOT a separate S.A.M.-only points
// economy, so the number on screen always means the same thing everywhere.
//
// Renamed Sept 4 (later same day) from Classic/Scout/Cadet/Commander to
// Cosmic/Verdant/Crystal/Comet to match Emily's actual art (a starfield
// ring bot, a leaf/nature bot, a gem-crusted bot, a speed/comet-trail bot)
// instead of a generic military-rank progression that didn't fit any of
// them. Safe to rename freely — nothing in the app hardcodes these key
// strings anywhere outside this file; every consumer looks skins up by
// this list.
//
// Thresholds below (0/50/150/400) are placeholders, not a locked decision
// — deliberately reusing the *shape* of the badge-tier/planet unlock curve
// (a handful of thresholds spread across the low hundreds) rather than
// inventing new numbers from nothing. If Emily wants these to match the
// real badge_tiers thresholds instead, swap the numbers here (or ask
// Claude to) — nothing else in the app needs to change for that.
//
// Sept 4, 2026 (later same day, part 2) — real art loaded. Emily supplied
// a full set for all 4 skins: 6 animation states each (idle, moving,
// celebrating, thinking, helping, sleeping) as looping animated WebP, a
// static poster PNG per state (first frame, for contexts that shouldn't
// animate), and one looping animated "platform" WebP + static poster per
// skin (the surface S.A.M. floats on, replacing the old CSS-only shadow
// ellipse). Files live at /public/icons/sam/<key>/<state>.webp etc.
//
// Data shape: `image` stays a single static path (the idle poster) for
// every context that just wants "a picture of this skin" — the Rewards
// modal's skin picker, the skin-picker grid on Home, SamIcon's small
// inline avatar next to hint text. `states` holds the animated WebP for
// each of the 6 states, for <SamStage> (S.A.M.'s big on-screen companion)
// to pick from. `statePosters` is the static fallback per state, in case
// a future spot wants a non-animating version of a specific state.
// `platform` / `platformPoster` are the looping/static platform art.
//
// IMPORTANT — matching canvas size: every character WebP and every
// platform WebP in a skin's set share the same 720x560 canvas, confirmed
// by inspecting the actual pixel dimensions of every file Emily sent.
// That means <SamStage> can stack the platform layer and the character
// layer as two absolutely-positioned, identically-sized `object-fit:
// contain` images with NO extra offset/scaling math — they're already
// drawn on the same coordinate grid, so they land in the right relative
// spot automatically.
const SAM_STATES = ["idle", "moving", "celebrating", "thinking", "helping", "sleeping"];

function assetSet(key) {
  const base = `/icons/sam/${key}`;
  const states = {};
  const statePosters = {};
  for (const state of SAM_STATES) {
    states[state] = `${base}/${state}.webp`;
    statePosters[state] = `${base}/${state}-poster.png`;
  }
  return {
    image: statePosters.idle, // static default — pickers, inline avatar
    states,
    statePosters,
    platform: `${base}/platform.webp`,
    platformPoster: `${base}/platform-poster.png`,
  };
}

export const SAM_SKINS = [
  { key: "cosmic", name: "Cosmic S.A.M.", threshold: 0, ...assetSet("cosmic") },
  { key: "verdant", name: "Verdant S.A.M.", threshold: 50, ...assetSet("verdant") },
  { key: "crystal", name: "Crystal S.A.M.", threshold: 150, ...assetSet("crystal") },
  { key: "comet", name: "Comet S.A.M.", threshold: 400, ...assetSet("comet") },
];

export const DEFAULT_SAM_SKIN = "cosmic";

// The one guaranteed-to-exist S.A.M. image in the whole app — the plain
// icon that's been live since before this skin system existed. Kept as
// the true safety net (SamIcon.js, SamStage.js, the Rewards modal's skin
// picker) independent of which skin is nominally "default" or whether a
// specific state/platform file is missing — a 404 on any real art file
// falls back here instead of retrying another path that might also 404.
export const FALLBACK_ICON = "/icons/robot_point.png";

export function getSamSkin(key) {
  return SAM_SKINS.find((s) => s.key === key) || SAM_SKINS.find((s) => s.key === DEFAULT_SAM_SKIN) || SAM_SKINS[0];
}

export function isSamSkinUnlocked(skin, crystalPoints) {
  return (crystalPoints || 0) >= skin.threshold;
}

// Returns the animated WebP for a given state, falling back to idle if the
// requested state doesn't exist on this skin (shouldn't happen now that
// every skin has all 6 states, but keeps this safe if a future 5th skin
// ships with a partial set).
export function getSamStateAsset(skin, state = "idle") {
  return (skin && skin.states && (skin.states[state] || skin.states.idle)) || FALLBACK_ICON;
}
