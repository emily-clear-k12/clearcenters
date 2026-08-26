// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.13A covers exploring and
// explaining how plant structures and their functions help plants survive
// in their environments, such as waxy leaves and deep roots. Freshly
// framed for Signal Check — NOT a reworded version of any Group Chat trap
// line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.13A-SC",
  teksLabel: "4.13A",
  grade: 4,
  subject: "Science",
  title: "Does the Waxy Coating Even Do Anything?",
  tagline: "That plant's leaves are just naturally shiny — the waxy coating doesn't actually do anything useful for the plant.",
  transmission: {
    claimHeadline: "That plant's leaves are just naturally shiny — the waxy coating doesn't actually do anything useful for the plant.",
    source: "Desert Plant Survival Log",
    loggedAt: "Week 1",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A waxy-leaved plant left in hot, dry sun for a week loses much less water than a same-size plant with the wax wiped off its leaves.",
      correctVerdict: "True",
      reasonText: "This side-by-side test shows the waxy coating is doing something real: slowing down how much water the plant loses.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The deep-rooted plant is still pulling up water six inches underground, long after the topsoil had completely dried out.",
      correctVerdict: "True",
      reasonText: "This shows deep roots let a plant reach water the topsoil can no longer provide.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The waxy coating doesn't actually help the plant survive.",
      correctVerdict: "False",
      reasonText: "A waxy coating slows water loss and deep roots reach water below a dried-out surface — both help the plant survive dry conditions.",
    },
  ],

  evidenceReadings: [
    { id: "wax_intact_result", label: "Waxy leaf test", reading: "A waxy-leaved plant left in hot, dry sun for a week loses only a small amount of water weight.", kind: "data" },
    { id: "wax_removed_result", label: "Wax-removed leaf test", reading: "A same-size plant with the wax wiped off loses much more water weight in the same week.", kind: "data" },
    { id: "deep_root_result", label: "Deep root test", reading: "The deep-rooted plant is still pulling up water six inches underground, after the topsoil dried out completely.", kind: "data" },
    { id: "shallow_root_result", label: "Shallow root test", reading: "A shallow-rooted plant in the same dry topsoil wilts within two days.", kind: "data" },
    { id: "wax_function_note", label: "Science note", reading: "A waxy coating on leaves slows down water loss, helping the plant survive in dry places.", kind: "data" },
    { id: "root_function_note", label: "Science note", reading: "Deep roots can reach water lower in the soil, even when the surface has dried out.", kind: "data" },
    { id: "leaf_shine_note", label: "Leaf note", reading: "The waxy leaves have a glossy shine in bright sunlight.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["wax_intact_result", "wax_removed_result"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["deep_root_result", "shallow_root_result"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["wax_function_note", "root_function_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["leaf_shine_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I compare the waxy-leaved plant to the plant with the wax removed?",
    "Did I mention what the deep-rooted plant could still do after the topsoil dried out?",
    "Did I explain what the waxy coating and the deep roots actually do for the plant?",
    "Did I avoid saying the waxy coating doesn't help the plant survive?",
  ],
};
