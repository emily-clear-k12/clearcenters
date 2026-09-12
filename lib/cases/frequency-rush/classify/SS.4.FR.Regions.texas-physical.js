/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.Regions (TEKS 4.6A)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.Regions.texas-physical",
  standard: "SS.4.FR.Regions",
  teks: "4.6A",
  title: "Which Texas Region?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "mountains_and_basins", label: "Mountains and Basins" },
    { id: "great_plains", label: "Great Plains" },
    { id: "north_central_plains", label: "North Central Plains" },
    { id: "coastal_plains", label: "Coastal Plains" }
  ],

  rule:
    "Sort each landform, climate, or economy example into the correct Texas physical region.",

  items: [
    { id: "el_paso_dry", prompt: "Dry desert near El Paso", correctBinId: "mountains_and_basins" },
    { id: "guadalupe_peak", prompt: "Guadalupe Peak, highest in Texas", correctBinId: "mountains_and_basins" },
    { id: "big_bend", prompt: "Big Bend National Park", correctBinId: "mountains_and_basins" },
    { id: "irrigation_west", prompt: "Irrigation farming in the far west", correctBinId: "mountains_and_basins" },
    { id: "rio_grande_west", prompt: "Basins along the Rio Grande west", correctBinId: "mountains_and_basins" },
    { id: "sparse_pop_west", prompt: "Sparse population and rocky deserts", correctBinId: "mountains_and_basins" },
    { id: "panhandle_flat", prompt: "Flat High Plains of the Panhandle", correctBinId: "great_plains" },
    { id: "lubbock_cotton", prompt: "Cotton fields near Lubbock", correctBinId: "great_plains" },
    { id: "amarillo_cattle", prompt: "Cattle ranches near Amarillo", correctBinId: "great_plains" },
    { id: "llano_estacado", prompt: "The Llano Estacado (Staked Plains)", correctBinId: "great_plains" },
    { id: "wind_farms_panhandle", prompt: "Wind farms on open plains", correctBinId: "great_plains" },
    { id: "caprock", prompt: "Caprock Escarpment cliffs", correctBinId: "great_plains" },
    { id: "fort_worth", prompt: "Fort Worth and rolling prairies", correctBinId: "north_central_plains" },
    { id: "cross_timbers", prompt: "Cross Timbers woodlands", correctBinId: "north_central_plains" },
    { id: "dallas_area", prompt: "Dallas area prairie cities", correctBinId: "north_central_plains" },
    { id: "cattle_drives_hist", prompt: "Historic cattle drive country", correctBinId: "north_central_plains" },
    { id: "rolling_hills", prompt: "Rolling hills and grasslands", correctBinId: "north_central_plains" },
    { id: "wichita_falls", prompt: "Wichita Falls region", correctBinId: "north_central_plains" },
    { id: "houston_humid", prompt: "Humid climate near Houston", correctBinId: "coastal_plains" },
    { id: "galveston", prompt: "Galveston and the Gulf shore", correctBinId: "coastal_plains" },
    { id: "piney_woods", prompt: "Piney Woods forests of East Texas", correctBinId: "coastal_plains" },
    { id: "oil_refineries", prompt: "Oil refineries along the coast", correctBinId: "coastal_plains" },
    { id: "rice_farms", prompt: "Rice farms near the Gulf", correctBinId: "coastal_plains" },
    { id: "port_of_houston", prompt: "Busy Port of Houston", correctBinId: "coastal_plains" }
  ],
};
