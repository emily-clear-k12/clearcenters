// Signal Check Thread - companion to 3.7B-SC.
// Soft Crystal thread of Cadet chatter about the Target Toss Game Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.7B-SC-TH",
  teksLabel: "3.7B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Hit Harder Wins?',
  tagline: 'Toss feed says smash it every time.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'In the target game, hitting the disc harder always wins.',
    source: 'Target Toss Game Log',
    loggedAt: 'Round 6',
  },

  comments: [
    { id: "c1", persona: 'Cadet Smash', text: 'Harder = better. Always smash it!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Past', text: 'Hard hit flew to 190 cm - way past 120.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Aim', text: 'Soft aimed tap landed right on 120 cm.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Prize', text: "What's the prize if we win Round 7?", correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Score', text: 'Score log: aimed soft taps beat overshooting smashes.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Orange', text: 'Orange disc means harder hits always win.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Both', text: 'Maybe force AND direction both matter?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "hard_hit_distance", text: 'Hard hit: 190 cm past target.' },
    { id: "target_distance", text: 'Target at 120 cm.' },
    { id: "soft_hit_distance", text: 'Soft tap: exactly 120 cm.' },
    { id: "score_log", text: 'Aimed soft taps scored more across 6 rounds.' },
    { id: "direction_note", text: 'Need right force AND right direction.' },
  ],

  echo: {
    main: 'Thread locked. Flag the toss chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark overshoot/aim notes as helpful?',
    "Did I catch 'harder always wins' as misleading?",
    'Did my reply say aim and force both matter?',
    'Did I use a real reading?',
  ],
};
