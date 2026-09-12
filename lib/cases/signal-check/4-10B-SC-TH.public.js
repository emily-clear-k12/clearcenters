// Signal Check Thread — companion to 4.10B-SC (Rocks on the Move).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.10B-SC-TH",
  teksLabel: "4.10B",
  grade: 4,
  subject: "Science",
  title: 'Thread: New Rocks Appear?',
  tagline: 'Cadets argue about the bank pile.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The river made new rocks appear on the bank.',
    source: 'Riverbank Trail Cam',
    loggedAt: 'Day 14, 6:15 AM',
  },

  comments: [
    { id: "c1", persona: 'Cadet Create', text: 'River built fresh rocks out of mud magic!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Source', text: 'Upstream lost sediment that matches the bank pile.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Curve', text: 'Slow current at the curve = drop zone.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Raft', text: 'Can we raft this stretch next week?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Twin', text: 'Same rock type upstream and on the bank — moved, not made.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Pop', text: 'Rocks pop into existence after floods. Everyone knows.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "before", text: 'Before photo: no rocks in that bank spot.' },
    { id: "after", text: 'After photo: sediment piled at the bank.' },
    { id: "upstream", text: 'Upstream site missing sediment that matches the bank pile.' },
    { id: "current", text: 'Current slows at the inside curve where sediment landed.' },
    { id: "rocktype", text: 'Bank rocks match upstream rock type.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark upstream/match as helpful?',
    'Did I catch "new rocks" as misleading?',
    'Did my reply mention sediment move?',
    'Did I use a real reading?',
  ],
};
