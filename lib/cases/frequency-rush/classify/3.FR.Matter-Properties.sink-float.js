/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 3.FR.Matter-Properties (TEKS 3.6A - sink/float)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Matter-Properties.sink-float",
  standard: "3.FR.Matter-Properties",
  teks: "3.6A",
  title: "Sink or Float?",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "sink", label: "Sink" },
    { id: "float", label: "Float" },
  ],

  rule:
    "Objects that sink go under the water. Objects that float stay on top of the water.",

  items: [
    { id: "rock", prompt: "A rock", correctBinId: "sink" },
    { id: "metal_spoon", prompt: "A metal spoon", correctBinId: "sink" },
    { id: "penny", prompt: "A penny", correctBinId: "sink" },
    { id: "marble", prompt: "A glass marble", correctBinId: "sink" },
    { id: "key", prompt: "A metal key", correctBinId: "sink" },
    { id: "steel_nail", prompt: "A steel nail", correctBinId: "sink" },
    { id: "ceramic_mug", prompt: "A ceramic mug (full of water)", correctBinId: "sink" },
    { id: "apple_seed", prompt: "An apple seed", correctBinId: "sink" },
    { id: "paperclip_metal", prompt: "A metal paperclip", correctBinId: "sink" },
    { id: "bolt", prompt: "A metal bolt", correctBinId: "sink" },
    { id: "clay_ball", prompt: "A solid clay ball", correctBinId: "sink" },
    { id: "eraser", prompt: "A rubber eraser", correctBinId: "sink" },

    { id: "cork", prompt: "A cork", correctBinId: "float" },
    { id: "wooden_block", prompt: "A wooden block", correctBinId: "float" },
    { id: "plastic_bottle_empty", prompt: "An empty plastic bottle", correctBinId: "float" },
    { id: "foam_ball", prompt: "A foam ball", correctBinId: "float" },
    { id: "leaf", prompt: "A dry leaf", correctBinId: "float" },
    { id: "ping_pong", prompt: "A ping-pong ball", correctBinId: "float" },
    { id: "ice_cube", prompt: "An ice cube", correctBinId: "float" },
    { id: "apple", prompt: "A whole apple", correctBinId: "float" },
    { id: "sponge_dry", prompt: "A dry kitchen sponge", correctBinId: "float" },
    { id: "crayon", prompt: "A crayon", correctBinId: "float" },
    { id: "feather", prompt: "A feather", correctBinId: "float" },
    { id: "plastic_cup_empty", prompt: "An empty plastic cup", correctBinId: "float" },
  ],
};