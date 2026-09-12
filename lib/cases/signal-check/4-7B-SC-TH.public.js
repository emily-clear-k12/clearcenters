// Signal Check Thread — companion to 4.7B-SC (The Erosion Photo Caption).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.7B-SC-TH",
  teksLabel: "4.7B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Brand-New Rocks?',
  tagline: 'Trail-cam chat about the piled-up bank.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The river made brand-new rocks appear on the bank.',
    source: 'Riverbank Trail Cam',
    loggedAt: 'Day 14, 6:15 AM',
  },

  comments: [
    { id: "c1", persona: 'Cadet New', text: 'Shiny rocks = brand new rocks the river cooked up!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Up', text: 'Upstream is missing the same kind of sediment.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Slow', text: 'Current slows at the curve — that\'s drop-off zone.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Fish', text: 'Did anyone spot fish in the trail cam?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Match', text: 'Bank rocks match upstream rock type — moved, not made.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Magic', text: 'Rivers invent rocks overnight. Obvious.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "before", text: 'Before photo: no rocks in that bank spot.' },
    { id: "after", text: 'After photo: sediment piled at the bank.' },
    { id: "upstream", text: 'Upstream site is missing sediment that matches the bank pile.' },
    { id: "current", text: 'Current slows at the inside curve — right where sediment landed.' },
    { id: "rocktype", text: 'Bank rocks match the upstream rock type.' },
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
    'Did I catch "brand new" as misleading?',
    'Did my reply mention sediment move?',
    'Did I use a real reading?',
  ],
};
