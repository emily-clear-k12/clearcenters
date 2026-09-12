// Signal Check Weigh-In — companion to 5.7A-SC (If Both Sides Pull, Does It Have to Move?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.7A-SC-WI',
  teksLabel: '5.7A',
  grade: 5,
  subject: "Science",
  title: 'Tug Rope Weigh-In',
  tagline: 'Must it move?',
  stemMode: "open",

  dispute: {
    prompt: 'Tug Cadets locked in. Who\'s right?',
    context: 'Tug-of-War Force Log showed equal meters and a still center mark. One Cadet says pulling forces always move the rope. The other says balanced forces don\'t.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Both teams pulling hard means the rope has to move.' },
    { id: "B", label: "SIDE B", claim: 'Equal opposite forces balance — center mark can stay put.' },
  ],

  evidence: [
    { id: 'force_left', text: 'Left force meter reads 400 N.', supports: 'B' },
    { id: 'force_right', text: 'Right force meter also reads 400 N.', supports: 'B' },
    { id: 'center_start', text: 'Center mark starts on the middle line.', supports: 'B' },
    { id: 'center_after', text: 'After 30 seconds of pulling, center mark is still on the line.', supports: 'B' },
    { id: 'balance_note', text: 'Equal opposite forces balance — no change in motion.', supports: 'B' },
    { id: 'rope_yellow', text: 'The rope was thick yellow.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice both meters matched?',
    'Did I say balanced forces can hold still?',
    'Did I skip the rope-color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
