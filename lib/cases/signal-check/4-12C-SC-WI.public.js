// Signal Check Weigh-In — companion to 4.12C-SC (Did Someone Just Drop a Seashell up Here?).
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "4.12C-SC-WI",
  teksLabel: "4.12C",
  grade: 4,
  subject: "Science",
  title: 'Hilltop Shell Weigh-In',
  tagline: 'Did someone drop the fossil shell?',
  stemMode: "dropdown-open",

  dispute: {
    prompt: 'Fossil Cadets locked in. Who\'s right?',
    context: 'A seashell fossil sits in hilltop rock. One Cadet says someone carried it up and dropped it. The other says the rock formed underwater long ago.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Somebody carried that seashell up and dropped it on the hill.' },
    { id: "B", label: "SIDE B", claim: 'The hilltop rock formed underwater long ago — an ancient sea left the shell.' },
  ],

  evidence: [
    { id: "embedded", text: 'Shell is embedded inside the rock — not loose on top.', supports: "B" },
    { id: "same_layer", text: 'More matching shell fossils in the same rock layer.', supports: "B" },
    { id: "layer_note", text: 'That rock layer formed when an ancient sea covered the area.', supports: "B" },
    { id: "not_loose", text: 'You can\'t just pick the shell up — it\'s part of the rock.', supports: "B" },
    { id: "boot_print", text: 'Someone left a boot print on the trail nearby.', supports: "neither" },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I note the shell is embedded?',
    'Did I mention ancient sea / rock layer?',
    'Did I skip the boot print as proof?',
    'Did my proof match my side?',
  ],
};
