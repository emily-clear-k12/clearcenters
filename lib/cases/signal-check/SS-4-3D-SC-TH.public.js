// Signal Check Thread — companion to SS.4.3D-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.3D-SC-TH',
  teksLabel: '4.3D',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Problems Solved?',
  tagline: 'Cadets debate the Republic\'s troubles.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'Once Texas became independent in 1836, most of its major problems were solved.',
    source: 'Republic of Texas Records',
    loggedAt: 'After Independence',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Done', text: 'Independence day = problems over!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Debt', text: 'They still owed huge debts and couldn\'t pay soldiers.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Mexico', text: 'Mexico refused to recognize Texas as a nation.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Flag', text: 'Cool new flag in 1839 though.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Raid', text: 'Border raids kept happening after 1836.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Easy', text: 'Winning the war fixed everything. Period.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'debt_record', text: 'New government owed large debts and struggled to pay soldiers and workers.' },
    { id: 'unpaid_soldiers', text: 'Many Texas soldiers went unpaid for months after the war.' },
    { id: 'mexico_recognition', text: 'Mexico refused to officially recognize Texas as independent.' },
    { id: 'border_raids', text: 'Mexican forces continued raids across the disputed border after 1836.' },
    { id: 'problems_summary', text: 'Debt, no recognition, and border conflict continued well after independence.' },
    { id: 'republic_struggle', text: 'These challenges lasted most of the Republic\'s ten years.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark debt/Mexico as helpful?',
    'Did I catch all-solved as misleading?',
    'Did my reply use a real reading?',
    'Did I say problems continued?',
  ],
};
