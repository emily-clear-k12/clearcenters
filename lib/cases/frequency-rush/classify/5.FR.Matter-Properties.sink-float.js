/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-Properties (TEKS 5.6A - sink/float)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-Properties.sink-float",
  standard: "5.FR.Matter-Properties",
  teks: "5.6A",
  title: "Sink or Float?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "sink", label: "Sink" },
    { id: "float", label: "Float" },
  ],

  rule:
    "An object sinks if its density is greater than water. It floats if its density is less than water.",

  items: [
    { id: "lead_weight", prompt: "A lead fishing weight", correctBinId: "sink" },
    { id: "quartz", prompt: "A quartz crystal", correctBinId: "sink" },
    { id: "steel_ball", prompt: "A solid steel ball", correctBinId: "sink" },
    { id: "glass_marble", prompt: "A glass marble", correctBinId: "sink" },
    { id: "copper_pipe", prompt: "A copper pipe fitting", correctBinId: "sink" },
    { id: "brick_chip", prompt: "A brick chip", correctBinId: "sink" },
    { id: "dimes", prompt: "A stack of dimes", correctBinId: "sink" },
    { id: "ceramic_bead", prompt: "A ceramic bead", correctBinId: "sink" },
    { id: "iron_nail", prompt: "An iron nail", correctBinId: "sink" },
    { id: "full_clay", prompt: "A solid clay disk", correctBinId: "sink" },
    { id: "battery_d", prompt: "A D-cell battery", correctBinId: "sink" },
    { id: "pebble", prompt: "A river pebble", correctBinId: "sink" },

    { id: "cork", prompt: "A cork", correctBinId: "float" },
    { id: "foam_block", prompt: "A foam block", correctBinId: "float" },
    { id: "wood_plank", prompt: "A wooden plank scrap", correctBinId: "float" },
    { id: "ice", prompt: "An ice cube", correctBinId: "float" },
    { id: "empty_bottle", prompt: "An empty sealed bottle", correctBinId: "float" },
    { id: "wax_candle", prompt: "A wax candle", correctBinId: "float" },
    { id: "apple", prompt: "A whole apple", correctBinId: "float" },
    { id: "pool_float", prompt: "A pool float scrap", correctBinId: "float" },
    { id: "dry_sponge", prompt: "A dry kitchen sponge", correctBinId: "float" },
    { id: "plastic_bead", prompt: "A hollow plastic bead", correctBinId: "float" },
    { id: "pine_wood", prompt: "A pine wood chip", correctBinId: "float" },
    { id: "oil_drop", prompt: "A drop of cooking oil", correctBinId: "float" },
  ],
};