// Mission Map's public-case registry — same pattern as
// lib/cases/signal-check/index.public.js: one file per case, a flat
// REGISTRY keyed by standard string, one lookup function.
//
// Adding a new case = write its <grade>-<concept>-MM.public.js /
// .server.js pair, import it here, add one REGISTRY line, and add the
// matching entry to that pair's server-side counterpart in
// index.server.js. No dynamic file-system scanning — this is a manually
// maintained map, same as every other engine.

import { PUBLIC_CASE as CASE_3_1_MM } from "./3-1-MM.public";
import { PUBLIC_CASE as CASE_4_1_MM } from "./4-1-MM.public";
import { PUBLIC_CASE as CASE_5_1_MM } from "./5-1-MM.public";

export const REGISTRY = {
  "3.1-MM": CASE_3_1_MM,
  "4.1-MM": CASE_4_1_MM,
  "5.1-MM": CASE_5_1_MM,
};

export function getMissionMapPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listMissionMapStandards() {
  return Object.keys(REGISTRY);
}
