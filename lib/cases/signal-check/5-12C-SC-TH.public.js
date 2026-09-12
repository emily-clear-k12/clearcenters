// Signal Check Thread — companion to 5.12C-SC (Will Paving the Lot Really Not Affect Anything Else?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.12C-SC-TH',
  teksLabel: '5.12C',
  grade: 5,
  subject: "Science",
  title: 'Thread: Pave = No Impact?',
  tagline: 'Cadets buzz about the empty lot.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'That empty lot is just dirt and weeds — paving it over for parking won\'t really affect anything else nearby.',
    source: 'Neighborhood Runoff Survey',
    loggedAt: 'One Year Comparison',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Nope', text: 'It\'s just dirt and weeds — paving changes nothing nearby!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Run', text: 'After paving, rain shot into the storm drain instead of soaking in.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Garden', text: 'Rain garden next door brought frogs back in a year.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Park', text: 'How many parking spots will they paint?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Both', text: 'Humans can harm ecosystems or help them — paving vs rain garden.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Seal', text: 'Asphalt seals the ground so water problems just disappear.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'before', text: 'Before paving nearby, rain soaked into the ground.' },
    { id: 'after', text: 'After paving, that rain runs straight to the storm drain.' },
    { id: 'garden', text: 'Rain garden by another paved lot captures and filters runoff.' },
    { id: 'wildlife', text: 'Frogs and dragonflies returned to that rain garden within a year.' },
    { id: 'human', text: 'Human activities can harm (extra runoff) or help (rain gardens).' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark runoff/garden comments as helpful?',
    'Did I catch "changes nothing" as misleading?',
    'Did my reply use a real reading?',
    'Did I say paving affects nearby runoff?',
  ],
};
