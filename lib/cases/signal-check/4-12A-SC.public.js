// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12A covers investigating
// and explaining how most producers make their own food using sunlight,
// water, and carbon dioxide, connecting this process to the cycling of
// matter. Freshly framed for Signal Check — NOT a reworded version of any
// Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.12A-SC",
  teksLabel: "4.12A",
  grade: 4,
  subject: "Science",
  title: "Do Plants Actually Eat Soil?",
  tagline: "The plant grew so much bigger, it must be eating the soil right out of the pot.",
  transmission: {
    claimHeadline: "The plant grew so much bigger, it must be eating the soil right out of the pot.",
    source: "Grow Log — Sunflower Pot",
    loggedAt: "Week 8",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The pot's soil weighed almost the same before planting and after eight weeks of growth.",
      correctVerdict: "True",
      reasonText: "If the plant were eating the soil away, the soil's weight should have dropped a lot more than it did.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A second sunflower grown with the same soil but no sunlight stayed small and pale, even with just as much soil available.",
      correctVerdict: "True",
      reasonText: "This shows sunlight, not the soil, is the missing ingredient the plant needed most to grow big.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The plant is growing bigger by eating up the soil in the pot.",
      correctVerdict: "False",
      reasonText: "Plants make most of their own food using sunlight, water, and a gas from the air called carbon dioxide — not by eating soil.",
    },
  ],

  evidenceReadings: [
    { id: "soil_weight_before", label: "Soil weight, before planting", reading: "The dry soil weighed 800 grams before planting.", kind: "data" },
    { id: "soil_weight_after", label: "Soil weight, after 8 weeks", reading: "The same soil weighed 780 grams after eight weeks of growth.", kind: "data" },
    { id: "dark_plant_result", label: "No-sunlight plant", reading: "A second sunflower grown in the dark, with the same soil, stayed small and pale after eight weeks.", kind: "data" },
    { id: "light_plant_result", label: "Sunlight plant", reading: "The first sunflower, grown in sunlight with the same soil, grew tall and full after eight weeks.", kind: "data" },
    { id: "photosynthesis_note", label: "Science note", reading: "Producers like plants make their own food using sunlight, water, and carbon dioxide from the air.", kind: "data" },
    { id: "matter_cycle_note", label: "Science note", reading: "The tiny bit of soil weight lost mostly came from nutrients and water, not the plant eating solid soil.", kind: "data" },
    { id: "pot_color_note", label: "Pot note", reading: "Both pots were the same shade of terra-cotta orange.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["soil_weight_before", "soil_weight_after"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["dark_plant_result", "light_plant_result"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["photosynthesis_note", "matter_cycle_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pot_color_note"] },
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
    "Did I compare the soil's weight before planting and after eight weeks?",
    "Did I mention what happened to the plant grown without sunlight?",
    "Did I explain what a plant actually uses to make its own food?",
    "Did I avoid saying the plant is eating the soil?",
  ],
};
