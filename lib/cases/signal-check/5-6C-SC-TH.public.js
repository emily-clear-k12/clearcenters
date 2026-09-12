// Signal Check Thread — companion to 5.6C-SC (Did the Salt Really Disappear?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.6C-SC-TH',
  teksLabel: '5.6C',
  grade: 5,
  subject: "Science",
  title: 'Thread: Salt Vanished?',
  tagline: 'Cadets buzz about dissolving.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The salt dissolved into the water and vanished — some of that matter must be completely gone now.',
    source: 'Saltwater Mass Check',
    loggedAt: 'Trial 1',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Gone', text: 'I can\'t see the salt anymore — so some matter vanished!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Scale', text: 'Before total and after total matched exactly.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Taste', text: 'It still tastes salty all the way through.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Lunch', text: 'Is the cafeteria serving pretzels today?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Tiny', text: 'Dissolving spreads salt into particles too small to see.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Poof', text: 'If you can\'t see it, it must have left the cup forever.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'before_weights', text: 'Empty cup, dry salt, and water weighed separately first.' },
    { id: 'before_total', text: 'Those three weights add to a starting total.' },
    { id: 'after_weight', text: 'Full saltwater cup weighs that exact same total.' },
    { id: 'taste_test', text: 'Water tastes salty top to bottom after mixing.' },
    { id: 'conserve_note', text: 'Dissolving spreads salt into tiny particles — matter doesn\'t vanish.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark scale/taste comments as helpful?',
    'Did I catch "vanished forever" as misleading?',
    'Did my reply use a real reading?',
    'Did I say matter isn\'t gone?',
  ],
};
