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
import { SERVER_CASE as CASE_3_6A } from "./3-6A.server";
import { SERVER_CASE as CASE_3_6B } from "./3-6B.server";
import { SERVER_CASE as CASE_3_6C } from "./3-6C.server";
import { SERVER_CASE as CASE_3_6D } from "./3-6D.server";
import { SERVER_CASE as CASE_3_7A } from "./3-7A.server";
import { SERVER_CASE as CASE_3_7B } from "./3-7B.server";
import { SERVER_CASE as CASE_3_8A } from "./3-8A.server";
import { SERVER_CASE as CASE_3_8B } from "./3-8B.server";
import { SERVER_CASE as CASE_3_9A } from "./3-9A.server";
import { SERVER_CASE as CASE_3_9B } from "./3-9B.server";
import { SERVER_CASE as CASE_3_10A } from "./3-10A.server";
import { SERVER_CASE as CASE_3_10B } from "./3-10B.server";
import { SERVER_CASE as CASE_3_10C } from "./3-10C.server";
import { SERVER_CASE as CASE_3_11A } from "./3-11A.server";
import { SERVER_CASE as CASE_3_11B } from "./3-11B.server";
import { SERVER_CASE as CASE_3_11C } from "./3-11C.server";
import { SERVER_CASE as CASE_3_12A } from "./3-12A.server";
import { SERVER_CASE as CASE_3_12B } from "./3-12B.server";
import { SERVER_CASE as CASE_3_12C } from "./3-12C.server";
import { SERVER_CASE as CASE_3_12D } from "./3-12D.server";
import { SERVER_CASE as CASE_3_13A } from "./3-13A.server";
import { SERVER_CASE as CASE_3_13B } from "./3-13B.server";
import { SERVER_CASE as CASE_4_6A } from "./4-6A.server";
import { SERVER_CASE as CASE_4_6B } from "./4-6B.server";
import { SERVER_CASE as CASE_4_7 } from "./4-7.server";
import { SERVER_CASE as CASE_4_8A } from "./4-8A.server";
import { SERVER_CASE as CASE_4_8C } from "./4-8C.server";
import { SERVER_CASE as CASE_4_9A } from "./4-9A.server";
import { SERVER_CASE as CASE_4_10B } from "./4-10B.server";
import { SERVER_CASE as CASE_4_10C } from "./4-10C.server";
import { SERVER_CASE as CASE_4_11A } from "./4-11A.server";
import { SERVER_CASE as CASE_4_11B } from "./4-11B.server";
import { SERVER_CASE as CASE_4_11C } from "./4-11C.server";
import { SERVER_CASE as CASE_4_12A } from "./4-12A.server";
import { SERVER_CASE as CASE_4_12C } from "./4-12C.server";
import { SERVER_CASE as CASE_4_13A } from "./4-13A.server";

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
  "3.6A": CASE_3_6A,
  "3.6B": CASE_3_6B,
  "3.6C": CASE_3_6C,
  "3.6D": CASE_3_6D,
  "3.7A": CASE_3_7A,
  "3.7B": CASE_3_7B,
  "3.8A": CASE_3_8A,
  "3.8B": CASE_3_8B,
  "3.9A": CASE_3_9A,
  "3.9B": CASE_3_9B,
  "3.10A": CASE_3_10A,
  "3.10B": CASE_3_10B,
  "3.10C": CASE_3_10C,
  "3.11A": CASE_3_11A,
  "3.11B": CASE_3_11B,
  "3.11C": CASE_3_11C,
  "3.12A": CASE_3_12A,
  "3.12B": CASE_3_12B,
  "3.12C": CASE_3_12C,
  "3.12D": CASE_3_12D,
  "3.13A": CASE_3_13A,
  "3.13B": CASE_3_13B,
  "4.6A": CASE_4_6A,
  "4.6B": CASE_4_6B,
  "4.7": CASE_4_7,
  "4.8A": CASE_4_8A,
  "4.8C": CASE_4_8C,
  "4.9A": CASE_4_9A,
  "4.10B": CASE_4_10B,
  "4.10C": CASE_4_10C,
  "4.11A": CASE_4_11A,
  "4.11B": CASE_4_11B,
  "4.11C": CASE_4_11C,
  "4.12A": CASE_4_12A,
  "4.12C": CASE_4_12C,
  "4.13A": CASE_4_13A,
};

export function getServerCase(standard) {
  return REGISTRY[standard] || null;
}
