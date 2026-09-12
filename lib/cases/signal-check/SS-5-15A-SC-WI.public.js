// Signal Check Weigh-In — companion to SS.5.15A-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.15A-SC-WI',
  teksLabel: '5.15A',
  grade: 5,
  subject: "Social Studies",
  title: 'Branch Jobs Weigh-In',
  tagline: 'Executive does every job?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Articles I–III split lawmaking, enforcing, and interpreting. One Cadet says the executive does it all. The other says each branch has its own job.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The executive branch can make laws and decide what those laws mean.' },
    { id: "B", label: "SIDE B", claim: 'Congress makes laws, the executive enforces them, and courts interpret them.' },
  ],

  evidence: [
    { id: 'article2_text', text: 'Article II: executive enforces and carries out the laws.', supports: 'B' },
    { id: 'veto_record', text: 'President vetoes a bill and sends it back to Congress — doesn\'t rewrite it.', supports: 'B' },
    { id: 'article1_text', text: 'Article I: Congress writes and passes laws.', supports: 'B' },
    { id: 'article3_text', text: 'Article III: courts interpret laws and rule on constitutionality.', supports: 'B' },
    { id: 'unrelated_census', text: 'Unrelated amendment about how the census is conducted.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name Congress or the courts?',
    'Did I say the executive doesn\'t make/interpret laws?',
    'Did I skip the census note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
