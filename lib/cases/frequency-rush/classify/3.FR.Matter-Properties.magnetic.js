/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 3.FR.Matter-Properties (TEKS 3.6A - magnetic properties)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Matter-Properties.magnetic",
  standard: "3.FR.Matter-Properties",
  teks: "3.6A",
  title: "Magnetic or Not Magnetic?",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "magnetic", label: "Magnetic" },
    { id: "not_magnetic", label: "Not Magnetic" },
  ],

  rule:
    "Magnetic materials are attracted to a magnet. Not magnetic materials are not attracted to a magnet.",

  items: [
    { id: "fridge_magnet", prompt: "A fridge magnet", correctBinId: "magnetic" },
    { id: "iron_nail", prompt: "An iron nail", correctBinId: "magnetic" },
    { id: "paperclip", prompt: "A steel paperclip", correctBinId: "magnetic" },
    { id: "screw", prompt: "A steel screw", correctBinId: "magnetic" },
    { id: "staple", prompt: "A metal staple", correctBinId: "magnetic" },
    { id: "steel_washer", prompt: "A steel washer", correctBinId: "magnetic" },
    { id: "iron_filing", prompt: "Iron filings", correctBinId: "magnetic" },
    { id: "steel_bolt", prompt: "A steel bolt", correctBinId: "magnetic" },
    { id: "safety_pin", prompt: "A steel safety pin", correctBinId: "magnetic" },
    { id: "nickel_coin_old", prompt: "A steel can lid", correctBinId: "magnetic" },
    { id: "scissors_blade", prompt: "Steel scissors blades", correctBinId: "magnetic" },
    { id: "magnet_bar", prompt: "A bar magnet", correctBinId: "magnetic" },

    { id: "wood_block", prompt: "A wooden block", correctBinId: "not_magnetic" },
    { id: "plastic_spoon", prompt: "A plastic spoon", correctBinId: "not_magnetic" },
    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "not_magnetic" },
    { id: "copper_penny", prompt: "A copper penny", correctBinId: "not_magnetic" },
    { id: "rubber_band", prompt: "A rubber band", correctBinId: "not_magnetic" },
    { id: "glass_marble", prompt: "A glass marble", correctBinId: "not_magnetic" },
    { id: "paper", prompt: "A sheet of paper", correctBinId: "not_magnetic" },
    { id: "crayon", prompt: "A crayon", correctBinId: "not_magnetic" },
    { id: "cotton_ball", prompt: "A cotton ball", correctBinId: "not_magnetic" },
    { id: "plastic_bottle", prompt: "A plastic bottle", correctBinId: "not_magnetic" },
    { id: "eraser", prompt: "A rubber eraser", correctBinId: "not_magnetic" },
    { id: "brass_key", prompt: "A brass key", correctBinId: "not_magnetic" },
  ],
};