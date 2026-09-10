// Briefings public registry — separate from Challenge Library cases.
// Pilot: SS-3-2A-BR only.

import { PUBLIC_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.public";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
};

export function getPublicBriefing(id) {
  return REGISTRY[id] || null;
}

export function listPublicBriefings() {
  return Object.values(REGISTRY);
}
