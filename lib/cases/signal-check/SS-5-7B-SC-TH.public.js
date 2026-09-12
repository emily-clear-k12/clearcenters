// Signal Check Thread — companion to SS.5.7B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.5.7B-SC-TH',
  teksLabel: '5.7B',
  grade: 5,
  subject: "Social Studies",
  title: 'Thread: Anywhere Will Do?',
  tagline: 'Cadets debate where towns grow.',
  stemMode: 'open',

  transmission: {
    claimHeadline: 'A town can grow into a major city almost anywhere, as long as enough people move there.',
    source: 'Settlement Survey Records',
    loggedAt: 'Site Compare',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Crowd', text: 'Just move enough people anywhere — instant city!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet River', text: 'Rowan\'s Ford sat on a trader river crossing with fertile land.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Dry', text: 'Gault Hollow had no nearby water and rocky soil.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Weather', text: 'Random weather log from another town. Weird.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Census', text: 'Decades later Gault\'s population barely budged.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Count', text: 'Forty families arrived — that guarantees a major city.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'gault_survey', text: 'Gault Hollow: dry, rocky soil with no nearby water source.' },
    { id: 'rowan_river', text: 'Rowan\'s Ford: natural shallow river crossing used by traders.' },
    { id: 'gault_founders', text: 'Forty families arrived hoping to build at Gault Hollow.' },
    { id: 'rowan_farmland', text: 'Flat, fertile farmland surrounds Rowan\'s Ford.' },
    { id: 'gault_census', text: 'Later census: Gault Hollow\'s population barely changed decades later.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark river/census as helpful?',
    'Did I catch anywhere claims as misleading?',
    'Did my reply use a real reading?',
    'Did I say location matters?',
  ],
};
