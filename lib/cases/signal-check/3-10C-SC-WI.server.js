// SERVER ONLY - Weigh-In rubric for 3.10C-SC-WI.

export const SERVER_CASE = {
  standard: "3.10C-SC-WI",
  title: 'Bank Change Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'slow',
    'weekly',
    'not overnight',
  ],
  modelAnswer:
    'Side B - change was slow. Weekly photos show gradual wear; no single overnight event. Small changes added up.',
};
