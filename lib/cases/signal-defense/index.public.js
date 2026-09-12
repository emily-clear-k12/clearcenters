// Signal Defense public-case registry — mirrors simulation-lab's
// index.public.js. One entry per authored standard's question bank.

import { PUBLIC_CASE as CASE_3_6A_SD } from "./3-6A-SD.public";
import { PUBLIC_CASE as CASE_3_6B_SD } from "./3-6B-SD.public";
import { PUBLIC_CASE as CASE_3_6C_SD } from "./3-6C-SD.public";
import { PUBLIC_CASE as CASE_3_6D_SD } from "./3-6D-SD.public";
import { PUBLIC_CASE as CASE_3_7A_SD } from "./3-7A-SD.public";
import { PUBLIC_CASE as CASE_3_7B_SD } from "./3-7B-SD.public";
import { PUBLIC_CASE as CASE_3_8A_SD } from "./3-8A-SD.public";
import { PUBLIC_CASE as CASE_3_8B_SD } from "./3-8B-SD.public";
import { PUBLIC_CASE as CASE_3_9A_SD } from "./3-9A-SD.public";
import { PUBLIC_CASE as CASE_3_9B_SD } from "./3-9B-SD.public";
import { PUBLIC_CASE as CASE_3_10A_SD } from "./3-10A-SD.public";
import { PUBLIC_CASE as CASE_3_10B_SD } from "./3-10B-SD.public";
import { PUBLIC_CASE as CASE_3_10C_SD } from "./3-10C-SD.public";
import { PUBLIC_CASE as CASE_3_11A_SD } from "./3-11A-SD.public";
import { PUBLIC_CASE as CASE_3_11B_SD } from "./3-11B-SD.public";
import { PUBLIC_CASE as CASE_3_11C_SD } from "./3-11C-SD.public";
import { PUBLIC_CASE as CASE_3_12A_SD } from "./3-12A-SD.public";
import { PUBLIC_CASE as CASE_3_12B_SD } from "./3-12B-SD.public";
import { PUBLIC_CASE as CASE_3_12C_SD } from "./3-12C-SD.public";
import { PUBLIC_CASE as CASE_3_12D_SD } from "./3-12D-SD.public";
import { PUBLIC_CASE as CASE_3_13A_SD } from "./3-13A-SD.public";
import { PUBLIC_CASE as CASE_3_13B_SD } from "./3-13B-SD.public";

const CASES = {
  "3.6A-SD": CASE_3_6A_SD,
  "3.6B-SD": CASE_3_6B_SD,
  "3.6C-SD": CASE_3_6C_SD,
  "3.6D-SD": CASE_3_6D_SD,
  "3.7A-SD": CASE_3_7A_SD,
  "3.7B-SD": CASE_3_7B_SD,
  "3.8A-SD": CASE_3_8A_SD,
  "3.8B-SD": CASE_3_8B_SD,
  "3.9A-SD": CASE_3_9A_SD,
  "3.9B-SD": CASE_3_9B_SD,
  "3.10A-SD": CASE_3_10A_SD,
  "3.10B-SD": CASE_3_10B_SD,
  "3.10C-SD": CASE_3_10C_SD,
  "3.11A-SD": CASE_3_11A_SD,
  "3.11B-SD": CASE_3_11B_SD,
  "3.11C-SD": CASE_3_11C_SD,
  "3.12A-SD": CASE_3_12A_SD,
  "3.12B-SD": CASE_3_12B_SD,
  "3.12C-SD": CASE_3_12C_SD,
  "3.12D-SD": CASE_3_12D_SD,
  "3.13A-SD": CASE_3_13A_SD,
  "3.13B-SD": CASE_3_13B_SD,
};

export function getSignalDefensePublicCase(standard) {
  return CASES[standard] || null;
}
