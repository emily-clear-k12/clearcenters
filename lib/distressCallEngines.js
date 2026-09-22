// Client-safe list of which engines have an instant-graded portion a
// Distress Call meter can actually count (see lib/distressCall.js for why
// Group Chat isn't here, and the grading logic itself). Kept as its own
// tiny file with zero server imports so the teacher-side assign screen
// ("use client") can import it directly without ever pulling in
// supabaseAdmin or the service-role key into the browser bundle.
//
// Adding a new engine's Distress Call support is two edits: add its key
// here, and add its scoring adapter to ENGINE_ADAPTERS in lib/distressCall.js.
export const DISTRESS_CALL_ENGINES = ["mission_map", "simulation_lab", "fact_check_desk", "relay_station"];

export function engineSupportsDistressCall(engine) {
  return DISTRESS_CALL_ENGINES.includes(engine);
}

// What one "point" on the meter means, per engine — the assign screen and
// Live Ops Board use this so a typing goal doesn't say "checkpoints".
// Relay Station (Sept 22 2026): the Foundations Track counts levels passed;
// a single reading counts stars earned (up to 3 per student).
export function distressCallUnit(engine, standard) {
  if (engine === "relay_station") {
    return /\.TRACK$/.test(String(standard || "")) ? "levels passed" : "stars";
  }
  return "checkpoints";
}
