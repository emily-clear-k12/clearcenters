// Sept 8, 2026 — Outpost Builder, Asteroid Run's persistent progression
// (design doc §2.6). Same shape as SAM_SKINS in samSkins.js: one flat list,
// each stage gated by a threshold — but on its OWN currency
// (students.outpost_resources), not crystal_points. Resources are banked
// here from every Asteroid Run session (see api/frequency-rush/submit),
// win or lose — an ejected run still keeps whatever it earned before the
// eject (design doc §2.12/§2.14), so this number only ever goes up.
//
// Thresholds below are placeholders, explicitly flagged as such in the
// design doc (§9 item 4) — same spirit as SAM_SKINS' thresholds: a
// reasonable curve shape, not a locked decision. Tune freely once real
// classroom usage exists.
//
// No real art exists yet for these stages (design doc §9 item 3 — "final
// art direction... still needs its own creative pass"). Following the
// exact same graceful-fallback pattern already used for Picture Signal
// (§2.17): each stage gets an image-asset slot (`image`) that's null until
// Emily supplies real art, plus an `emoji` that renders today as the
// fallback. Nothing needs to change in the client when real art lands —
// just fill in `image` below.
export const OUTPOST_STAGES = [
  { key: "landing_pad", name: "Landing Pad", threshold: 0, emoji: "🛬️", image: null },
  { key: "solar_array", name: "Solar Array", threshold: 150, emoji: "☀️", image: null },
  { key: "habitat_dome", name: "Habitat Dome", threshold: 400, emoji: "🏠", image: null },
  { key: "comms_tower", name: "Comms Tower", threshold: 800, emoji: "📡", image: null },
  { key: "greenhouse", name: "Greenhouse", threshold: 1500, emoji: "🌱", image: null },
  { key: "command_center", name: "Command Center", threshold: 2500, emoji: "🏆", image: null },
];

export function getOutpostStage(resources) {
  const r = resources || 0;
  let current = OUTPOST_STAGES[0];
  for (const stage of OUTPOST_STAGES) {
    if (r >= stage.threshold) current = stage;
  }
  return current;
}

// Returns the current stage plus the next one (or null if already maxed),
// and how far into that gap the student's resources sit — everything the
// recap screen needs to show "how close to growing next" without the
// client re-deriving any of this threshold logic itself.
export function getOutpostProgress(resources) {
  const r = resources || 0;
  const stageIndex = OUTPOST_STAGES.findIndex((s) => s.key === getOutpostStage(r).key);
  const current = OUTPOST_STAGES[stageIndex];
  const next = OUTPOST_STAGES[stageIndex + 1] || null;
  const pctToNext = next
    ? Math.max(0, Math.min(100, Math.round(((r - current.threshold) / (next.threshold - current.threshold)) * 100)))
    : 100;
  return { resources: r, current, next, pctToNext };
}
