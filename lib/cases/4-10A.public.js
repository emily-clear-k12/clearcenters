// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.10A).

export const CAST = {
  puddle: { name: "Puddle", emoji: "💧", color: "#3B82F6", hint: "Thinks drying up means ceasing to exist." },
  sunny: { name: "Sunny the Sun", emoji: "☀️", color: "#F59E0B", hint: "Sets the speed of the whole thing." },
  vera: { name: "Vera Vapor", emoji: "🌫️", color: "#8B5CF6", hint: "Is the water, in a form you can't see." },
  chalky: { name: "Chalk Line", emoji: "📏", color: "#22C55E", hint: "Keeps the measurement log." },
  cupb: { name: "Cup B", emoji: "🥤", color: "#0D9488", hint: "Sealed, and holding the proof." },
  reporter: { name: "Weather Reporter", emoji: "🎤", color: "#EF4444", hint: "Needs it in kindergarten words." }
};

export const PUBLIC_CASE = {
  standard: "4.10A",
  title: "The Puddle Mystery",
  bigQuestion: "Puddle was 24 inches across at 9:00 and gone by lunch. Where did the water actually go?",
  trapLine: "When water dries up, it stops existing. Poof. I'm disappearing forever.",
  evidenceBank: [
    "The chalk line: 24 inches at 9:00, 15 inches at 11:00, gone by 1:00",
    "Cup B was sealed — its water line never moved",
    "Tiny droplets appeared under Cup B's plastic wrap",
    "On the cloudy day, the puddle dried much slower",
    "A wet handprint fades in under 2 minutes on warm pavement"
  ],
  coldOpenMessages: [
    { who: "system", text: "Sunny day, 85 degrees. A puddle on the blacktop has been shrinking since morning and the playground weather report is due at one." },
    { who: "reporter", text: "Morning everyone! I need one line for the report: what happened to the puddle by the swings?" },
    { who: "chalky", text: "I can give you numbers. 9:00, twenty-four inches across. 11:00, fifteen inches. 1:00, nothing." },
    { who: "reporter", text: "Nothing? Did it drain somewhere?" },
    { who: "chalky", text: "No drain within twenty feet. No slope. Nobody touched it. I checked all three." },
    { who: "cupb", text: "If it helps — I'm the sealed cup from the three-day test. My water line never moved. Not once." },
    { who: "cupb", text: "And there were droplets under my plastic wrap. Which I found interesting, since nothing got in or out of me." },
    { who: "vera", text: "That would be me, thank you. I'm what the water became. I'm right here, I'm just a gas." },
    { who: "sunny", text: "And on the cloudy day it barely dried at all. Ten inches still sitting there at one o'clock. You're welcome." },
    { who: "puddle", text: "You're all being very kind but let's be honest about what's happening. When water dries up, it stops existing. Poof. I'm disappearing forever." }
  ],
  selfCheckQuestions: [
    "Did I say what the liquid water actually turned into?",
    "Did I use a real measurement from the chalk log or the cup test?",
    "Did I use the sealed cup to show the water still exists?",
    "Did I answer Puddle's belief that the water stopped existing?",
    "Did I explain why it happened so much faster on the sunny day?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Puddle believe?", placeholder: "In your own words, what is Puddle's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Puddle's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict where the water in a glass of ice water's outside droplets came from, and whether that is the same process running forwards or backwards.";
