/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-States (TEKS 5.6A - states of matter)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-States.classify",
  standard: "5.FR.Matter-States",
  teks: "5.6A",
  title: "Solid, Liquid, or Gas?",
  grade: 5,
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
    { id: "diamond", prompt: "A diamond crystal", correctBinId: "solid" },
    { id: "steel_beam", prompt: "A steel beam", correctBinId: "solid" },
    { id: "ice_cube", prompt: "An ice cube", correctBinId: "solid" },
    { id: "salt_crystal", prompt: "A salt crystal", correctBinId: "solid" },
    { id: "plastic_ruler", prompt: "A plastic ruler", correctBinId: "solid" },
    { id: "wood_desk", prompt: "A wooden desk", correctBinId: "solid" },
    { id: "frozen_water", prompt: "Frozen lake ice", correctBinId: "solid" },
    { id: "rock_sample", prompt: "A rock sample", correctBinId: "solid" },

    { id: "water", prompt: "Liquid water", correctBinId: "liquid" },
    { id: "ethanol", prompt: "Rubbing alcohol", correctBinId: "liquid" },
    { id: "mercury_demo", prompt: "Mercury in a sealed thermometer (demo photo)", correctBinId: "liquid" },
    { id: "olive_oil", prompt: "Olive oil", correctBinId: "liquid" },
    { id: "honey", prompt: "Honey", correctBinId: "liquid" },
    { id: "rain", prompt: "Raindrops", correctBinId: "liquid" },
    { id: "juice", prompt: "Fruit juice", correctBinId: "liquid" },
    { id: "molten_wax", prompt: "Melted candle wax (still liquid)", correctBinId: "liquid" },

    { id: "oxygen", prompt: "Oxygen gas", correctBinId: "gas" },
    { id: "nitrogen", prompt: "Nitrogen in air", correctBinId: "gas" },
    { id: "steam", prompt: "Steam from a kettle", correctBinId: "gas" },
    { id: "helium", prompt: "Helium in a balloon", correctBinId: "gas" },
    { id: "co2", prompt: "Carbon dioxide from dry ice fog source", correctBinId: "gas" },
    { id: "water_vapor", prompt: "Water vapor (invisible in air)", correctBinId: "gas" },
    { id: "neon_sign", prompt: "Neon gas in a sign tube", correctBinId: "gas" },
    { id: "air_balloon", prompt: "Air filling a beach ball", correctBinId: "gas" },
  ],
};