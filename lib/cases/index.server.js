import { SERVER_CASE as CASE_5_12B } from "./5-12B.server";
import { SERVER_CASE as CASE_5_6A } from "./5-6A.server";
import { SERVER_CASE as CASE_5_6B } from "./5-6B.server";
import { SERVER_CASE as CASE_5_6C } from "./5-6C.server";
import { SERVER_CASE as CASE_5_6D } from "./5-6D.server";
import { SERVER_CASE as CASE_5_7A } from "./5-7A.server";
import { SERVER_CASE as CASE_5_7B } from "./5-7B.server";
import { SERVER_CASE as CASE_5_8A } from "./5-8A.server";
import { SERVER_CASE as CASE_5_8B } from "./5-8B.server";
import { SERVER_CASE as CASE_5_8C } from "./5-8C.server";
import { SERVER_CASE as CASE_5_9 } from "./5-9.server";
import { SERVER_CASE as CASE_5_10A } from "./5-10A.server";
import { SERVER_CASE as CASE_5_10B } from "./5-10B.server";
import { SERVER_CASE as CASE_5_10C } from "./5-10C.server";
import { SERVER_CASE as CASE_5_11A } from "./5-11A.server";
import { SERVER_CASE as CASE_5_12A } from "./5-12A.server";
import { SERVER_CASE as CASE_5_12C } from "./5-12C.server";
import { SERVER_CASE as CASE_5_13A } from "./5-13A.server";
import { SERVER_CASE as CASE_5_13B } from "./5-13B.server";

const REGISTRY = {
  "5.12B": CASE_5_12B,
  "5.6A": CASE_5_6A,
  "5.6B": CASE_5_6B,
  "5.6C": CASE_5_6C,
  "5.6D": CASE_5_6D,
  "5.7A": CASE_5_7A,
  "5.7B": CASE_5_7B,
  "5.8A": CASE_5_8A,
  "5.8B": CASE_5_8B,
  "5.8C": CASE_5_8C,
  "5.9": CASE_5_9,
  "5.10A": CASE_5_10A,
  "5.10B": CASE_5_10B,
  "5.10C": CASE_5_10C,
  "5.11A": CASE_5_11A,
  "5.12A": CASE_5_12A,
  "5.12C": CASE_5_12C,
  "5.13A": CASE_5_13A,
  "5.13B": CASE_5_13B,
};

export function getServerCase(standard) {
  return REGISTRY[standard] || null;
}
