// SERVER ONLY — Weigh-In rubric for 4.8B-SC-WI.

export const SERVER_CASE = {
  standard: "4.8B-SC-WI",
  title: 'Towel Cold Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown-open",
  correctSideId: "B",
  rulingMustInclude: [
    "heat",
    "not making cold",
    "slows",
  ],
  modelAnswer:
    'Side B — towel doesn\'t make cold. It stayed room temp. Wrapped lasted longer because heat got in slower.',
};
