// Registry of Newsroom / Breaking News SERVER-ONLY case content (chat
// system prompts + grading rubric). Never import this from a client
// component. Add one line per new card as more are converted.

import { SERVER_CASE as CASE_5_6D_BN } from "./5-6D-BN.server";

const REGISTRY = {
  "5.6D-BN": CASE_5_6D_BN,
};

export function getNewsroomBNServerCase(standard) {
  return REGISTRY[standard] || null;
}
