// Briefings public registry — separate from Challenge Library cases.
// Catalog: SS-{grade}-{teks}-BR (social studies), later SCI-{grade}-{teks}-BR (science).
// One My Briefings door; subject + grade live on each lesson.

import { PUBLIC_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.public";
import { PUBLIC_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.public";
import { PUBLIC_BRIEFING as SCI_3_6B_BR } from "./SCI-3-6B-BR.public";

// v3 "thinking lesson" shape — runs alongside SS-3-2A-BR rather than
// replacing it, so the two can be assigned side by side. See
// lib/briefings/schema/ssThinkingLesson.schema.js.
//
// ONLY LESSONS THE PLAYER CAN ACTUALLY RENDER ARE REGISTERED HERE.
// BriefingClient.js has components for openingFrame, storyTeach, synthesis,
// opsChoice, transfer, clearance and all five practice mechanics. It does NOT
// yet have components for sideBySide, contrastSynthesis, theDecision,
// contributionSynthesis, wrongDesk or boundarySynthesis — and an unknown phase
// id falls through to `<Clearance />` at the bottom of the dispatch, so a
// student would silently get the wrong screen rather than an error.
//
// So the eight Type 2/3/4 lessons that exist in this folder are deliberately
// NOT registered until those six components and their six grading branches
// land. Registering them early would put broken lessons on the assign screen.
//
// Waiting on components:
//   sideBySide + contrastSynthesis    SS-3-2B-V3-BR, SS-4-6B-V3-BR, SS-5-13A-V3-BR
//   theDecision + contributionSynth.  SS-3-1B-V3-BR, SS-4-2E-V3-BR, SS-5-2B-V3-BR
//   wrongDesk + boundarySynthesis     SS-3-7C-V3-BR, SS-4-6A-V3-BR, SS-5-20A-V3-BR
import { PUBLIC_BRIEFING as SS_3_2A_V3_BR } from "./SS-3-2A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_4_3A_V3_BR } from "./SS-4-3A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_5_5A_V3_BR } from "./SS-5-5A-V3-BR.public";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
  "SS-3-2B-BR": SS_3_2B_BR,
  "SCI-3-6B-BR": SCI_3_6B_BR,
  "SS-3-2A-V3-BR": SS_3_2A_V3_BR,
  "SS-4-3A-V3-BR": SS_4_3A_V3_BR,
  "SS-5-5A-V3-BR": SS_5_5A_V3_BR,
};

export function getPublicBriefing(id) {
  return REGISTRY[id] || null;
}

export function listPublicBriefings() {
  return Object.values(REGISTRY);
}
