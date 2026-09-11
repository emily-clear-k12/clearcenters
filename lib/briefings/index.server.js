// Briefings server registry — answer keys. Never import from client.

import { SERVER_BRIEFING as SS_3_2A_BR } from "./SS-3-2A-BR.server";
import { SERVER_BRIEFING as SS_3_2B_BR } from "./SS-3-2B-BR.server";

const REGISTRY = {
  "SS-3-2A-BR": SS_3_2A_BR,
  "SS-3-2B-BR": SS_3_2B_BR,
};

export function getServerBriefing(id) {
  return REGISTRY[id] || null;
}
