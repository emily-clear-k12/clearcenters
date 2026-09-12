/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Matter-States (TEKS 4.6A - states of matter)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Matter-States.classify",
  standard: "4.FR.Matter-States",
  teks: "4.6A",
  title: "Solid, Liquid, or Gas?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "solid", label: "Solid" },
    { id: "liquid", label: "Liquid" },
    { id: "gas", label: "Gas" },
  ],

  rule:
    "Solids keep their own shape. Liquids pour and take the shape of their container. Gases spread out and fill the whole container.",

  items: [
    { id: "desk", prompt: "A classroom desk", correctBinId: "solid" },
    { id: "chalk", prompt: "A piece of chalk", correctBinId: "solid" },
    { id: "ice_cube", prompt: "An ice cube", correctBinId: "solid" },
    { id: "metal_ruler", prompt: "A metal ruler", correctBinId: "solid" },
    { id: "sugar_cube", prompt: "A sugar cube", correctBinId: "solid" },
    { id: "textbook", prompt: "A textbook", correctBinId: "solid" },
    { id: "plastic_bead", prompt: "A plastic bead", correctBinId: "solid" },
    { id: "frozen_juice", prompt: "A frozen juice pop", correctBinId: "solid" },

    { id: "water", prompt: "Water in a beaker", correctBinId: "liquid" },
    { id: "vinegar", prompt: "Vinegar in a bottle", correctBinId: "liquid" },
    { id: "paint", prompt: "Tempera paint", correctBinId: "liquid" },
    { id: "glue", prompt: "White school glue", correctBinId: "liquid" },
    { id: "rainwater", prompt: "Rainwater in a puddle", correctBinId: "liquid" },
    { id: "cooking_oil", prompt: "Cooking oil", correctBinId: "liquid" },
    { id: "mouthwash", prompt: "Mouthwash", correctBinId: "liquid" },
    { id: "molasses", prompt: "Molasses pouring slowly", correctBinId: "liquid" },

    { id: "air_room", prompt: "Air filling a classroom", correctBinId: "gas" },
    { id: "steam", prompt: "Steam from boiling water", correctBinId: "gas" },
    { id: "helium_balloon", prompt: "Helium inside a balloon", correctBinId: "gas" },
    { id: "oxygen_tank", prompt: "Oxygen in a hospital tank", correctBinId: "gas" },
    { id: "co2_bubbles", prompt: "Carbon dioxide bubbles in soda", correctBinId: "gas" },
    { id: "natural_gas_stove", prompt: "Natural gas for a stove burner", correctBinId: "gas" },
    { id: "water_vapor", prompt: "Invisible water vapor in the air", correctBinId: "gas" },
    { id: "nitrogen_air", prompt: "Nitrogen in the air we breathe", correctBinId: "gas" },
  ],
};