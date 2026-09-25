// Simulation Lab server-case registry — mirrors mission-map's
// index.server.js. Never imported by client code.

import { SERVER_CASE as CASE_3_8B_SL } from "./3-8B-SL.server";
import { SERVER_CASE as CASE_3_6A_SL } from "./3-6A-SL.server";
import { SERVER_CASE as CASE_3_7A_SL } from "./3-7A-SL.server";
import { SERVER_CASE as CASE_3_6C_SL } from "./3-6C-SL.server";
import { SERVER_CASE as CASE_4_6B_SL } from "./4-6B-SL.server";
import { SERVER_CASE as CASE_4_7_SL } from "./4-7-SL.server";
import { SERVER_CASE as CASE_4_8C_SL } from "./4-8C-SL.server";
import { SERVER_CASE as CASE_5_7B_SL } from "./5-7B-SL.server";
import { SERVER_CASE as CASE_5_8B_SL } from "./5-8B-SL.server";
import { SERVER_CASE as CASE_5_9_SL } from "./5-9-SL.server";
// Sept 25 2026 batch (scene format)
import { SERVER_CASE as CASE_3_7B_SL } from "./3-7B-SL.server";
import { SERVER_CASE as CASE_3_8A_SL } from "./3-8A-SL.server";
import { SERVER_CASE as CASE_4_8B_SL } from "./4-8B-SL.server";
import { SERVER_CASE as CASE_4_9A_SL } from "./4-9A-SL.server";
import { SERVER_CASE as CASE_5_6C_SL } from "./5-6C-SL.server";
import { SERVER_CASE as CASE_5_7A_SL } from "./5-7A-SL.server";
import { SERVER_CASE as CASE_SS_3_6A_SL } from "./SS-3-6A-SL.server";
import { SERVER_CASE as CASE_SS_4_7A_SL } from "./SS-4-7A-SL.server";
import { SERVER_CASE as CASE_SS_5_11B_SL } from "./SS-5-11B-SL.server";
import { SERVER_CASE as CASE_MA_5_8C_SL } from "./MA-5-8C-SL.server";

const CASES = {
  "3.8B-SL": CASE_3_8B_SL,
  "3.6A-SL": CASE_3_6A_SL,
  "3.7A-SL": CASE_3_7A_SL,
  "3.6C-SL": CASE_3_6C_SL,
  "4.6B-SL": CASE_4_6B_SL,
  "4.7-SL": CASE_4_7_SL,
  "4.8C-SL": CASE_4_8C_SL,
  "5.7B-SL": CASE_5_7B_SL,
  "5.8B-SL": CASE_5_8B_SL,
  "5.9-SL": CASE_5_9_SL,
  "3.7B-SL": CASE_3_7B_SL,
  "3.8A-SL": CASE_3_8A_SL,
  "4.8B-SL": CASE_4_8B_SL,
  "4.9A-SL": CASE_4_9A_SL,
  "5.6C-SL": CASE_5_6C_SL,
  "5.7A-SL": CASE_5_7A_SL,
  "SS.3.6A-SL": CASE_SS_3_6A_SL,
  "SS.4.7A-SL": CASE_SS_4_7A_SL,
  "SS.5.11B-SL": CASE_SS_5_11B_SL,
  "MA.5.8C-SL": CASE_MA_5_8C_SL,
};

export function getSimulationLabServerCase(standard) {
  return CASES[standard] || null;
}
