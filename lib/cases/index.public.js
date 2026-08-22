import { PUBLIC_CASE as CASE_5_12B, CAST as CAST_5_12B, ORGANIZER_FIELDS as ORGANIZER_5_12B } from "./5-12B.public";

const REGISTRY = {
  "5.12B": { publicCase: CASE_5_12B, cast: CAST_5_12B, organizerFields: ORGANIZER_5_12B },
};

export function getPublicCase(standard) {
  return REGISTRY[standard] || null;
}
