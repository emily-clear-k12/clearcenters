/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Matter-Properties (TEKS 4.6A - magnetic properties)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Matter-Properties.magnetic",
  standard: "4.FR.Matter-Properties",
  teks: "4.6A",
  title: "Magnetic or Not Magnetic?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "magnetic", label: "Magnetic" },
    { id: "not_magnetic", label: "Not Magnetic" },
  ],

  rule:
    "Materials that contain iron, nickel, or cobalt are attracted to magnets. Other materials are not.",

  items: [
    { id: "iron_nail", prompt: "An iron nail", correctBinId: "magnetic" },
    { id: "steel_paperclip", prompt: "A steel paperclip", correctBinId: "magnetic" },
    { id: "fridge_magnet", prompt: "A fridge magnet", correctBinId: "magnetic" },
    { id: "steel_screw", prompt: "A steel screw", correctBinId: "magnetic" },
    { id: "iron_filing", prompt: "Iron filings", correctBinId: "magnetic" },
    { id: "steel_can", prompt: "A steel food can", correctBinId: "magnetic" },
    { id: "horseshoe_magnet", prompt: "A horseshoe magnet", correctBinId: "magnetic" },
    { id: "steel_washer", prompt: "A steel washer", correctBinId: "magnetic" },
    { id: "staples", prompt: "Office staples", correctBinId: "magnetic" },
    { id: "bolt_nut", prompt: "A steel nut and bolt", correctBinId: "magnetic" },
    { id: "compass_needle", prompt: "A compass needle", correctBinId: "magnetic" },
    { id: "steel_ruler", prompt: "A steel ruler", correctBinId: "magnetic" },

    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "not_magnetic" },
    { id: "wood_ruler", prompt: "A wooden ruler", correctBinId: "not_magnetic" },
    { id: "plastic_comb", prompt: "A plastic comb", correctBinId: "not_magnetic" },
    { id: "copper_wire", prompt: "A copper wire", correctBinId: "not_magnetic" },
    { id: "glass_beaker", prompt: "A glass beaker", correctBinId: "not_magnetic" },
    { id: "rubber_eraser", prompt: "A rubber eraser", correctBinId: "not_magnetic" },
    { id: "penny", prompt: "A copper penny", correctBinId: "not_magnetic" },
    { id: "paper_clip_plastic", prompt: "A plastic paperclip", correctBinId: "not_magnetic" },
    { id: "cardboard", prompt: "A cardboard square", correctBinId: "not_magnetic" },
    { id: "cotton_cloth", prompt: "A cotton cloth", correctBinId: "not_magnetic" },
    { id: "brass_button", prompt: "A brass button", correctBinId: "not_magnetic" },
    { id: "ceramic_mug", prompt: "A ceramic mug", correctBinId: "not_magnetic" },
  ],
};