/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Energy (TEKS 4.8B - electrical conductors/insulators)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Energy.electrical-conductors",
  standard: "4.FR.Energy",
  teks: "4.8B",
  title: "Electrical Conductor or Insulator?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "electrical_conductor", label: "Electrical Conductor" },
    { id: "electrical_insulator", label: "Electrical Insulator" },
  ],

  rule:
    "Electrical conductors let electric current flow. Electrical insulators block or slow the flow of current.",

  items: [
    { id: "copper_wire", prompt: "A copper wire", correctBinId: "electrical_conductor" },
    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "electrical_conductor" },
    { id: "steel_nail", prompt: "A steel nail", correctBinId: "electrical_conductor" },
    { id: "iron_paperclip", prompt: "An iron paperclip", correctBinId: "electrical_conductor" },
    { id: "brass_key", prompt: "A brass key", correctBinId: "electrical_conductor" },
    { id: "silver_coin", prompt: "A silver coin", correctBinId: "electrical_conductor" },
    { id: "graphite_pencil", prompt: "Pencil graphite (the dark core)", correctBinId: "electrical_conductor" },
    { id: "metal_spoon", prompt: "A metal spoon", correctBinId: "electrical_conductor" },
    { id: "steel_washer", prompt: "A steel washer", correctBinId: "electrical_conductor" },
    { id: "copper_penny", prompt: "A copper penny", correctBinId: "electrical_conductor" },
    { id: "metal_screw", prompt: "A metal screw", correctBinId: "electrical_conductor" },
    { id: "aluminum_can", prompt: "An aluminum can", correctBinId: "electrical_conductor" },

    { id: "rubber_glove", prompt: "A rubber glove", correctBinId: "electrical_insulator" },
    { id: "plastic_ruler", prompt: "A plastic ruler", correctBinId: "electrical_insulator" },
    { id: "wood_block", prompt: "A wooden block", correctBinId: "electrical_insulator" },
    { id: "glass_rod", prompt: "A glass rod", correctBinId: "electrical_insulator" },
    { id: "rubber_eraser", prompt: "A rubber eraser", correctBinId: "electrical_insulator" },
    { id: "plastic_coating", prompt: "Plastic coating on a wire", correctBinId: "electrical_insulator" },
    { id: "paper", prompt: "A dry sheet of paper", correctBinId: "electrical_insulator" },
    { id: "cotton_cloth", prompt: "A dry cotton cloth", correctBinId: "electrical_insulator" },
    { id: "styrofoam", prompt: "A styrofoam cup", correctBinId: "electrical_insulator" },
    { id: "ceramic", prompt: "A ceramic insulator disk", correctBinId: "electrical_insulator" },
    { id: "crayon", prompt: "A wax crayon", correctBinId: "electrical_insulator" },
    { id: "plastic_comb", prompt: "A plastic comb", correctBinId: "electrical_insulator" },
  ],
};