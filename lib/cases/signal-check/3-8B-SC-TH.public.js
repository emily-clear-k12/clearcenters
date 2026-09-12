// Signal Check Thread - companion to 3.8B-SC.
// Soft Crystal thread of Cadet chatter about the Marble Ramp Bowling Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.8B-SC-TH",
  teksLabel: "3.8B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Need a Heavy Ball?',
  tagline: 'Ramp feed says only heavy balls knock pins.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "You need a heavier ball to knock down more pins - a small ball can't do it.",
    source: 'Marble Ramp Bowling Log',
    loggedAt: 'Trial Set 3',
  },

  comments: [
    { id: "c1", persona: 'Cadet Heavy', text: 'Small ball? No chance. Need heavy!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet High', text: 'Same small marble: 2 pins low, 7 from high.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Tie', text: 'Fast small and slow heavy both hit 7 pins.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Lane', text: 'Can we decorate the pins next?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Speed', text: 'Higher release = more speed. Speed counts!', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Paint', text: 'White pins prove only heavy balls work.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Both', text: 'Do mass and speed both matter?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "low_release", text: 'Low release small marble: 2 pins.' },
    { id: "high_release", text: 'High release same marble: 7 pins.' },
    { id: "fast_small_result", text: 'Fast small: 7 pins.' },
    { id: "slow_heavy_result", text: 'Slow heavy: 7 pins too.' },
    { id: "speed_note", text: 'Higher release means more speed at the pins.' },
  ],

  echo: {
    main: 'Thread locked. Flag the ramp chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark speed/compare notes as helpful?',
    "Did I catch 'always need heavier' as misleading?",
    'Did my reply say speed matters too?',
    'Did I use a real reading?',
  ],
};
