// SERVER ONLY — Weigh-In rubric for 4.10A-SC-WI.

export const SERVER_CASE = {
  standard: "4.10A-SC-WI",
  title: 'Puddle Gone Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "vapor",
    "still",
    "not gone",
  ],
  modelAnswer:
    'Side B — water didn\'t stop existing. Sun turned it to vapor; lid test shows vapor can become drops again.',
};
