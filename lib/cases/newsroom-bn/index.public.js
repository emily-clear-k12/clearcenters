// Registry of Newsroom / Breaking News public case content. Add one line
// per new card as more are converted from the NewsDesk Card 2.0 source
// files — same pattern as lib/cases/index.public.js for Group Chat.

import { PUBLIC_CASE as CASE_5_6D_BN } from "./5-6D-BN.public";

const REGISTRY = {
  "5.6D-BN": CASE_5_6D_BN,
};

export function getNewsroomBNPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listNewsroomBNStandards() {
  return Object.keys(REGISTRY);
}
