// SERVER ONLY — Weigh-In rubric for 5.8B-SC-WI.

export const SERVER_CASE = {
  standard: '5.8B-SC-WI',
  title: 'Switch Loop Weigh-In',
  caseShape: "weigh_in",
  stemMode: "open",
  correctSideId: "B",
  rulingMustInclude: [
    'switch',
    'loop',
    'complete',
  ],
  modelAnswer:
    'Side B — switch matters. OFF stops the motor even with wires connected; ON closes the loop and it spins.',
};
