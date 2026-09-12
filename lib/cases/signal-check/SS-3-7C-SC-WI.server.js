// SERVER ONLY — Weigh-In rubric for SS.3.7C-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.7C-SC-WI',
  title: 'Whose Job Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'city',
    'state',
    'federal',
  ],
  modelAnswer:
    'Side B — helpful ≠ interchangeable. City patches potholes, Texas DPS handles licenses, and federal law keeps mail with the U.S. Postal Service.',
};
