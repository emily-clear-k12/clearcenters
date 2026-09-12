// Signal Check Weigh-In — companion to 4.13B-SC (Will the Puppies Get the Same Scar?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.13B-SC-WI",
  teksLabel: "4.13B",
  grade: 4,
  subject: "Science",
  title: 'Scar Trait Weigh-In',
  tagline: 'Will puppies inherit the ear notch?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Trait-log Cadets locked in. Who\'s right?',
    context: 'Mother dog has an ear notch from a fence accident. One Cadet says puppies will be born with it. The other says scars are acquired — fur color and ear shape can inherit, not the notch.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Puppies will be born with the mother\'s ear notch from the fence.' },
    { id: "B", label: "SIDE B", claim: 'The notch is acquired — puppies won\'t be born with it. Fur color and ear shape can still pass on.' },
  ],

  evidence: [
    { id: "smooth_ears", text: 'All puppies were born with smooth, unmarked ears.', supports: "B" },
    { id: "fur_pass", text: 'Fur color and ear shape passed from mother to every puppy.', supports: "B" },
    { id: "scar_note", text: 'A scar from an accident is acquired, not inherited.', supports: "B" },
    { id: "repeat_litter", text: 'Next litter also had smooth ears — notch never showed at birth.', supports: "B" },
    { id: "collar_bell", text: 'Mother wears a tiny bell on her collar.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note smooth puppy ears?',
    'Did I separate acquired vs inherited?',
    'Did I skip the collar bell as proof?',
    'Did my proof match my side?',
  ],
};
