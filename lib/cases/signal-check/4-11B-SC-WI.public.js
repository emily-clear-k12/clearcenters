// Signal Check Weigh-In — companion to 4.11B-SC (One Battery Won't Make a Difference?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.11B-SC-WI",
  teksLabel: "4.11B",
  grade: 4,
  subject: "Science",
  title: 'One Battery Weigh-In',
  tagline: 'Does one trash battery matter?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Battery-drive Cadets locked in. Who\'s right?',
    context: 'One used battery in regular trash. One Cadet says it won\'t matter. The other says small choices add up — and recycling handles batteries differently.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'One battery in the trash won\'t make any difference.' },
    { id: "B", label: "SIDE B", claim: 'One choice times many people adds up — recycle batteries instead.' },
  ],

  evidence: [
    { id: "class_tally", text: 'One classroom collected over 200 batteries in a year.', supports: "B" },
    { id: "recycle_path", text: 'Recycled batteries are handled differently than landfill trash.', supports: "B" },
    { id: "school_total", text: 'Whole school drive filled multiple bins.', supports: "B" },
    { id: "impact_note", text: 'Small choices repeated by many people create a real effect.', supports: "B" },
    { id: "bin_sticker", text: 'The recycle bin has a lightning sticker.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use the 200 tally?',
    'Did I say small choices add up?',
    'Did I skip the sticker as proof?',
    'Did my proof match my side?',
  ],
};
