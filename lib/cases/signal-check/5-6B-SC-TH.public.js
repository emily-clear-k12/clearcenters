// Signal Check Thread — companion to 5.6B-SC (Did Mixing Make Something Brand New?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.6B-SC-TH',
  teksLabel: '5.6B',
  grade: 5,
  subject: "Science",
  title: 'Thread: Brand-New Stuff?',
  tagline: 'Cadets buzz about iron + sand.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Once the iron filings and sand are mixed together, they\'ve become one whole new substance — there\'s no getting the sand back out.',
    source: 'Iron Filings & Sand Mix Test',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Blend', text: 'They look mixed now — so it\'s one brand-new substance!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Mag', text: 'Magnet pulled only the filings out. Sand stayed put.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Pour', text: 'Leftover sand still pours exactly like before.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Cup', text: 'Did we use the blue cup or the clear one?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Keep', text: 'Each part kept its own properties — classic mixture move.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Forever', text: 'Once mixed, you can NEVER get them apart again.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'magnet_pull', text: 'Magnet through the pile lifts only the iron filings.' },
    { id: 'sand_left', text: 'Sand stays behind after the magnet pass.' },
    { id: 'filings_still', text: 'Recovered filings still snap to a magnet.' },
    { id: 'sand_same', text: 'Leftover sand still looks and pours like before.' },
    { id: 'mixture_note', text: 'In a mixture, each part keeps its properties and can be separated.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark magnet/sand comments as helpful?',
    'Did I catch "never apart" as misleading?',
    'Did my reply use a real reading?',
    'Did I say it\'s a mixture, not a new substance?',
  ],
};
