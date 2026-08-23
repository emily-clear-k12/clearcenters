// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.6B).

export const CAST = {
  rice: { name: "Rice", emoji: "🍚", color: "#F59E0B", hint: "Thinks pouring makes her a liquid." },
  water: { name: "Water", emoji: "💧", color: "#3B82F6", hint: "Fills every corner. Goes flat." },
  lens: { name: "The Magnifier", emoji: "🔍", color: "#8B5CF6", hint: "Shows what one grain looks like." },
  jar: { name: "The Jar", emoji: "🫙", color: "#22C55E", hint: "Gets filled by both, differently." },
  nico: { name: "Nico", emoji: "📝", color: "#0D9488", hint: "Has one thing left to sort." }
};

export const PUBLIC_CASE = {
  standard: "3.6B",
  title: "Rice Thinks She Is a Liquid",
  bigQuestion: "Rice pours like water. So why isn't rice a liquid?",
  trapLine: "I pour and I take the shape of the jar, so I'm a liquid.",
  evidenceBank: [
    "Rice makes a rounded pile but water goes flat on top",
    "Under the magnifier every grain is the same shape as in the bag",
    "One grain of rice on its own still has its own shape",
    "Water fills every corner of the jar and rice does not",
    "A squeezed grain of rice keeps its shape"
  ],
  coldOpenMessages: [
    { who: "system", text: "Three columns on the chart: solid, liquid, gas. One thing left to sort." },
    { who: "nico", text: "Rice, I just need a reason. Then I can write you in." },
    { who: "rice", text: "Easy. I pour. Watch me pour. Liquids pour." },
    { who: "jar", text: "You do pour. But you make a rounded pile in me. Water goes into all my corners and lies flat on top." },
    { who: "water", text: "That's my whole thing, honestly. Corners and flat. And if you squeeze me I run everywhere." },
    { who: "lens", text: "May I. Pick up one grain of rice and put it under me." },
    { who: "lens", text: "It's the same little oval it was in the bag. It hasn't changed shape at all." },
    { who: "rice", text: "Well of course it hasn't. But look at the pouring! I pour and I take the shape of the jar, so I'm a liquid." }
  ],
  selfCheckQuestions: [
    "Did I look at one grain instead of the whole jar?",
    "Did I use the magnifier?",
    "Did I say what water does that rice doesn't?",
    "Did I answer Rice about the pouring?",
    "Did I give Nico the rule for what makes something a solid?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Rice believe?", placeholder: "In your own words, what is Rice's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Rice's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Give them three more tricky ones — sugar, a sponge, and steam from a kettle — and have them sort each into solid, liquid or gas and say what test they used.";
