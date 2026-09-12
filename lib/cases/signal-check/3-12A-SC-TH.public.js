// Signal Check Thread - companion to 3.12A-SC.
// Soft Crystal thread of Cadet chatter about the Field Wildlife Log claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.12A-SC-TH",
  teksLabel: "3.12A",
  grade: 3,
  subject: "Science",
  title: 'Thread: Die Till Spring?',
  tagline: 'Field feed says cold = animals die off.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'When it gets cold, most animals just die off until spring.',
    source: 'Field Wildlife Log',
    loggedAt: 'Oct-Nov',
  },

  comments: [
    { id: "c1", persona: 'Cadet Frost', text: 'Gone from the field = dead. Simple!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Tag', text: 'Tagged geese were alive 800 miles south.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Burrow', text: 'Groundhog burrow shows slow breathing - asleep!', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Cocoa', text: 'Hot cocoa after field study?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Fly', text: 'Geese migrate; groundhogs hibernate - different plans.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Fence', text: 'New fence scared them all to death. Proven.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Ask', text: "Maybe 'gone' doesn't always mean 'dead'?", correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "october_count", text: 'October: geese, butterflies, groundhog present.' },
    { id: "november_count", text: 'November: those animals gone / burrow sealed.' },
    { id: "goose_tag", text: 'Tagged geese alive far south.' },
    { id: "groundhog_burrow", text: 'Groundhog asleep in burrow, not dead.' },
    { id: "hibernation_note", text: 'Groundhogs hibernate through cold months.' },
  ],

  echo: {
    main: 'Thread locked. Flag the winter chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark migrate/hibernate notes as helpful?',
    "Did I catch 'all died' as misleading?",
    'Did my reply say they migrate or hibernate?',
    'Did I use a real reading?',
  ],
};
