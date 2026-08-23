// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.13B).

export const CAST = {
  nan: { name: "Nan", emoji: "🧤", color: "#F59E0B", hint: "Sorts them into two tubs." },
  grub: { name: "The Grub", emoji: "🐛", color: "#22C55E", hint: "Has a red dot. Doesn't know why." },
  beetle: { name: "The Beetle", emoji: "🪲", color: "#8B5CF6", hint: "Came out of the tub in May." },
  radish: { name: "The Radish", emoji: "🌱", color: "#EF4444", hint: "Does the same thing with seeds." },
  femi: { name: "Femi", emoji: "🪣", color: "#0D9488", hint: "Has to do this every Friday." }
};

export const PUBLIC_CASE = {
  standard: "3.13B",
  title: "Pick Out the Grubs, Keep the Beetles",
  bigQuestion: "The beetle that came out in May had the same red dot as grub number seven. What does that mean?",
  trapLine: "Grubs are pests and beetles are helpful. They're completely different creatures. Get the grubs out.",
  evidenceBank: [
    "Grub number seven was marked with red nail polish in March",
    "The beetle that came out in May had the same red dot on its back",
    "Nothing else went into that tub",
    "The stages go egg, grub, pupa, then beetle",
    "The bin with grubs removed made a third as much compost"
  ],
  coldOpenMessages: [
    { who: "system", text: "A compost bin, a Friday job, and a tub with a mesh lid that has been sitting on the shelf since March." },
    { who: "femi", text: "Nan, before I do the bin again — why am I picking the grubs out?" },
    { who: "nan", text: "Because grubs are pests and beetles are helpful. Two different creatures. It's a simple job." },
    { who: "grub", text: "I'd like to say I'm not a pest. I eat my way through that bin and turn it into the crumbly stuff you all like." },
    { who: "femi", text: "There's the tub from March on the shelf. Grub seven, with the red nail polish dot." },
    { who: "beetle", text: "That's me. I came out of it in May. The dot's on my back — have a look." },
    { who: "femi", text: "Nothing else went in that tub. Mesh lid. It's been on the shelf the whole time." },
    { who: "nan", text: "Then something got in past the mesh. Grubs are pests and beetles are helpful. They're completely different creatures. Get the grubs out." }
  ],
  selfCheckQuestions: [
    "Did I use the red dot?",
    "Did I say whether the grub and the beetle are one animal or two?",
    "Did I name the stages in order?",
    "Did I use the radish as a second example?",
    "Did I use what happened to the other class's bin?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Nan believe?", placeholder: "In your own words, what is Nan's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Nan's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what a cricket's life cycle would look like, and say how they would prove the young one and the adult are the same animal.";
