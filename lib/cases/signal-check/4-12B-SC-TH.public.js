// Signal Check Thread — companion to 4.12B-SC (Do Decomposers Even Matter?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.12B-SC-TH",
  teksLabel: "4.12B",
  grade: 4,
  subject: "Science",
  title: 'Thread: Just Tidying?',
  tagline: 'Cadets say decomposers don\'t count.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Decomposers just tidy dead stuff — they\'re not really part of the food web.',
    source: 'Log Breakdown Plot',
    loggedAt: 'Month 5',
  },

  comments: [
    { id: "c1", persona: 'Cadet Tidy', text: 'They\'re nature\'s janitors — not real food-web members.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Soil', text: 'That log turned into soil in five months.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Grow', text: 'Plants did better in the decomposed soil.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Stick', text: 'Can I keep a stick from the plot?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Loop', text: 'Nutrients go back to producers — whole web leans on that.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Skip', text: 'Skip decomposers and the web is still fine.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "log_soil", text: 'Log broke down into soil over five months.' },
    { id: "plant_boost", text: 'Plants grew better in decomposed soil than plain soil.' },
    { id: "nutrient_note", text: 'Decomposers return nutrients that producers use.' },
    { id: "web_note", text: 'Consumers depend on producers — so decomposer nutrients matter to the whole web.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soil/grow as helpful?',
    'Did I catch "just janitors" as misleading?',
    'Did my reply say they\'re in the food web?',
    'Did I use a real reading?',
  ],
};
