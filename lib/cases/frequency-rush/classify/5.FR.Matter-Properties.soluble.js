/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-Properties (TEKS 5.6A - soluble/insoluble in water)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-Properties.soluble",
  standard: "5.FR.Matter-Properties",
  teks: "5.6A",
  title: "Soluble or Insoluble in Water?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "soluble", label: "Soluble" },
    { id: "insoluble", label: "Insoluble" },
  ],

  rule:
    "Soluble substances dissolve in water. Insoluble substances do not dissolve in water.",

  items: [
    { id: "table_salt", prompt: "Table salt", correctBinId: "soluble" },
    { id: "sugar", prompt: "Granulated sugar", correctBinId: "soluble" },
    { id: "instant_coffee", prompt: "Instant coffee powder", correctBinId: "soluble" },
    { id: "kool_aid", prompt: "Drink mix powder", correctBinId: "soluble" },
    { id: "baking_soda", prompt: "Baking soda", correctBinId: "soluble" },
    { id: "food_coloring", prompt: "Food coloring", correctBinId: "soluble" },
    { id: "honey", prompt: "Honey stirred into warm water", correctBinId: "soluble" },
    { id: "lemon_juice", prompt: "Lemon juice mixed into water", correctBinId: "soluble" },
    { id: "vinegar", prompt: "Vinegar", correctBinId: "soluble" },
    { id: "epsom_salt", prompt: "Epsom salt", correctBinId: "soluble" },
    { id: "gelatin_powder", prompt: "Gelatin powder in hot water", correctBinId: "soluble" },
    { id: "cough_syrup", prompt: "Cough syrup mixed into water", correctBinId: "soluble" },

    { id: "sand", prompt: "Sand", correctBinId: "insoluble" },
    { id: "cooking_oil", prompt: "Cooking oil", correctBinId: "insoluble" },
    { id: "pepper", prompt: "Ground black pepper", correctBinId: "insoluble" },
    { id: "chalk_dust", prompt: "Chalk dust", correctBinId: "insoluble" },
    { id: "plastic_bead", prompt: "A plastic bead", correctBinId: "insoluble" },
    { id: "gravel", prompt: "Gravel", correctBinId: "insoluble" },
    { id: "wood_chip", prompt: "A wood chip", correctBinId: "insoluble" },
    { id: "iron_filing", prompt: "Iron filings", correctBinId: "insoluble" },
    { id: "wax", prompt: "Candle wax shavings", correctBinId: "insoluble" },
    { id: "clay_lump", prompt: "A lump of clay", correctBinId: "insoluble" },
    { id: "rice_grain", prompt: "Uncooked rice grains", correctBinId: "insoluble" },
    { id: "styrofoam", prompt: "Styrofoam bits", correctBinId: "insoluble" },
  ],
};