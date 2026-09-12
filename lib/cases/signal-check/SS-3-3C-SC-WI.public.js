// Signal Check Weigh-In — companion to SS.3.3C-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.3C-SC-WI',
  teksLabel: '3.3C',
  grade: 3,
  subject: "Social Studies",
  title: 'Creek Change Weigh-In',
  tagline: 'Only nature changed Miller\'s Creek?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Miller\'s Creek changed three times this year. One Cadet says nature did it all. The other says people caused some changes too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Every change at Miller\'s Creek was only from nature.' },
    { id: "B", label: "SIDE B", claim: 'Nature caused one change; people caused two (road + parking lot).' },
  ],

  evidence: [
    { id: 'flood_photo', text: 'East bank widened after heavy spring rain.', supports: 'B' },
    { id: 'creek_before', text: 'Before the flood, the east bank was narrow and steady.', supports: 'B' },
    { id: 'road_photo', text: 'A road was cut through the hillside — construction tracks visible.', supports: 'B' },
    { id: 'construction_log', text: 'Crew graded the hillside road over three weeks in June.', supports: 'B' },
    { id: 'parking_photo', text: 'A field was bulldozed and paved for a parking lot.', supports: 'B' },
    { id: 'change_tally', text: '3 changes: 1 from weather, 2 from construction.', supports: 'B' },
    { id: 'creek_wildlife', text: 'Volunteers counted 12 ducks near the creek.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the road and parking lot?',
    'Did I say people caused some changes?',
    'Did I skip the ducks as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
