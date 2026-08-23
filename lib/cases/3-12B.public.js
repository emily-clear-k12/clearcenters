// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.12B).

export const CAST = {
  ash: { name: "Mr. Ash", emoji: "📢", color: "#F59E0B", hint: "Thinks moving frogs changes nothing else." },
  weed: { name: "The Pondweed", emoji: "🌿", color: "#22C55E", hint: "Where the chain starts." },
  frog: { name: "The Frog", emoji: "🐸", color: "#8B5CF6", hint: "Eats midges. Gets eaten by herons." },
  heron: { name: "The Heron", emoji: "🦩", color: "#3B82F6", hint: "Knows what happened at Miller's." },
  lark: { name: "Lark", emoji: "🗳️", color: "#0D9488", hint: "Has a vote on Friday." }
};

export const PUBLIC_CASE = {
  standard: "3.12B",
  title: "The Herons Will Just Eat Something Else",
  bigQuestion: "If the four frogs are moved out, what happens to the herons above them and the midges below them?",
  trapLine: "It's four frogs. The herons will just eat something else and be fine. Nothing else changes.",
  evidenceBank: [
    "The chain goes pondweed, then midges, then frogs, then herons",
    "Miller's Pond went from 6 herons in 2019 to 1 by 2021",
    "The herons at Miller's left rather than eating something else",
    "Midge numbers at Miller's went up sharply with no frogs",
    "The pondweed makes its own food using sunlight"
  ],
  coldOpenMessages: [
    { who: "system", text: "A vote on Friday: move the frogs out of the school pond, or leave them." },
    { who: "ash", text: "It's four frogs and it's the noise at night. Nothing else about the pond changes." },
    { who: "lark", text: "That's the bit I want to check. Miller's Pond did this in 2019." },
    { who: "frog", text: "I'd just say what I do here. I eat midges. Herons eat me. That's my whole job." },
    { who: "weed", text: "And the midges eat me. I make my own food from sunlight, so the energy starts here and moves up." },
    { who: "heron", text: "At Miller's there were six of us in 2019. By 2021 there was one." },
    { who: "ash", text: "They'd have found something else, surely." },
    { who: "heron", text: "They didn't. They left. And the midges there went up so much that nobody sits by that pond in June." },
    { who: "ash", text: "Miller's is a different pond though. It's four frogs. The herons will just eat something else and be fine. Nothing else changes." }
  ],
  selfCheckQuestions: [
    "Did I give the pond's food chain in order?",
    "Did I say where the energy in the chain starts?",
    "Did I use the heron numbers from Miller's Pond?",
    "Did I say what would happen to the midges as well?",
    "Did I give Lark a rule about taking one link out of a chain?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Mr. Ash believe?", placeholder: "In your own words, what is Mr. Ash's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Mr. Ash's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what would happen at the school pond if the pondweed were removed instead of the frogs, and say which animals would notice first.";
