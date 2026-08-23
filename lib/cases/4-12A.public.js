// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.12A).

export const CAST = {
  soil: { name: "Soil", emoji: "🟤", color: "#8B5CF6", hint: "Thinks plants eat her." },
  weed: { name: "The Gutter Weed", emoji: "🌿", color: "#22C55E", hint: "Thriving on a teaspoon of grit." },
  jar: { name: "The Jar Plant", emoji: "🫙", color: "#3B82F6", hint: "No soil at all since September." },
  scale: { name: "The Pot Scale", emoji: "⚖️", color: "#F59E0B", hint: "The soil only lost nine grams." },
  dark: { name: "The Cupboard Plant", emoji: "🕯️", color: "#EF4444", hint: "Had soil and water. Didn't grow." },
  nix: { name: "Nix", emoji: "🔬", color: "#0D9488", hint: "Needs one answer for all three plants." }
};

export const PUBLIC_CASE = {
  standard: "4.12A",
  title: "Soil Thinks They Eat Her",
  bigQuestion: "A weed is thriving on a teaspoon of grit and a jar plant has no soil at all. Where is their food actually coming from?",
  trapLine: "Plants eat me. That's the arrangement. That weed is stealing dirt from somewhere, and I'd like to know where.",
  evidenceBank: [
    "The gutter weed is thriving in about a teaspoon of grit",
    "The jar plant has grown in plain water since September",
    "The pot soil went from 2,140 g to 2,131 g while the plant grew a lot",
    "The plant in the dark cupboard was watered but didn't grow",
    "Plants make their own food using sunlight, water and carbon dioxide"
  ],
  coldOpenMessages: [
    { who: "system", text: "Three plants, one log book, and an explanation that has to cover all three of them." },
    { who: "nix", text: "I can't write this up. The gutter weed, the jar plant and the cupboard plant need one explanation between them, and I don't have one." },
    { who: "weed", text: "I'm doing wonderfully, if that helps. Leaves, flowers, the lot. On roughly a teaspoon of grit." },
    { who: "jar", text: "And I've had no soil whatsoever since September. Plain water. I'm the same height as the ones in pots." },
    { who: "soil", text: "Then somebody is being supplied on the quiet, because that is not how this works." },
    { who: "scale", text: "I weighed the pot in September and again in May. 2,140 grams down to 2,131." },
    { who: "nix", text: "Nine grams. And that plant has put on far, far more than nine grams." },
    { who: "scale", text: "It has. Whatever it built itself out of, it did not come out of the pot." },
    { who: "dark", text: "I'd add my three weeks, if it's useful. Watered every day. Full pot of soil. No light. I went pale and floppy and I did not grow at all." },
    { who: "soil", text: "That proves nothing. Plants eat me. That's the arrangement. That weed is stealing dirt from somewhere, and I'd like to know where." }
  ],
  selfCheckQuestions: [
    "Did I say what the plant is doing to get food, in one line that fits all three plants?",
    "Did I name at least two of the things the plant uses to make it?",
    "Did I use the soil weighings from September and May?",
    "Did I use the plant that was kept in the dark?",
    "Did I tell Soil what her actual job is, if she isn't the food?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Soil believe?", placeholder: "In your own words, what is Soil's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Soil's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what the pot's soil would weigh after a second full growing season, and say what that prediction would look like if Soil had been right all along.";
