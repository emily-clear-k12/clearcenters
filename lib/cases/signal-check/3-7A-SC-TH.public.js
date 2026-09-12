// Signal Check Thread - companion to 3.7A-SC.
// Soft Crystal thread of Cadet chatter about the Classroom Drop Test claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.7A-SC-TH",
  teksLabel: "3.7A",
  grade: 3,
  subject: "Science",
  title: 'Thread: Gravity Skips Light?',
  tagline: 'Drop Test feed says gravity ignores light stuff.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "A coffee filter drifting slowly to the floor proves gravity doesn't pull on light things.",
    source: 'Classroom Drop Test',
    loggedAt: 'Trial #20',
  },

  comments: [
    { id: "c1", persona: 'Cadet Drift', text: 'Slow fall = gravity skipped it. Case closed!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Floor', text: 'It hit the floor all 20 times - gravity was pulling.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Ball', text: 'Crumple it: 0.6 s vs flat 4.1 s. Same filter!', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Brew', text: 'Who wants actual coffee after this?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Air', text: 'Air resistance slows the flat shape - gravity still pulls.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Brand', text: 'Different brand proves gravity skipped it.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Shape', text: "Maybe shape matters more than 'light vs heavy'?", correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "drop_log", text: '20/20 drops landed on the floor.' },
    { id: "flat_time", text: 'Flat: 4.1 seconds.' },
    { id: "crumpled_time", text: 'Crumpled: 0.6 seconds.' },
    { id: "shape_note", text: 'Shape changed fall time, not weight.' },
    { id: "gravity_definition", text: 'Gravity pulls on mass; air resistance is separate.' },
  ],

  echo: {
    main: 'Thread locked. Flag the drop-test chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark land/timing notes as helpful?',
    "Did I catch 'gravity skips' as misleading?",
    'Did my reply mention air resistance?',
    'Did I use a real reading?',
  ],
};
