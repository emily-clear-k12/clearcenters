// Signal Check Weigh-In - companion to 3.9B-SC.
// Reuses Solar System Model Line-Up evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.9B-SC-WI",
  teksLabel: "3.9B",
  grade: 3,
  subject: "Science",
  title: 'Biggest Closest?',
  tagline: 'Should the biggest planet sit nearest the sun?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Model Line-Up Cadets disagree. Who's right?",
    context: 'Mercury is small and closest; Jupiter is huge and farther out. One Cadet says biggest should be closest. The other says order is about orbit distance.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The biggest planet should be the one closest to the sun.' },
    { id: "B", label: "SIDE B", claim: 'Planet order is about orbit distance - not how big it is.' },
  ],

  evidence: [
    { id: "mercury_size", text: 'Mercury diameter ~4,880 km - one of the smallest.', supports: "B" },
    { id: "mercury_distance", text: 'Mercury measures closest to the sun in the model.', supports: "B" },
    { id: "jupiter_size", text: 'Jupiter diameter ~139,820 km - the largest planet.', supports: "B" },
    { id: "jupiter_distance", text: 'Jupiter sits fifth from the sun in the model.', supports: "B" },
    { id: "order_note", text: 'Order from the sun uses orbit distance - not size.', supports: "B" },
    { id: "planet_color", text: 'Jupiter model got extra orange stripes for detail.', supports: "neither" },
  ],

  echo: {
    main: 'Line-up fight, Cadet. Size vs distance? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice Mercury is small and closest?',
    'Did I notice Jupiter is large and farther out?',
    'Did I avoid saying biggest should be closest?',
    'Did my proof match my ruling?',
  ],
};
