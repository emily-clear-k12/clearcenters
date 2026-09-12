// Signal Check Weigh-In — companion to 4.8C-SC (Used Up by the First Bulb?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.8C-SC-WI",
  teksLabel: "4.8C",
  grade: 4,
  subject: "Science",
  title: 'First Bulb Weigh-In',
  tagline: 'Does the first bulb use up the power?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Circuit Cadets locked in. Who\'s right?',
    context: 'A string of bulbs is lit. One Cadet says the first bulb uses up the electricity so the end gets none. The other says electricity needs the full loop.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The first bulb uses up the electricity; end bulbs get no power.' },
    { id: "B", label: "SIDE B", claim: 'Electricity travels the full loop — first and last glow the same.' },
  ],

  evidence: [
    { id: "same_glow", text: 'First and last bulbs glow the same brightness.', supports: "B" },
    { id: "remove_last", text: 'Remove the last bulb and the WHOLE string goes dark — including the first.', supports: "B" },
    { id: "loop_note", text: 'Electricity needs a complete path to keep every bulb lit.', supports: "B" },
    { id: "middle_glow", text: 'Middle bulbs glow too — power isn\'t gone after bulb one.', supports: "B" },
    { id: "wire_color", text: 'The wire insulation is green.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note same brightness?',
    'Did I use the remove-last test?',
    'Did I skip green-wire as proof?',
    'Did my proof match my side?',
  ],
};
