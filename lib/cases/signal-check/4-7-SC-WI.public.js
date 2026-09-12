// Signal Check Weigh-In — companion to 4.7-SC (Moving on Its Own?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.7-SC-WI",
  teksLabel: "4.7",
  grade: 4,
  subject: "Science",
  title: 'Cart Roll Weigh-In',
  tagline: 'Did the cart move with no force?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Lot-test Cadets locked in. Who\'s right?',
    context: 'A shopping cart rolled away. One Cadet says it moved with no force on a flat lot. The other says the lot slopes and gravity pulled it.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The cart rolled by itself — no force, totally flat lot.' },
    { id: "B", label: "SIDE B", claim: 'The lot slopes a little. Gravity pulled the cart downhill.' },
  ],

  evidence: [
    { id: "marble_roll", text: 'A marble rolls the same direction every test.', supports: "B" },
    { id: "level_tool", text: 'Level tool shows the lot isn\'t perfectly flat.', supports: "B" },
    { id: "height_check", text: 'One side of the lot measures higher than the other.', supports: "B" },
    { id: "repeat_roll", text: 'Cart rolls the same way every release.', supports: "B" },
    { id: "cart_color", text: 'The cart has a yellow handle.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use the level or height reading?',
    'Did I name gravity or slope?',
    'Did I skip the yellow-handle note?',
    'Did my proof match my side?',
  ],
};
