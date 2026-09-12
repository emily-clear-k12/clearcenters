// SERVER ONLY — Weigh-In rubric for 5.11-SC-WI.

export const SERVER_CASE = {
  standard: '5.11-SC-WI',
  title: 'Faucet Save Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'gallons',
    'year',
    'saves',
  ],
  modelAnswer:
    'Side B — it counts. About 4 gallons per brushing session adds up to thousands of gallons a year.',
};
