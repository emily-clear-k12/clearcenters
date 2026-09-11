// Classification Lab server-case registry — mirrors simulation-lab's
// index.server.js. Never imported by client code.

import { SERVER_CASE as CASE_3_6B_CL } from "./3-6B-CL.server";

const CASES = {
  "3.6B-CL": CASE_3_6B_CL,
};

export function getClassificationLabServerCase(standard) {
  return CASES[standard] || null;
}
