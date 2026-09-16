// Briefings public registry — separate from Challenge Library cases.
// Catalog: SS-{grade}-{teks}-BR (social studies), later SCI-{grade}-{teks}-BR (science).
// One My Briefings door; subject + grade live on each lesson.

import { PUBLIC_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.public";
import { PUBLIC_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.public";
import { PUBLIC_BRIEFING as SCI_3_6B_BR } from "./SCI-3-6B-BR.public";

// v3 "thinking lesson" shapes. These run ALONGSIDE the v1/v2 lessons above
// rather than replacing them, so the old and new versions of the same
// standard can be assigned side by side and compared.
//
// Twelve lessons, four shapes, three grades — one of each shape per grade:
//
//              Type 1 thinking   Type 2 comparison   Type 3 people   Type 4 categories
//   Grade 3    SS-3-2A-V3-BR     SS-3-2B-V3-BR       SS-3-1B-V3-BR   SS-3-7C-V3-BR
//   Grade 4    SS-4-3A-V3-BR     SS-4-6B-V3-BR       SS-4-2E-V3-BR   SS-4-6A-V3-BR
//   Grade 5    SS-5-5A-V3-BR     SS-5-13A-V3-BR      SS-5-2B-V3-BR   SS-5-20A-V3-BR
//
// All twelve are registered as of Sept 16, 2026, when the six type-specific
// player phases landed in app/briefing/[assignmentId]/BriefingClient.js
// (sideBySide, contrastSynthesis, theDecision, contributionSynthesis,
// wrongDesk, boundarySynthesis) and their six matching branches landed in
// app/api/briefing/grade/route.js. Before that, only the Type 1 lessons had
// screens to render — registering the other nine would have dropped a
// student straight onto <Clearance /> via the dispatch fallback, which is
// exactly the silent failure the fallback makes possible. If a new shape is
// ever added, build its phases FIRST and register the lesson second.
//
// Art is still outstanding for the nine lessons added in September; every
// round image is wrapped in an onError that removes it, so a lesson whose
// art has not been commissioned yet renders as text rather than as a page
// full of broken-image icons.

// Grade 3
import { PUBLIC_BRIEFING as SS_3_2A_V3_BR } from "./SS-3-2A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_3_2B_V3_BR } from "./SS-3-2B-V3-BR.public";
import { PUBLIC_BRIEFING as SS_3_1B_V3_BR } from "./SS-3-1B-V3-BR.public";
import { PUBLIC_BRIEFING as SS_3_7C_V3_BR } from "./SS-3-7C-V3-BR.public";
// Grade 4
import { PUBLIC_BRIEFING as SS_4_3A_V3_BR } from "./SS-4-3A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_4_6B_V3_BR } from "./SS-4-6B-V3-BR.public";
import { PUBLIC_BRIEFING as SS_4_2E_V3_BR } from "./SS-4-2E-V3-BR.public";
import { PUBLIC_BRIEFING as SS_4_6A_V3_BR } from "./SS-4-6A-V3-BR.public";
// Grade 5
import { PUBLIC_BRIEFING as SS_5_5A_V3_BR } from "./SS-5-5A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_5_13A_V3_BR } from "./SS-5-13A-V3-BR.public";
import { PUBLIC_BRIEFING as SS_5_2B_V3_BR } from "./SS-5-2B-V3-BR.public";
import { PUBLIC_BRIEFING as SS_5_20A_V3_BR } from "./SS-5-20A-V3-BR.public";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
  "SS-3-2B-BR": SS_3_2B_BR,
  "SCI-3-6B-BR": SCI_3_6B_BR,

  "SS-3-2A-V3-BR": SS_3_2A_V3_BR,
  "SS-3-2B-V3-BR": SS_3_2B_V3_BR,
  "SS-3-1B-V3-BR": SS_3_1B_V3_BR,
  "SS-3-7C-V3-BR": SS_3_7C_V3_BR,

  "SS-4-3A-V3-BR": SS_4_3A_V3_BR,
  "SS-4-6B-V3-BR": SS_4_6B_V3_BR,
  "SS-4-2E-V3-BR": SS_4_2E_V3_BR,
  "SS-4-6A-V3-BR": SS_4_6A_V3_BR,

  "SS-5-5A-V3-BR": SS_5_5A_V3_BR,
  "SS-5-13A-V3-BR": SS_5_13A_V3_BR,
  "SS-5-2B-V3-BR": SS_5_2B_V3_BR,
  "SS-5-20A-V3-BR": SS_5_20A_V3_BR,
};

export function getPublicBriefing(id) {
  return REGISTRY[id] || null;
}

export function listPublicBriefings() {
  return Object.values(REGISTRY);
}
