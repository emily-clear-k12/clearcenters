// Signal Check Weigh-In — companion to 4.6C-SC (Where Did the Volume Go?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.6C-SC-WI",
  teksLabel: "4.6C",
  grade: 4,
  subject: "Science",
  title: 'Volume Vanish Weigh-In',
  tagline: 'Did 8 mL spill away?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Mix-lab Cadets locked in. Who\'s right?',
    context: '50 mL rice + 50 mL beans made 92 mL. One Cadet says some spilled. The other says beans filled gaps between rice — nothing disappeared.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Some rice or beans spilled — that\'s why it\'s under 100 mL.' },
    { id: "B", label: "SIDE B", claim: 'Nothing spilled. Smaller bits fill gaps, so mixed volume is less than a simple sum.' },
  ],

  evidence: [
    { id: "mix_volume", text: 'Mixed volume measured 92 mL — nothing on the counter.', supports: "B" },
    { id: "spill_check", text: 'Spill check: counter and floor were clean.', supports: "B" },
    { id: "weight_same", text: 'Weight stayed 340 grams before and after mixing.', supports: "B" },
    { id: "gap_note", text: 'Small beans tuck into spaces between bigger rice grains.', supports: "B" },
    { id: "bowl_color", text: 'The mixing bowl is red plastic.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the weight stayed the same?',
    'Did I explain the gap idea?',
    'Did I avoid saying matter vanished?',
    'Did my proof match my side?',
  ],
};
