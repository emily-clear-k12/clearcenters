/**
 * Frequency Rush — Classify / Sort bank
 * Unit: 3.FR.Matter-States (TEKS 3.6B — states of matter)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity — content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Matter-States.classify",
  standard: "3.FR.Matter-States",
  teks: "3.6B",
  title: "Solid, Liquid, or Gas?",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "solid", label: "Solid" },
    { id: "liquid", label: "Liquid" },
    { id: "gas", label: "Gas" },
  ],

  rule:
    "Solids keep their own shape. Liquids pour and take the shape of their container. Gases spread out and fill the whole container.",

  // Each item: prompt (what student sees) + correctBinId
  items: [
    { id: "wooden_block", prompt: "A wooden block", correctBinId: "solid" },
    { id: "metal_spoon", prompt: "A metal spoon", correctBinId: "solid" },
    { id: "ice_cube", prompt: "An ice cube", correctBinId: "solid" },
    { id: "sand_jar", prompt: "Sand in a jar", correctBinId: "solid" },
    { id: "play_dough", prompt: "A lump of play-dough", correctBinId: "solid" },
    { id: "rock", prompt: "A rock", correctBinId: "solid" },
    { id: "pencil", prompt: "A pencil", correctBinId: "solid" },
    { id: "coin", prompt: "A coin", correctBinId: "solid" },
    { id: "dry_ice_chunk", prompt: "A dry ice chunk (the hard piece, not the fog)", correctBinId: "solid" },
    { id: "crayon", prompt: "A crayon", correctBinId: "solid" },

    { id: "water_cup", prompt: "Water in a clear cup", correctBinId: "liquid" },
    { id: "honey", prompt: "Honey dripping from a spoon", correctBinId: "liquid" },
    { id: "shampoo", prompt: "Shampoo in a bottle", correctBinId: "liquid" },
    { id: "juice", prompt: "Orange juice", correctBinId: "liquid" },
    { id: "milk", prompt: "Milk in a carton", correctBinId: "liquid" },
    { id: "oil", prompt: "Cooking oil", correctBinId: "liquid" },
    { id: "rain", prompt: "Rain falling from a cloud", correctBinId: "liquid" },
    { id: "syrup", prompt: "Maple syrup", correctBinId: "liquid" },

    { id: "balloon_air", prompt: "Air inside a balloon", correctBinId: "gas" },
    { id: "steam_kettle", prompt: "Steam rising from a kettle", correctBinId: "gas" },
    { id: "soda_bubbles", prompt: "Bubbles rising through a glass of soda", correctBinId: "gas" },
    { id: "helium", prompt: "Helium in a party balloon", correctBinId: "gas" },
    { id: "oxygen_tank", prompt: "Oxygen in a scuba tank", correctBinId: "gas" },
    { id: "cloud_vapor", prompt: "Water vapor in the air (invisible)", correctBinId: "gas" },
  ],
};
