// Signal Check Thread — companion to SS.3.3A-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.3A-SC-TH',
  teksLabel: '3.3A',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Same Land?',
  tagline: 'Cadets mix up weather and place.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'If two places have the same weather today, their land is basically the same too.',
    source: 'State Weather & Land Survey',
    loggedAt: 'Noon Field Check',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Sun', text: 'Both places were 75° and sunny — so the land\'s the same!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Soil', text: 'Nope — Desert Flats is dry sand; Green Valley soil is damp.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Pine', text: 'Green Valley has tall pines. Desert Flats has cactus.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Trail', text: 'Can we hike again tomorrow?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Rain', text: 'Under 5 inches of rain vs about 40 — not the same place.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Twin', text: 'If the sky matches, the ground matches. Done.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'desert_soil', text: 'Desert Flats: sandy soil, very dry, holds almost no water.' },
    { id: 'desert_plants', text: 'Mostly cactus and low shrubs; little ground cover.' },
    { id: 'valley_soil', text: 'Green Valley: damp soil near a flowing river.' },
    { id: 'valley_plants', text: 'Tall pine trees and thick green ground cover.' },
    { id: 'elevation_data', text: 'Desert Flats ~200 ft; Green Valley ~3,500 ft in the mountains.' },
    { id: 'rainfall_data', text: 'Desert Flats <5 inches rain/year; Green Valley ~40 inches.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soil/rain as helpful?',
    'Did I catch same-land as misleading?',
    'Did my reply use a real reading?',
    'Did I say weather today doesn\'t equal same land?',
  ],
};
