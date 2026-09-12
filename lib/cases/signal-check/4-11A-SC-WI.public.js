// Signal Check Weigh-In — companion to 4.11A-SC (Does the Wind Turbine Work Every Single Day?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.11A-SC-WI",
  teksLabel: "4.11A",
  grade: 4,
  subject: "Science",
  title: 'Turbine Every Day?',
  tagline: 'Does renewable mean power every day?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Turbine Cadets locked in. Who\'s right?',
    context: 'Wind is renewable. One Cadet says the turbine must make power every day with no downside. The other says renewable means the resource won\'t run out — calm days still make zero.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Wind is renewable, so the turbine makes power every single day with no downside.' },
    { id: "B", label: "SIDE B", claim: 'Renewable means wind won\'t run out — but calm days still make zero power.' },
  ],

  evidence: [
    { id: "calm_zero", text: 'Turbine made zero power on calm days.', supports: "B" },
    { id: "wind_lasts", text: 'Wind resource itself does not run out over time.', supports: "B" },
    { id: "windy_high", text: 'Windy days logged high power output.', supports: "B" },
    { id: "renew_note", text: 'Renewable does not mean available on demand every day.', supports: "B" },
    { id: "blade_color", text: 'Turbine blades are white.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note calm-day zero?',
    'Did I separate won\'t-run-out from every-day?',
    'Did I skip blade color as proof?',
    'Did my proof match my side?',
  ],
};
