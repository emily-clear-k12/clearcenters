// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.7A).

export const CAST = {
  feather: { name: "Feather", emoji: "🪶", color: "#F59E0B", hint: "Thinks she is too light for gravity." },
  rock: { name: "Rock", emoji: "🪨", color: "#6B7280", hint: "Falls fast. Lands. Every time." },
  floor: { name: "The Floor", emoji: "🟫", color: "#8B5CF6", hint: "Has caught her twenty times." },
  magnet: { name: "The Magnet", emoji: "🧲", color: "#EF4444", hint: "Pulls without touching." },
  jo: { name: "Jo", emoji: "📋", color: "#0D9488", hint: "Writing the list, stuck on one line." }
};

export const PUBLIC_CASE = {
  standard: "3.7A",
  title: "Feather Says Gravity Skips Her",
  bigQuestion: "The feather falls much slower than the rock. Does that mean gravity is skipping her?",
  trapLine: "Gravity doesn't bother with me. I'm too light. I just drift.",
  evidenceBank: [
    "The feather landed on the floor 20 times out of 20",
    "The feather has never once gone upward when dropped",
    "The rock falls fast and the feather falls slowly, but both land",
    "The same sheet of paper falls faster when crumpled",
    "A magnet lifts a paperclip without touching it"
  ],
  coldOpenMessages: [
    { who: "system", text: "A list on the wall: Things Gravity Pulls On. One line is still empty." },
    { who: "jo", text: "Feather, I've dropped you twenty times today. I need to know what to write." },
    { who: "feather", text: "Write nothing. Gravity has never once paid me any attention." },
    { who: "floor", text: "Sorry — I've caught her twenty times. Out of twenty." },
    { who: "rock", text: "Feather. Simple question. Where do you end up?" },
    { who: "feather", text: "On the floor. But slowly! Very slowly. You crash." },
    { who: "jo", text: "We tried something with the paper. Same sheet. Flat, it drifts. Crumpled up, it drops fast." },
    { who: "feather", text: "Then the crumpled one is heavier, obviously. Gravity doesn't bother with me. I'm too light. I just drift." }
  ],
  selfCheckQuestions: [
    "Did I use how many times the feather landed?",
    "Did I use the flat paper and the crumpled paper?",
    "Did I say what really makes the feather fall slowly?",
    "Did I use the magnet and the paperclip?",
    "Did I tell Jo what gravity pulls on?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Feather believe?", placeholder: "In your own words, what is Feather's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Feather's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what a flat sheet of paper and a crumpled one would do if dropped together, then say which one gravity pulls on harder and give a reason.";
