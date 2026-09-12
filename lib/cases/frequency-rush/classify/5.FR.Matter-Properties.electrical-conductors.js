/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-Properties (TEKS 5.6A - electrical conductors/insulators)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-Properties.electrical-conductors",
  standard: "5.FR.Matter-Properties",
  teks: "5.6A",
  title: "Electrical Conductor or Insulator?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "electrical_conductor", label: "Electrical Conductor" },
    { id: "electrical_insulator", label: "Electrical Insulator" },
  ],

  rule:
    "Electrical conductors allow electric current to flow. Electrical insulators resist or block current.",

  items: [
    { id: "copper_wire", prompt: "Bare copper wire", correctBinId: "electrical_conductor" },
    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "electrical_conductor" },
    { id: "steel_nail", prompt: "A steel nail", correctBinId: "electrical_conductor" },
    { id: "brass_key", prompt: "A brass key", correctBinId: "electrical_conductor" },
    { id: "iron_paperclip", prompt: "An iron paperclip", correctBinId: "electrical_conductor" },
    { id: "graphite", prompt: "Pencil graphite", correctBinId: "electrical_conductor" },
    { id: "silver_coin", prompt: "A silver coin", correctBinId: "electrical_conductor" },
    { id: "metal_spoon", prompt: "A metal spoon", correctBinId: "electrical_conductor" },
    { id: "steel_washer", prompt: "A steel washer", correctBinId: "electrical_conductor" },
    { id: "copper_penny", prompt: "A copper penny", correctBinId: "electrical_conductor" },
    { id: "aluminum_can", prompt: "An aluminum can", correctBinId: "electrical_conductor" },
    { id: "metal_screw", prompt: "A metal screw", correctBinId: "electrical_conductor" },

    { id: "rubber", prompt: "A rubber band", correctBinId: "electrical_insulator" },
    { id: "plastic", prompt: "A plastic ruler", correctBinId: "electrical_insulator" },
    { id: "wood", prompt: "A dry wooden stick", correctBinId: "electrical_insulator" },
    { id: "glass", prompt: "A glass rod", correctBinId: "electrical_insulator" },
    { id: "plastic_coating", prompt: "Plastic wire coating", correctBinId: "electrical_insulator" },
    { id: "eraser", prompt: "A rubber eraser", correctBinId: "electrical_insulator" },
    { id: "paper_dry", prompt: "Dry paper", correctBinId: "electrical_insulator" },
    { id: "cotton", prompt: "Dry cotton cloth", correctBinId: "electrical_insulator" },
    { id: "styrofoam", prompt: "Styrofoam", correctBinId: "electrical_insulator" },
    { id: "ceramic", prompt: "Ceramic insulator", correctBinId: "electrical_insulator" },
    { id: "wax", prompt: "Candle wax", correctBinId: "electrical_insulator" },
    { id: "plastic_comb", prompt: "A plastic comb", correctBinId: "electrical_insulator" },
  ],
};