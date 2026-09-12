/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Energy (TEKS 5.8B - series vs parallel circuits)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Energy.circuits-series-parallel",
  standard: "5.FR.Energy",
  teks: "5.8B",
  title: "Series or Parallel Circuit?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "series", label: "Series" },
    { id: "parallel", label: "Parallel" },
  ],

  rule:
    "In a series circuit, parts share one path; if one bulb goes out, all go out. In a parallel circuit, parts have separate paths; one bulb can stay lit if another goes out.",

  items: [
    { id: "one_path_two_bulbs", prompt: "Two bulbs sharing one single path", correctBinId: "series" },
    { id: "all_out_one_removed", prompt: "All lights go out when one bulb is removed", correctBinId: "series" },
    { id: "chain_batteries", prompt: "Batteries lined end-to-end in one path", correctBinId: "series" },
    { id: "dimmer_shared", prompt: "Bulbs dimmer because they share current on one path", correctBinId: "series" },
    { id: "old_christmas", prompt: "Old-style lights where one dead bulb kills the string", correctBinId: "series" },
    { id: "single_loop", prompt: "A single loop with battery then bulb then bulb", correctBinId: "series" },
    { id: "current_same", prompt: "Same current through every bulb in the loop", correctBinId: "series" },
    { id: "break_anywhere", prompt: "A break anywhere stops the whole circuit", correctBinId: "series" },
    { id: "flashlight_cells", prompt: "Flashlight cells stacked in one path", correctBinId: "series" },
    { id: "three_bulbs_chain", prompt: "Three bulbs wired in a chain", correctBinId: "series" },
    { id: "amp_same", prompt: "One ammeter reading the same everywhere in the loop", correctBinId: "series" },
    { id: "no_branch", prompt: "A circuit diagram with no branches", correctBinId: "series" },

    { id: "separate_paths", prompt: "Two bulbs each on their own path from the battery", correctBinId: "parallel" },
    { id: "one_out_other_lit", prompt: "One bulb removed; the other stays lit", correctBinId: "parallel" },
    { id: "house_wiring", prompt: "House lights that can be on separately", correctBinId: "parallel" },
    { id: "branch_wires", prompt: "Wires that split into branches then rejoin", correctBinId: "parallel" },
    { id: "same_brightness", prompt: "Bulbs stay bright even with more bulbs added (own paths)", correctBinId: "parallel" },
    { id: "classroom_outlets", prompt: "Classroom outlets working independently", correctBinId: "parallel" },
    { id: "two_loops", prompt: "Two separate loops sharing one battery", correctBinId: "parallel" },
    { id: "modern_lights", prompt: "Holiday lights where one bulb out does not kill all", correctBinId: "parallel" },
    { id: "car_lights", prompt: "Car headlights that can fail independently", correctBinId: "parallel" },
    { id: "voltage_same", prompt: "Each bulb gets the full battery voltage", correctBinId: "parallel" },
    { id: "diagram_branches", prompt: "A circuit diagram with branching paths", correctBinId: "parallel" },
    { id: "switch_one_branch", prompt: "A switch that turns off only one branch", correctBinId: "parallel" },
  ],
};