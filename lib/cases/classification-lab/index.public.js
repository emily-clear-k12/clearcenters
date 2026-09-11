// Classification Lab public-case registry — mirrors simulation-lab's
// index.public.js. One entry per authored case; add new cases here as
// they're built (see ClassificationLab_Digital_Design_v2.md).

import { PUBLIC_CASE as CASE_3_6B_CL } from "./3-6B-CL.public";

const CASES = {
  "3.6B-CL": CASE_3_6B_CL,
};

export function getClassificationLabPublicCase(standard) {
  return CASES[standard] || null;
}
