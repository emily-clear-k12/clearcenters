// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.8B).

export const CAST = {
  coat: { name: "Coat", emoji: "🧥", color: "#F59E0B", hint: "Sure he's a heat-maker." },
  ines: { name: "Ines", emoji: "🧤", color: "#0D9488", hint: "Has to decide before recess." },
  slush: { name: "Slush", emoji: "⛄", color: "#3B82F6", hint: "Wore the coat all night." },
  drift: { name: "Drift", emoji: "🌨️", color: "#8B5CF6", hint: "Wore nothing, and it shows." },
  merc: { name: "Merc", emoji: "🌡️", color: "#22C55E", hint: "Has the actual temperatures." },
  shovel: { name: "The Shovel", emoji: "🪏", color: "#EF4444", hint: "Knows why your hand regretted it." }
};

export const PUBLIC_CASE = {
  standard: "4.8B",
  title: "The Coat on the Snowman",
  bigQuestion: "If a coat makes things warm, why did the snowman wearing one melt less than the snowman without one?",
  trapLine: "I make heat. That's what a coat IS. I have been making heat on that snowman all night.",
  evidenceBank: [
    "Slush wore the coat and melted less than bare Drift",
    "Inside the coat read 31°F; the outside air read 38°F",
    "Both snowmen were the same size, same yard, same night",
    "The metal shovel handle hurt to grab; the wooden one didn't",
    "Thermal energy moves from warmer things toward colder things"
  ],
  coldOpenMessages: [
    { who: "system", text: "Two snowmen, same size, built six feet apart yesterday afternoon. One of them got a coat. It is now morning." },
    { who: "ines", text: "Okay I have to say something. I put my coat on Slush yesterday because he looked cold and I have been awake half the night about it." },
    { who: "slush", text: "Ines. I'm fine. I'm honestly better than fine? I braced for the worst and nothing happened." },
    { who: "drift", text: "Must be nice. I lost about a third of my height and nobody has said one word to me about it." },
    { who: "ines", text: "Wait. Drift, you didn't have a coat. And you melted MORE?" },
    { who: "merc", text: "Yes. Which is what I would have told all of you yesterday, had anyone asked the thermometer." },
    { who: "merc", text: "Inside the coat: 31 degrees. Outside air: 38 degrees. Read those two numbers again slowly." },
    { who: "shovel", text: "And while we're doing readings — I sat in that same snow all night and my handle nearly took someone's fingers off. Wooden one? Perfectly pleasant." },
    { who: "ines", text: "So the coat... helped? That's the opposite of what I panicked about." },
    { who: "coat", text: "Helped? I make heat. That's what a coat IS. I have been making heat on that snowman all night." }
  ],
  selfCheckQuestions: [
    "Did I use both snowmen, not just the one with the coat?",
    "Did I say which snowman actually melted more?",
    "Did I answer whether the coat really makes heat of its own?",
    "Did I name what the coat is doing instead of making heat?",
    "Did I explain why the metal shovel handle was so painful to grab?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Coat believe?", placeholder: "In your own words, what is Coat's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Coat's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens if the coat goes on a mug of hot cocoa instead of a snowman, and explain why the same material produces opposite-looking results.";
