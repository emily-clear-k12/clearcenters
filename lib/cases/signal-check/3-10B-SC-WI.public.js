// Signal Check Weigh-In - companion to 3.10B-SC.
// Reuses Garden Soil Sample evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.10B-SC-WI",
  teksLabel: "3.10B",
  grade: 3,
  subject: "Science",
  title: 'Dirt Debate',
  tagline: 'Is garden soil just plain dirt?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Garden Cadets locked in. Who's right?",
    context: "Sample #3 settled into layers. One Cadet says soil is just dirt. The other says it's a mix of rock bits and plant bits.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Soil is just plain dirt - nothing else mixed in.' },
    { id: "B", label: "SIDE B", claim: 'Soil is a mix - rock grains and decayed plant bits.' },
  ],

  evidence: [
    { id: "sand_grains", text: 'Magnifier shows gritty grains like tiny broken rock.', supports: "B" },
    { id: "rock_compare", text: 'Those grains match nearby rocks in color and hardness.', supports: "B" },
    { id: "dark_bits", text: 'Dark crumbly bits smell earthy and fall apart easily.', supports: "B" },
    { id: "leaf_shape", text: "Some dark bits still show a leaf's vein pattern.", supports: "B" },
    { id: "three_layers", text: 'Jar of soil + water settles into three visible layers.', supports: "B" },
    { id: "soil_color", text: 'Shady-side soil looks a bit darker brown than sunny-side.', supports: "neither" },
  ],

  echo: {
    main: 'Dirt debate, Cadet. Two sides. Sort the sample log.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice rock grains in the sample?',
    'Did I notice decayed plant bits with leaf veins?',
    'Did I avoid saying soil is just plain dirt?',
    "Did my proof match Side B if that's what I picked?",
  ],
};
