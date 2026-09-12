// SERVER ONLY — Weigh-In rubric for 5.6C-SC-WI.

export const SERVER_CASE = {
  standard: '5.6C-SC-WI',
  title: 'Salt Mass Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'weight',
    'same',
    'not gone',
  ],
  modelAnswer:
    'Side B — matter isn\'t gone. Before and after totals match; dissolving just hides the salt in tiny bits.',
};
