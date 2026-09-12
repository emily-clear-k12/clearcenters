/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Earth-Processes (TEKS 5.10C - weathering, erosion, deposition)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Earth-Processes.weathering-erosion-deposition",
  standard: "5.FR.Earth-Processes",
  teks: "5.10C",
  title: "Weathering, Erosion, or Deposition?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "weathering", label: "Weathering" },
    { id: "erosion", label: "Erosion" },
    { id: "deposition", label: "Deposition" },
  ],

  rule:
    "Weathering breaks rock into smaller pieces. Erosion moves those pieces. Deposition drops and piles them in a new place.",

  items: [
    { id: "freeze_thaw", prompt: "Ice cracking a sidewalk crack wider", correctBinId: "weathering" },
    { id: "plant_roots", prompt: "Tree roots splitting a boulder", correctBinId: "weathering" },
    { id: "acid_rain_statue", prompt: "Acid rain wearing down a stone statue", correctBinId: "weathering" },
    { id: "rust_rock", prompt: "Iron-rich rock crumbling from rust", correctBinId: "weathering" },
    { id: "wind_abrasion", prompt: "Wind-blown sand scratching a rock face", correctBinId: "weathering" },
    { id: "exfoliation", prompt: "Layers peeling off a granite dome", correctBinId: "weathering" },
    { id: "animal_burrow", prompt: "Animals digging that crack soil and rock", correctBinId: "weathering" },
    { id: "wave_pounding", prompt: "Waves pounding and breaking cliff rock", correctBinId: "weathering" },

    { id: "river_sediment", prompt: "A river carrying muddy sediment downstream", correctBinId: "erosion" },
    { id: "wind_dunes_move", prompt: "Wind moving sand across a desert", correctBinId: "erosion" },
    { id: "glacier_scrape", prompt: "A glacier scraping and carrying rock", correctBinId: "erosion" },
    { id: "landslide", prompt: "A landslide sliding soil downhill", correctBinId: "erosion" },
    { id: "gully_rain", prompt: "Heavy rain washing soil from a hillside", correctBinId: "erosion" },
    { id: "wave_beach_remove", prompt: "Storm waves removing beach sand", correctBinId: "erosion" },
    { id: "stream_pebbles", prompt: "A stream tumbling pebbles along its bed", correctBinId: "erosion" },
    { id: "dust_storm", prompt: "A dust storm blowing topsoil away", correctBinId: "erosion" },

    { id: "delta_build", prompt: "Sediment building a river delta", correctBinId: "deposition" },
    { id: "sand_dune_pile", prompt: "Sand piling into a dune", correctBinId: "deposition" },
    { id: "floodplain", prompt: "A flood leaving mud on a floodplain", correctBinId: "deposition" },
    { id: "glacier_moraine", prompt: "A glacier dropping rocks in a moraine", correctBinId: "deposition" },
    { id: "beach_build", prompt: "Waves dropping sand to build a beach", correctBinId: "deposition" },
    { id: "sandbar", prompt: "A sandbar forming in a river bend", correctBinId: "deposition" },
    { id: "alluvial_fan", prompt: "An alluvial fan at a canyon mouth", correctBinId: "deposition" },
    { id: "silt_pond", prompt: "Silt settling at the bottom of a pond", correctBinId: "deposition" },
  ],
};