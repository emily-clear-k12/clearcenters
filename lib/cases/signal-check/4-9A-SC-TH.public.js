// Signal Check Thread — companion to 4.9A-SC (Does Cold Cause Sunset?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "4.9A-SC-TH",
  teksLabel: "4.9A",
  grade: 4,
  subject: "Science",
  title: 'Thread: Cold Causes Sunset?',
  tagline: 'Cadets link early sunset to cold days.',
  stemMode: "dropdown-open",

  transmission: {
    claimHeadline: 'Recent cold weather is making the sun set earlier every day.',
    source: 'Sunset + Temp Log',
    loggedAt: 'Fall Week 3',
  },

  comments: [
    { id: "c1", persona: 'Cadet Chill', text: 'Got cold → sun dips early. Cause and effect!', correctFlag: "misleading" },
    { id: "c2", persona: 'Cadet Ahead', text: 'Sunset was already early BEFORE the cold snap.', correctFlag: "helpful" },
    { id: "c3", persona: 'Cadet Warm', text: 'Warm week still had earlier sunsets. Cold isn\'t driving it.', correctFlag: "helpful" },
    { id: "c4", persona: 'Cadet Cocoa', text: 'Hot cocoa after sunset watch?', correctFlag: "off_topic" },
    { id: "c5", persona: 'Cadet Tilt', text: 'Earth\'s tilt and orbit set the daylight pattern.', correctFlag: "helpful" },
    { id: "c6", persona: 'Cadet Freeze', text: 'If we heat the town, sunset will stay late. Done.', correctFlag: "misleading" },
  ],

  evidence: [
    { id: "before_cold", text: 'Sunset was already getting earlier before the cold started.' },
    { id: "warm_week", text: 'During a warm week, sunset kept getting earlier anyway.' },
    { id: "pattern_note", text: 'Seasonal daylight follows Earth\'s tilt and path around the Sun.' },
    { id: "temp_log", text: 'Coldest day was not the earliest sunset day.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark before-cold / warm-week as helpful?',
    'Did I catch cold-cause as misleading?',
    'Did my reply say tilt/orbit, not cold?',
    'Did I use a real reading?',
  ],
};
