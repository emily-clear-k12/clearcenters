// Signal Check Weigh-In — companion to 4.7B-SC (The Erosion Photo Caption).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.7B-SC-WI",
  teksLabel: "4.7B",
  grade: 4,
  subject: "Science",
  title: 'Bank Rocks Weigh-In',
  tagline: 'Did the river make brand-new rocks?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Trail-cam Cadets locked in. Who\'s right?',
    context: 'Rocks piled on the bank after high water. One Cadet says the river made brand-new rocks. The other says it moved sediment from upstream and dropped it.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The river created brand-new rocks on the bank.' },
    { id: "B", label: "SIDE B", claim: 'The river moved sediment from upstream and dropped it when the current slowed.' },
  ],

  evidence: [
    { id: "before", text: 'Before photo: no rocks in that bank spot.', supports: "B" },
    { id: "after", text: 'After photo: sediment piled at the bank.', supports: "B" },
    { id: "upstream", text: 'Upstream site is missing sediment that matches the bank pile.', supports: "B" },
    { id: "current", text: 'Current slows at the inside curve — right where sediment landed.', supports: "B" },
    { id: "rocktype", text: 'Bank rocks match the upstream rock type.', supports: "B" },
    { id: "shiny", text: 'The rocks look shiny and new.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I use upstream or rock-type proof?',
    'Did I say the rocks weren\'t newly created?',
    'Did I skip "shiny" as real proof?',
    'Did my proof match my side?',
  ],
};
