// Signal Check Thread — companion to 5.9-SC (Does the Shadow Move Randomly?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.9-SC-TH',
  teksLabel: '5.9',
  grade: 5,
  subject: "Science",
  title: 'Thread: Random Shadow?',
  tagline: 'Cadets buzz about the flagpole.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The flagpole\'s shadow just moves around randomly throughout the day — there\'s no real pattern to where it points.',
    source: 'Flagpole Shadow Log',
    loggedAt: 'Day 1 & Day 2',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Zigzag', text: 'Shadow\'s all over the place — totally random!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet West', text: 'Morning west, afternoon east — same order every day.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Twin', text: 'Day 2 copied Day 1\'s times exactly.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Flag', text: 'Who\'s raising the flag tomorrow?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Spin', text: 'Earth rotating once a day drives that shadow pattern.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Chaos', text: 'Shadows don\'t follow rules — they just wander.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'am', text: '9 AM: shadow points west and is fairly long.' },
    { id: 'pm', text: '3 PM: shadow points east and is fairly long again.' },
    { id: 'noon', text: 'Noon: shadow nearly north and shortest.' },
    { id: 'day2', text: 'Same three times next day — exact same pattern.' },
    { id: 'rotation', text: 'Earth\'s rotation makes the Sun\'s apparent path repeat daily.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark west/twin comments as helpful?',
    'Did I catch "wander" as misleading?',
    'Did my reply use a real reading?',
    'Did I say the shadow follows a repeating pattern?',
  ],
};
