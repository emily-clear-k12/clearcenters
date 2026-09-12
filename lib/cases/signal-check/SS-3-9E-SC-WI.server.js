// SERVER ONLY — Weigh-In rubric for SS.3.9E-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.9E-SC-WI',
  title: 'Loud Vote Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'votes',
    'Museum',
    'loud',
  ],
  modelAnswer:
    'Side B — fair means counted votes, not volume. Museum 15, Aquarium only 2 even though they cheered loudest. Recount same result.',
};
