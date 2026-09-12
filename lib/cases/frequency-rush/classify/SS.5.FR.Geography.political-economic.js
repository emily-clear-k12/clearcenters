/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Geography (TEKS 5.6A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Geography.political-economic",
  standard: "SS.5.FR.Geography",
  teks: "5.6A",
  title: "Political or Economic Region?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "political_region", label: "Political Region" },
    { id: "economic_region", label: "Economic Region" }
  ],

  rule:
    "Political regions are defined by governments and borders. Economic regions are defined by how people earn a living or trade.",

  items: [
    { id: "state_of_texas", prompt: "The state of Texas", correctBinId: "political_region" },
    { id: "united_states", prompt: "The United States", correctBinId: "political_region" },
    { id: "city_limits", prompt: "Austin city limits", correctBinId: "political_region" },
    { id: "county_line", prompt: "Harris County", correctBinId: "political_region" },
    { id: "school_district", prompt: "A public school district", correctBinId: "political_region" },
    { id: "congressional_district", prompt: "A congressional district", correctBinId: "political_region" },
    { id: "nation_border", prompt: "A country with fixed borders", correctBinId: "political_region" },
    { id: "capitol_laws", prompt: "An area ruled by one set of laws", correctBinId: "political_region" },
    { id: "voting_precinct", prompt: "A voting precinct", correctBinId: "political_region" },
    { id: "province", prompt: "A Canadian province", correctBinId: "political_region" },
    { id: "municipal_zone", prompt: "A municipal zoning area", correctBinId: "political_region" },
    { id: "territory", prompt: "A U.S. territory with a government", correctBinId: "political_region" },
    { id: "corn_belt", prompt: "The Corn Belt", correctBinId: "economic_region" },
    { id: "silicon_valley", prompt: "Silicon Valley tech area", correctBinId: "economic_region" },
    { id: "rust_belt", prompt: "The Rust Belt manufacturing area", correctBinId: "economic_region" },
    { id: "oil_patch", prompt: "An oil-producing oil patch", correctBinId: "economic_region" },
    { id: "wheat_belt", prompt: "The Wheat Belt", correctBinId: "economic_region" },
    { id: "trade_corridor", prompt: "A major trade corridor", correctBinId: "economic_region" },
    { id: "cattle_country", prompt: "Cattle country ranching region", correctBinId: "economic_region" },
    { id: "textile_mills", prompt: "A region known for textile mills", correctBinId: "economic_region" },
    { id: "fishing_grounds", prompt: "Coastal fishing grounds economy", correctBinId: "economic_region" },
    { id: "tourist_coast", prompt: "A beach tourism economy zone", correctBinId: "economic_region" },
    { id: "mining_district", prompt: "A mining district", correctBinId: "economic_region" },
    { id: "farm_belt", prompt: "A farming belt defined by crops", correctBinId: "economic_region" }
  ],
};
