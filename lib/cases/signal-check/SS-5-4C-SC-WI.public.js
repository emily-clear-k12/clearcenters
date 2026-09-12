// Signal Check Weigh-In — companion to SS.5.4C-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.4C-SC-WI',
  teksLabel: '5.4C',
  grade: 5,
  subject: "Social Studies",
  title: 'First to See Weigh-In',
  tagline: 'First people ever?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Journals show Native nations already living along the route. One Cadet says Lewis and Clark were first. The other says nations were already there — and helped.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Lewis and Clark were the first people to ever see the land they explored.' },
    { id: "B", label: "SIDE B", claim: 'Native nations already lived there; Sacagawea and others helped the expedition survive.' },
  ],

  evidence: [
    { id: 'journal_entry', text: 'Journals describe land, plants, and animals along the route.', supports: 'neither' },
    { id: 'village_map', text: 'Marks dozens of established Native villages and territories along the route.', supports: 'B' },
    { id: 'sacagawea_role', text: 'Sacagawea translated and helped guide through unfamiliar territory.', supports: 'B' },
    { id: 'food_trade', text: 'Expedition traded with Native nations for food to survive winter.', supports: 'B' },
    { id: 'first_claim', text: 'An old summary calls them the first people to ever see the western land.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I mention Native nations or Sacagawea?',
    'Did I say they weren\'t first?',
    'Did I skip the old summary as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
