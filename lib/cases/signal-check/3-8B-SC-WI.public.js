// Signal Check Weigh-In - companion to 3.8B-SC.
// Reuses Marble Ramp Bowling Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.8B-SC-WI",
  teksLabel: "3.8B",
  grade: 3,
  subject: "Science",
  title: 'Heavy Ball Weigh-In',
  tagline: 'Do you always need a heavier ball?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Ramp Bowling Cadets disagree. Who's right?",
    context: 'Same small marble knocked more pins from higher up. One Cadet says you always need heavier. The other says speed matters too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'You always need a heavier ball to knock down more pins.' },
    { id: "B", label: "SIDE B", claim: 'Speed matters too - a fast small ball can match a heavy one.' },
  ],

  evidence: [
    { id: "low_release", text: 'Small marble from low mark: 2 pins.', supports: "B" },
    { id: "high_release", text: 'Same small marble from high mark: 7 pins.', supports: "B" },
    { id: "fast_small_result", text: 'Fast small marble from the top: 7 pins.', supports: "B" },
    { id: "slow_heavy_result", text: 'Heavier marble from low mark: also 7 pins.', supports: "B" },
    { id: "mass_note", text: 'Hit strength depends on mass AND speed - not mass alone.', supports: "B" },
    { id: "pin_color", text: 'Pins today are painted white instead of red.', supports: "neither" },
  ],

  echo: {
    main: 'Ramp bowl, Cadet. Heavier - or faster? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare low vs high release?',
    'Did I notice fast small matched slow heavy?',
    'Did I avoid saying you always need heavier?',
    'Did my proof match my ruling?',
  ],
};
