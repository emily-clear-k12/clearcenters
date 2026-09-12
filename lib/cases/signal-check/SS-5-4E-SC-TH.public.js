// Signal Check Thread — companion to SS.5.4E-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.4E-SC-TH',
  teksLabel: '5.4E',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Fixed by the 13th?',
  tagline: 'Cadets debate Reconstruction realities.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'The 13th Amendment fixed the problems freed people faced after slavery.',
    source: 'Reconstruction Records Archive',
    loggedAt: 'After 1865',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Done', text: '13th passed — problems fixed. Story over!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Codes', text: 'Black codes still limited work, travel, and property rights.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Debt', text: 'Sharecropping contracts trapped farmers in ongoing debt.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Rail', text: 'Neat railroad map in the same folder.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Text', text: 'Amendment ended slavery legally — but that isn\'t the whole story.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Paper', text: 'If it\'s abolished on paper, daily life is automatically fine.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'amendment_text', text: '13th Amendment (1865) abolishes slavery and involuntary servitude.' },
    { id: 'amendment_summary', text: 'A textbook summary calls the 13th \'the end of the story\' for formerly enslaved people.' },
    { id: 'sharecrop_contract', text: '1870s sharecropping contract: farmer owes most of the crop — ongoing debt.' },
    { id: 'black_codes', text: 'Black codes restricted freed people\'s work, travel, and property rights.' },
    { id: 'unrelated_railroad', text: 'Unrelated railroad expansion map from the same decade.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark codes/debt as helpful?',
    'Did I catch all-fixed as misleading?',
    'Did my reply use a real reading?',
    'Did I say problems continued?',
  ],
};
