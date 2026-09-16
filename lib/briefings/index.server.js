// Briefings server registry — answer keys. Never import from client.
//
// Mirrors index.public.js exactly: every id registered there must be
// registered here, or app/api/briefing/grade/route.js returns 404 "Unknown
// briefing." on the first graded tap and the lesson looks broken to a
// student. See the table in index.public.js for the full twelve-lesson grid.

import { SERVER_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.server";
import { SERVER_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.server";
import { SERVER_BRIEFING as SCI_3_6B_BR } from "./SCI-3-6B-BR.server";

// Grade 3
import { SERVER_BRIEFING as SS_3_2A_V3_BR } from "./SS-3-2A-V3-BR.server";
import { SERVER_BRIEFING as SS_3_2B_V3_BR } from "./SS-3-2B-V3-BR.server";
import { SERVER_BRIEFING as SS_3_1B_V3_BR } from "./SS-3-1B-V3-BR.server";
import { SERVER_BRIEFING as SS_3_7C_V3_BR } from "./SS-3-7C-V3-BR.server";
// Grade 4
import { SERVER_BRIEFING as SS_4_3A_V3_BR } from "./SS-4-3A-V3-BR.server";
import { SERVER_BRIEFING as SS_4_6B_V3_BR } from "./SS-4-6B-V3-BR.server";
import { SERVER_BRIEFING as SS_4_2E_V3_BR } from "./SS-4-2E-V3-BR.server";
import { SERVER_BRIEFING as SS_4_6A_V3_BR } from "./SS-4-6A-V3-BR.server";
// Grade 5
import { SERVER_BRIEFING as SS_5_5A_V3_BR } from "./SS-5-5A-V3-BR.server";
import { SERVER_BRIEFING as SS_5_13A_V3_BR } from "./SS-5-13A-V3-BR.server";
import { SERVER_BRIEFING as SS_5_2B_V3_BR } from "./SS-5-2B-V3-BR.server";
import { SERVER_BRIEFING as SS_5_20A_V3_BR } from "./SS-5-20A-V3-BR.server";

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

export function getServerBriefing(id) {
  return REGISTRY[id] || null;
}
