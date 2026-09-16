// Briefings server registry — answer keys. Never import from client.
//
// Kept in step with index.public.js. See the note there about which v3
// lessons are registered and why the Type 2/3/4 ones are not yet.

import { SERVER_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.server";
import { SERVER_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.server";
import { SERVER_BRIEFING as SCI_3_6B_BR } from "./SCI-3-6B-BR.server";
import { SERVER_BRIEFING as SS_3_2A_V3_BR } from "./SS-3-2A-V3-BR.server";
import { SERVER_BRIEFING as SS_4_3A_V3_BR } from "./SS-4-3A-V3-BR.server";
import { SERVER_BRIEFING as SS_5_5A_V3_BR } from "./SS-5-5A-V3-BR.server";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
  "SS-3-2B-BR": SS_3_2B_BR,
  "SCI-3-6B-BR": SCI_3_6B_BR,
  "SS-3-2A-V3-BR": SS_3_2A_V3_BR,
  "SS-4-3A-V3-BR": SS_4_3A_V3_BR,
  "SS-5-5A-V3-BR": SS_5_5A_V3_BR,
};

export function getServerBriefing(id) {
  return REGISTRY[id] || null;
}
