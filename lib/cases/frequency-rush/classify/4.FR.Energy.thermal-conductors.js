/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 4.FR.Energy (TEKS 4.8B - thermal conductors/insulators)
 * Grade 4 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "4.FR.Energy.thermal-conductors",
  standard: "4.FR.Energy",
  teks: "4.8B",
  title: "Thermal Conductor or Insulator?",
  grade: 4,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "thermal_conductor", label: "Thermal Conductor" },
    { id: "thermal_insulator", label: "Thermal Insulator" },
  ],

  rule:
    "Thermal conductors let heat pass through easily. Thermal insulators slow or block heat transfer.",

  items: [
    { id: "metal_spoon", prompt: "A metal spoon in hot soup", correctBinId: "thermal_conductor" },
    { id: "aluminum_pan", prompt: "An aluminum frying pan", correctBinId: "thermal_conductor" },
    { id: "copper_pot", prompt: "A copper cooking pot", correctBinId: "thermal_conductor" },
    { id: "iron_skillet", prompt: "An iron skillet", correctBinId: "thermal_conductor" },
    { id: "steel_mug", prompt: "A bare steel mug", correctBinId: "thermal_conductor" },
    { id: "metal_baking_sheet", prompt: "A metal baking sheet", correctBinId: "thermal_conductor" },
    { id: "brass_doorknob", prompt: "A brass doorknob on a hot day", correctBinId: "thermal_conductor" },
    { id: "silver_fork", prompt: "A silver fork", correctBinId: "thermal_conductor" },
    { id: "metal_thermometer", prompt: "A metal cooking thermometer probe", correctBinId: "thermal_conductor" },
    { id: "steel_nail", prompt: "A steel nail held in a flame tip (demo)", correctBinId: "thermal_conductor" },
    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "thermal_conductor" },
    { id: "copper_wire", prompt: "A copper wire", correctBinId: "thermal_conductor" },

    { id: "foam_cup", prompt: "A foam cup for hot cocoa", correctBinId: "thermal_insulator" },
    { id: "oven_mitt", prompt: "An oven mitt", correctBinId: "thermal_insulator" },
    { id: "wool_sweater", prompt: "A wool sweater", correctBinId: "thermal_insulator" },
    { id: "wooden_spoon", prompt: "A wooden cooking spoon", correctBinId: "thermal_insulator" },
    { id: "plastic_handle", prompt: "A plastic pan handle", correctBinId: "thermal_insulator" },
    { id: "styrofoam", prompt: "Styrofoam packing", correctBinId: "thermal_insulator" },
    { id: "rubber_pot_holder", prompt: "A rubber pot holder", correctBinId: "thermal_insulator" },
    { id: "cork_mat", prompt: "A cork hot pad", correctBinId: "thermal_insulator" },
    { id: "thermos", prompt: "The vacuum layer in a thermos", correctBinId: "thermal_insulator" },
    { id: "cotton_gloves", prompt: "Thick cotton gloves", correctBinId: "thermal_insulator" },
    { id: "ceramic_mug", prompt: "A thick ceramic mug", correctBinId: "thermal_insulator" },
    { id: "bubble_wrap", prompt: "Bubble wrap around a cold pack", correctBinId: "thermal_insulator" },
  ],
};