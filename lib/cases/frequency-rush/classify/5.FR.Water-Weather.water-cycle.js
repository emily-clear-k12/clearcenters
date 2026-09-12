/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Water-Weather (TEKS 5.10A - water cycle)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Water-Weather.water-cycle",
  standard: "5.FR.Water-Weather",
  teks: "5.10A",
  title: "Water Cycle Stage",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "evaporation", label: "Evaporation" },
    { id: "condensation", label: "Condensation" },
    { id: "precipitation", label: "Precipitation" },
    { id: "collection", label: "Collection" },
  ],

  rule:
    "Evaporation turns liquid water into vapor. Condensation forms clouds from vapor. Precipitation falls as rain, snow, sleet, or hail. Collection is water gathering in oceans, lakes, rivers, or groundwater.",

  items: [
    { id: "puddle_dries", prompt: "A puddle drying in the sun", correctBinId: "evaporation" },
    { id: "ocean_vapor", prompt: "Ocean water turning into vapor", correctBinId: "evaporation" },
    { id: "wet_clothes", prompt: "Wet clothes drying on a line", correctBinId: "evaporation" },
    { id: "steam_pot", prompt: "Water vanishing from a boiling pot", correctBinId: "evaporation" },
    { id: "sweat_dries", prompt: "Sweat drying on skin", correctBinId: "evaporation" },
    { id: "lake_shrink", prompt: "A lake shrinking in hot dry weather", correctBinId: "evaporation" },

    { id: "cloud_form", prompt: "Water vapor forming a cloud", correctBinId: "condensation" },
    { id: "dew_grass", prompt: "Dew on morning grass", correctBinId: "condensation" },
    { id: "fog", prompt: "Fog over a field", correctBinId: "condensation" },
    { id: "mirror_steam", prompt: "Steam fogging a bathroom mirror", correctBinId: "condensation" },
    { id: "cold_glass", prompt: "Water droplets on a cold drink glass", correctBinId: "condensation" },
    { id: "cloud_thicken", prompt: "Tiny droplets joining into a thicker cloud", correctBinId: "condensation" },

    { id: "rain", prompt: "Rain falling from clouds", correctBinId: "precipitation" },
    { id: "snow", prompt: "Snow falling on a mountain", correctBinId: "precipitation" },
    { id: "hail", prompt: "Hail during a thunderstorm", correctBinId: "precipitation" },
    { id: "sleet", prompt: "Sleet hitting the sidewalk", correctBinId: "precipitation" },
    { id: "drizzle", prompt: "A light drizzle", correctBinId: "precipitation" },
    { id: "shower", prompt: "A summer rain shower", correctBinId: "precipitation" },

    { id: "river_flow", prompt: "Rainwater flowing into a river", correctBinId: "collection" },
    { id: "ocean_gather", prompt: "Rivers emptying into the ocean", correctBinId: "collection" },
    { id: "lake_fill", prompt: "A lake filling after storms", correctBinId: "collection" },
    { id: "groundwater", prompt: "Water soaking into groundwater", correctBinId: "collection" },
    { id: "runoff_gutter", prompt: "Runoff flowing into storm drains", correctBinId: "collection" },
    { id: "reservoir", prompt: "Water stored in a reservoir", correctBinId: "collection" },
  ],
};