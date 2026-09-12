/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Resources (TEKS 4.11A - renewable/nonrenewable)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Resources.renewable",
  standard: "4.FR.Resources",
  teks: "4.11A",
  title: "Renewable or Nonrenewable?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "renewable", label: "Renewable" },
    { id: "nonrenewable", label: "Nonrenewable" },
  ],

  rule:
    "Renewable resources can be replaced by nature in a short time. Nonrenewable resources cannot be replaced quickly once used.",

  items: [
    { id: "wind", prompt: "Wind turning a turbine", correctBinId: "renewable" },
    { id: "sunlight", prompt: "Sunlight on solar panels", correctBinId: "renewable" },
    { id: "flowing_water", prompt: "Flowing river water", correctBinId: "renewable" },
    { id: "plants", prompt: "Plants grown for biomass", correctBinId: "renewable" },
    { id: "animals", prompt: "Animals raised for food", correctBinId: "renewable" },
    { id: "trees_managed", prompt: "Trees in a managed forest", correctBinId: "renewable" },
    { id: "geothermal", prompt: "Heat from underground (geothermal)", correctBinId: "renewable" },
    { id: "rainwater", prompt: "Rainwater collected for gardens", correctBinId: "renewable" },
    { id: "hydropower", prompt: "Hydropower from a dam", correctBinId: "renewable" },
    { id: "solar_heat", prompt: "Solar heat warming a house", correctBinId: "renewable" },
    { id: "crops", prompt: "Corn crops for fuel", correctBinId: "renewable" },
    { id: "ocean_waves", prompt: "Ocean wave energy", correctBinId: "renewable" },

    { id: "coal", prompt: "Coal from a mine", correctBinId: "nonrenewable" },
    { id: "oil", prompt: "Oil from underground wells", correctBinId: "nonrenewable" },
    { id: "natural_gas", prompt: "Natural gas", correctBinId: "nonrenewable" },
    { id: "gasoline", prompt: "Gasoline for cars", correctBinId: "nonrenewable" },
    { id: "diesel", prompt: "Diesel fuel", correctBinId: "nonrenewable" },
    { id: "propane", prompt: "Propane for a grill", correctBinId: "nonrenewable" },
    { id: "uranium", prompt: "Uranium for nuclear fuel", correctBinId: "nonrenewable" },
    { id: "fossil_fuel_plastic", prompt: "Plastic made from petroleum", correctBinId: "nonrenewable" },
    { id: "peat_coal", prompt: "Peat burned as fuel", correctBinId: "nonrenewable" },
    { id: "crude_oil", prompt: "Crude oil", correctBinId: "nonrenewable" },
    { id: "coal_power", prompt: "Coal burned at a power plant", correctBinId: "nonrenewable" },
    { id: "kerosene", prompt: "Kerosene lamp fuel", correctBinId: "nonrenewable" },
  ],
};