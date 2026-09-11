// Briefings public registry — separate from Challenge Library cases.
// Catalog: SS-{grade}-{teks}-BR (social studies), later SCI-{grade}-{teks}-BR (science).
// One My Briefings door; subject + grade live on each lesson.

import { PUBLIC_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.public";
import { PUBLIC_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.public";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
  "SS-3-2B-BR": SS_3_2B_BR,
};

export function getPublicBriefing(id) {
  return REGISTRY[id] || null;
}

export function listPublicBriefings() {
  return Object.values(REGISTRY);
}
