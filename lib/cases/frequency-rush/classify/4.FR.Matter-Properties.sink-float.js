/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Matter-Properties (TEKS 4.6A - sink/float)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Matter-Properties.sink-float",
  standard: "4.FR.Matter-Properties",
  teks: "4.6A",
  title: "Sink or Float?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "sink", label: "Sink" },
    { id: "float", label: "Float" },
  ],

  rule:
    "Objects denser than water sink. Objects less dense than water float.",

  items: [
    { id: "granite", prompt: "A granite rock", correctBinId: "sink" },
    { id: "steel_bolt", prompt: "A steel bolt", correctBinId: "sink" },
    { id: "glass_bead", prompt: "A glass bead", correctBinId: "sink" },
    { id: "brass_key", prompt: "A brass key", correctBinId: "sink" },
    { id: "ceramic_tile", prompt: "A ceramic tile piece", correctBinId: "sink" },
    { id: "full_water_bottle", prompt: "A bottle filled solid with sand", correctBinId: "sink" },
    { id: "dime", prompt: "A dime", correctBinId: "sink" },
    { id: "steel_marble", prompt: "A steel marble", correctBinId: "sink" },
    { id: "clay_sphere", prompt: "A solid clay sphere", correctBinId: "sink" },
    { id: "copper_pipe", prompt: "A short copper pipe", correctBinId: "sink" },
    { id: "scissors", prompt: "Metal scissors", correctBinId: "sink" },
    { id: "battery", prompt: "A AA battery", correctBinId: "sink" },

    { id: "balsa_wood", prompt: "A balsa wood stick", correctBinId: "float" },
    { id: "foam_board", prompt: "A foam board scrap", correctBinId: "float" },
    { id: "empty_can", prompt: "An empty aluminum can", correctBinId: "float" },
    { id: "cork_stopper", prompt: "A cork stopper", correctBinId: "float" },
    { id: "rubber_duck", prompt: "A rubber duck", correctBinId: "float" },
    { id: "ice_cube", prompt: "An ice cube", correctBinId: "float" },
    { id: "orange_whole", prompt: "A whole orange with peel", correctBinId: "float" },
    { id: "pine_cone", prompt: "A closed pine cone", correctBinId: "float" },
    { id: "plastic_lid", prompt: "A plastic bottle lid", correctBinId: "float" },
    { id: "candle_wax", prompt: "A wax candle stub", correctBinId: "float" },
    { id: "pool_noodle", prompt: "A pool noodle piece", correctBinId: "float" },
    { id: "wood_chip", prompt: "A wood chip", correctBinId: "float" },
  ],
};