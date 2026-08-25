// Registry of Signal Check SERVER-ONLY case content (grading rubrics).
// Never import this from a client component.

import { SERVER_CASE as CASE_3_6E_SC } from "./3-6E-SC.server";
import { SERVER_CASE as CASE_4_7B_SC } from "./4-7B-SC.server";
import { SERVER_CASE as CASE_5_10D_SC } from "./5-10D-SC.server";

const REGISTRY = {
  "3.6E-SC": CASE_3_6E_SC,
  "4.7B-SC": CASE_4_7B_SC,
  "5.10D-SC": CASE_5_10D_SC,
};

export function getSignalCheckServerCase(standard) {
  return REGISTRY[standard] || null;
}
