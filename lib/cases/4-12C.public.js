// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.12C).

export const CAST = {
  dez: { name: "Uncle Dez", emoji: "🥾", color: "#F59E0B", hint: "Thinks somebody dropped it." },
  mina: { name: "Mina", emoji: "🔎", color: "#22C55E", hint: "Counted hundreds of them." },
  urchin: { name: "The Sea Urchin", emoji: "🐚", color: "#8B5CF6", hint: "Knows what water it lived in." },
  lime: { name: "The Limestone", emoji: "🪨", color: "#3B82F6", hint: "Formed in a shallow sea." },
  gap: { name: "What Isn't Here", emoji: "🕳️", color: "#EF4444", hint: "No land fossils at all in this layer." },
  sam: { name: "Ranger Sam", emoji: "📗", color: "#0D9488", hint: "Writing a sign thousands will read." }
};

export const PUBLIC_CASE = {
  standard: "4.12C",
  title: "The Seashell on the Hilltop",
  bigQuestion: "There are hundreds of sea fossils on a dry hilltop, many locked in the rock. What was this place when they were alive?",
  trapLine: "Somebody's picnic. Kid carried a shell up from the coast and dropped it. Mystery solved.",
  evidenceBank: [
    "There are hundreds of sea fossils across the hillside",
    "Many are still embedded in the rock face itself",
    "The hillside is limestone, which forms in shallow seas",
    "There are no land-animal fossils at all in this layer",
    "The fossils are all sea creatures — urchins, ammonites, clams"
  ],
  coldOpenMessages: [
    { who: "system", text: "A dry hillside in Texas, four hundred feet above the nearest water. A trail sign is being written for it." },
    { who: "dez", text: "Right, well — that's a seashell. Somebody's picnic. Kid brought it up from the coast." },
    { who: "mina", text: "Uncle Dez, I've counted three hundred and forty so far. I stopped counting at lunch." },
    { who: "dez", text: "Big picnic, then." },
    { who: "mina", text: "And a lot of them aren't loose. They're in the rock face. You need a hammer to get them out." },
    { who: "urchin", text: "I'd like to say, for my own part, that I have not been carried anywhere by anyone. I lived here. In water." },
    { who: "lime", text: "In me, specifically. I'm limestone. I formed in a shallow sea out of the remains of sea creatures." },
    { who: "sam", text: "That's the part I'd want on the sign. If the rock itself formed in a sea, that's not a picnic." },
    { who: "gap", text: "There's also what isn't here. No land bones. No land-plant prints. Nothing in this layer ever walked anywhere." },
    { who: "dez", text: "All I'm saying is there's a simpler answer than the sea moving. Somebody's picnic. Kid carried a shell up from the coast and dropped it. Mystery solved." }
  ],
  selfCheckQuestions: [
    "Did I use how many fossils are on the hillside?",
    "Did I use the ones still embedded in the rock face?",
    "Did I use what kind of rock the hillside is made of?",
    "Did I say what this place was when the fossils were alive?",
    "Did I say what fossils let you work out, for Ranger Sam's sign?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Uncle Dez believe?", placeholder: "In your own words, what is Uncle Dez's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Uncle Dez's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what a layer of the same hillside would look like if it had been a forest instead of a sea, and name two things they'd expect to find that aren't there now.";
