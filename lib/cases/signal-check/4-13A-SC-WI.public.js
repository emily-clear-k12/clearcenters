// Signal Check Weigh-In — companion to 4.13A-SC (Does the Waxy Coating Even Do Anything?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.13A-SC-WI",
  teksLabel: "4.13A",
  grade: 4,
  subject: "Science",
  title: 'Waxy Leaf Weigh-In',
  tagline: 'Is the wax just shiny for looks?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Plant-lab Cadets locked in. Who\'s right?',
    context: 'One plant has waxy leaves. One Cadet says the wax is just shiny and useless. The other says it slows water loss — and deep roots help too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The waxy coating is just shiny — it doesn\'t help the plant.' },
    { id: "B", label: "SIDE B", claim: 'The waxy coating slows water loss. Deep roots help reach water too.' },
  ],

  evidence: [
    { id: "wax_keep", text: 'Waxy-leaved plant lost less water than the one with wax wiped off.', supports: "B" },
    { id: "deep_roots", text: 'Deep-rooted plant still reached water after topsoil dried.', supports: "B" },
    { id: "dry_top", text: 'Topsoil dried out; shallow roots struggled.', supports: "B" },
    { id: "function_note", text: 'Waxy coats and deep roots are structures that help survival.', supports: "B" },
    { id: "leaf_sparkle", text: 'The leaves look sparkly in classroom light.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I compare wax-on vs wiped?',
    'Did I mention water loss or deep roots?',
    'Did I skip sparkle as proof?',
    'Did my proof match my side?',
  ],
};
