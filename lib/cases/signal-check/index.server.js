// Registry of Signal Check SERVER-ONLY case content (grading rubrics).
// Never import this from a client component.
//
// Standards below are verified against Emily's official Texas TEKS PDFs —
// see lib/cases/TEKS_STANDARDS.md.

import { SERVER_CASE as CASE_3_6A_SC } from "./3-6A-SC.server";
import { SERVER_CASE as CASE_4_10B_SC } from "./4-10B-SC.server";
import { SERVER_CASE as CASE_5_13B_SC } from "./5-13B-SC.server";

const REGISTRY = {
  "3.6A-SC": CASE_3_6A_SC,
  "4.10B-SC": CASE_4_10B_SC,
  "5.13B-SC": CASE_5_13B_SC,
};

export function getSignalCheckServerCase(standard) {
  return REGISTRY[standard] || null;
}
