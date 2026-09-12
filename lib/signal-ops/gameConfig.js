// Signal Ops V1.5 tunable placeholders (classroom live session).
// Solo HTML keeps its own local catalog; live sessions use this shared set.

export const UPGRADE_CATALOG = {
  shield: {
    id: "shield",
    name: "Shield Generator",
    cost: 45,
    desc: "Blocks the next incoming wave damage entirely.",
  },
  turret: {
    id: "turret",
    name: "Turret",
    cost: 55,
    desc: "Auto-destroys one incoming ship each wave (ongoing).",
  },
  repair: {
    id: "repair",
    name: "Repair Drone",
    cost: 40,
    desc: "Restores some of the base Health right away.",
  },
  overcharge: {
    id: "overcharge",
    name: "Overcharge Beam",
    cost: 110,
    desc: "Clears the entire current wave in one blast.",
  },
};

export const UPGRADE_IDS = Object.keys(UPGRADE_CATALOG);

export const SALVAGE_PER_CORRECT = 3;
export const POWER_PER_CORRECT = 3;
export const POWER_DRAIN_PER_SEC = 1.4;
export const VOTE_WINDOW_MS = 7000;
export const VOTE_THRESHOLD_STEP = 48;
export const WAVE_SECONDS = 75;
export const MAX_WAVES = 4;
export const REPAIR_HEAL = 28;
export const WAVE_DAMAGE_BASE = 14;
export const WAVE_DAMAGE_PER_WAVE = 4;
export const TURRET_DAMAGE_REDUCE = 5;
export const TICK_CATCHUP_CAP_SEC = 8;
