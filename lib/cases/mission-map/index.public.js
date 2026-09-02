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
//
// Sept 2, 2026 (later same day) — added the full Social Studies batch:
// 3.5/3.6/3.7/3.8-MM (Grade 3), 4.6/4.7/4.8/4.9-MM (Grade 4), and
// 5.5/5.6/5.7/5.8-MM (Grade 5), completing every Social Studies concept in
// the 48-concept library. Two TEKS-anchor notes worth knowing: 3.8-MM was
// re-anchored from the library's original "goods vs. services" framing
// (not a real Grade 3 standard) to 3.6A Supply & Demand, and 4.9-MM was
// re-pointed from the assumed civic-participation strand to the more
// precise 4.22A Democratic Decision Making. See each file's own header
// comment for full detail.

import { PUBLIC_CASE as CASE_3_1_MM } from "./3-1-MM.public";
import { PUBLIC_CASE as CASE_3_2_MM } from "./3-2-MM.public";
import { PUBLIC_CASE as CASE_3_3_MM } from "./3-3-MM.public";
import { PUBLIC_CASE as CASE_3_4_MM } from "./3-4-MM.public";
import { PUBLIC_CASE as CASE_3_5_MM } from "./3-5-MM.public";
import { PUBLIC_CASE as CASE_3_6_MM } from "./3-6-MM.public";
import { PUBLIC_CASE as CASE_3_7_MM } from "./3-7-MM.public";
import { PUBLIC_CASE as CASE_3_8_MM } from "./3-8-MM.public";
import { PUBLIC_CASE as CASE_4_1_MM } from "./4-1-MM.public";
import { PUBLIC_CASE as CASE_4_2_MM } from "./4-2-MM.public";
import { PUBLIC_CASE as CASE_4_3_MM } from "./4-3-MM.public";
import { PUBLIC_CASE as CASE_4_4_MM } from "./4-4-MM.public";
import { PUBLIC_CASE as CASE_4_5_MM } from "./4-5-MM.public";
import { PUBLIC_CASE as CASE_4_6_MM } from "./4-6-MM.public";
import { PUBLIC_CASE as CASE_4_7_MM } from "./4-7-MM.public";
import { PUBLIC_CASE as CASE_4_8_MM } from "./4-8-MM.public";
import { PUBLIC_CASE as CASE_4_9_MM } from "./4-9-MM.public";
import { PUBLIC_CASE as CASE_5_1_MM } from "./5-1-MM.public";
import { PUBLIC_CASE as CASE_5_2_MM } from "./5-2-MM.public";
import { PUBLIC_CASE as CASE_5_3_MM } from "./5-3-MM.public";
import { PUBLIC_CASE as CASE_5_4_MM } from "./5-4-MM.public";
import { PUBLIC_CASE as CASE_5_5_MM } from "./5-5-MM.public";
import { PUBLIC_CASE as CASE_5_6_MM } from "./5-6-MM.public";
import { PUBLIC_CASE as CASE_5_7_MM } from "./5-7-MM.public";
import { PUBLIC_CASE as CASE_5_8_MM } from "./5-8-MM.public";

export const REGISTRY = {
  "3.1-MM": CASE_3_1_MM,
  "3.2-MM": CASE_3_2_MM,
  "3.3-MM": CASE_3_3_MM,
  "3.4-MM": CASE_3_4_MM,
  "3.5-MM": CASE_3_5_MM,
  "3.6-MM": CASE_3_6_MM,
  "3.7-MM": CASE_3_7_MM,
  "3.8-MM": CASE_3_8_MM,
  "4.1-MM": CASE_4_1_MM,
  "4.2-MM": CASE_4_2_MM,
  "4.3-MM": CASE_4_3_MM,
  "4.4-MM": CASE_4_4_MM,
  "4.5-MM": CASE_4_5_MM,
  "4.6-MM": CASE_4_6_MM,
  "4.7-MM": CASE_4_7_MM,
  "4.8-MM": CASE_4_8_MM,
  "4.9-MM": CASE_4_9_MM,
  "5.1-MM": CASE_5_1_MM,
  "5.2-MM": CASE_5_2_MM,
  "5.3-MM": CASE_5_3_MM,
  "5.4-MM": CASE_5_4_MM,
  "5.5-MM": CASE_5_5_MM,
  "5.6-MM": CASE_5_6_MM,
  "5.7-MM": CASE_5_7_MM,
  "5.8-MM": CASE_5_8_MM,
};

export function getMissionMapPublicCase(standard) {
  return REGISTRY[standard] || null;
}

export function listMissionMapStandards() {
  return Object.keys(REGISTRY);
}
