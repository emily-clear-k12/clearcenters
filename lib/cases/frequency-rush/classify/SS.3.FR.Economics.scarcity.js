/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Economics (TEKS 3.6B)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Economics.scarcity",
  standard: "SS.3.FR.Economics",
  teks: "3.6B",
  title: "Scarce or Not Scarce?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "scarcity", label: "Scarce" },
    { id: "not_scarcity", label: "Not Scarce" }
  ],

  rule:
    "Scarce means there is not enough for everyone who wants it. Not scarce means there is plenty available.",

  items: [
    { id: "one_swing", prompt: "Only one swing for many kids", correctBinId: "scarcity" },
    { id: "last_cookie", prompt: "The last cookie in the jar", correctBinId: "scarcity" },
    { id: "drought_water", prompt: "Water during a long drought", correctBinId: "scarcity" },
    { id: "sold_out_toy", prompt: "A sold-out holiday toy", correctBinId: "scarcity" },
    { id: "one_ball", prompt: "One soccer ball for the whole class", correctBinId: "scarcity" },
    { id: "limited_tickets", prompt: "Limited tickets to a popular show", correctBinId: "scarcity" },
    { id: "desert_shade", prompt: "Shade trees in a hot desert town", correctBinId: "scarcity" },
    { id: "time_recess", prompt: "Not enough time to finish every game", correctBinId: "scarcity" },
    { id: "rare_card", prompt: "A rare trading card everyone wants", correctBinId: "scarcity" },
    { id: "parking_spots", prompt: "Few parking spots at a big event", correctBinId: "scarcity" },
    { id: "library_bestseller", prompt: "One library copy of a bestseller", correctBinId: "scarcity" },
    { id: "bandage_kit", prompt: "Only two bandages left in the kit", correctBinId: "scarcity" },
    { id: "air_breathe", prompt: "Air to breathe outside", correctBinId: "not_scarcity" },
    { id: "sand_beach", prompt: "Sand on a wide beach", correctBinId: "not_scarcity" },
    { id: "leaves_fall", prompt: "Fallen leaves in autumn", correctBinId: "not_scarcity" },
    { id: "many_pencils", prompt: "A full box of classroom pencils", correctBinId: "not_scarcity" },
    { id: "ocean_water", prompt: "Ocean water at the shore", correctBinId: "not_scarcity" },
    { id: "sunlight_day", prompt: "Sunlight on a clear day", correctBinId: "not_scarcity" },
    { id: "rocks_field", prompt: "Rocks in a rocky field", correctBinId: "not_scarcity" },
    { id: "extra_crayons", prompt: "Extra crayons in the art closet", correctBinId: "not_scarcity" },
    { id: "grass_lawn", prompt: "Grass on a large school lawn", correctBinId: "not_scarcity" },
    { id: "stars_night", prompt: "Stars visible on a clear night", correctBinId: "not_scarcity" },
    { id: "paper_clips", prompt: "A big jar of paper clips", correctBinId: "not_scarcity" },
    { id: "raindrops_storm", prompt: "Raindrops during a heavy storm", correctBinId: "not_scarcity" }
  ],
};
