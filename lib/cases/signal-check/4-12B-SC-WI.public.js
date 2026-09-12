// Signal Check Weigh-In — companion to 4.12B-SC (Do Decomposers Even Matter?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.12B-SC-WI",
  teksLabel: "4.12B",
  grade: 4,
  subject: "Science",
  title: 'Decomposer Weigh-In',
  tagline: 'Are decomposers out of the food web?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Plot Cadets locked in. Who\'s right?',
    context: 'A log broke down into soil. One Cadet says decomposers just tidy — not part of the food web. The other says they return nutrients producers need.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Decomposers just tidy dead stuff — they\'re not part of the food web.' },
    { id: "B", label: "SIDE B", claim: 'Decomposers are in the food web — they return nutrients producers need.' },
  ],

  evidence: [
    { id: "log_soil", text: 'Log broke down into soil over five months.', supports: "B" },
    { id: "plant_boost", text: 'Plants grew better in decomposed soil than plain soil.', supports: "B" },
    { id: "nutrient_note", text: 'Decomposers return nutrients that producers use.', supports: "B" },
    { id: "web_note", text: 'Consumers depend on producers — so decomposer nutrients matter to the whole web.', supports: "B" },
    { id: "log_length", text: 'The starter log was about one meter long.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note plants grew better?',
    'Did I say nutrients / food web?',
    'Did I skip log length as proof?',
    'Did my proof match my side?',
  ],
};
