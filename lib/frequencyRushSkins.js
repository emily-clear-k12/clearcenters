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
export const GAME_SKINS = [
  { id: "asteroid_run", label: "Asteroid Run (Space)", file: "/games/asteroid-run.html" },
  { id: "cloudreach_run", label: "Cloudreach Run (Skyway)", file: "/games/cloudreach-run.html" },
];

export const DEFAULT_GAME_SKIN = "asteroid_run";

export function getGameSkin(id) {
  return GAME_SKINS.find((s) => s.id === id) || GAME_SKINS.find((s) => s.id === DEFAULT_GAME_SKIN) || GAME_SKINS[0];
}

export function getGameSkinFile(id) {
  return getGameSkin(id).file;
}
