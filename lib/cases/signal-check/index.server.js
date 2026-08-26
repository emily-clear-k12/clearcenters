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
import { SERVER_CASE as CASE_3_6B_SC } from "./3-6B-SC.server";
import { SERVER_CASE as CASE_3_6C_SC } from "./3-6C-SC.server";
import { SERVER_CASE as CASE_3_7A_SC } from "./3-7A-SC.server";
import { SERVER_CASE as CASE_3_7B_SC } from "./3-7B-SC.server";
import { SERVER_CASE as CASE_3_8A_SC } from "./3-8A-SC.server";
import { SERVER_CASE as CASE_3_8B_SC } from "./3-8B-SC.server";
import { SERVER_CASE as CASE_3_9B_SC } from "./3-9B-SC.server";
import { SERVER_CASE as CASE_3_13A_SC } from "./3-13A-SC.server";
import { SERVER_CASE as CASE_3_13B_SC } from "./3-13B-SC.server";
import { SERVER_CASE as CASE_4_6B_SC } from "./4-6B-SC.server";
import { SERVER_CASE as CASE_4_6C_SC } from "./4-6C-SC.server";
import { SERVER_CASE as CASE_4_7_SC } from "./4-7-SC.server";
import { SERVER_CASE as CASE_4_8A_SC } from "./4-8A-SC.server";
import { SERVER_CASE as CASE_4_8B_SC } from "./4-8B-SC.server";
import { SERVER_CASE as CASE_4_8C_SC } from "./4-8C-SC.server";
import { SERVER_CASE as CASE_4_9A_SC } from "./4-9A-SC.server";
import { SERVER_CASE as CASE_4_9B_SC } from "./4-9B-SC.server";
import { SERVER_CASE as CASE_4_10A_SC } from "./4-10A-SC.server";
import { SERVER_CASE as CASE_4_11A_SC } from "./4-11A-SC.server";
import { SERVER_CASE as CASE_4_11B_SC } from "./4-11B-SC.server";
import { SERVER_CASE as CASE_4_11C_SC } from "./4-11C-SC.server";
import { SERVER_CASE as CASE_4_12A_SC } from "./4-12A-SC.server";
import { SERVER_CASE as CASE_4_12B_SC } from "./4-12B-SC.server";
import { SERVER_CASE as CASE_4_12C_SC } from "./4-12C-SC.server";
import { SERVER_CASE as CASE_4_13A_SC } from "./4-13A-SC.server";
import { SERVER_CASE as CASE_4_13B_SC } from "./4-13B-SC.server";
import { SERVER_CASE as CASE_5_6A_SC } from "./5-6A-SC.server";
import { SERVER_CASE as CASE_5_6B_SC } from "./5-6B-SC.server";
import { SERVER_CASE as CASE_5_6C_SC } from "./5-6C-SC.server";
import { SERVER_CASE as CASE_5_6D_SC } from "./5-6D-SC.server";
import { SERVER_CASE as CASE_5_7A_SC } from "./5-7A-SC.server";
import { SERVER_CASE as CASE_5_8A_SC } from "./5-8A-SC.server";

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
  "3.6B-SC": CASE_3_6B_SC,
  "3.6C-SC": CASE_3_6C_SC,
  "3.7A-SC": CASE_3_7A_SC,
  "3.7B-SC": CASE_3_7B_SC,
  "3.8A-SC": CASE_3_8A_SC,
  "3.8B-SC": CASE_3_8B_SC,
  "3.9B-SC": CASE_3_9B_SC,
  "3.13A-SC": CASE_3_13A_SC,
  "3.13B-SC": CASE_3_13B_SC,
  "4.6B-SC": CASE_4_6B_SC,
  "4.6C-SC": CASE_4_6C_SC,
  "4.7-SC": CASE_4_7_SC,
  "4.8A-SC": CASE_4_8A_SC,
  "4.8B-SC": CASE_4_8B_SC,
  "4.8C-SC": CASE_4_8C_SC,
  "4.9A-SC": CASE_4_9A_SC,
  "4.9B-SC": CASE_4_9B_SC,
  "4.10A-SC": CASE_4_10A_SC,
  "4.11A-SC": CASE_4_11A_SC,
  "4.11B-SC": CASE_4_11B_SC,
  "4.11C-SC": CASE_4_11C_SC,
  "4.12A-SC": CASE_4_12A_SC,
  "4.12B-SC": CASE_4_12B_SC,
  "4.12C-SC": CASE_4_12C_SC,
  "4.13A-SC": CASE_4_13A_SC,
  "4.13B-SC": CASE_4_13B_SC,
  "5.6A-SC": CASE_5_6A_SC,
  "5.6B-SC": CASE_5_6B_SC,
  "5.6C-SC": CASE_5_6C_SC,
  "5.6D-SC": CASE_5_6D_SC,
  "5.7A-SC": CASE_5_7A_SC,
  "5.8A-SC": CASE_5_8A_SC,
};

export function getSignalCheckServerCase(standard) {
  return REGISTRY[standard] || null;
}
