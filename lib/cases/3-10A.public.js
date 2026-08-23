// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.10A).

export const CAST = {
  noor: { name: "Noor", emoji: "🧥", color: "#3B82F6", hint: "Thinks Isa is faking it." },
  isa: { name: "Isa", emoji: "🕶️", color: "#F59E0B", hint: "In sunglasses, 380 km away." },
  chart: { name: "The Two-City Chart", emoji: "📋", color: "#22C55E", hint: "Has two empty columns." },
  vane: { name: "The Wind Vane", emoji: "🧭", color: "#8B5CF6", hint: "Two vanes, pointing opposite ways." },
  dex: { name: "Dex", emoji: "💻", color: "#0D9488", hint: "Can't write while they argue." }
};

export const PUBLIC_CASE = {
  standard: "3.10A",
  title: "One of You Is Making This Up",
  bigQuestion: "It is 2 o'clock in both cities. One is 19°C and pouring. The other is 34°C and dry. How can both be true?",
  trapLine: "It's 2 o'clock and it's raining, so you're faking. One of us is making this up.",
  evidenceBank: [
    "Noor's city was 19°C with heavy rain at 2:00",
    "Isa's city was 34°C with no rain at 2:00",
    "Both cousins held their phones up to a clock saying 2:00",
    "The two cities are 380 kilometres apart",
    "The next day the two cities swapped weather"
  ],
  coldOpenMessages: [
    { who: "system", text: "A video call at 2 o'clock. One cousin in a raincoat, one in sunglasses, and a chart with two empty columns." },
    { who: "dex", text: "Right. Two cities, same moment. Noor, you first — what's it doing?" },
    { who: "noor", text: "Nineteen degrees and absolutely pouring. And Isa is sitting there in sunglasses." },
    { who: "isa", text: "Because it's thirty-four here and there isn't a cloud. I'll walk outside if you want." },
    { who: "noor", text: "You've got a picture up behind you." },
    { who: "dex", text: "You both held your phones up to a clock a minute ago. They both said 2:00." },
    { who: "vane", text: "And there are two of us. One vane pointing north in Noor's city, one pointing south in Isa's. Same minute." },
    { who: "noor", text: "Then one of the vanes is broken. It's 2 o'clock and it's raining, so you're faking. One of us is making this up." }
  ],
  selfCheckQuestions: [
    "Did I use both cities' temperatures?",
    "Did I use the rain or the wind for both places?",
    "Did I use the clock check?",
    "Did I say how far apart the two cities are?",
    "Did I give Dex a rule about weather in two places at once?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Noor believe?", placeholder: "In your own words, what is Noor's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Noor's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what the chart would look like for the same two cities at 2:00 the following week, and say why they cannot know for sure.";
