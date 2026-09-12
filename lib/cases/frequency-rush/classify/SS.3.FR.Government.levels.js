/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Government (TEKS 3.7A)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Government.levels",
  standard: "SS.3.FR.Government",
  teks: "3.7A",
  title: "Local, State, or National?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "local", label: "Local" },
    { id: "state", label: "State" },
    { id: "national", label: "National" }
  ],

  rule:
    "Local government serves a city or county. State government serves all of Texas. National (federal) government serves the whole United States.",

  items: [
    { id: "city_mayor", prompt: "A city mayor", correctBinId: "local" },
    { id: "city_council", prompt: "A city council meeting", correctBinId: "local" },
    { id: "county_sheriff", prompt: "A county sheriff", correctBinId: "local" },
    { id: "city_park_rules", prompt: "Rules for the city park", correctBinId: "local" },
    { id: "town_library_board", prompt: "A town library board", correctBinId: "local" },
    { id: "local_judge", prompt: "A municipal court judge", correctBinId: "local" },
    { id: "trash_pickup_city", prompt: "City trash pickup schedule", correctBinId: "local" },
    { id: "school_board", prompt: "A local school board", correctBinId: "local" },
    { id: "tx_governor", prompt: "The Texas governor", correctBinId: "state" },
    { id: "tx_legislature", prompt: "The Texas Legislature", correctBinId: "state" },
    { id: "tx_highway", prompt: "Texas highway speed limits", correctBinId: "state" },
    { id: "tx_driver_license", prompt: "Texas driver licenses", correctBinId: "state" },
    { id: "tx_capitol", prompt: "Laws made in Austin", correctBinId: "state" },
    { id: "tx_state_park", prompt: "Texas state parks", correctBinId: "state" },
    { id: "tx_attorney_gen", prompt: "The Texas attorney general", correctBinId: "state" },
    { id: "tx_courts", prompt: "Texas state courts", correctBinId: "state" },
    { id: "us_president", prompt: "The U.S. President", correctBinId: "national" },
    { id: "congress", prompt: "The U.S. Congress", correctBinId: "national" },
    { id: "supreme_court", prompt: "The U.S. Supreme Court", correctBinId: "national" },
    { id: "military", prompt: "The U.S. military", correctBinId: "national" },
    { id: "postage_stamps", prompt: "U.S. postage stamps", correctBinId: "national" },
    { id: "passport", prompt: "U.S. passports", correctBinId: "national" },
    { id: "federal_taxes", prompt: "Federal income taxes", correctBinId: "national" },
    { id: "national_parks", prompt: "National parks like Yellowstone", correctBinId: "national" }
  ],
};
