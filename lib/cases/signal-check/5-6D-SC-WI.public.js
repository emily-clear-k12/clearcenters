// Signal Check Weigh-In — companion to 5.6D-SC (Is an Empty Balloon Really Empty?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.6D-SC-WI',
  teksLabel: '5.6D',
  grade: 5,
  subject: "Science",
  title: 'Balloon Air Weigh-In',
  tagline: 'Truly empty?',
  stemMode: "open",

  dispute: {
    prompt: 'Balloon Cadets locked in. Who\'s right?',
    context: 'Balloon Weight Test compared deflated vs inflated. One Cadet says flat means empty. The other says air particles are still matter.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'An uninflated balloon has nothing inside it at all.' },
    { id: "B", label: "SIDE B", claim: 'Air is matter — inflated weighs more and pushes back.' },
  ],

  evidence: [
    { id: 'weight_deflated', text: 'Deflated balloon weighs a certain amount on a sensitive scale.', supports: 'B' },
    { id: 'weight_inflated', text: 'Same balloon inflated weighs a tiny bit more.', supports: 'B' },
    { id: 'push_back', text: 'Inflated balloon pushes back when squeezed.', supports: 'B' },
    { id: 'flatten', text: 'Deflated balloon flattens almost completely.', supports: 'B' },
    { id: 'particle_note', text: 'Air particles are too small to see but still have mass and take space.', supports: 'B' },
    { id: 'balloon_red', text: 'The test balloon was bright red.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice inflated weighed more?',
    'Did I say air is matter?',
    'Did I skip the color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
