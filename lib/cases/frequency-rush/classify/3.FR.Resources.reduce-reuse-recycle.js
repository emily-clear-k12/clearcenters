/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 3.FR.Resources (TEKS 3.11C - reduce, reuse, recycle)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Resources.reduce-reuse-recycle",
  standard: "3.FR.Resources",
  teks: "3.11C",
  title: "Reduce, Reuse, or Recycle?",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "reduce", label: "Reduce" },
    { id: "reuse", label: "Reuse" },
    { id: "recycle", label: "Recycle" },
  ],

  rule:
    "Reduce means use less. Reuse means use again as-is. Recycle means turn used material into something new.",

  items: [
    { id: "turn_off_lights", prompt: "Turning off lights when you leave a room", correctBinId: "reduce" },
    { id: "shorter_shower", prompt: "Taking a shorter shower", correctBinId: "reduce" },
    { id: "both_sides", prompt: "Writing on both sides of paper", correctBinId: "reduce" },
    { id: "bring_lunchbox", prompt: "Bringing a lunchbox instead of baggies", correctBinId: "reduce" },
    { id: "fix_drip", prompt: "Fixing a dripping faucet", correctBinId: "reduce" },
    { id: "buy_less", prompt: "Buying only what you need", correctBinId: "reduce" },
    { id: "walk_school", prompt: "Walking to school instead of riding", correctBinId: "reduce" },
    { id: "fewer_napkins", prompt: "Using fewer paper napkins", correctBinId: "reduce" },

    { id: "jar_pencils", prompt: "Using an empty jar to hold pencils", correctBinId: "reuse" },
    { id: "cloth_bag", prompt: "Using a cloth bag again at the store", correctBinId: "reuse" },
    { id: "refill_bottle", prompt: "Refilling a water bottle", correctBinId: "reuse" },
    { id: "donate_clothes", prompt: "Donating clothes you outgrew", correctBinId: "reuse" },
    { id: "gift_wrap_again", prompt: "Saving gift wrap to use again", correctBinId: "reuse" },
    { id: "old_shirt_rag", prompt: "Using an old shirt as a cleaning rag", correctBinId: "reuse" },
    { id: "scrap_paper", prompt: "Using scrap paper for notes", correctBinId: "reuse" },
    { id: "plant_pot", prompt: "Using a yogurt cup as a plant pot", correctBinId: "reuse" },

    { id: "plastic_bottle_bin", prompt: "Putting a plastic bottle in the recycling bin", correctBinId: "recycle" },
    { id: "aluminum_can", prompt: "Sorting an aluminum can for recycling", correctBinId: "recycle" },
    { id: "newspaper", prompt: "Putting newspapers in the recycling bin", correctBinId: "recycle" },
    { id: "cardboard", prompt: "Flattening cardboard for recycling", correctBinId: "recycle" },
    { id: "glass_jar", prompt: "Recycling a clean glass jar", correctBinId: "recycle" },
    { id: "school_paper", prompt: "Recycling classroom paper scraps", correctBinId: "recycle" },
    { id: "metal_cans", prompt: "Recycling empty food cans", correctBinId: "recycle" },
    { id: "cereal_box", prompt: "Recycling a cereal box", correctBinId: "recycle" },
  ],
};