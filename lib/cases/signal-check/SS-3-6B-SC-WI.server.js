// SERVER ONLY — Weigh-In rubric for SS.3.6B-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.6B-SC-WI',
  title: 'Scarce Now Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'want',
    'enough',
    'scarce',
  ],
  modelAnswer:
    'Side B — scarce doesn\'t mean zero left. Only 3 glittery notebooks vs ~20+ kids who want one (plus waitlist) = scarce now.',
};
