// Signal Check Weigh-In — companion to 4.9B-SC (Does the Moon Really Shrink?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.9B-SC-WI",
  teksLabel: "4.9B",
  grade: 4,
  subject: "Science",
  title: 'Moon Size Weigh-In',
  tagline: 'Is the Moon shrinking each month?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Moon-log Cadets locked in. Who\'s right?',
    context: 'The lit part of the Moon changes. One Cadet says the Moon shrinks and rebuilds. The other says the Moon stays the same size — we just see different lit parts.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The Moon shrinks away and rebuilds itself every month.' },
    { id: "B", label: "SIDE B", claim: 'The Moon stays the same size. The lit part we see changes as it orbits Earth.' },
  ],

  evidence: [
    { id: "same_size", text: 'Moon measures the same size in every photo this month.', supports: "B" },
    { id: "craters", text: 'Same craters show up night after night.', supports: "B" },
    { id: "lit_part", text: 'The bright part changes shape — the Moon body doesn\'t.', supports: "B" },
    { id: "orbit_note", text: 'As the Moon moves around Earth, sunlight lights different sides.', supports: "B" },
    { id: "poster_color", text: 'The classroom Moon poster is laminated.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note same size / same craters?',
    'Did I say the lit part changes?',
    'Did I skip the poster note?',
    'Did my proof match my side?',
  ],
};
