/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-Properties (TEKS 5.6A - magnetic properties)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-Properties.magnetic",
  standard: "5.FR.Matter-Properties",
  teks: "5.6A",
  title: "Magnetic or Not Magnetic?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "magnetic", label: "Magnetic" },
    { id: "not_magnetic", label: "Not Magnetic" },
  ],

  rule:
    "Magnetic materials (iron, nickel, cobalt, and many steels) are attracted to a magnet. Other materials are not.",

  items: [
    { id: "iron_nail", prompt: "An iron nail", correctBinId: "magnetic" },
    { id: "steel_paperclip", prompt: "A steel paperclip", correctBinId: "magnetic" },
    { id: "bar_magnet", prompt: "A bar magnet", correctBinId: "magnetic" },
    { id: "steel_screw", prompt: "A steel screw", correctBinId: "magnetic" },
    { id: "iron_filings", prompt: "Iron filings", correctBinId: "magnetic" },
    { id: "steel_can", prompt: "A steel soup can", correctBinId: "magnetic" },
    { id: "nickel_core", prompt: "A nickel-metal object attracted to a magnet", correctBinId: "magnetic" },
    { id: "steel_bolt", prompt: "A steel bolt", correctBinId: "magnetic" },
    { id: "staples", prompt: "Metal staples", correctBinId: "magnetic" },
    { id: "compass", prompt: "A compass needle", correctBinId: "magnetic" },
    { id: "fridge_magnet", prompt: "A fridge magnet", correctBinId: "magnetic" },
    { id: "steel_washer", prompt: "A steel washer", correctBinId: "magnetic" },

    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "not_magnetic" },
    { id: "copper_wire", prompt: "A copper wire", correctBinId: "not_magnetic" },
    { id: "wood_block", prompt: "A wooden block", correctBinId: "not_magnetic" },
    { id: "plastic_bead", prompt: "A plastic bead", correctBinId: "not_magnetic" },
    { id: "glass_slide", prompt: "A glass slide", correctBinId: "not_magnetic" },
    { id: "rubber_band", prompt: "A rubber band", correctBinId: "not_magnetic" },
    { id: "brass_key", prompt: "A brass key", correctBinId: "not_magnetic" },
    { id: "penny", prompt: "A copper-coated penny", correctBinId: "not_magnetic" },
    { id: "paper", prompt: "Notebook paper", correctBinId: "not_magnetic" },
    { id: "cotton", prompt: "A cotton ball", correctBinId: "not_magnetic" },
    { id: "ceramic_tile", prompt: "A ceramic tile", correctBinId: "not_magnetic" },
    { id: "gold_ring", prompt: "A gold-colored costume ring", correctBinId: "not_magnetic" },
  ],
};