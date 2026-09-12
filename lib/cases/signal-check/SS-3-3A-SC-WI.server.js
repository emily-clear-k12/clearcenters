// SERVER ONLY — Weigh-In rubric for SS.3.3A-SC-WI.

export const SERVER_CASE = {
  standard: 'SS.3.3A-SC-WI',
  title: 'Same Weather Weigh-In',
  caseShape: "weigh_in",
  stemMode: 'dropdown',
  correctSideId: "B",
  rulingMustInclude: [
    'soil',
    'rain',
    'same',
  ],
  modelAnswer:
    'Side B — same sunny day doesn\'t make the land the same. Desert Flats is dry sand and cactus; Green Valley is damp pines at higher elevation with way more rain.',
};
