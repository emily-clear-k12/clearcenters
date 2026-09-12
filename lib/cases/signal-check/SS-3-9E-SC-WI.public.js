// Signal Check Weigh-In — companion to SS.3.9E-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.9E-SC-WI',
  teksLabel: '3.9E',
  grade: 3,
  subject: "Social Studies",
  title: 'Loud Vote Weigh-In',
  tagline: 'Loudest group wins?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Room 12 voted Zoo, Museum, or Aquarium. Aquarium cheered loudest but Museum had the most votes. One Cadet says loudest wins. The other says counted votes win.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'A vote is fair as long as the loudest group wins.' },
    { id: "B", label: "SIDE B", claim: 'Fair votes follow the counted tally — Museum had the most votes, not the loudest cheer.' },
  ],

  evidence: [
    { id: 'vote_tally', text: 'Zoo: 8, Museum: 15, Aquarium: 2. Total: 25 votes.', supports: 'B' },
    { id: 'class_count', text: 'Room 12 has 25 students, and all 25 voted.', supports: 'B' },
    { id: 'cheer_note', text: 'Aquarium group cheered the loudest and asked to recount.', supports: 'A' },
    { id: 'aquarium_actual_votes', text: 'Only 2 students actually voted for Aquarium.', supports: 'B' },
    { id: 'recount_result', text: 'Recount confirmed Museum still had the most votes.', supports: 'B' },
    { id: 'trip_date', text: 'The trip is scheduled for next Friday.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use the vote tally?',
    'Did I say loud ≠ win?',
    'Did I skip trip date as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
