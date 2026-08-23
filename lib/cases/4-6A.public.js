// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.6A).

export const CAST = {
  sketch: { name: "Sketch", emoji: "✏️", color: "#F59E0B", hint: "Sure his description was perfect." },
  lock: { name: "The Padlock", emoji: "🔒", color: "#3B82F6", hint: "The object he meant." },
  sponge: { name: "The Sponge", emoji: "🧽", color: "#22C55E", hint: "Matched every word Sketch wrote." },
  scale: { name: "The Kitchen Scale", emoji: "⚖️", color: "#8B5CF6", hint: "Tells the two apart in one number." },
  bowl: { name: "The Water Bowl", emoji: "🥣", color: "#EF4444", hint: "Sorts them without touching the colour." },
  penpal: { name: "Bex-across-the-country", emoji: "📮", color: "#0D9488", hint: "Will build whatever you can describe." }
};

export const PUBLIC_CASE = {
  standard: "4.6A",
  title: "The Pen Pal Package",
  bigQuestion: "If two objects are both blue and both medium, what could you write down that would tell them apart?",
  trapLine: "Blue and medium IS a description. If she'd been paying attention she'd have known exactly what I meant.",
  evidenceBank: [
    "The padlock is 210 g and the sponge is 8 g",
    "They're the same size but nowhere near the same mass",
    "The padlock sinks and the sponge floats",
    "Both objects are blue and both are medium",
    "Colour and size can't tell two objects apart on their own"
  ],
  coldOpenMessages: [
    { who: "system", text: "Build What I Describe: one player writes a description, the other builds from it. Nobody is allowed to say the object's name." },
    { who: "penpal", text: "Okay, package received on my end. I built exactly what the card said. I'm just not sure it's what you meant." },
    { who: "sponge", text: "Hello! I'm what she sent. I am blue. I am medium. I feel I did nothing wrong here." },
    { who: "lock", text: "That is not me. I am a padlock. That is a sponge." },
    { who: "penpal", text: "Right, so — Sketch, the card said blue, medium, kind of nice. That's the whole card." },
    { who: "scale", text: "Might I offer something. The padlock is 210 grams. The sponge is 8 grams." },
    { who: "bowl", text: "And if you'd like a second one: drop them both in me. One sinks straight to the bottom. One sits on top all day." },
    { who: "lock", text: "Neither of those is on the card. Neither of those is anywhere on the card." },
    { who: "penpal", text: "I'm not upset! I just need something I can check on my end. Something I can weigh or test." },
    { who: "sketch", text: "I don't see the problem. Blue and medium IS a description. If she'd been paying attention she'd have known exactly what I meant." }
  ],
  selfCheckQuestions: [
    "Did I use what the scale actually said about each object?",
    "Did I use the water test as well as the scale?",
    "Did I explain why Sketch's card wasn't enough to identify one object?",
    "Did I name at least one property Ines could actually measure or test herself?",
    "Did I give Sketch a better rule for describing an object next time?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Sketch believe?", placeholder: "In your own words, what is Sketch's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Sketch's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them write a description card for an object in the room using only measurable or testable properties, then swap cards and see whether a partner can pick it out of a set of four.";
