// Signal Check Weigh-In — companion to 4.6B-SC (Stir It Long Enough?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.6B-SC-WI",
  teksLabel: "4.6B",
  grade: 4,
  subject: "Science",
  title: 'Oil Mix Weigh-In',
  tagline: 'One new liquid if you stir enough?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Lava-bottle Cadets locked in. Who\'s right?',
    context: 'Field Lab stirred oil and water. One Cadet says stir long enough and they become one new liquid. The other says they always separate again.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Stir long enough and oil + water turn into one new liquid.' },
    { id: "B", label: "SIDE B", claim: 'Oil and water mix for a bit, then separate again — not a new liquid.' },
  ],

  evidence: [
    { id: "stir_photo", text: 'Right after stirring: tiny oil drops cloudy in the water.', supports: "B" },
    { id: "settle_photo", text: 'Ten minutes later: oil floats back on top in its own layer.', supports: "B" },
    { id: "layer_check", text: 'Oil layer is the same size as before stirring.', supports: "B" },
    { id: "repeat_test", text: 'Five more stirs — always ends the same: two layers again.', supports: "B" },
    { id: "science_note", text: 'Oil and water don\'t stick together for good.', supports: "B" },
    { id: "bottle_color", text: 'The test bottle is blue plastic.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the oil floated back up?',
    'Did I say they don\'t become one new liquid?',
    'Did I skip the blue-bottle note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
