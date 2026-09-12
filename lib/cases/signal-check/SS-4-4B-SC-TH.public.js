// Signal Check Thread — companion to SS.4.4B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.4B-SC-TH',
  teksLabel: '4.4B',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Just Cows?',
  tagline: 'Cadets debate the cattle boom.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'The cattle industry grew mostly because Texas simply had a lot of cows.',
    source: 'Cattle Drive Era Records',
    loggedAt: 'Boom Timing File',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Cows', text: 'Texas had tons of cows — that\'s the whole boom!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Price', text: '$2–4 here became $20–40 up north. That\'s the spark.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Trail', text: 'Chisholm-style trails linked ranches to Kansas railroads.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Brand', text: 'Those brand marks look cool.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Timing', text: 'Herds were already there — boom waited for rails and trails.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Count', text: 'More cows = automatic industry boom. Math!', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'price_gap', text: 'Cattle worth $2–4 in Texas sold for $20–40 at northern railroad towns.' },
    { id: 'market_demand', text: 'Northern and eastern cities had high demand for beef after the Civil War.' },
    { id: 'trail_map', text: 'New trail connected Texas ranches to the railroad at Abilene, Kansas.' },
    { id: 'railroad_link', text: 'Railroads reaching Kansas made shipping cattle east possible.' },
    { id: 'herd_history', text: 'Texas already had large herds for years before the boom.' },
    { id: 'boom_timing', text: 'Rapid growth started only after new trails and railroad links opened.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark price/trail as helpful?',
    'Did I catch just-cows as misleading?',
    'Did my reply use a real reading?',
    'Did I say routes and markets drove growth?',
  ],
};
