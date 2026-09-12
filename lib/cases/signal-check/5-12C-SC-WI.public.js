// Signal Check Weigh-In — companion to 5.12C-SC (Will Paving the Lot Really Not Affect Anything Else?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.12C-SC-WI',
  teksLabel: '5.12C',
  grade: 5,
  subject: "Science",
  title: 'Pave Lot Weigh-In',
  tagline: 'No nearby effects?',
  stemMode: "open",

  dispute: {
    prompt: 'Lot Cadets locked in. Who\'s right?',
    context: 'Neighborhood Runoff Survey compared before/after paving and a rain garden. One Cadet says paving does nothing nearby. The other tracks runoff impacts.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Paving the dirt-and-weeds lot won\'t affect anything nearby.' },
    { id: "B", label: "SIDE B", claim: 'Paving changes runoff — and rain gardens show humans can help or harm.' },
  ],

  evidence: [
    { id: 'before', text: 'Before paving nearby, rain soaked into the ground.', supports: 'B' },
    { id: 'after', text: 'After paving, that rain runs straight to the storm drain.', supports: 'B' },
    { id: 'garden', text: 'Rain garden by another paved lot captures and filters runoff.', supports: 'B' },
    { id: 'wildlife', text: 'Frogs and dragonflies returned to that rain garden within a year.', supports: 'B' },
    { id: 'human', text: 'Human activities can harm (extra runoff) or help (rain gardens).', supports: 'B' },
    { id: 'half_acre', text: 'Paved lot covers about half an acre.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice runoff changed after paving?',
    'Did I say paving can affect nearby areas?',
    'Did I skip the acre note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
