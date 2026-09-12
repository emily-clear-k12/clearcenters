// Signal Check Weigh-In — companion to 5.8A-SC (Does the Flashlight Make Energy From Nothing?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.8A-SC-WI',
  teksLabel: '5.8A',
  grade: 5,
  subject: "Science",
  title: 'Flashlight Energy Weigh-In',
  tagline: 'Energy from nothing?',
  stemMode: "open",

  dispute: {
    prompt: 'Flashlight Cadets locked in. Who\'s right?',
    context: 'Flashlight Teardown Log compared fresh vs used batteries and bulb warmth. One Cadet says light appears from nothing. The other says energy transforms.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Flashlight makes brand-new light energy out of nothing.' },
    { id: "B", label: "SIDE B", claim: 'It transforms battery chemical energy into light and heat.' },
  ],

  evidence: [
    { id: 'fresh_batt', text: 'Fresh battery reads high chemical energy on the tester.', supports: 'B' },
    { id: 'used_batt', text: 'Same battery after hours of use reads much lower.', supports: 'B' },
    { id: 'bulb_cool', text: 'Bulb feels room-temp at switch-on.', supports: 'B' },
    { id: 'bulb_warm', text: 'Bulb feels warm after minutes lit.', supports: 'B' },
    { id: 'transform_note', text: 'Flashlight transforms chemical energy into light and thermal energy.', supports: 'B' },
    { id: 'case_black', text: 'Flashlight case is black plastic.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the battery reading dropped?',
    'Did I say energy transforms, not appears?',
    'Did I skip the case-color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
