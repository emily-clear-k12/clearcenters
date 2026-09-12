// Signal Check Weigh-In — companion to 5.12B-SC (Does Feeding the Birds Only Help the Birds?).
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: '5.12B-SC-WI',
  teksLabel: '5.12B',
  grade: 5,
  subject: "Science",
  title: 'Feeder Ripple Weigh-In',
  tagline: 'Only birds affected?',
  stemMode: "open",

  dispute: {
    prompt: 'Feeder Cadets locked in. Who\'s right?',
    context: 'Backyard Ecosystem Log tracked birds, beetles, and wildflower seeds after the feeder. One Cadet says only birds change. The other sees a ripple.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Filling the bird feeder only affects the birds that eat there.' },
    { id: "B", label: "SIDE B", claim: 'Ripples hit beetles and wildflowers too — food-web change spreads.' },
  ],

  evidence: [
    { id: 'birds', text: 'Bird visits roughly doubled after the feeder went up.', supports: 'B' },
    { id: 'beetles', text: 'Ground beetles the birds ate dropped by about half.', supports: 'B' },
    { id: 'seeds', text: 'Wildflowers those beetles pollinated made fewer seeds.', supports: 'B' },
    { id: 'visits', text: 'Beetle visits to those flowers dropped too.', supports: 'B' },
    { id: 'web', text: 'A change in one part of a food web can shift matter and energy beyond that species.', supports: 'B' },
    { id: 'feeder_red', text: 'Bird feeder is painted red.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice beetles and flowers changed too?',
    'Did I say the feeder rippled the food web?',
    'Did I skip the paint note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
