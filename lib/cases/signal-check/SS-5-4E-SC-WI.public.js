// Signal Check Weigh-In — companion to SS.5.4E-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.4E-SC-WI',
  teksLabel: '5.4E',
  grade: 5,
  subject: "Social Studies",
  title: '13th Fix Weigh-In',
  tagline: 'Amendment fixed everything?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The 13th Amendment abolished slavery, but sharecropping debt and Black codes continued. One Cadet says problems were fixed. The other says freedom on paper wasn\'t full freedom in life.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The 13th Amendment fixed the problems freed people faced after slavery.' },
    { id: "B", label: "SIDE B", claim: 'It ended legal slavery, but sharecropping debt and Black codes kept hurting freed people.' },
  ],

  evidence: [
    { id: 'amendment_text', text: '13th Amendment (1865) abolishes slavery and involuntary servitude.', supports: 'A' },
    { id: 'amendment_summary', text: 'A textbook summary calls the 13th \'the end of the story\' for formerly enslaved people.', supports: 'neither' },
    { id: 'sharecrop_contract', text: '1870s sharecropping contract: farmer owes most of the crop — ongoing debt.', supports: 'B' },
    { id: 'black_codes', text: 'Black codes restricted freed people\'s work, travel, and property rights.', supports: 'B' },
    { id: 'unrelated_railroad', text: 'Unrelated railroad expansion map from the same decade.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name Black codes or sharecropping?',
    'Did I say the 13th didn\'t fix everything?',
    'Did I skip the railroad map as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
