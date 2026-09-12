// Signal Check Thread — companion to 4.8B-SC (Does the Towel Make Cold?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.8B-SC-TH",
  teksLabel: "4.8B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Towel Makes Cold?',
  tagline: 'Cadets argue about the ice-cream wrap.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The towel makes cold that keeps the ice cream frozen.',
    source: 'Ice Cream Wrap Lab',
    loggedAt: 'Trial 2',
  },

  comments: [
    { id: "c1", persona: 'Cadet Freeze', text: 'Towel = cold factory. That\'s why it lasted!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Clock', text: 'Wrapped 42 min vs unwrapped 19 — big difference.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Therm', text: 'Towel was room temp before AND after. Not cold.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Scoop', text: 'What flavor was the ice cream?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Insul', text: 'Insulation slows heat — it doesn\'t invent cold.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Magic', text: 'Towels shoot out cold rays. Science done.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "wrapped_time", text: 'Wrapped scoop melted in 42 minutes.' },
    { id: "unwrapped_time", text: 'Unwrapped scoop melted in 19 minutes.' },
    { id: "towel_temp", text: 'Towel measured room temperature before and after — not cold.' },
    { id: "heat_note", text: 'Insulation slows heat moving in; it doesn\'t create cold.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark temp/time as helpful?',
    'Did I catch "cold factory" as misleading?',
    'Did my reply say slows heat?',
    'Did I use a real reading?',
  ],
};
