// Signal Check Thread — companion to 4.8C-SC (Used Up by the First Bulb?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.8C-SC-TH",
  teksLabel: "4.8C",
  grade: 4,
  subject: "Science",
  title: 'Thread: Power Used Up?',
  tagline: 'Cadets debate the bulb string.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The first bulb uses up the electricity, so end bulbs get no power.',
    source: 'Bulb String Circuit Lab',
    loggedAt: 'Trial 3',
  },

  comments: [
    { id: "c1", persona: 'Cadet First', text: 'First bulb hogged all the juice — end ones starve!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Twin', text: 'First and last are the SAME brightness.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Pull', text: 'Yank the last bulb — the first one dies too. Full loop!', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Glow', text: 'Can we hang these for the dance?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Path', text: 'Needs a complete path. That\'s circuit basics.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Empty', text: 'By bulb three the electricity is empty. Fact.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "same_glow", text: 'First and last bulbs glow the same brightness.' },
    { id: "remove_last", text: 'Remove the last bulb and the WHOLE string goes dark — including the first.' },
    { id: "loop_note", text: 'Electricity needs a complete path to keep every bulb lit.' },
    { id: "middle_glow", text: 'Middle bulbs glow too — power isn\'t gone after bulb one.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark same-glow / pull as helpful?',
    'Did I catch "used up" as misleading?',
    'Did my reply mention the full loop?',
    'Did I use a real reading?',
  ],
};
