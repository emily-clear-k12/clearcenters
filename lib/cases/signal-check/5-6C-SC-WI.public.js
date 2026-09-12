// Signal Check Weigh-In — companion to 5.6C-SC (Did the Salt Really Disappear?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.6C-SC-WI',
  teksLabel: '5.6C',
  grade: 5,
  subject: "Science",
  title: 'Salt Mass Weigh-In',
  tagline: 'Matter gone?',
  stemMode: "open",

  dispute: {
    prompt: 'Salt-cup Cadets locked in. Who\'s right?',
    context: 'Saltwater Mass Check weighed cup, salt, and water. One Cadet says dissolved salt disappears. The other says matter is conserved.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Salt dissolved and vanished — some matter is gone.' },
    { id: "B", label: "SIDE B", claim: 'Matter stays — before and after weights match; water tastes salty.' },
  ],

  evidence: [
    { id: 'before_weights', text: 'Empty cup, dry salt, and water weighed separately first.', supports: 'B' },
    { id: 'before_total', text: 'Those three weights add to a starting total.', supports: 'B' },
    { id: 'after_weight', text: 'Full saltwater cup weighs that exact same total.', supports: 'B' },
    { id: 'taste_test', text: 'Water tastes salty top to bottom after mixing.', supports: 'B' },
    { id: 'conserve_note', text: 'Dissolving spreads salt into tiny particles — matter doesn\'t vanish.', supports: 'B' },
    { id: 'cup_clear', text: 'The test cup was clear plastic.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice before/after weights matched?',
    'Did I say matter didn\'t disappear?',
    'Did I skip the cup-color note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
