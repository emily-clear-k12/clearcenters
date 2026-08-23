// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.6D).

export const CAST = {
  rook: { name: "Rook", emoji: "🔧", color: "#F59E0B", hint: "Wants the whole thing made of steel." },
  steel: { name: "Steel", emoji: "⚙️", color: "#6B7280", hint: "Strong and stiff. Also heavy." },
  fabric: { name: "Fabric", emoji: "🧵", color: "#8B5CF6", hint: "Light and foldable. Also floppy." },
  wood: { name: "Wood", emoji: "🪵", color: "#22C55E", hint: "Warm to hold. Grippy when wet." },
  orla: { name: "Orla", emoji: "🌧️", color: "#0D9488", hint: "Walking to school in the rain." }
};

export const PUBLIC_CASE = {
  standard: "3.6D",
  title: "The All-Steel Umbrella",
  bigQuestion: "Steel really is the strongest. So why shouldn't the whole umbrella be made of it?",
  trapLine: "Steel is the strongest, so the whole umbrella should be steel. Why use anything weaker?",
  evidenceBank: [
    "The steel canopy weighs 4 kg and doesn't fold",
    "The fabric canopy weighs 200 g and folds up small",
    "Fabric on its own flops straight down without ribs",
    "The steel handle goes icy and slippery when wet",
    "The wood handle stays warm to hold and grippy"
  ],
  coldOpenMessages: [
    { who: "system", text: "One umbrella. It has to keep the rain off, fold up, and be carried to school by an eight-year-old." },
    { who: "orla", text: "I have to walk in this tomorrow. Can I pick the model up?" },
    { who: "rook", text: "Of course. It's four kilograms. That's how you know it's good." },
    { who: "orla", text: "Rook. I can't get it over my head." },
    { who: "fabric", text: "I weigh two hundred grams. I fold up small and rain runs straight off me." },
    { who: "fabric", text: "Though I'll be honest — on my own I flop straight down. I need something stiff under me." },
    { who: "steel", text: "That's me. Thin ribs. I'll hold you out in a dome all day. I'm just no good as the canopy itself." },
    { who: "rook", text: "Then we're making the ribs out of the good stuff and the rest out of the weak stuff. Steel is the strongest, so the whole umbrella should be steel. Why use anything weaker?" }
  ],
  selfCheckQuestions: [
    "Did I say what at least two of the parts should be made of?",
    "Did I say why, using something that material can do?",
    "Did I use the weight of the steel canopy or the fabric one?",
    "Did I use what happened with the two handles?",
    "Did I answer Rook's idea that the strongest material is always best?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Rook believe?", placeholder: "In your own words, what is Rook's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Rook's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them pick the materials for a lunchbox — the outside, the handle and the seal — and give a reason for each one that says what that part has to do.";
