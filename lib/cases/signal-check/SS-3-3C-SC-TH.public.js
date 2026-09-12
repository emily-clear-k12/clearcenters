// Signal Check Thread — companion to SS.3.3C-SC.
// Soft Crystal thread of Cadet chatter about the classic claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: 'SS.3.3C-SC-TH',
  teksLabel: '3.3C',
  grade: 3,
  subject: "Social Studies",
  title: 'Thread: Just Nature?',
  tagline: 'Cadets argue who changed the creek.',
  stemMode: 'dropdown',

  transmission: {
    claimHeadline: 'Every change to this landscape happened because of nature, not people.',
    source: 'Miller\'s Creek Conservation Photos',
    loggedAt: 'Year Change Log',
  },

  comments: [
    { id: 'c1', persona: 'Cadet Nature', text: 'Floods happen — so ALL the changes were nature!', correctFlag: 'misleading' },
    { id: 'c2', persona: 'Cadet Log', text: 'The tally says 1 weather change and 2 construction changes.', correctFlag: 'helpful' },
    { id: 'c3', persona: 'Cadet Road', text: 'There\'s a road cut into the hillside with equipment tracks.', correctFlag: 'helpful' },
    { id: 'c4', persona: 'Cadet Duck', text: 'Those 12 ducks were so cute.', correctFlag: 'off_topic' },
    { id: 'c5', persona: 'Cadet Lot', text: 'They bulldozed a field for a parking lot — that\'s people.', correctFlag: 'helpful' },
    { id: 'c6', persona: 'Cadet Rain', text: 'If rain changed the bank, rain must have built the road too.', correctFlag: 'misleading' },
  ],

  evidence: [
    { id: 'flood_photo', text: 'East bank widened after heavy spring rain.' },
    { id: 'creek_before', text: 'Before the flood, the east bank was narrow and steady.' },
    { id: 'road_photo', text: 'A road was cut through the hillside — construction tracks visible.' },
    { id: 'construction_log', text: 'Crew graded the hillside road over three weeks in June.' },
    { id: 'parking_photo', text: 'A field was bulldozed and paved for a parking lot.' },
    { id: 'change_tally', text: '3 changes: 1 from weather, 2 from construction.' },
  ],

  echo: {
    main: 'Thread locked in, Cadet. Flag the chatter before you reply.',
    flag: 'Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.',
    reply: 'Craft your reply. Pull proof from the readings — keep it short.',
    reflect: 'Flags + reply ready. Self-check, then beam it up.',
  },

  selfCheckQuestions: [
    'Did I flag every comment?',
    'Did I mark log/road as helpful?',
    'Did I catch all-nature as misleading?',
    'Did my reply use a real reading?',
    'Did I say people changed the creek too?',
  ],
};
