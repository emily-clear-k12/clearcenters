// Signal Check Weigh-In — companion to 4.8B-SC (Does the Towel Make Cold?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.8B-SC-WI",
  teksLabel: "4.8B",
  grade: 4,
  subject: "Science",
  title: 'Towel Cold Weigh-In',
  tagline: 'Is the towel making cold?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Wrap-lab Cadets locked in. Who\'s right?',
    context: 'Wrapped ice cream lasted longer. One Cadet says the towel makes cold. The other says the towel slows heat getting in.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The towel makes cold that keeps the ice cream frozen.' },
    { id: "B", label: "SIDE B", claim: 'The towel slows heat transfer — it doesn\'t make cold.' },
  ],

  evidence: [
    { id: "wrapped_time", text: 'Wrapped scoop melted in 42 minutes.', supports: "B" },
    { id: "unwrapped_time", text: 'Unwrapped scoop melted in 19 minutes.', supports: "B" },
    { id: "towel_temp", text: 'Towel measured room temperature before and after — not cold.', supports: "B" },
    { id: "heat_note", text: 'Insulation slows heat moving in; it doesn\'t create cold.', supports: "B" },
    { id: "towel_color", text: 'The towel is striped blue and white.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare melt times?',
    'Did I note the towel wasn\'t cold?',
    'Did I skip stripe color as proof?',
    'Did my proof match my side?',
  ],
};
