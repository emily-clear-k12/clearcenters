// SERVER ONLY — Weigh-In rubric for SS.4.6B-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.4.6B-SC-WI',
  title: 'Region Match Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown-open',
  correctSideId: "B",
  rulingMustInclude: [
    'soil',
    'region',
    'weather',
  ],
  modelAnswer:
    'Side B — matching humidity today doesn\'t merge regions. Piney Woods has pine + clay; Coastal Plains has marshes + sand.',
};
