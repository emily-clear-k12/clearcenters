// Signal Check Weigh-In — companion to 4.11C-SC (Can Rock Really Hold Water Underground?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.11C-SC-WI",
  teksLabel: "4.11C",
  grade: 4,
  subject: "Science",
  title: 'Rock Water Weigh-In',
  tagline: 'Can rock store water inside?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Rock-lab Cadets locked in. Who\'s right?',
    context: 'Sandstone soaked up water; granite didn\'t. One Cadet says rock is solid all the way — nothing can be stored. The other says porous rock has gaps that hold liquids.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Rock is solid all the way through — it can\'t store water or oil.' },
    { id: "B", label: "SIDE B", claim: 'Porous rock like sandstone has tiny gaps that can hold liquids.' },
  ],

  evidence: [
    { id: "sandstone_soak", text: 'Sandstone soaked up water; granite did not.', supports: "B" },
    { id: "gaps", text: 'Close-up: sandstone has gaps between grains; granite doesn\'t.', supports: "B" },
    { id: "weigh_wet", text: 'Wet sandstone weighed more after the soak.', supports: "B" },
    { id: "porous_note", text: 'Porous rock can store liquids in connected spaces.', supports: "B" },
    { id: "tray_color", text: 'The lab tray is orange.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare sandstone and granite?',
    'Did I mention gaps or pores?',
    'Did I skip tray color as proof?',
    'Did my proof match my side?',
  ],
};
