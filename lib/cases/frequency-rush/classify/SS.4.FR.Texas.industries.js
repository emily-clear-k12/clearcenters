/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.Texas-Industries (TEKS 4.4B/C, 4.5B)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.Texas.industries",
  standard: "SS.4.FR.Texas-Industries",
  teks: "4.4B/C, 4.5B",
  title: "Cattle, Railroad, or Oil?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "cattle", label: "Cattle" },
    { id: "railroad", label: "Railroad" },
    { id: "oil", label: "Oil" }
  ],

  rule:
    "Sort each late 1800s-early 1900s Texas industry example into cattle, railroad, or oil.",

  items: [
    { id: "longhorn_drive", prompt: "Driving longhorns up the Chisholm Trail", correctBinId: "cattle" },
    { id: "cowboy_brand", prompt: "Branding calves on a ranch", correctBinId: "cattle" },
    { id: "barbed_wire", prompt: "Using barbed wire to fence ranges", correctBinId: "cattle" },
    { id: "cattle_boom", prompt: "The post-Civil War cattle boom", correctBinId: "cattle" },
    { id: "stockyards", prompt: "Shipping steers to Fort Worth stockyards", correctBinId: "cattle" },
    { id: "trail_boss", prompt: "A trail boss leading a herd north", correctBinId: "cattle" },
    { id: "ranch_empire", prompt: "Building a large ranch empire", correctBinId: "cattle" },
    { id: "roundup", prompt: "A spring cattle roundup", correctBinId: "cattle" },
    { id: "track_laying", prompt: "Laying tracks across Texas", correctBinId: "railroad" },
    { id: "town_boom_rail", prompt: "Towns booming along new rail lines", correctBinId: "railroad" },
    { id: "freight_cars", prompt: "Moving cotton on freight cars", correctBinId: "railroad" },
    { id: "passenger_train", prompt: "Riding a passenger train to Dallas", correctBinId: "railroad" },
    { id: "rail_land_grants", prompt: "Land grants to railroad companies", correctBinId: "railroad" },
    { id: "connect_markets", prompt: "Connecting farms to distant markets", correctBinId: "railroad" },
    { id: "depot", prompt: "Building a busy train depot", correctBinId: "railroad" },
    { id: "time_zones_rail", prompt: "Rail schedules linking Texas cities", correctBinId: "railroad" },
    { id: "spindletop", prompt: "The Spindletop gusher in 1901", correctBinId: "oil" },
    { id: "boomtown", prompt: "Oil boomtowns springing up overnight", correctBinId: "oil" },
    { id: "derricks", prompt: "Wooden derricks covering a field", correctBinId: "oil" },
    { id: "refinery", prompt: "Building an early oil refinery", correctBinId: "oil" },
    { id: "wildcatter", prompt: "A wildcatter drilling a new well", correctBinId: "oil" },
    { id: "petroleum_jobs", prompt: "New petroleum industry jobs", correctBinId: "oil" },
    { id: "black_gold", prompt: "Calling crude oil black gold", correctBinId: "oil" },
    { id: "pipeline", prompt: "Laying pipelines to move crude", correctBinId: "oil" }
  ],
};
