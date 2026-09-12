/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Matter-Properties (TEKS 5.6A - thermal conductors/insulators)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Matter-Properties.thermal-conductors",
  standard: "5.FR.Matter-Properties",
  teks: "5.6A",
  title: "Thermal Conductor or Insulator?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "thermal_conductor", label: "Thermal Conductor" },
    { id: "thermal_insulator", label: "Thermal Insulator" },
  ],

  rule:
    "Thermal conductors transfer heat quickly. Thermal insulators transfer heat slowly.",

  items: [
    { id: "copper_pot", prompt: "A copper pot", correctBinId: "thermal_conductor" },
    { id: "aluminum_pan", prompt: "An aluminum pan", correctBinId: "thermal_conductor" },
    { id: "iron_skillet", prompt: "An iron skillet", correctBinId: "thermal_conductor" },
    { id: "steel_spoon", prompt: "A steel spoon", correctBinId: "thermal_conductor" },
    { id: "metal_bakeware", prompt: "Metal bakeware", correctBinId: "thermal_conductor" },
    { id: "brass_knob", prompt: "A brass doorknob", correctBinId: "thermal_conductor" },
    { id: "silver_utensil", prompt: "A silver utensil", correctBinId: "thermal_conductor" },
    { id: "aluminum_foil", prompt: "Aluminum foil", correctBinId: "thermal_conductor" },
    { id: "copper_pipe", prompt: "A copper pipe", correctBinId: "thermal_conductor" },
    { id: "steel_radiator", prompt: "A steel radiator", correctBinId: "thermal_conductor" },
    { id: "metal_mug", prompt: "A bare metal mug", correctBinId: "thermal_conductor" },
    { id: "wire_grill", prompt: "A metal grill grate", correctBinId: "thermal_conductor" },

    { id: "foam_cup", prompt: "A foam cup", correctBinId: "thermal_insulator" },
    { id: "oven_mitt", prompt: "An oven mitt", correctBinId: "thermal_insulator" },
    { id: "wool_blanket", prompt: "A wool blanket", correctBinId: "thermal_insulator" },
    { id: "wooden_spoon", prompt: "A wooden spoon", correctBinId: "thermal_insulator" },
    { id: "plastic_handle", prompt: "A plastic pan handle", correctBinId: "thermal_insulator" },
    { id: "cork_board", prompt: "A cork hot pad", correctBinId: "thermal_insulator" },
    { id: "rubber_glove", prompt: "A thick rubber glove", correctBinId: "thermal_insulator" },
    { id: "styrofoam", prompt: "Styrofoam packing", correctBinId: "thermal_insulator" },
    { id: "thermos", prompt: "A vacuum thermos wall", correctBinId: "thermal_insulator" },
    { id: "fleece_jacket", prompt: "A fleece jacket", correctBinId: "thermal_insulator" },
    { id: "ceramic_mug", prompt: "A thick ceramic mug", correctBinId: "thermal_insulator" },
    { id: "bubble_wrap", prompt: "Bubble wrap", correctBinId: "thermal_insulator" },
  ],
};