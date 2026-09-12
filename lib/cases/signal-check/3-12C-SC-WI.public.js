// Signal Check Weigh-In - companion to 3.12C-SC.
// Reuses Pond Wildlife Survey evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.12C-SC-WI",
  teksLabel: "3.12C",
  grade: 3,
  subject: "Science",
  title: 'Flood Pond Weigh-In',
  tagline: 'Did the flood ruin everything?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Survey Cadets disagree. Who's right?",
    context: 'After the flood, water rose. One Cadet says nothing survived. The other says species were hit differently - many lived.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'After the flood, the pond was ruined - nothing survived.' },
    { id: "B", label: "SIDE B", claim: 'The flood hit species differently - turtles, fish, and insects still there.' },
  ],

  evidence: [
    { id: "postflood_level", text: 'Post-flood water: three feet above normal marker.', supports: "B" },
    { id: "turtle_count", text: 'Same number of turtles before and after the flood.', supports: "B" },
    { id: "fish_count", text: 'Fewer fish after - but not zero.', supports: "B" },
    { id: "insect_count", text: 'More mosquito larvae after - new standing pools.', supports: "B" },
    { id: "species_compare", text: 'Turtles steady, fish down, insects up.', supports: "B" },
    { id: "pond_smell", text: 'Pond smelled stronger right after the flood.', supports: "neither" },
  ],

  echo: {
    main: 'Flood report, Cadet. Ruined - or reshaped? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice turtles and fish still counted?',
    'Did I see different effects by species?',
    'Did I avoid saying nothing survived?',
    'Did my proof match my ruling?',
  ],
};
