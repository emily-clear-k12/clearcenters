// SERVER ONLY — Weigh-In rubric for 4.8A-SC-WI.

export const SERVER_CASE = {
  standard: "4.8A-SC-WI",
  title: 'Bell Jump Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "contact",
    "middle",
    "not skip",
  ],
  modelAnswer:
    'Side B — energy doesn\'t skip. Remove a middle bell and the end stops. Motion passes through contact.',
};
