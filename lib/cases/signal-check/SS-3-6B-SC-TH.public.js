// Signal Check Thread — companion to SS.3.6B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.6B-SC-TH',
  teksLabel: '3.6B',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Only at Zero?',
  tagline: 'Cadets debate scarcity.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'Something is only scarce when there\'s none left at all.',
    source: 'Westview School Store',
    loggedAt: 'Notebook Shelf',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Zero', text: 'Still 3 left — so NOT scarce yet!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Want', text: '20 kids want one and only 3 exist. That\'s scarce.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Wait', text: 'Five more names hit the waitlist this morning.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Bell', text: 'Is the store open before the bell?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Delay', text: 'Restock is two weeks away — demand stays stuck.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Empty', text: 'Scarce ONLY means the shelf is empty. Period.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'glitter_count', text: 'Only 3 glittery notebooks left on the shelf.' },
    { id: 'class_survey', text: '20 out of 25 kids in Ms. Ruiz\'s class want a glittery notebook.' },
    { id: 'waitlist_note', text: '5 more kids joined the glittery waitlist this morning.' },
    { id: 'restock_delay', text: 'Next glittery restock won\'t arrive for two weeks.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark want/waitlist as helpful?',
    'Did I catch zero-only as misleading?',
    'Did my reply use a real reading?',
    'Did I say scarce means not enough?',
  ],
};
