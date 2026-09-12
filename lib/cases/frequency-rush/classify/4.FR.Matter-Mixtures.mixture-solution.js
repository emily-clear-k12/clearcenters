/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Matter-Mixtures (TEKS 4.6B - mixture vs solution)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Matter-Mixtures.mixture-solution",
  standard: "4.FR.Matter-Mixtures",
  teks: "4.6B",
  title: "Mixture or Solution?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "mixture", label: "Mixture" },
    { id: "solution", label: "Solution" },
  ],

  rule:
    "A mixture keeps separate pieces you can often see or pick out. A solution looks uniform because one substance dissolves evenly into another.",

  items: [
    { id: "trail_mix", prompt: "Trail mix with nuts and raisins", correctBinId: "mixture" },
    { id: "salad", prompt: "A tossed green salad", correctBinId: "mixture" },
    { id: "sand_gravel", prompt: "Sand mixed with gravel", correctBinId: "mixture" },
    { id: "cereal_milk", prompt: "Cereal floating in milk", correctBinId: "mixture" },
    { id: "soil", prompt: "Garden soil with bits of rock", correctBinId: "mixture" },
    { id: "pepperoni_pizza", prompt: "Pepperoni pizza", correctBinId: "mixture" },
    { id: "iron_sand", prompt: "Iron filings mixed with sand", correctBinId: "mixture" },
    { id: "fruit_bowl", prompt: "A bowl of mixed fruit", correctBinId: "mixture" },
    { id: "rocks_water", prompt: "Pebbles in a jar of water", correctBinId: "mixture" },
    { id: "oil_water", prompt: "Oil sitting on top of water", correctBinId: "mixture" },
    { id: "buttons_bin", prompt: "A bin of mixed buttons", correctBinId: "mixture" },
    { id: "sand_salt_dry", prompt: "Dry sand mixed with dry salt", correctBinId: "mixture" },

    { id: "salt_water", prompt: "Salt completely dissolved in water", correctBinId: "solution" },
    { id: "sugar_tea", prompt: "Sugar dissolved in hot tea", correctBinId: "solution" },
    { id: "lemonade", prompt: "Lemonade with sugar dissolved", correctBinId: "solution" },
    { id: "kool_aid", prompt: "Kool-Aid powder dissolved in water", correctBinId: "solution" },
    { id: "ocean_water", prompt: "Ocean water (salt dissolved)", correctBinId: "solution" },
    { id: "instant_coffee", prompt: "Instant coffee dissolved in water", correctBinId: "solution" },
    { id: "food_color_water", prompt: "Food coloring mixed evenly in water", correctBinId: "solution" },
    { id: "vinegar_water", prompt: "Vinegar mixed evenly with water", correctBinId: "solution" },
    { id: "copper_sulfate", prompt: "Blue copper sulfate dissolved in water", correctBinId: "solution" },
    { id: "sports_drink", prompt: "A clear sports drink", correctBinId: "solution" },
    { id: "honey_tea", prompt: "Honey stirred into warm tea until gone", correctBinId: "solution" },
    { id: "mouthwash", prompt: "Clear mouthwash", correctBinId: "solution" },
  ],
};