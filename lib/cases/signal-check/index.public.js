// Registry of Signal Check public case content. Add one line per new
// case as more are authored — same pattern as newsroom-bn/index.public.js.

import { PUBLIC_CASE as CASE_3_6E_SC } from "./3-6E-SC.public";
import { PUBLIC_CASE as CASE_4_7B_SC } from "./4-7B-SC.public";
import { PUBLIC_CASE as CASE_5_10D_SC } from "./5-10D-SC.public";

const REGISTRY = {
  "3.6E-SC": CASE_3_6E_SC,
  "4.7B-SC": CASE_4_7B_SC,
  "5.10D-SC": CASE_5_10D_SC,
};

export function getSignalCheckPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listSignalCheckStandards() {
  return Object.keys(REGISTRY);
}
