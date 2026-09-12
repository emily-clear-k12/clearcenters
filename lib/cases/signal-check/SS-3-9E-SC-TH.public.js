// Signal Check Thread — companion to SS.3.9E-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.9E-SC-TH',
  teksLabel: '3.9E',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Loudest Wins?',
  tagline: 'Cadets debate fair voting.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'A vote is fair as long as the loudest group wins.',
    source: 'Room 12 Class Vote',
    loggedAt: 'Field Trip Tally',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Cheer', text: 'Aquarium yelled loudest — they win!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Tally', text: 'Museum had 15 votes. Aquarium only had 2.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Recount', text: 'Recount stayed the same — Museum still most.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Friday', text: 'Is the trip next Friday still?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Rule', text: 'Class rule: the choice with the most counted votes wins.', correctFlag: 'needs_evidence' },
    { id: 'c6', persona: 'Cadet Volume', text: 'Loud = fair. That\'s democracy, right?', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'vote_tally', text: 'Zoo: 8, Museum: 15, Aquarium: 2. Total: 25 votes.' },
    { id: 'class_count', text: 'Room 12 has 25 students, and all 25 voted.' },
    { id: 'cheer_note', text: 'Aquarium group cheered the loudest and asked to recount.' },
    { id: 'aquarium_actual_votes', text: 'Only 2 students actually voted for Aquarium.' },
    { id: 'recount_result', text: 'Recount confirmed Museum still had the most votes.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark tally/recount as helpful?',
    'Did I catch loudest-wins as misleading?',
    'Did my reply use a real reading?',
    'Did I say Museum won the count?',
  ],
};
