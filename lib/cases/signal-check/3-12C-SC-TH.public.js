// Signal Check Thread - companion to 3.12C-SC.
// Soft Crystal thread of Cadet chatter about the Pond Wildlife Survey claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.12C-SC-TH",
  teksLabel: "3.12C",
  grade: 3,
  subject: "Science",
  title: 'Thread: Pond Ruined?',
  tagline: 'Post-flood feed says nothing survived.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'After the flood, the pond ecosystem was completely ruined and nothing survived.',
    source: 'Pond Wildlife Survey',
    loggedAt: 'Post-Flood Week 1',
  },

  comments: [
    { id: "c1", persona: 'Cadet Doom', text: 'Flood = total wipeout. Nothing left!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Shell', text: 'Turtle count stayed the same - they survived.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Fin', text: 'Fish dropped, but not to zero.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Mud', text: 'My boots are still muddy from yesterday.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Buzz', text: 'Insects actually went UP after new pools formed.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Stink', text: 'Stronger smell proves every animal is gone.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Diff', text: 'Maybe floods hit species differently?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "preflood_level", text: 'Pre-flood: normal depth marker.' },
    { id: "postflood_level", text: 'Post-flood: three feet above normal.' },
    { id: "turtle_count", text: 'Turtle numbers unchanged.' },
    { id: "fish_count", text: 'Fewer fish, but not zero.' },
    { id: "species_compare", text: 'Turtles steady, fish down, insects up.' },
  ],

  echo: {
    main: 'Thread locked. Flag the flood chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark survival/compare notes as helpful?',
    "Did I catch 'nothing survived' as misleading?",
    'Did my reply say species were hit differently?',
    'Did I use a real reading?',
  ],
};
