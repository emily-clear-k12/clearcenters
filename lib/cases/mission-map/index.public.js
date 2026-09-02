// Mission Map's public-case registry — same pattern as
// lib/cases/signal-check/index.public.js: one file per case, a flat
// REGISTRY keyed by standard string, one lookup function.
//
// Adding a new case = write its <grade>-<concept>-MM.public.js /
// .server.js pair, import it here, add one REGISTRY line, and add the
// matching entry to that pair's server-side counterpart in
// index.server.js. No dynamic file-system scanning — this is a manually
// maintained map, same as every other engine.
//
// Sept 2, 2026 — added the first Science batch beyond the original 3
// cases: 3.2/3.3/3.4-MM (Grade 3), 4.2/4.3/4.4/4.5-MM (Grade 4), and
// 5.2/5.3/5.4-MM (Grade 5), completing every remaining Science concept in
// the 48-concept library. See each file's own header comment for its TEKS
// alignment, and MissionMap_Digital_Design_v1.md for the batch-level notes.

import { PUBLIC_CASE as CASE_3_1_MM } from "./3-1-MM.public";
import { PUBLIC_CASE as CASE_3_2_MM } from "./3-2-MM.public";
import { PUBLIC_CASE as CASE_3_3_MM } from "./3-3-MM.public";
import { PUBLIC_CASE as CASE_3_4_MM } from "./3-4-MM.public";
import { PUBLIC_CASE as CASE_4_1_MM } from "./4-1-MM.public";
import { PUBLIC_CASE as CASE_4_2_MM } from "./4-2-MM.public";
import { PUBLIC_CASE as CASE_4_3_MM } from "./4-3-MM.public";
import { PUBLIC_CASE as CASE_4_4_MM } from "./4-4-MM.public";
import { PUBLIC_CASE as CASE_4_5_MM } from "./4-5-MM.public";
import { PUBLIC_CASE as CASE_5_1_MM } from "./5-1-MM.public";
import { PUBLIC_CASE as CASE_5_2_MM } from "./5-2-MM.public";
import { PUBLIC_CASE as CASE_5_3_MM } from "./5-3-MM.public";
import { PUBLIC_CASE as CASE_5_4_MM } from "./5-4-MM.public";

export const REGISTRY = {
  "3.1-MM": CASE_3_1_MM,
  "3.2-MM": CASE_3_2_MM,
  "3.3-MM": CASE_3_3_MM,
  "3.4-MM": CASE_3_4_MM,
  "4.1-MM": CASE_4_1_MM,
  "4.2-MM": CASE_4_2_MM,
  "4.3-MM": CASE_4_3_MM,
  "4.4-MM": CASE_4_4_MM,
  "4.5-MM": CASE_4_5_MM,
  "5.1-MM": CASE_5_1_MM,
  "5.2-MM": CASE_5_2_MM,
  "5.3-MM": CASE_5_3_MM,
  "5.4-MM": CASE_5_4_MM,
};

export function getMissionMapPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listMissionMapStandards() {
  return Object.keys(REGISTRY);
}
