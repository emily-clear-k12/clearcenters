// Registry of Signal Check public case content. Add one line per new
// case as more are authored — same pattern as newsroom-bn/index.public.js.
//
// Standards below are verified against Emily's official Texas TEKS PDFs —
// see lib/cases/TEKS_STANDARDS.md.

import { PUBLIC_CASE as CASE_3_6A_SC } from "./3-6A-SC.public";
import { PUBLIC_CASE as CASE_4_10B_SC } from "./4-10B-SC.public";
import { PUBLIC_CASE as CASE_5_13B_SC } from "./5-13B-SC.public";
import { PUBLIC_CASE as CASE_SS_3_6A_SC } from "./SS-3-6A-SC.public";
import { PUBLIC_CASE as CASE_SS_4_3A_SC } from "./SS-4-3A-SC.public";
import { PUBLIC_CASE as CASE_SS_5_4C_SC } from "./SS-5-4C-SC.public";

const REGISTRY = {
  "3.6A-SC": CASE_3_6A_SC,
  "4.10B-SC": CASE_4_10B_SC,
  "5.13B-SC": CASE_5_13B_SC,
  "SS.3.6A-SC": CASE_SS_3_6A_SC,
  "SS.4.3A-SC": CASE_SS_4_3A_SC,
  "SS.5.4C-SC": CASE_SS_5_4C_SC,
};

export function getSignalCheckPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listSignalCheckStandards() {
  return Object.keys(REGISTRY);
}
