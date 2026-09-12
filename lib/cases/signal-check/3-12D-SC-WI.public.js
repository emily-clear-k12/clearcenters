// Signal Check Weigh-In - companion to 3.12D-SC.
// Reuses Rock Layer Field Site evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.12D-SC-WI",
  teksLabel: "3.12D",
  grade: 3,
  subject: "Science",
  title: 'Rock Shape Weigh-In',
  tagline: 'Carved by a person - or a fossil?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Field Site Cadets disagree. Who's right?",
    context: "A shell-shaped mark sits in rock. One Cadet says a person carved it. The other says it's a fossil pressed in long ago.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'That shape was carved by a person a long time ago.' },
    { id: "B", label: "SIDE B", claim: "It's a fossil - a shell pressed into mud that hardened into rock." },
  ],

  evidence: [
    { id: "shell_compare", text: "Shape matches a real seashell's ridges exactly.", supports: "B" },
    { id: "shell_size", text: 'Same size as shells found nearby.', supports: "B" },
    { id: "rock_layer", text: 'Shape is embedded deep inside solid rock - not on a cut surface.', supports: "B" },
    { id: "no_tool_marks", text: 'Close-up: no scrape or chisel marks around it.', supports: "B" },
    { id: "fossil_process", text: 'Shells get pressed into mud that later hardens into rock.', supports: "B" },
    { id: "rock_color", text: 'Rock around the shape is a slightly darker gray.', supports: "neither" },
  ],

  echo: {
    main: 'Rock shape mystery, Cadet. Carved - or fossil? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice it matches a real shell?',
    'Did I notice no tool marks / deep in rock?',
    'Did I avoid saying a person carved it?',
    'Did my proof match my ruling?',
  ],
};
