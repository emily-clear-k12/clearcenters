/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Settlement (TEKS 5.7A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Settlement.patterns",
  standard: "SS.5.FR.Settlement",
  teks: "5.7A",
  title: "Rural, Urban, or Suburban?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "rural", label: "Rural" },
    { id: "urban", label: "Urban" },
    { id: "suburban", label: "Suburban" }
  ],

  rule:
    "Rural means countryside. Urban means city. Suburban means neighborhoods outside a city.",

  items: [
    { id: "family_farm", prompt: "A family farm with wide fields", correctBinId: "rural" },
    { id: "dirt_road", prompt: "Homes along a quiet dirt road", correctBinId: "rural" },
    { id: "small_town", prompt: "A small town with one grocery store", correctBinId: "rural" },
    { id: "ranch_land", prompt: "Open ranch land and few neighbors", correctBinId: "rural" },
    { id: "tractor_work", prompt: "Driving a tractor at harvest", correctBinId: "rural" },
    { id: "county_fair", prompt: "The annual county fair", correctBinId: "rural" },
    { id: "grain_silo", prompt: "Grain silos beside farmland", correctBinId: "rural" },
    { id: "low_density", prompt: "Very low population density", correctBinId: "rural" },
    { id: "skyscrapers", prompt: "Skyscrapers downtown", correctBinId: "urban" },
    { id: "subway", prompt: "Crowded subway trains", correctBinId: "urban" },
    { id: "apartment_highrise", prompt: "High-rise apartment buildings", correctBinId: "urban" },
    { id: "busy_intersection", prompt: "Busy intersections and taxis", correctBinId: "urban" },
    { id: "museums_city", prompt: "Many museums and theaters", correctBinId: "urban" },
    { id: "office_towers", prompt: "Office towers full of workers", correctBinId: "urban" },
    { id: "dense_housing", prompt: "Dense housing and little open land", correctBinId: "urban" },
    { id: "city_stadium", prompt: "A large city sports stadium", correctBinId: "urban" },
    { id: "cul_de_sac", prompt: "Houses on a quiet cul-de-sac", correctBinId: "suburban" },
    { id: "commute_car", prompt: "Commuting by car to the city", correctBinId: "suburban" },
    { id: "strip_mall", prompt: "Shopping at a strip mall", correctBinId: "suburban" },
    { id: "yards_schools", prompt: "Yards, schools, and planned streets", correctBinId: "suburban" },
    { id: "bedroom_community", prompt: "A bedroom community outside downtown", correctBinId: "suburban" },
    { id: "hoa_neighborhood", prompt: "A neighborhood with similar homes", correctBinId: "suburban" },
    { id: "park_and_ride", prompt: "Using a park-and-ride lot", correctBinId: "suburban" },
    { id: "between_city_farm", prompt: "Living between the city and farms", correctBinId: "suburban" }
  ],
};
