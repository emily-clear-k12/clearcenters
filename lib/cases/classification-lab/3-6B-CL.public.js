// Solid, Liquid, or Gas? — Classification Lab pilot.
// TEKS 3.6B (States of Matter), Grade 3 Science. Authored Sept 11, 2026
// against ClassificationLab_Digital_Design_v2.md §10 (Emily-approved item
// list). Transfer = mystery_sample. Engine key: classification_lab.
//
// Shape mirrors other engine public cases: everything the client needs to
// render the Rule / Stream / Flag / Transfer / Wrap-up flow lives here.
// Answer keys and Flag grading rubric stay in 3-6B-CL.server.js.

export const PUBLIC_CASE = {
  standard: "3.6B-CL",
  title: "Solid, Liquid, or Gas?",
  grade: 3,
  subject: "Science",

  binRule: {
    title: "The Sorting Rule",
    text:
      "Solids keep their own shape. Liquids pour and take the shape of their container. Gases spread out and fill the whole container.",
  },

  bins: [
    { id: "solid", label: "Solid" },
    { id: "liquid", label: "Liquid" },
    { id: "gas", label: "Gas" },
  ],

  // Wave 1 = clear exemplars; Wave 2 = lookalikes → Flag (last item).
  waves: [
    ["wooden_block", "water_cup", "balloon_air", "metal_spoon", "honey", "steam_kettle"],
    ["sand_jar", "ice_cube", "shampoo", "soda_bubbles", "play_dough", "dry_ice_fog"],
  ],

  items: [
    {
      id: "wooden_block",
      mediaType: "image",
      display: "A wooden block",
      correctBinId: "solid",
      isTricky: false,
    },
    {
      id: "water_cup",
      mediaType: "image",
      display: "Water in a clear cup",
      correctBinId: "liquid",
      isTricky: false,
    },
    {
      id: "balloon_air",
      mediaType: "image",
      display: "A balloon filled with air",
      correctBinId: "gas",
      isTricky: false,
    },
    {
      id: "metal_spoon",
      mediaType: "image",
      display: "A metal spoon",
      correctBinId: "solid",
      isTricky: false,
    },
    {
      id: "honey",
      mediaType: "image",
      display: "Honey dripping from a spoon",
      correctBinId: "liquid",
      isTricky: false,
    },
    {
      id: "steam_kettle",
      mediaType: "image",
      display: "Steam rising from a kettle",
      correctBinId: "gas",
      isTricky: false,
    },
    {
      id: "sand_jar",
      mediaType: "image",
      display: "Sand in a jar",
      correctBinId: "solid",
      isTricky: false,
    },
    {
      id: "ice_cube",
      mediaType: "image",
      display: "An ice cube",
      correctBinId: "solid",
      isTricky: false,
    },
    {
      id: "shampoo",
      mediaType: "image",
      display: "Shampoo in a bottle",
      correctBinId: "liquid",
      isTricky: false,
    },
    {
      id: "soda_bubbles",
      mediaType: "text",
      display: "Bubbles rising through a glass of soda",
      correctBinId: "gas",
      isTricky: false,
    },
    {
      id: "play_dough",
      mediaType: "image",
      display: "A lump of play-dough",
      correctBinId: "solid",
      isTricky: false,
    },
    {
      id: "dry_ice_fog",
      mediaType: "image",
      display: "A dry ice chunk with fog around it",
      correctBinId: "solid",
      isTricky: true,
    },
  ],

  // Pilot transfer only — schema allows fix_the_bot later without a client rewrite.
  transfer: {
    type: "mystery_sample",
    title: "Mystery Sample",
    prompt:
      "Mission Control sent a sealed sandwich bag puffed with air. Run the quick checks, then choose the right bin.",
    sample: {
      id: "air_bag",
      display: "A sealed sandwich bag puffed with air",
      mediaType: "image",
    },
    checks: [
      {
        id: "rigid_shape",
        question: "Does it keep its own rigid shape (like a wooden block)?",
      },
      {
        id: "pours",
        question: "Does it pour like a liquid?",
      },
      {
        id: "fills_container",
        question: "Does it spread out and fill the container it's in?",
      },
    ],
    choosePrompt: "Which bin does this mystery sample belong in?",
  },

  flagPrompt:
    "This one is a Flag item — sort it, then write a short justification. Why does it belong in that bin?",

  responseStems: [
    "The chunk keeps its own shape, so it is a ___.",
    "The fog looks smoky, but the fog is separate from the chunk.",
    "Using the rule: solids ___ their own shape.",
  ],

  selfCheckQuestions: [
    "I sorted each item using the solid / liquid / gas rule.",
    "For the Flag item, I talked about the chunk's shape — not only the fog.",
    "I used rule language (shape, pour, or fill) in my Flag write.",
    "I ran the Mystery Sample checks before picking a bin.",
    "I read my Flag write one more time before submitting.",
  ],

  wrapUpPrompt:
    "Nice work, Cadet. Review your streak, finish the self-check, and send your report to Mission Control.",
};
