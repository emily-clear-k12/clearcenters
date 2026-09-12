// Signal Check Weigh-In — companion to SS.3.6C-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.6C-SC-WI',
  teksLabel: '3.6C',
  grade: 3,
  subject: "Social Studies",
  title: 'Sold Out Weigh-In',
  tagline: 'Sold out = profit?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The bake sale sold all 40 cupcakes. One Cadet says sold out means profit. The other says profit needs revenue higher than cost.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'If they sold every cupcake, they must have made a profit.' },
    { id: "B", label: "SIDE B", claim: 'Sold out isn\'t enough — they spent $60 to make them and only took in $40.' },
  ],

  evidence: [
    { id: 'sold_out_log', text: 'All 40 cupcakes sold; table empty by 1:00pm.', supports: 'neither' },
    { id: 'cupcake_count', text: 'Class baked exactly 40 cupcakes.', supports: 'B' },
    { id: 'total_revenue', text: '40 × $1.00 = $40.00 total revenue.', supports: 'B' },
    { id: 'total_cost', text: '40 × $1.50 to make = $60.00 total cost.', supports: 'B' },
    { id: 'cost_sheet', text: 'Ingredients for each cupcake cost $1.50.', supports: 'B' },
    { id: 'price_sheet', text: 'Cupcakes sold for $1.00 each.', supports: 'B' },
    { id: 'decoration_note', text: 'Blue tablecloth and balloons on the table.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare $40 revenue to $60 cost?',
    'Did I say sold out ≠ profit?',
    'Did I skip balloons as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
