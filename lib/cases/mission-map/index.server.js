// Mission Map's server-case registry. Never import this from a client
// component — same rule and same pattern as
// lib/cases/signal-check/index.server.js.
//
// Sept 2, 2026 — added the first Science batch beyond the original 3 cases.
// Sept 2, 2026 (later same day) — added the full Social Studies batch,
// completing every Social Studies concept in the 48-concept library.
// See index.public.js for the full list and each case file's own header
// comment for its TEKS alignment.

import { SERVER_CASE as SERVER_3_1_MM } from "./3-1-MM.server";
import { SERVER_CASE as SERVER_3_2_MM } from "./3-2-MM.server";
import { SERVER_CASE as SERVER_3_3_MM } from "./3-3-MM.server";
import { SERVER_CASE as SERVER_3_4_MM } from "./3-4-MM.server";
import { SERVER_CASE as SERVER_3_5_MM } from "./3-5-MM.server";
import { SERVER_CASE as SERVER_3_6_MM } from "./3-6-MM.server";
import { SERVER_CASE as SERVER_3_7_MM } from "./3-7-MM.server";
import { SERVER_CASE as SERVER_3_8_MM } from "./3-8-MM.server";
import { SERVER_CASE as SERVER_4_1_MM } from "./4-1-MM.server";
import { SERVER_CASE as SERVER_4_2_MM } from "./4-2-MM.server";
import { SERVER_CASE as SERVER_4_3_MM } from "./4-3-MM.server";
import { SERVER_CASE as SERVER_4_4_MM } from "./4-4-MM.server";
import { SERVER_CASE as SERVER_4_5_MM } from "./4-5-MM.server";
import { SERVER_CASE as SERVER_4_6_MM } from "./4-6-MM.server";
import { SERVER_CASE as SERVER_4_7_MM } from "./4-7-MM.server";
import { SERVER_CASE as SERVER_4_8_MM } from "./4-8-MM.server";
import { SERVER_CASE as SERVER_4_9_MM } from "./4-9-MM.server";
import { SERVER_CASE as SERVER_5_1_MM } from "./5-1-MM.server";
import { SERVER_CASE as SERVER_5_2_MM } from "./5-2-MM.server";
import { SERVER_CASE as SERVER_5_3_MM } from "./5-3-MM.server";
import { SERVER_CASE as SERVER_5_4_MM } from "./5-4-MM.server";
import { SERVER_CASE as SERVER_5_5_MM } from "./5-5-MM.server";
import { SERVER_CASE as SERVER_5_6_MM } from "./5-6-MM.server";
import { SERVER_CASE as SERVER_5_7_MM } from "./5-7-MM.server";
import { SERVER_CASE as SERVER_5_8_MM } from "./5-8-MM.server";

const REGISTRY = {
  "3.1-MM": SERVER_3_1_MM,
  "3.2-MM": SERVER_3_2_MM,
  "3.3-MM": SERVER_3_3_MM,
  "3.4-MM": SERVER_3_4_MM,
  "3.5-MM": SERVER_3_5_MM,
  "3.6-MM": SERVER_3_6_MM,
  "3.7-MM": SERVER_3_7_MM,
  "3.8-MM": SERVER_3_8_MM,
  "4.1-MM": SERVER_4_1_MM,
  "4.2-MM": SERVER_4_2_MM,
  "4.3-MM": SERVER_4_3_MM,
  "4.4-MM": SERVER_4_4_MM,
  "4.5-MM": SERVER_4_5_MM,
  "4.6-MM": SERVER_4_6_MM,
  "4.7-MM": SERVER_4_7_MM,
  "4.8-MM": SERVER_4_8_MM,
  "4.9-MM": SERVER_4_9_MM,
  "5.1-MM": SERVER_5_1_MM,
  "5.2-MM": SERVER_5_2_MM,
  "5.3-MM": SERVER_5_3_MM,
  "5.4-MM": SERVER_5_4_MM,
  "5.5-MM": SERVER_5_5_MM,
  "5.6-MM": SERVER_5_6_MM,
  "5.7-MM": SERVER_5_7_MM,
  "5.8-MM": SERVER_5_8_MM,
};

export function getMissionMapServerCase(standard) {
  return REGISTRY[standard] || null;
}
