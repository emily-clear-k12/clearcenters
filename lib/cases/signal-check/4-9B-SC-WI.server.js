// SERVER ONLY — Weigh-In rubric for 4.9B-SC-WI.

export const SERVER_CASE = {
  standard: "4.9B-SC-WI",
  title: 'Moon Size Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "same size",
    "lit",
    "not shrink",
  ],
  modelAnswer:
    'Side B — Moon doesn\'t shrink. Same size in every photo; same craters. We just see a changing lit part.',
};
