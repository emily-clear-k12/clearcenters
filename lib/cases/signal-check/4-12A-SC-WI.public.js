// Signal Check Weigh-In — companion to 4.12A-SC (Do Plants Actually Eat Soil?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.12A-SC-WI",
  teksLabel: "4.12A",
  grade: 4,
  subject: "Science",
  title: 'Plant Soil Weigh-In',
  tagline: 'Do plants grow by eating soil?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Growth-lab Cadets locked in. Who\'s right?',
    context: 'Plant got much bigger. One Cadet says it ate the soil. The other says plants make food with sunlight, water, and carbon dioxide — soil weight barely changed.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The plant grew bigger by eating the soil out of the pot.' },
    { id: "B", label: "SIDE B", claim: 'Plants make their own food with sunlight, water, and CO2 — not by eating soil.' },
  ],

  evidence: [
    { id: "soil_weight", text: 'Soil weight barely changed after eight weeks of growth.', supports: "B" },
    { id: "no_sun", text: 'Same soil, no sunlight — plant stayed small.', supports: "B" },
    { id: "plant_gain", text: 'Plant gained lots of mass while soil barely changed.', supports: "B" },
    { id: "food_note", text: 'Producers make food using sunlight, water, and carbon dioxide.', supports: "B" },
    { id: "pot_color", text: 'The pot is painted with yellow dots.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note soil weight barely changed?',
    'Did I mention sunlight / making food?',
    'Did I skip pot dots as proof?',
    'Did my proof match my side?',
  ],
};
