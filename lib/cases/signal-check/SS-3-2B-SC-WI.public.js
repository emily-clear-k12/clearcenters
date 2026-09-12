// Signal Check Weigh-In — companion to SS.3.2B-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.2B-SC-WI',
  teksLabel: '3.2B',
  grade: 3,
  subject: "Social Studies",
  title: 'Same Fix Weigh-In',
  tagline: 'Same crossing problem = same stoplight?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Public Works fixed Elm Street and Birch Lane. One Cadet says both should get the same stoplight. The other says each street needs its own fit.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Both streets need the exact same stoplight fix.' },
    { id: "B", label: "SIDE B", claim: 'Fixes should match each street — heavy traffic gets a light; light traffic can use a crosswalk.' },
  ],

  evidence: [
    { id: 'elm_traffic', text: 'About 400 cars pass Elm Street every hour during pickup.', supports: 'B' },
    { id: 'elm_fix', text: 'City put a stoplight with a walk signal at Elm and 5th.', supports: 'B' },
    { id: 'birch_traffic', text: 'About 20 cars pass Birch Lane every hour, mostly slow.', supports: 'B' },
    { id: 'birch_fix', text: 'City painted a crosswalk and added a stop sign near the park.', supports: 'B' },
    { id: 'birch_incidents', text: 'Zero crossing incidents on Birch Lane all year.', supports: 'B' },
    { id: 'stoplight_cost', text: 'A new stoplight costs about $50,000 — way more than a crosswalk.', supports: 'B' },
    { id: 'sign_color', text: 'The new stoplight pole was painted green.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice Elm\'s heavy traffic vs Birch\'s light traffic?',
    'Did I say same problem ≠ same fix?',
    'Did I skip the green pole as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
