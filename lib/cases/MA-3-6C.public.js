// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.3.6C. TEKS 3.6C — determine the area of rectangles with whole number side lengths using multiplication; also 3.7B — determine the perimeter of a polygon.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  gus: { name: "Gus", emoji: "🔨", color: "#F59E0B", hint: "Proud of his building." },
  fenwick: { name: "Fenwick", emoji: "🚧", color: "#8B5CF6", hint: "The fence. Counts his posts all day." },
  patch: { name: "Patch", emoji: "🌱", color: "#22C55E", hint: "The lawn inside. Counts her grass squares." },
  biscuit: { name: "Biscuit", emoji: "🐶", color: "#EF4444", hint: "The dog. Squished." },
  ines: { name: "Ines", emoji: "🏡", color: "#0D9488", hint: "The neighbor. Saw both pens." }
};

export const PUBLIC_CASE = {
  standard: "MA.3.6C",
  title: "The Longer Fence",
  bigQuestion: "Gus made Biscuit's fence longer. Did Biscuit get a bigger yard?",
  trapLine: "I made Biscuit's fence longer. So his yard got bigger. That's just how fences work.",
  evidenceBank: [
    "The old pen was 4 squares long and 4 squares wide",
    "The old pen had 16 fence posts around it and 16 grass squares inside",
    "The new pen is 8 squares long and 1 square wide",
    "The new pen has 18 fence posts around it but only 8 grass squares inside",
    "Biscuit can't turn around in the new pen"
  ],
  coldOpenMessages: [
    { who: "system", text: "Gus rebuilt the pen for his dog, Biscuit. The old pen was 4 by 4. The new pen is 8 by 1." },
    { who: "fenwick", text: "I count my posts every day. Old pen: 16. New pen: 18. I got longer!" },
    { who: "patch", text: "I count my grass squares. Old pen: 16. New pen: 8. I got smaller." },
    { who: "biscuit", text: "I can't turn around. I have to walk out backwards." },
    { who: "ines", text: "I saw the old pen. Biscuit used to run in circles in there." },
    { who: "fenwick", text: "But I'm longer now. Doesn't that count for something?" },
    { who: "gus", text: "I made Biscuit's fence longer. So his yard got bigger. That's just how fences work." }
  ],
  selfCheckQuestions: [
    "Did I use Fenwick's post count for both pens?",
    "Did I use Patch's grass count for both pens?",
    "Did I say whether Biscuit's yard got bigger or smaller?",
    "Did I explain the difference between around the outside and the inside?",
    "Did I give Gus a rule he can use?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Gus believe?", placeholder: "In your own words, what is Gus's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Gus's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to design a pen with the same 18 fence posts that gives Biscuit MORE grass than the old one.";
