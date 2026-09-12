// Signal Check Weigh-In - companion to 3.13B-SC.
// Reuses Pond Tagging Study evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.13B-SC-WI",
  teksLabel: "3.13B",
  grade: 3,
  subject: "Science",
  title: 'Bug Twin Weigh-In',
  tagline: 'Two bugs - or one that changes?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Tag Study Cadets disagree. Who's right?",
    context: 'Same red tag on a pond bug in June and a dragonfly in July. One Cadet says two different bugs. The other says one bug that metamorphoses.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The pond bug and the dragonfly are two totally different bugs.' },
    { id: "B", label: "SIDE B", claim: 'Same bug - it changes a lot as it grows (metamorphosis).' },
  ],

  evidence: [
    { id: "tag_june", text: 'June: underwater bug had a small red dot on its back.', supports: "B" },
    { id: "tag_july", text: 'July: dragonfly near the pond had that same red dot.', supports: "B" },
    { id: "nymph_photo", text: 'Pond bug: no wings, breathes with gills.', supports: "B" },
    { id: "adult_photo", text: 'Dragonfly: four wings, breathes air.', supports: "B" },
    { id: "tag_match_summary", text: 'Every marked pond bug grew into a dragonfly with the same mark.', supports: "B" },
    { id: "pond_depth", text: 'Pond was about 3 feet deep this summer.', supports: "neither" },
  ],

  echo: {
    main: 'Tag mystery, Cadet. Two bugs - or one? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the same red tag?',
    'Did I remember they can look different and still be one life cycle?',
    "Did I avoid saying they're two different bugs?",
    'Did my proof match my ruling?',
  ],
};
