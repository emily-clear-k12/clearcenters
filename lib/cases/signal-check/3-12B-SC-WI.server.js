// SERVER ONLY - Weigh-In rubric for 3.12B-SC-WI.

export const SERVER_CASE = {
  standard: "3.12B-SC-WI",
  title: 'Frog Drop Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'ripple',
    'heron',
    'frogs',
  ],
  modelAnswer:
    'Side B - food web ripples. Frogs feed herons; when frogs dropped, heron counts dropped too. Not zero change.',
};
