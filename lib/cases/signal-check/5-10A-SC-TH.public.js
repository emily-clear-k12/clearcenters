// Signal Check Thread — companion to 5.10A-SC (Does the Morning Fog Just Show Up for No Reason?).
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: '5.10A-SC-TH',
  teksLabel: '5.10A',
  grade: 5,
  subject: "Science",
  title: 'Thread: Random Fog?',
  tagline: 'Cadets buzz about coastal mornings.',
  stemMode: "open",

  transmission: {
    claimHeadline: 'The fog rolls in over the coast every morning for no particular reason — it\'s totally random.',
    source: 'Coastal Weather Log',
    loggedAt: '3-Morning Comparison',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Surprise', text: 'Fog just shows up — weather is random like that!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Gap', text: 'Both foggy mornings had ocean way warmer than air.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Clear', text: 'No big temp gap = no fog that morning.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Pier', text: 'Want to sketch the white dock later?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Cycle', text: 'Warm moist air cools and condenses — that\'s the fog recipe.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Luck', text: 'Fog is pure luck; temperature doesn\'t matter.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'fog1', text: 'Foggy morning 1: ocean much warmer than air above.' },
    { id: 'fog2', text: 'Foggy morning 2: same big ocean-air temperature gap.' },
    { id: 'clear', text: 'Clear morning: ocean and air nearly the same temp — no fog.' },
    { id: 'condense', text: 'Warm moist air meeting cooler air condenses into visible fog.' },
    { id: 'sun_note', text: 'Sun heats the ocean, driving evaporation in the water cycle.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark gap/clear comments as helpful?',
    'Did I catch "pure luck" as misleading?',
    'Did my reply use a real reading?',
    'Did I say fog isn\'t random?',
  ],
};
