// Signal Check Weigh-In - companion to 3.7B-SC.
// Reuses Target Toss Game Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.7B-SC-WI",
  teksLabel: "3.7B",
  grade: 3,
  subject: "Science",
  title: 'Hard Hit Weigh-In',
  tagline: 'Does hitting harder always win?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Target Toss Cadets disagree. Who's right?",
    context: 'Hard hits overshot; soft aimed taps scored. One Cadet says harder always wins. The other says force size AND direction matter.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Hitting the disc harder always wins the game.' },
    { id: "B", label: "SIDE B", claim: 'Right amount of force plus aim wins - harder can overshoot.' },
  ],

  evidence: [
    { id: "hard_hit_distance", text: 'Hard hit sent disc 190 cm - past the 120 cm target.', supports: "B" },
    { id: "target_distance", text: 'Target line is set at 120 cm.', supports: "B" },
    { id: "soft_hit_distance", text: 'Lighter tap traveled exactly 120 cm - on target.', supports: "B" },
    { id: "soft_hit_direction", text: 'Soft tap was aimed carefully at the target.', supports: "B" },
    { id: "score_log", text: 'Aimed soft taps scored more than overshooting hard hits.', supports: "B" },
    { id: "disc_color", text: "Today's disc is orange instead of the usual red.", supports: "neither" },
  ],

  echo: {
    main: 'Target toss, Cadet. Harder - or smarter? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice hard hits overshot?',
    'Did I notice aimed soft taps scored more?',
    'Did I avoid saying harder always wins?',
    'Did my proof match my ruling?',
  ],
};
