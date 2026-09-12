// Signal Check Weigh-In — companion to 5.6B-SC (Did Mixing Make Something Brand New?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.6B-SC-WI',
  teksLabel: '5.6B',
  grade: 5,
  subject: "Science",
  title: 'Mix Pile Weigh-In',
  tagline: 'One new substance?',
  stemMode: "open",

  dispute: {
    prompt: 'Mix-pile Cadets locked in. Who\'s right?',
    context: 'Field Lab mixed iron filings and sand. One Cadet says they became one new substance. The other says it\'s still a separable mixture.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Iron filings and sand mixed into one new substance — can\'t get sand back.' },
    { id: "B", label: "SIDE B", claim: 'It\'s still a mixture — magnet pulls filings out; sand stays sand.' },
  ],

  evidence: [
    { id: 'magnet_pull', text: 'Magnet through the pile lifts only the iron filings.', supports: 'B' },
    { id: 'sand_left', text: 'Sand stays behind after the magnet pass.', supports: 'B' },
    { id: 'filings_still', text: 'Recovered filings still snap to a magnet.', supports: 'B' },
    { id: 'sand_same', text: 'Leftover sand still looks and pours like before.', supports: 'B' },
    { id: 'mixture_note', text: 'In a mixture, each part keeps its properties and can be separated.', supports: 'B' },
    { id: 'cup_half', text: 'The mixed pile filled about half a small cup.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the magnet separated the pile?',
    'Did I say it\'s still a mixture?',
    'Did I skip the cup-size note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
