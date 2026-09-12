/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Geography (TEKS 5.8B)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Geography.human-environment",
  standard: "SS.5.FR.Geography",
  teks: "5.8B",
  title: "Positive or Negative Consequence?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "positive", label: "Positive" },
    { id: "negative", label: "Negative" }
  ],

  rule:
    "Sort each environmental modification consequence as mostly positive or mostly negative for people or nature.",

  items: [
    { id: "dam_power", prompt: "A dam provides clean electricity", correctBinId: "positive" },
    { id: "irrigation_food", prompt: "Irrigation grows more food", correctBinId: "positive" },
    { id: "levees_protect", prompt: "Levees protect a town from floods", correctBinId: "positive" },
    { id: "reservoir_water", prompt: "A reservoir stores drinking water", correctBinId: "positive" },
    { id: "windbreaks_soil", prompt: "Windbreaks reduce soil erosion", correctBinId: "positive" },
    { id: "wetland_restore", prompt: "Restoring a wetland cleans water", correctBinId: "positive" },
    { id: "parks_preserve", prompt: "National parks preserve wildlife", correctBinId: "positive" },
    { id: "recycled_water", prompt: "Recycled water saves scarce supply", correctBinId: "positive" },
    { id: "bridges_connect", prompt: "Bridges connect communities safely", correctBinId: "positive" },
    { id: "flood_control", prompt: "Flood control saves homes", correctBinId: "positive" },
    { id: "terraces_farm", prompt: "Terraces let farmers use hillsides", correctBinId: "positive" },
    { id: "solar_farm", prompt: "A solar farm reduces air pollution", correctBinId: "positive" },
    { id: "dam_fish", prompt: "A dam blocks fish from migrating", correctBinId: "negative" },
    { id: "clearcut", prompt: "Clear-cutting causes habitat loss", correctBinId: "negative" },
    { id: "polluted_river", prompt: "Factory waste pollutes a river", correctBinId: "negative" },
    { id: "urban_sprawl", prompt: "Sprawl replaces farms with pavement", correctBinId: "negative" },
    { id: "overpump_aquifer", prompt: "Overpumping empties an aquifer", correctBinId: "negative" },
    { id: "smog", prompt: "More cars create heavy smog", correctBinId: "negative" },
    { id: "wetland_fill", prompt: "Filling wetlands increases flooding", correctBinId: "negative" },
    { id: "strip_mine", prompt: "Strip mining scars the land", correctBinId: "negative" },
    { id: "invasive_canal", prompt: "A canal spreads invasive species", correctBinId: "negative" },
    { id: "soil_salinity", prompt: "Poor irrigation raises soil salinity", correctBinId: "negative" },
    { id: "beach_erosion_wall", prompt: "Sea walls worsen beach erosion nearby", correctBinId: "negative" },
    { id: "oil_spill", prompt: "An oil spill harms coastal wildlife", correctBinId: "negative" }
  ],
};
