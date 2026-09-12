/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Geography (TEKS 3.4C)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Geography.map-elements",
  standard: "SS.3.FR.Geography",
  teks: "3.4C",
  title: "Which Map Element?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "title", label: "Title" },
    { id: "compass_rose", label: "Compass Rose" },
    { id: "legend", label: "Legend" },
    { id: "scale", label: "Scale" },
    { id: "grid", label: "Grid" }
  ],

  rule:
    "Identify which map element is described: title, compass rose, legend, scale, or grid.",

  items: [
    { id: "map_name", prompt: "Words that name what the map shows", correctBinId: "title" },
    { id: "texas_cities_title", prompt: "Major Cities of Texas at the top", correctBinId: "title" },
    { id: "topic_heading", prompt: "The heading that tells the map topic", correctBinId: "title" },
    { id: "parks_title", prompt: "National Parks of the U.S.", correctBinId: "title" },
    { id: "north_arrow", prompt: "A symbol showing which way is north", correctBinId: "compass_rose" },
    { id: "cardinal_directions", prompt: "N, S, E, W marked on a star", correctBinId: "compass_rose" },
    { id: "find_west", prompt: "Helps you find west on the map", correctBinId: "compass_rose" },
    { id: "orient_map", prompt: "Shows directions so you can orient the map", correctBinId: "compass_rose" },
    { id: "key_symbols", prompt: "A key that explains map symbols", correctBinId: "legend" },
    { id: "tree_means_forest", prompt: "A tree icon means forest", correctBinId: "legend" },
    { id: "color_meaning", prompt: "Blue lines mean rivers (explained in a box)", correctBinId: "legend" },
    { id: "dot_city", prompt: "A box saying a black dot means a city", correctBinId: "legend" },
    { id: "star_capital", prompt: "A star means capital city (in the key)", correctBinId: "legend" },
    { id: "inch_miles", prompt: "One inch equals 50 miles", correctBinId: "scale" },
    { id: "distance_bar", prompt: "A bar that measures real distance", correctBinId: "scale" },
    { id: "how_far", prompt: "Helps you tell how far two towns are", correctBinId: "scale" },
    { id: "cm_km", prompt: "1 cm on the map = 10 km on Earth", correctBinId: "scale" },
    { id: "letter_number", prompt: "Letters and numbers that form squares", correctBinId: "grid" },
    { id: "find_b3", prompt: "Find the museum in square B3", correctBinId: "grid" },
    { id: "coordinate_lines", prompt: "Lines that make a coordinate system", correctBinId: "grid" },
    { id: "locate_cell", prompt: "Helps you locate a place by cell", correctBinId: "grid" },
    { id: "rows_columns", prompt: "Rows and columns across the map", correctBinId: "grid" },
    { id: "a1_corner", prompt: "The park is in A1", correctBinId: "grid" }
  ],
};
