// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.10B).

export const CAST = {
  jae: { name: "Jae", emoji: "🧢", color: "#F59E0B", hint: "Says soil isn't made of anything." },
  sieve: { name: "The Sieve", emoji: "🕸️", color: "#22C55E", hint: "Catches what's in one cupful." },
  boulder: { name: "The Boulder", emoji: "🪨", color: "#6B7280", hint: "Has a pile of its own grit." },
  leaves: { name: "The Leaf Jar", emoji: "🍂", color: "#8B5CF6", hint: "Was leaves in October." },
  ruth: { name: "Ruth", emoji: "🌷", color: "#0D9488", hint: "Starting a garden bed." }
};

export const PUBLIC_CASE = {
  standard: "3.10B",
  title: "What Is Soil Even Made Of?",
  bigQuestion: "One cupful of soil had rock grains, leaf bits and a beetle wing in it. So what is soil made of?",
  trapLine: "Soil isn't made of anything. It's just the ground. It's always been there.",
  evidenceBank: [
    "The sieve caught rock grains, leaf bits and a beetle wing",
    "There is a pile of grit at the bottom of the cracked boulder",
    "The grit is the same colour as the boulder",
    "The jar of leaves from October is now dark and crumbly",
    "The clay by the fence is made of very tiny bits of rock"
  ],
  coldOpenMessages: [
    { who: "system", text: "One cupful of soil, one sieve, and a tray to sort it onto." },
    { who: "ruth", text: "I just want to know what's in it before I fill my bed. What is soil made of?" },
    { who: "jae", text: "Nothing. It's soil. It's the ground. It's not made of anything." },
    { who: "sieve", text: "I've got a tray here from one cupful. Rock grains. Leaf bits. Root pieces. One beetle wing." },
    { who: "jae", text: "That's stuff that fell in." },
    { who: "boulder", text: "Then explain the pile at my feet. Same colour as me. My crack's wider than it was last year." },
    { who: "leaves", text: "And I was a jar of leaves last October. Look at me now. Dark, crumbly, smells like soil." },
    { who: "jae", text: "You were probably always like that. Soil isn't made of anything. It's just the ground. It's always been there." }
  ],
  selfCheckQuestions: [
    "Did I say soil has broken-up rock in it?",
    "Did I say how the rock got broken up?",
    "Did I say soil has rotted plants or animals in it?",
    "Did I use the sieve tray or the leaf jar as evidence?",
    "Did I give Ruth both parts in one answer?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Jae believe?", placeholder: "In your own words, what is Jae's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Jae's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what a jar of grass clippings would look like after a year, and say which part of soil they would be making.";
