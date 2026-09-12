// Signal Check Thread — companion to 4.12A-SC (Do Plants Actually Eat Soil?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.12A-SC-TH",
  teksLabel: "4.12A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Plants Eat Dirt?',
  tagline: 'Cadets think big plants ate the pot soil.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'The plant grew so much bigger because it ate the soil out of the pot.',
    source: 'Pot Growth Lab',
    loggedAt: 'Week 8',
  },

  comments: [
    { id: "c1", persona: 'Cadet Munch', text: 'Bigger plant = it munched the dirt. Easy.', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Scale', text: 'Soil weight barely budged in eight weeks.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Dark', text: 'No-sun plant with same soil stayed tiny.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Dots', text: 'Yellow-dot pot is cute though.', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Sun', text: 'Producers build food with sunlight, water, and CO2.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Dirt', text: 'No dirt snack, no growth. Plants are dirt-eaters.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "soil_weight", text: 'Soil weight barely changed after eight weeks of growth.' },
    { id: "no_sun", text: 'Same soil, no sunlight — plant stayed small.' },
    { id: "plant_gain", text: 'Plant gained lots of mass while soil barely changed.' },
    { id: "food_note", text: 'Producers make food using sunlight, water, and carbon dioxide.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soil-weight / no-sun as helpful?',
    'Did I catch "ate dirt" as misleading?',
    'Did my reply say plants make food?',
    'Did I use a real reading?',
  ],
};
