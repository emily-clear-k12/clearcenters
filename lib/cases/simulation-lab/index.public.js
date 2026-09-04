// Simulation Lab public-case registry — mirrors mission-map's
// index.public.js. One entry per authored case; add new cases here as
// they're built (see SimulationLab_Digital_Design_v1.md §9 for what's next).

import { PUBLIC_CASE as CASE_3_8B_SL } from "./3-8B-SL.public";
import { PUBLIC_CASE as CASE_3_6A_SL } from "./3-6A-SL.public";
import { PUBLIC_CASE as CASE_3_7A_SL } from "./3-7A-SL.public";
import { PUBLIC_CASE as CASE_3_6C_SL } from "./3-6C-SL.public";
import { PUBLIC_CASE as CASE_4_6B_SL } from "./4-6B-SL.public";
import { PUBLIC_CASE as CASE_4_7_SL } from "./4-7-SL.public";
import { PUBLIC_CASE as CASE_4_8C_SL } from "./4-8C-SL.public";

const CASES = {
  "3.8B-SL": CASE_3_8B_SL,
  "3.6A-SL": CASE_3_6A_SL,
  "3.7A-SL": CASE_3_7A_SL,
  "3.6C-SL": CASE_3_6C_SL,
  "4.6B-SL": CASE_4_6B_SL,
  "4.7-SL": CASE_4_7_SL,
  "4.8C-SL": CASE_4_8C_SL,
};

export function getSimulationLabPublicCase(standard) {
  return CASES[standard] || null;
}
