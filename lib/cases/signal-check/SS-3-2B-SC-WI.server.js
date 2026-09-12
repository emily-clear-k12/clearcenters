// SERVER ONLY — Weigh-In rubric for SS.3.2B-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.2B-SC-WI',
  title: 'Same Fix Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'birch',
    'traffic',
    'same',
  ],
  modelAnswer:
    'Side B — fixes should match the street. Elm has ~400 cars/hour so it got a light; Birch has ~20 and zero incidents, so a crosswalk fits. Same problem ≠ same expensive fix.',
};
