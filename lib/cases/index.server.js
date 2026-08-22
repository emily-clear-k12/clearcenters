import { SERVER_CASE as CASE_5_12B } from "./5-12B.server";

const REGISTRY = {
  "5.12B": CASE_5_12B,
};

export function getServerCase(standard) {
  return REGISTRY[standard] || null;
}
