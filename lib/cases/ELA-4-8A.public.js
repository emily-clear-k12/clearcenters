// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.4.8A. TEKS 4.8A — infer basic themes supported by text evidence.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  max: { name: "Max", emoji: "⚡", color: "#F59E0B", hint: "Confident. Fast. Usually first to answer." },
  pip: { name: "Pip", emoji: "🐐", color: "#22C55E", hint: "The youngest goat. Fell off the rock seven times." },
  ram: { name: "Old Ram", emoji: "🐏", color: "#8B5CF6", hint: "Has seen many springs. Speaks very little." },
  summit: { name: "Summit", emoji: "⛰️", color: "#3B82F6", hint: "The high rock at the top. A little smug." },
  rae: { name: "Ms. Rae", emoji: "📖", color: "#0D9488", hint: "Asked for a theme, not a topic." }
};

export const PUBLIC_CASE = {
  standard: "ELA.4.8A",
  title: "The Theme Is Goats",
  bigQuestion: "The fable is about a little goat named Pip. But what is the theme?",
  trapLine: "The theme is goats. Obviously. The whole fable is about a goat.",
  evidenceBank: [
    "Pip slipped every morning but kept trying",
    "Pip learned which stones were loose and which held firm",
    "The other goats laughed and said some goats are just not climbers",
    "Old Ram says, 'The rock never got lower. You got better.'",
    "A topic is what a story is about; a theme is the lesson it teaches"
  ],
  coldOpenMessages: [
    { who: "system", text: "Ms. Rae's class read a fable today. The assignment: name the theme and back it up." },
    { who: "system", text: "PIP AND THE HIGH ROCK. Every goat on the hill could reach the high rock except Pip, the youngest. Each morning Pip tried. Each morning Pip slipped." },
    { who: "pip", text: "Seven times. I fell off that rock SEVEN times. I would like that on the record." },
    { who: "system", text: "The other goats laughed. \"Some goats are just not climbers,\" they said. Old Ram, who had seen many springs, said nothing at all." },
    { who: "ram", text: "Hm." },
    { who: "system", text: "Pip tried again, and again. Pip learned which stones were loose and which held firm. On the seventh morning, Pip reached the high rock just as the sun came up." },
    { who: "summit", text: "Worth it." },
    { who: "system", text: "Old Ram looked up and spoke at last: \"The rock never got lower. You got better.\"" },
    { who: "rae", text: "Max, you're first. What's the theme?" },
    { who: "max", text: "Goats. Obviously. The theme is goats. The whole fable is about a goat." }
  ],
  selfCheckQuestions: [
    "Did I explain the difference between a topic and a theme?",
    "Did I state the theme as a full sentence about life?",
    "Did I use what Pip did after slipping?",
    "Did I use Old Ram's words at the end?",
    "Would my theme work for people, not just goats?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Max believe?", placeholder: "In your own words, what is Max's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Max's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask how the theme would change if Old Ram had said \"Some goats are just not climbers\" at the end instead.";
