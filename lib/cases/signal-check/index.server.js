// Registry of Signal Check SERVER-ONLY case content (grading rubrics).
// Never import this from a client component.
//
// Standards below are verified against Emily's official Texas TEKS PDFs —
// see lib/cases/TEKS_STANDARDS.md.

import { SERVER_CASE as CASE_3_6A_SC } from "./3-6A-SC.server";
import { SERVER_CASE as CASE_4_10B_SC } from "./4-10B-SC.server";
import { SERVER_CASE as CASE_5_13B_SC } from "./5-13B-SC.server";
import { SERVER_CASE as CASE_SS_3_6A_SC } from "./SS-3-6A-SC.server";
import { SERVER_CASE as CASE_SS_4_3A_SC } from "./SS-4-3A-SC.server";
import { SERVER_CASE as CASE_SS_5_4C_SC } from "./SS-5-4C-SC.server";
import { SERVER_CASE as CASE_3_10A_SC } from "./3-10A-SC.server";
import { SERVER_CASE as CASE_3_10B_SC } from "./3-10B-SC.server";
import { SERVER_CASE as CASE_3_10C_SC } from "./3-10C-SC.server";
import { SERVER_CASE as CASE_3_11B_SC } from "./3-11B-SC.server";
import { SERVER_CASE as CASE_3_12A_SC } from "./3-12A-SC.server";
import { SERVER_CASE as CASE_3_12B_SC } from "./3-12B-SC.server";
import { SERVER_CASE as CASE_3_12C_SC } from "./3-12C-SC.server";
import { SERVER_CASE as CASE_3_12D_SC } from "./3-12D-SC.server";

const REGISTRY = {
  "3.6A-SC": CASE_3_6A_SC,
  "4.10B-SC": CASE_4_10B_SC,
  "5.13B-SC": CASE_5_13B_SC,
  "SS.3.6A-SC": CASE_SS_3_6A_SC,
  "SS.4.3A-SC": CASE_SS_4_3A_SC,
  "SS.5.4C-SC": CASE_SS_5_4C_SC,
  "3.10A-SC": CASE_3_10A_SC,
  "3.10B-SC": CASE_3_10B_SC,
  "3.10C-SC": CASE_3_10C_SC,
  "3.11B-SC": CASE_3_11B_SC,
  "3.12A-SC": CASE_3_12A_SC,
  "3.12B-SC": CASE_3_12B_SC,
  "3.12C-SC": CASE_3_12C_SC,
  "3.12D-SC": CASE_3_12D_SC,
};

export function getSignalCheckServerCase(standard) {
  return REGISTRY[standard] || null;
}
