// Simulation Lab server-case registry — mirrors mission-map's
// index.server.js. Never imported by client code.

import { SERVER_CASE as CASE_3_8B_SL } from "./3-8B-SL.server";

const CASES = {
  "3.8B-SL": CASE_3_8B_SL,
};

export function getSimulationLabServerCase(standard) {
  return CASES[standard] || null;
}
