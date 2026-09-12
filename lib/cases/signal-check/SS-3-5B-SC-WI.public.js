// Signal Check Weigh-In — companion to SS.3.5B-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.5B-SC-WI',
  teksLabel: '3.5B',
  grade: 3,
  subject: "Social Studies",
  title: 'Budget Plan Weigh-In',
  tagline: 'Budget = wish list?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Maya planned her $40 birthday money. One Cadet says a budget is just a wish list. The other says a budget places every dollar into categories that add up.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'A budget is just a list of things you want to buy.' },
    { id: "B", label: "SIDE B", claim: 'A budget puts every dollar into categories — save, give, spend — and it has to add up.' },
  ],

  evidence: [
    { id: 'savings_line', text: '$10 set aside for later, not spent right away.', supports: 'B' },
    { id: 'donation_line', text: '$5 planned for the animal shelter.', supports: 'B' },
    { id: 'shelter_note', text: 'Local shelter accepts donations to help rescued pets.', supports: 'B' },
    { id: 'total_check', text: '$15 gift + $10 save + $5 donate + $10 later = $40.', supports: 'B' },
    { id: 'category_sum', text: 'Every dollar of the $40 is placed into one of four categories.', supports: 'B' },
    { id: 'wish_only', text: 'Brother says a budget doesn\'t need to add up to anything.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the dollars add to $40?',
    'Did I say a budget assigns money?',
    'Did I skip brother\'s opinion as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
