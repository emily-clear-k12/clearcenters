/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.Geography (TEKS 4.8A)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.Geography.adapt-modify",
  standard: "SS.4.FR.Geography",
  teks: "4.8A",
  title: "Adapt or Modify?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "adapt", label: "Adapt" },
    { id: "modify", label: "Modify" }
  ],

  rule:
    "Adapt means change how people live to fit the environment. Modify means change the environment to fit people's needs.",

  items: [
    { id: "wear_coats", prompt: "Wearing warm coats in winter", correctBinId: "adapt" },
    { id: "build_stilts", prompt: "Building homes on stilts in flood areas", correctBinId: "adapt" },
    { id: "migrate_season", prompt: "Moving herds to better grazing seasons", correctBinId: "adapt" },
    { id: "eat_local_food", prompt: "Eating foods that grow nearby", correctBinId: "adapt" },
    { id: "siesta_heat", prompt: "Resting midday in extreme heat", correctBinId: "adapt" },
    { id: "thick_walls", prompt: "Using thick adobe walls to stay cool", correctBinId: "adapt" },
    { id: "light_clothes", prompt: "Wearing light clothes in a hot climate", correctBinId: "adapt" },
    { id: "store_rainwater", prompt: "Collecting rainwater where it is scarce", correctBinId: "adapt" },
    { id: "snowshoes", prompt: "Using snowshoes in deep snow", correctBinId: "adapt" },
    { id: "fish_season", prompt: "Fishing during the best seasons", correctBinId: "adapt" },
    { id: "follow_buffalo", prompt: "Following buffalo across the plains", correctBinId: "adapt" },
    { id: "elevate_supplies", prompt: "Storing food high to avoid floods", correctBinId: "adapt" },
    { id: "build_dam", prompt: "Building a dam on a river", correctBinId: "modify" },
    { id: "irrigate_fields", prompt: "Digging canals to irrigate fields", correctBinId: "modify" },
    { id: "cut_forest", prompt: "Clearing a forest for farmland", correctBinId: "modify" },
    { id: "pave_roads", prompt: "Paving roads across open land", correctBinId: "modify" },
    { id: "drain_swamp", prompt: "Draining a swamp for building", correctBinId: "modify" },
    { id: "terrace_hills", prompt: "Cutting terraces into hillsides", correctBinId: "modify" },
    { id: "levees", prompt: "Building levees along a river", correctBinId: "modify" },
    { id: "tunnel_mountain", prompt: "Tunneling through a mountain", correctBinId: "modify" },
    { id: "fill_wetland", prompt: "Filling wetlands for a parking lot", correctBinId: "modify" },
    { id: "plant_windbreaks", prompt: "Planting windbreaks to stop soil loss", correctBinId: "modify" },
    { id: "reservoir", prompt: "Creating a reservoir for city water", correctBinId: "modify" },
    { id: "air_condition", prompt: "Installing A/C that cools indoor air", correctBinId: "modify" }
  ],
};
