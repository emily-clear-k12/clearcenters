/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Geography (TEKS 5.6B)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Geography.physical-regions",
  standard: "SS.5.FR.Geography",
  teks: "5.6B",
  title: "Mountains, Plains, Rivers/Lakes, or Coasts?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "mountains", label: "Mountains" },
    { id: "plains", label: "Plains" },
    { id: "rivers_lakes", label: "Rivers & Lakes" },
    { id: "coasts", label: "Coasts" }
  ],

  rule:
    "Sort each U.S. physical feature example into mountains, plains, rivers/lakes, or coasts.",

  items: [
    { id: "rockies", prompt: "The Rocky Mountains", correctBinId: "mountains" },
    { id: "appalachians", prompt: "The Appalachian Mountains", correctBinId: "mountains" },
    { id: "sierra_nevada", prompt: "The Sierra Nevada range", correctBinId: "mountains" },
    { id: "high_peaks", prompt: "High peaks with snow year-round", correctBinId: "mountains" },
    { id: "mountain_pass", prompt: "A mountain pass for travelers", correctBinId: "mountains" },
    { id: "volcanic_cascade", prompt: "Cascade Range volcanoes", correctBinId: "mountains" },
    { id: "great_plains_us", prompt: "The Great Plains grassland", correctBinId: "plains" },
    { id: "central_lowland", prompt: "The Central Lowland farms", correctBinId: "plains" },
    { id: "flat_midwest", prompt: "Flat Midwest farmland", correctBinId: "plains" },
    { id: "prairie", prompt: "Wide prairie with few trees", correctBinId: "plains" },
    { id: "breadbasket", prompt: "America's breadbasket fields", correctBinId: "plains" },
    { id: "gentle_slope", prompt: "Gently sloping open land", correctBinId: "plains" },
    { id: "mississippi", prompt: "The Mississippi River", correctBinId: "rivers_lakes" },
    { id: "great_lakes", prompt: "The Great Lakes", correctBinId: "rivers_lakes" },
    { id: "colorado_river", prompt: "The Colorado River", correctBinId: "rivers_lakes" },
    { id: "lake_mead", prompt: "A large reservoir lake", correctBinId: "rivers_lakes" },
    { id: "ohio_river", prompt: "The Ohio River", correctBinId: "rivers_lakes" },
    { id: "freshwater_shipping", prompt: "Freshwater shipping channels", correctBinId: "rivers_lakes" },
    { id: "atlantic_shore", prompt: "The Atlantic shoreline", correctBinId: "coasts" },
    { id: "pacific_beaches", prompt: "Pacific Ocean beaches", correctBinId: "coasts" },
    { id: "gulf_coast", prompt: "The Gulf Coast", correctBinId: "coasts" },
    { id: "harbor_ports", prompt: "Deep harbors for ocean ports", correctBinId: "coasts" },
    { id: "barrier_islands", prompt: "Barrier islands along the shore", correctBinId: "coasts" },
    { id: "tidal_marshes", prompt: "Tidal marshes by the sea", correctBinId: "coasts" }
  ],
};
