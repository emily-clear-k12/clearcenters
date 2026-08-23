// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.12D).

export const CAST = {
  dara: { name: "Dara", emoji: "🔨", color: "#F59E0B", hint: "Thinks it was scratched in." },
  fossil: { name: "The Fern Fossil", emoji: "🍃", color: "#22C55E", hint: "Was sealed inside until this morning." },
  split: { name: "The Split Rock", emoji: "🪨", color: "#6B7280", hint: "Was one solid piece this morning." },
  living: { name: "The Living Fern", emoji: "🪴", color: "#3B82F6", hint: "Has the same veins as the fossil." },
  ivy: { name: "Ivy", emoji: "🏷️", color: "#0D9488", hint: "Writing the shelf label." }
};

export const PUBLIC_CASE = {
  standard: "3.12D",
  title: "Somebody Carved That",
  bigQuestion: "The rock was split open this morning and the fern was on the inside. So who could have carved it?",
  trapLine: "Someone scratched that in with a nail. It's a rock. Rocks don't have plants in them.",
  evidenceBank: [
    "The rock was split open this morning and the fern was inside",
    "The fern has a main vein with tiny side veins branching off",
    "The living fern on the windowsill has the same vein pattern",
    "The quarry has dozens more in the same grey layer",
    "Ferns grow in damp shady ground and the hill is dry grass now"
  ],
  coldOpenMessages: [
    { who: "system", text: "A flat grey rock from the quarry, sitting on the class museum shelf, waiting for a label." },
    { who: "ivy", text: "I need a label by Friday. What am I writing?" },
    { who: "dara", text: "Write 'someone scratched a fern into a rock'. Because that's what happened." },
    { who: "split", text: "I was one solid piece until nine o'clock this morning. Chisel went in, I came apart in two halves." },
    { who: "split", text: "The fern was on my inside face. My two halves still match up exactly, if anyone wants to check." },
    { who: "dara", text: "Then they carved it before it got stuck back together." },
    { who: "living", text: "You could compare it to me instead. I'm on the windowsill. Main vein, tiny side veins branching off. Look at the fossil and look at me." },
    { who: "dara", text: "Whoever did it was just very good at ferns. Someone scratched that in with a nail. It's a rock. Rocks don't have plants in them." }
  ],
  selfCheckQuestions: [
    "Did I use the fact that the rock was split open this morning?",
    "Did I compare the veins to the living fern?",
    "Did I use how many are in the quarry?",
    "Did I say what that hill used to be like?",
    "Did I tell Ivy what a fossil actually shows?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Dara believe?", placeholder: "In your own words, what is Dara's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Dara's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what a fossil of a fish found in the same quarry would tell them about that hill, and say what would have to have been there.";
