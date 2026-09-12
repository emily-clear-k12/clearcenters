// Signal Check Weigh-In — companion to 4.10A-SC (Did the Puddle Really Disappear?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.10A-SC-WI",
  teksLabel: "4.10A",
  grade: 4,
  subject: "Science",
  title: 'Puddle Gone Weigh-In',
  tagline: 'Did the water stop existing?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Puddle-log Cadets locked in. Who\'s right?',
    context: 'A sunny puddle dried up. One Cadet says the water is gone forever. The other says it became vapor still in the water cycle.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The puddle water is gone completely — it doesn\'t exist anywhere.' },
    { id: "B", label: "SIDE B", claim: 'The water became vapor in the air — still water, just invisible.' },
  ],

  evidence: [
    { id: "covered", text: 'Covered cup in the sun lost almost no water.', supports: "B" },
    { id: "uncovered", text: 'Uncovered cup in the same spot lost nearly all water by next day.', supports: "B" },
    { id: "lid_drops", text: 'Droplets form on a lid held above warm water.', supports: "B" },
    { id: "vapor_note", text: 'Water vapor is still water — just an invisible gas.', supports: "B" },
    { id: "puddle_shape", text: 'The puddle was shaped like a triangle.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use covered vs uncovered?',
    'Did I mention vapor or the lid drops?',
    'Did I avoid saying water stopped existing?',
    'Did my proof match my side?',
  ],
};
