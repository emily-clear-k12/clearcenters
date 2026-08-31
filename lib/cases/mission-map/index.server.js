// Mission Map's server-case registry. Never import this from a client
// component — same rule and same pattern as
// lib/cases/signal-check/index.server.js.

import { SERVER_CASE as SERVER_3_1_MM } from "./3-1-MM.server";
import { SERVER_CASE as SERVER_4_1_MM } from "./4-1-MM.server";
import { SERVER_CASE as SERVER_5_1_MM } from "./5-1-MM.server";

const REGISTRY = {
  "3.1-MM": SERVER_3_1_MM,
  "4.1-MM": SERVER_4_1_MM,
  "5.1-MM": SERVER_5_1_MM,
};

export function getMissionMapServerCase(standard) {
  return REGISTRY[standard] || null;
}
