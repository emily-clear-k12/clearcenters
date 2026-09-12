// Signal Check Thread — companion to 5.13B-SC (Sit, Shake, Instinct).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.13B-SC-TH',
  teksLabel: '5.13B',
  grade: 5,
  subject: "Science",
  title: 'Thread: Born to Sit?',
  tagline: 'Cadets buzz about sit and shake.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'Dogs are born already knowing how to sit and shake on command.',
    source: 'Pet Training Archive',
    loggedAt: 'Clip 04',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Born', text: 'Puppies pop out already knowing sit and shake!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Sit', text: 'Sit only stuck after weeks of treats.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Shake', text: 'Shake took dozens of practice reps.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Treat', text: 'Do we still have peanut-butter biscuits?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Cold', text: 'Scent trail and first doorbell bark worked with zero training.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet AllInstinct', text: 'Every dog behavior is instinct — training is fake.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'sit', text: 'Sit cue only worked after weeks of treat practice.' },
    { id: 'shake', text: 'Paw shake needed dozens of practice reps.' },
    { id: 'scent', text: 'Scent trail correct on first try — zero practice.' },
    { id: 'bark', text: 'Barked at first-ever doorbell — no training.' },
    { id: 'learn_note', text: 'Commands that need practice are learned; cold first-tries can be instinct.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark sit/shake comments as helpful?',
    'Did I catch "born knowing" as misleading?',
    'Did my reply use a real reading?',
    'Did I say sit and shake are learned?',
  ],
};
