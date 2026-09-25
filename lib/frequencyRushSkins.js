// Sept 12, 2026 — Frequency Rush "world skins" for the Individual Practice
// widget. Each skin is a FULL separate static HTML file exported by Emily's
// game-generator tool (same reusable "Run Engine," a new visual world per
// export — space/asteroids, sky/wind currents, etc.) — not a runtime picker
// inside one file. Confirmed on the first extra skin (Cloudreach Run) that
// every export exposes the identical window.AsteroidRun-compatible API
// (setQuestionBank/setWordBank/setOddGroups/setFormats/setClassificationBank/
// setContentModes/setOutpostTotal/configure/onComplete/getSnapshot/
// getCapabilities), aliased under its own window.<WorldName>Run too, so the
// host wiring below never has to change per skin — only this list does.
//
// Choice lives on the ASSIGNMENT (assignments.game_skin), set by the teacher
// at assign time — not a student-facing picker. Reasoning: this reuses the
// exact "one more conditional field on the assign form" pattern Classification
// Lab's pacing_mode already established, instead of building a new picker UI,
// a persisted per-student preference, and an unlock-gating decision (like
// S.A.M.'s skins have) that a student-choice version would need.
//
// To add a new skin once another world file is ready: drop it in
// public/games/, add one entry below. The assign-form dropdown and the
// student client both read this same list — nothing else changes.
// Sept 24, 2026 — `sortBins`: whether this export supports the sort_bins
// question type. Checked in each file's getCapabilities(): Asteroid and
// Cloudreach list it; Frostveil and Cindara (later exports) do not. Skill
// sets (math facts) run entirely on sort_bins, so they fall back to the
// default skin on a world without it. See getSkinForSortBins below.
export const GAME_SKINS = [
  { id: "asteroid_run", label: "Asteroid Run (Space)", file: "/games/asteroid-run.html", sortBins: true },
  { id: "cloudreach_run", label: "Cloudreach Run (Skyway)", file: "/games/cloudreach-run.html", sortBins: true },
  { id: "frostveil_run", label: "Frostveil Run (Iceway)", file: "/games/frostveil-run.html", sortBins: false },
  { id: "cindara_run", label: "Cindara Run (Magmaway)", file: "/games/cindara-run.html", sortBins: false },
  { id: "crystal_dive", label: "Crystal Dive (Solara)", file: "/games/crystal-dive-prototype.html", sortBins: true },
];

export const DEFAULT_GAME_SKIN = "asteroid_run";

export function getGameSkin(id) {
  return GAME_SKINS.find((s) => s.id === id) || GAME_SKINS.find((s) => s.id === DEFAULT_GAME_SKIN) || GAME_SKINS[0];
}

export function getGameSkinFile(id) {
  return getGameSkin(id).file;
}

// Sept 24, 2026 — for content that is ONLY sort_bins (skill sets): keep the
// teacher's world if it supports sort_bins, otherwise use the default world
// rather than load a game that can't show the questions.
export function getSkinForSortBins(id) {
  const skin = getGameSkin(id);
  return skin.sortBins ? skin.id : DEFAULT_GAME_SKIN;
}
