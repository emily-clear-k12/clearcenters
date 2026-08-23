// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.6C).

export const CAST = {
  cyl: { name: "Cyl", emoji: "🧪", color: "#F59E0B", hint: "Certain the measurement is wrong." },
  marisol: { name: "Marisol", emoji: "🔬", color: "#22C55E", hint: "The only one who weighed anything." },
  grit: { name: "Grit", emoji: "🪨", color: "#8B5CF6", hint: "Knows what's between her grains." },
  trickle: { name: "Trickle", emoji: "💧", color: "#3B82F6", hint: "Knows where she ended up." },
  gap: { name: "The Gaps", emoji: "🕳️", color: "#EF4444", hint: "The 70 mL everyone is panicking about." },
  dev: { name: "Dev", emoji: "🎒", color: "#0D9488", hint: "Just wants to know if the do-over is real." }
};

export const PUBLIC_CASE = {
  standard: "4.6C",
  title: "The Fourth Do-Over",
  bigQuestion: "If 300 mL of water plus 200 mL of soil only reads 430 mL, did some of it really go missing?",
  trapLine: "The level came out 70 mL short, so 70 mL of stuff went missing. Somebody spilled. We're doing it again.",
  evidenceBank: [
    "The line read 430 mL instead of 500 mL, all three times",
    "The jar weighed 680 g before mixing and 680 g after",
    "Nothing was added, spilled, or poured out",
    "Dry soil has air gaps between the grains",
    "Water sinks straight down into those gaps"
  ],
  coldOpenMessages: [
    { who: "system", text: "Third run of the same measurement, same result. The group has ten minutes before the room gets locked up for the night." },
    { who: "dev", text: "Okay. That's three times. Three times we've gotten 430, and three times Cyl has said we did it wrong." },
    { who: "cyl", text: "Because you DID do it wrong. 300 plus 200 is 500. That is not a matter of opinion." },
    { who: "marisol", text: "Can I show everyone something? I put the jar on the scale before we mixed it. And then after." },
    { who: "dev", text: "You weighed it? Nobody said anything about weighing it." },
    { who: "marisol", text: "680 grams before. 680 grams after. Exactly the same, both times I checked." },
    { who: "grit", text: "That tracks. I'd like to point out that I am mostly holes. Always have been. Nobody ever accounts for it." },
    { who: "trickle", text: "She's right! I didn't sit on top of her, I went down INTO her. It's quite cozy in there actually." },
    { who: "gap", text: "Seventy millilitres of us got filled in. Seventy. That is the exact number everyone is upset about." },
    { who: "cyl", text: "I'm sorry, I don't follow. The level came out 70 mL short, so 70 mL of stuff went missing. Somebody spilled. We're doing it again." }
  ],
  selfCheckQuestions: [
    "Did I use what the scale actually said, not just what the line said?",
    "Did I say clearly what got smaller — the matter, or the space it takes up?",
    "Did I explain where the missing 70 mL actually went?",
    "Did I tell Cyl whether the measurement was a mistake or not?",
    "Did I say what happens to the amount of matter whenever a mixture gets made?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Cyl believe?", placeholder: "In your own words, what is Cyl's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Cyl's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens with two liquids instead — 300 mL of water and 200 mL of rubbing alcohol — and say whether the mass, the volume, or both should change, before testing it.";
