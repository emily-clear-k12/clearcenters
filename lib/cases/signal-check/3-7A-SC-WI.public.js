// Signal Check Weigh-In - companion to 3.7A-SC.
// Reuses Classroom Drop Test evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.7A-SC-WI",
  teksLabel: "3.7A",
  grade: 3,
  subject: "Science",
  title: 'Filter Fall Weigh-In',
  tagline: 'Does gravity skip light things?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Drop Test Cadets disagree. Who's right?",
    context: 'A flat filter drifts slowly; crumpled it falls fast. One Cadet says gravity skips light things. The other says gravity pulls - air slows the flat one.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "Gravity doesn't pull on light things like the filter." },
    { id: "B", label: "SIDE B", claim: 'Gravity pulls the filter - air resistance slows the flat shape.' },
  ],

  evidence: [
    { id: "drop_log", text: 'Filter dropped 20 times - touched the floor every time.', supports: "B" },
    { id: "flat_time", text: 'Flat filter: 4.1 seconds to the floor.', supports: "B" },
    { id: "crumpled_time", text: 'Same filter crumpled: 0.6 seconds to the floor.', supports: "B" },
    { id: "shape_note", text: 'Only shape changed - not weight - and fall time changed.', supports: "B" },
    { id: "gravity_definition", text: 'Gravity pulls on every object with mass; air resistance is separate.', supports: "B" },
    { id: "filter_brand", text: "This box is a different brand than last month's.", supports: "neither" },
  ],

  echo: {
    main: 'Filter fall, Cadet. Skip gravity - or air? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the filter always landed?',
    'Did I compare flat vs crumpled times?',
    'Did I avoid saying gravity skips light objects?',
    'Did my proof match my ruling?',
  ],
};
