// Signal Check Thread — companion to 5.10D-SC (The Inherited Trait Post).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.10D-SC-TH',
  teksLabel: '5.10D',
  grade: 5,
  subject: "Science",
  title: 'Thread: Born Knowing Sit?',
  tagline: 'Cadets buzz about the training clip.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'A dog knows how to sit because it inherited that behavior.',
    source: 'Pet Training Archive',
    loggedAt: 'Clip 04',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Born', text: 'Dogs are born knowing sit — it\'s in their genes!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Treat', text: 'Archive says weeks of treat practice before reliable sit.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Fur', text: 'Fur color was there at birth — that\'s the inherited stuff.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Name', text: 'What should we name the next class mascot?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Instinct', text: 'Scent trail worked cold — instinct isn\'t the same as sit.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Easy', text: 'If a dog can sit once, it must have inherited sit forever.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'fur', text: 'Fur color matched parents and was present at birth — inherited.' },
    { id: 'ears', text: 'Ear shape matched the breed from birth — inherited.' },
    { id: 'sit', text: 'Sit on command only after weeks of treat training — learned.' },
    { id: 'scent', text: 'Scent trail worked on first try with zero training — instinct.' },
    { id: 'learn_note', text: 'Trained commands are learned behaviors, not inherited traits.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark treat/fur comments as helpful?',
    'Did I catch "born knowing sit" as misleading?',
    'Did my reply use a real reading?',
    'Did I say sit is learned?',
  ],
};
