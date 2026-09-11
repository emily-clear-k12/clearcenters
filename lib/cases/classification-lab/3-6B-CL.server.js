// Solid, Liquid, or Gas? — server-only answer keys and Flag grading rubric.
// Never sent to the client; imported only by app/api/classification-lab/submit
// and any future teacher-facing scoring views.
// TEKS 3.6B, Grade 3 Science. Authored Sept 11, 2026.

export const SERVER_CASE = {
  standard: "3.6B-CL",
  title: "Solid, Liquid, or Gas?",

  // Authoritative correct bins — never trust the client for grading sorts.
  itemAnswerKey: {
    wooden_block: "solid",
    water_cup: "liquid",
    balloon_air: "gas",
    metal_spoon: "solid",
    honey: "liquid",
    steam_kettle: "gas",
    sand_jar: "solid",
    ice_cube: "solid",
    shampoo: "liquid",
    soda_bubbles: "gas",
    play_dough: "solid",
    dry_ice_fog: "solid",
  },

  flagItemId: "dry_ice_fog",

  justificationCriteria: {
    mustInclude: [
      "Refers to the chunk's definite / own shape (not treating the fog as the thing being sorted).",
      "Does not treat pouring fog or looking smoky as making the chunk a gas or liquid.",
      "Uses rule language (shape / pour / fill) — not only the word \"solid\".",
    ],
    modelAnswer:
      "The dry ice chunk is a solid because the chunk keeps its own definite shape. The fog around it is separate — looking smoky does not change the chunk into a gas or a liquid.",
  },

  transferAnswer: {
    type: "mystery_sample",
    correctBinId: "gas",
    // Expected Yes/No path that supports Gas for the sealed air bag.
    expectedChecks: {
      rigid_shape: "no",
      pours: "no",
      fills_container: "yes",
    },
  },

  aiContext:
    "Grade 3 Science, TEKS 3.6B (describe and classify matter as solids, liquids, or gases). The student sorted items in Classification Lab, then wrote a short Flag justification about a dry ice chunk with fog. Grade generously for 3rd-grade writing. A strong Flag write (2) names the CHUNK as solid because it keeps a definite/own shape, treats the fog as separate, and uses rule language (shape/pour/fill) rather than only saying the word solid. A 1 gets the solid idea partly right but misses shape language or muddles fog vs chunk. A 0 calls the chunk a gas/liquid because of the fog, or has almost no rule language.",
};
