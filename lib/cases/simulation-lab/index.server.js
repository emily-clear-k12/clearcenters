// Simulation Lab server-case registry — mirrors mission-map's
// index.server.js. Never imported by client code.

import { SERVER_CASE as CASE_3_8B_SL } from "./3-8B-SL.server";
import { SERVER_CASE as CASE_3_6A_SL } from "./3-6A-SL.server";
import { SERVER_CASE as CASE_3_7A_SL } from "./3-7A-SL.server";
import { SERVER_CASE as CASE_3_6C_SL } from "./3-6C-SL.server";

const CASES = {
  "3.8B-SL": CASE_3_8B_SL,
  "3.6A-SL": CASE_3_6A_SL,
  "3.7A-SL": CASE_3_7A_SL,
  "3.6C-SL": CASE_3_6C_SL,
};

export function getSimulationLabServerCase(standard) {
  return CASES[standard] || null;
}
