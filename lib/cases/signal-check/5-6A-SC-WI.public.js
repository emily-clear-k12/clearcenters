// Signal Check Weigh-In — companion to 5.6A-SC (The One-Bin Metal Sorter).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.6A-SC-WI',
  teksLabel: '5.6A',
  grade: 5,
  subject: "Science",
  title: 'Magnet Bin Weigh-In',
  tagline: 'Grab every metal?',
  stemMode: "open",

  dispute: {
    prompt: 'Sorter Cadets locked in. Who\'s right?',
    context: 'Recycling line tested a magnet arm on scrap. One Cadet says if it\'s metal, the magnet grabs it. The other says only some metals stick.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'A magnet arm can grab every kind of metal into one bin.' },
    { id: "B", label: "SIDE B", claim: 'Only some metals stick — brass and aluminum ride past.' },
  ],

  evidence: [
    { id: 'iron_washer', text: 'Iron washer snaps up onto the magnet arm.', supports: 'B' },
    { id: 'steel_bolt', text: 'Steel bolt jumps to the magnet right away.', supports: 'B' },
    { id: 'brass_hinge', text: 'Brass hinge stays flat on the belt under the arm.', supports: 'B' },
    { id: 'aluminum_siding', text: 'Aluminum scrap doesn\'t move — even after two passes.', supports: 'B' },
    { id: 'magnetism_note', text: 'Only some metals (like iron and steel) are magnetic.', supports: 'B' },
    { id: 'hinge_color', text: 'The brass hinge had a greenish tarnish spot.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice brass and aluminum stayed put?',
    'Did I say not every metal sticks?',
    'Did I skip the tarnish note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
