/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Geography (TEKS 3.3A/B)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Geography.environments",
  standard: "SS.3.FR.Geography",
  teks: "3.3A/B",
  title: "Desert, Mountain, Wetland, or Plains?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "desert", label: "Desert" },
    { id: "mountain", label: "Mountain" },
    { id: "wetland", label: "Wetland" },
    { id: "plains", label: "Plains" }
  ],

  rule:
    "Sort each example by the kind of environment it describes: desert, mountain, wetland, or plains.",

  items: [
    { id: "cactus_home", prompt: "People store water carefully near cacti", correctBinId: "desert" },
    { id: "hot_dry", prompt: "Very hot days and little rain", correctBinId: "desert" },
    { id: "adobe_house", prompt: "Thick-walled adobe homes stay cool", correctBinId: "desert" },
    { id: "sand_dunes", prompt: "Sand dunes and sparse plants", correctBinId: "desert" },
    { id: "irrigation_farm", prompt: "Farmers irrigate dry fields", correctBinId: "desert" },
    { id: "lizard_habitat", prompt: "Lizards hide under rocks in heat", correctBinId: "desert" },
    { id: "ski_slopes", prompt: "Ski slopes on high peaks", correctBinId: "mountain" },
    { id: "thin_air", prompt: "Thinner air at high elevations", correctBinId: "mountain" },
    { id: "terraced_farm", prompt: "Farms built on terraced hillsides", correctBinId: "mountain" },
    { id: "mining_ore", prompt: "Mining ore from rocky slopes", correctBinId: "mountain" },
    { id: "snow_melt_streams", prompt: "Snowmelt feeds mountain streams", correctBinId: "mountain" },
    { id: "hiking_peaks", prompt: "Hiking to a rocky summit", correctBinId: "mountain" },
    { id: "marsh_birds", prompt: "Herons nesting among reeds", correctBinId: "wetland" },
    { id: "flooded_soil", prompt: "Soil soaked with standing water", correctBinId: "wetland" },
    { id: "mosquito_marsh", prompt: "Marshes with many mosquitoes", correctBinId: "wetland" },
    { id: "bayou_boat", prompt: "Boating through a bayou", correctBinId: "wetland" },
    { id: "frog_chorus", prompt: "Frogs calling from a swamp", correctBinId: "wetland" },
    { id: "filter_water", prompt: "Wetlands filter and clean water", correctBinId: "wetland" },
    { id: "flat_grass", prompt: "Wide flat grasslands", correctBinId: "plains" },
    { id: "cattle_ranch", prompt: "Cattle grazing on open range", correctBinId: "plains" },
    { id: "wheat_fields", prompt: "Large wheat fields stretch for miles", correctBinId: "plains" },
    { id: "few_trees", prompt: "Few trees and gentle rolling land", correctBinId: "plains" },
    { id: "tornado_alley", prompt: "Open land where storms travel far", correctBinId: "plains" },
    { id: "farm_town", prompt: "Farm towns along straight roads", correctBinId: "plains" }
  ],
};
