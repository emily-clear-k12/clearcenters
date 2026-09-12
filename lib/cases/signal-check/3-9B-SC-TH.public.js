// Signal Check Thread - companion to 3.9B-SC.
// Soft Crystal thread of Cadet chatter about the Solar System Model Line-Up claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.9B-SC-TH",
  teksLabel: "3.9B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Biggest Goes First?',
  tagline: 'Model feed says biggest planet belongs nearest the sun.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'The biggest planet should be the one closest to the sun.',
    source: 'Solar System Model Line-Up',
    loggedAt: 'Model Check',
  },

  comments: [
    { id: "c1", persona: 'Cadet Giant', text: 'Biggest goes first - closest to the sun!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Merc', text: 'Mercury is tiny AND closest. Size is not distance.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Jupe', text: 'Jupiter is largest but sits fifth out.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Star', text: 'Can we name a planet after our class pet?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Tape', text: 'We measured with real orbit distances - not size.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Stripe', text: 'Orange stripes prove Jupiter should be closest.', correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Orbit', text: 'Is order about orbit distance, not size?', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "mercury_size", text: 'Mercury: one of the smallest planets.' },
    { id: "mercury_distance", text: 'Mercury: closest in the model.' },
    { id: "jupiter_size", text: 'Jupiter: largest planet.' },
    { id: "jupiter_distance", text: 'Jupiter: fifth from the sun.' },
    { id: "order_note", text: 'Order based on orbit distance, not size.' },
  ],

  echo: {
    main: 'Thread locked. Flag the line-up chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark Mercury/Jupiter distance notes as helpful?',
    "Did I catch 'biggest closest' as misleading?",
    'Did my reply say order is about distance?',
    'Did I use a real reading?',
  ],
};
