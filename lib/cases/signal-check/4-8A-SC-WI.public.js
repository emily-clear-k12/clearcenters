// Signal Check Weigh-In — companion to 4.8A-SC (Do the Middle Ones Just Quit?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.8A-SC-WI",
  teksLabel: "4.8A",
  grade: 4,
  subject: "Science",
  title: 'Bell Jump Weigh-In',
  tagline: 'Does energy skip the middle bells?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Bell-lab Cadets locked in. Who\'s right?',
    context: 'Last bell swings hard; middle bells barely move. One Cadet says energy jumps over the middle. The other says motion passes bell-to-bell through contact.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Energy jumps straight over the middle bells to the last one.' },
    { id: "B", label: "SIDE B", claim: 'Energy passes through each bell by contact — it doesn\'t skip.' },
  ],

  evidence: [
    { id: "remove_middle", text: 'Remove a middle bell and the far end stops moving.', supports: "B" },
    { id: "full_row", text: 'Full row touching: only the last bell swings out big.', supports: "B" },
    { id: "middle_wiggle", text: 'Middle bells do wiggle a tiny bit — they\'re in the path.', supports: "B" },
    { id: "contact_note", text: 'Motion travels bell to bell through touching.', supports: "B" },
    { id: "bell_shine", text: 'The bells are shiny silver.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use the remove-middle test?',
    'Did I say energy doesn\'t skip?',
    'Did I skip shiny-bell as proof?',
    'Did my proof match my side?',
  ],
};
