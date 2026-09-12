// SERVER ONLY — Weigh-In rubric for 4.6B-SC-WI.

export const SERVER_CASE = {
  standard: "4.6B-SC-WI",
  title: 'Oil Mix Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "separate",
    "layers",
    "not a new",
  ],
  modelAnswer:
    'Side B — oil and water don\'t become one new liquid. After stirring they look cloudy, then oil floats back up every time.',
};
