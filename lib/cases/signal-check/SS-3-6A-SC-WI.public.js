// Signal Check Weigh-In — companion to SS.3.6A-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.6A-SC-WI',
  teksLabel: '3.6A',
  grade: 3,
  subject: "Social Studies",
  title: 'Lemonade Price Weigh-In',
  tagline: 'Price always the same?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The stand logged prices across hot and cool days. One Cadet says the price never changes. The other says price moves with demand and supply.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Lemonade always costs the same, no matter the weather or supply.' },
    { id: "B", label: "SIDE B", claim: 'Price changes — hotter days and low supply pushed prices up; cool days stayed lower.' },
  ],

  evidence: [
    { id: 'hot_day', text: '92°F — price raised to $2/cup — sold out in an hour.', supports: 'B' },
    { id: 'cool_day', text: '74°F — price stayed at $1/cup — cups left over.', supports: 'B' },
    { id: 'low_supply', text: 'Only 6 cups left — price raised to $2.50 for the rest of the day.', supports: 'B' },
    { id: 'full_supply', text: 'Full pitcher at open — price at $1/cup.', supports: 'B' },
    { id: 'overprice_day', text: 'Price raised to $100/cup for one hour — zero cups sold.', supports: 'B' },
    { id: 'sign_color', text: 'The price sign was painted a new color — same price as before.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice hot-day and low-supply prices?',
    'Did I say price can change?',
    'Did I skip sign color as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
