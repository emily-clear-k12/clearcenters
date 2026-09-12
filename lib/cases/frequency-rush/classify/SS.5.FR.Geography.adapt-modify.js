/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Geography (TEKS 5.8A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Geography.adapt-modify",
  standard: "SS.5.FR.Geography",
  teks: "5.8A",
  title: "Adapt or Modify the Environment?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "adapt", label: "Adapt" },
    { id: "modify", label: "Modify" }
  ],

  rule:
    "Adapt means people change their ways to fit nature. Modify means people change nature to fit their needs.",

  items: [
    { id: "insulate_homes", prompt: "Insulating homes for cold winters", correctBinId: "adapt" },
    { id: "raise_houses", prompt: "Raising houses above flood level", correctBinId: "adapt" },
    { id: "crop_choice", prompt: "Planting crops that match the climate", correctBinId: "adapt" },
    { id: "seasonal_clothing", prompt: "Changing clothing with the seasons", correctBinId: "adapt" },
    { id: "nomadic_herding", prompt: "Moving herds with seasonal rains", correctBinId: "adapt" },
    { id: "use_local_stone", prompt: "Building with local stone and wood", correctBinId: "adapt" },
    { id: "fish_migration", prompt: "Timing fishing with fish migrations", correctBinId: "adapt" },
    { id: "shade_structures", prompt: "Adding shade for desert heat", correctBinId: "adapt" },
    { id: "store_winter_food", prompt: "Storing food for long winters", correctBinId: "adapt" },
    { id: "boat_travel", prompt: "Traveling by boat where roads are few", correctBinId: "adapt" },
    { id: "windmill_pump", prompt: "Using windmills to pump groundwater", correctBinId: "adapt" },
    { id: "diet_local", prompt: "Relying on foods native to the region", correctBinId: "adapt" },
    { id: "hydroelectric", prompt: "Building a hydroelectric dam", correctBinId: "modify" },
    { id: "canal_system", prompt: "Digging a canal system", correctBinId: "modify" },
    { id: "cut_highways", prompt: "Cutting highways through hills", correctBinId: "modify" },
    { id: "drain_marshes", prompt: "Draining marshes for suburbs", correctBinId: "modify" },
    { id: "levees_flood", prompt: "Building levees to stop floods", correctBinId: "modify" },
    { id: "mine_mountains", prompt: "Mining and reshaping mountainsides", correctBinId: "modify" },
    { id: "fill_bay", prompt: "Filling part of a bay for land", correctBinId: "modify" },
    { id: "cloud_seed", prompt: "Cloud seeding to make rain", correctBinId: "modify" },
    { id: "straighten_river", prompt: "Straightening a winding river", correctBinId: "modify" },
    { id: "greenhouse_farms", prompt: "Building greenhouses that control climate", correctBinId: "modify" },
    { id: "quarry", prompt: "Opening a rock quarry", correctBinId: "modify" },
    { id: "urban_sprawl_clear", prompt: "Clearing woods for a new suburb", correctBinId: "modify" }
  ],
};
