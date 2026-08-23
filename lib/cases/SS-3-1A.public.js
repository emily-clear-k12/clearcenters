// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.1A, TEKS 3.1A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Building-Only", emoji: "🏗️", color: "#F59E0B", hint: undefined },
  person: { name: "Parker Person Card", emoji: "📚", color: "#3B82F6", hint: undefined },
  event: { name: "Evan Event Card", emoji: "🌧️", color: "#22C55E", hint: undefined },
  idea: { name: "Ivy Idea Card", emoji: "♻️", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.1A",
  title: "The Community Didn’t Change by Itself",
  bigQuestion: "How can people, events, and ideas change a community?",
  trapLine: "Communities mostly change because new buildings get added.",
  evidenceBank: [
    "A librarian started a bookmobile so families far from the library could borrow books.",
    "A flood damaged a bridge, so the town built a safer replacement.",
    "Students began a recycling campaign that changed how the school handled waste."
  ],
  coldOpenMessages: [
    { who: "system", text: "A class opens a community time capsule with three old news cards. One student says the biggest change must be the card about a new building." },
    { who: "mia", text: "A new building sounds like the biggest kind of community change to me." },
    { who: "person", text: "One person can start something that changes what a community can do." },
    { who: "event", text: "An event can force a community to make a change." },
    { who: "idea", text: "An idea can change behavior even without a new building." }
  ],
  selfCheckQuestions: [
    "Did I explain how an individual caused a change?",
    "Did I explain how an event caused a change?",
    "Did I explain how an idea caused a change?",
    "Did I use at least two clues from the case?",
    "Did I explain why community change is more than adding buildings?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "person", label: "How did one person change the community?", placeholder: "Use the bookmobile clue..." },
  { key: "event", label: "How did one event lead to change?", placeholder: "Use the flood clue..." },
  { key: "idea", label: "How did one idea lead to change?", placeholder: "Use the recycling clue..." },
  { key: "claim", label: "Why are buildings only part of the story?", placeholder: "Use at least two kinds of change..." }
];

export const PUSH_ANGLE = "Time Capsule Add-On: invent one new community change card and label it person, event, or idea.";
