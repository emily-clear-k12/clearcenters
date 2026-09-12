/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Energy (TEKS 5.8B - open/closed circuits)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Energy.circuits-open-closed",
  standard: "5.FR.Energy",
  teks: "5.8B",
  title: "Open or Closed Circuit?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "open_circuit", label: "Open Circuit" },
    { id: "closed_circuit", label: "Closed Circuit" },
  ],

  rule:
    "A closed circuit is a complete path so current can flow (bulb lights). An open circuit has a break so current cannot flow (bulb off).",

  items: [
    { id: "switch_off", prompt: "A light switch turned OFF", correctBinId: "open_circuit" },
    { id: "broken_wire", prompt: "A battery, bulb, and a broken wire", correctBinId: "open_circuit" },
    { id: "gap_gap", prompt: "A circuit with a gap in the loop", correctBinId: "open_circuit" },
    { id: "unplugged_lamp", prompt: "A lamp cord unplugged from the wall", correctBinId: "open_circuit" },
    { id: "loose_bulb", prompt: "A flashlight bulb loose in its socket", correctBinId: "open_circuit" },
    { id: "battery_removed", prompt: "A remote with the battery removed", correctBinId: "open_circuit" },
    { id: "open_switch", prompt: "An open knife switch in a demo circuit", correctBinId: "open_circuit" },
    { id: "wire_not_touch", prompt: "Wire ends that do not touch", correctBinId: "open_circuit" },
    { id: "blown_fuse", prompt: "A blown fuse that breaks the path", correctBinId: "open_circuit" },
    { id: "dead_flashlight", prompt: "A flashlight that will not light (path incomplete)", correctBinId: "open_circuit" },
    { id: "clip_off", prompt: "An alligator clip disconnected", correctBinId: "open_circuit" },
    { id: "door_ajar_alarm", prompt: "A door-open alarm circuit waiting to close", correctBinId: "open_circuit" },

    { id: "switch_on", prompt: "A light switch turned ON", correctBinId: "closed_circuit" },
    { id: "lit_bulb", prompt: "A battery, intact wires, and a lit bulb", correctBinId: "closed_circuit" },
    { id: "complete_loop", prompt: "A complete loop from battery to bulb and back", correctBinId: "closed_circuit" },
    { id: "plugged_lamp", prompt: "A plugged-in lamp that is glowing", correctBinId: "closed_circuit" },
    { id: "tight_bulb", prompt: "A flashlight with tight bulb and fresh batteries (on)", correctBinId: "closed_circuit" },
    { id: "closed_switch", prompt: "A closed knife switch lighting a bulb", correctBinId: "closed_circuit" },
    { id: "wires_connected", prompt: "All wire ends firmly connected", correctBinId: "closed_circuit" },
    { id: "working_buzzer", prompt: "A classroom buzzer sounding", correctBinId: "closed_circuit" },
    { id: "phone_charging", prompt: "A phone charging with cord fully connected", correctBinId: "closed_circuit" },
    { id: "motor_spinning", prompt: "A small motor spinning in a kit circuit", correctBinId: "closed_circuit" },
    { id: "string_lights", prompt: "Holiday lights glowing (path complete)", correctBinId: "closed_circuit" },
    { id: "doorbell_ring", prompt: "A doorbell ringing when pressed", correctBinId: "closed_circuit" },
  ],
};