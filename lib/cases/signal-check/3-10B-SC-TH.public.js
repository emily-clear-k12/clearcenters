// Signal Check Thread - companion to 3.10B-SC.
// Soft Crystal thread of Cadet chatter about the Garden Soil Sample claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.10B-SC-TH",
  teksLabel: "3.10B",
  grade: 3,
  subject: "Science",
  title: 'Thread: Just Dirt?',
  tagline: 'Garden feed says soil is nothing but dirt.',
  stemMode: "dropdown",

  transmission: {
    claimHeadline: 'Garden dirt is just "dirt" - there\'s nothing else mixed into it.',
    source: 'Garden Soil Sample',
    loggedAt: 'Sample #3',
  },

  comments: [
    { id: "c1", persona: 'Cadet Dig', text: 'Dirt is dirt. End of story.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Grit', text: "Magnifier shows tiny rock grains - that's not 'nothing.'", correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Leaf', text: 'Dark bits still have leaf veins. Plants are in there!', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Bloom', text: 'Should we plant sunflowers next?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Jar', text: 'Settling test made three layers - mix confirmed.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Shade', text: "Shady soil is darker, so that proves it's one pure material.", correctFlag: "misleading" },
    { id: "c7", persona: 'Cadet Wonder', text: 'Could soil be more than one thing? Need readings.', correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "sand_grains", text: 'Gritty rock-like grains visible under magnifier.' },
    { id: "leaf_shape", text: 'Dark bits still show leaf vein patterns.' },
    { id: "sift_test", text: 'Sifting separates rock grains, plant bits, and air pockets.' },
    { id: "three_layers", text: 'Soil + water settles into three layers overnight.' },
    { id: "rock_compare", text: 'Grains match nearby rocks in color and hardness.' },
  ],

  echo: {
    main: 'Thread locked. Flag the garden chatter.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings - keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark rock/leaf/layer comments as helpful?',
    "Did I catch 'just dirt' as misleading?",
    'Did my reply say soil is a mix?',
    'Did I use a real reading?',
  ],
};
