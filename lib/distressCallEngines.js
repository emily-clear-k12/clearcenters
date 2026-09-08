// Client-safe list of which engines have an instant-graded portion a
// Distress Call meter can actually count (see lib/distressCall.js for why
// Group Chat isn't here, and the grading logic itself). Kept as its own
// tiny file with zero server imports so the teacher-side assign screen
// ("use client") can import it directly without ever pulling in
// supabaseAdmin or the service-role key into the browser bundle.
//
// Adding a new engine's Distress Call support is two edits: add its key
// here, and add its scoring adapter to ENGINE_ADAPTERS in lib/distressCall.js.
export const DISTRESS_CALL_ENGINES = ["mission_map", "simulation_lab", "fact_check_desk"];

export function engineSupportsDistressCall(engine) {
  return DISTRESS_CALL_ENGINES.includes(engine);
}
