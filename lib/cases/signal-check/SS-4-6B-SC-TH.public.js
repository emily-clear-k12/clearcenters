// Signal Check Thread — companion to SS.4.6B-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.4.6B-SC-TH',
  teksLabel: '4.6B',
  grade: 4,
  subject: "Social Studies",
  title: 'Thread: Same Region?',
  tagline: 'Cadets mix weather with regions.',
  stemMode: 'dropdown-open',

  transmission: {
    claimHeadline: 'If two regions have similar weather today, they\'re basically the same region.',
    source: 'Texas Regions Field Survey',
    loggedAt: 'Noon Compare',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Sticky', text: 'Both felt hot and sticky — same region!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Clay', text: 'Piney Woods has reddish clay and dense pines.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Sand', text: 'Coastal Plains has sandy soil and Gulf marshes.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet County', text: 'How many counties are on that map?', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Def', text: 'Regions are about landforms, soil, and plants — not noon weather.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Twin', text: 'If the air matches, the region matches.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'pineywoods_forest', text: 'Piney Woods: dense pine forest cover across most of the region.' },
    { id: 'pineywoods_soil', text: 'Reddish clay soil, common across East Texas.' },
    { id: 'coastal_grassland', text: 'Coastal Plains: flat grasslands and marshes toward the Gulf.' },
    { id: 'coastal_soil', text: 'Sandy soil near the coastline.' },
    { id: 'weather_reading', text: 'Both regions recorded warm, humid conditions at noon.' },
    { id: 'region_definition', text: 'Texas regions are defined by landforms, soil, and vegetation — not one day\'s weather.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark soil/definition as helpful?',
    'Did I catch weather=region as misleading?',
    'Did my reply use a real reading?',
    'Did I say regions aren\'t today\'s weather?',
  ],
};
