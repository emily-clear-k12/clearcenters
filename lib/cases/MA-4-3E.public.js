// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.4.3E. TEKS 4.3E — represent and solve addition and subtraction of fractions with equal denominators using objects and pictorial models that build to the number line.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  priya: { name: "Priya", emoji: "🥾", color: "#F59E0B", hint: "Wants her trail badge. Doing the math fast." },
  wendy: { name: "Winding Wendy", emoji: "🌲", color: "#22C55E", hint: "The trail. Eight equal sections, proud of every one." },
  dev: { name: "Dev", emoji: "🎒", color: "#3B82F6", hint: "Hiked the whole afternoon with Priya." },
  lina: { name: "Lina", emoji: "🧭", color: "#8B5CF6", hint: "A number line marked in eighths." },
  bo: { name: "Ranger Bo", emoji: "🧢", color: "#0D9488", hint: "Logs every hiker's distance." }
};

export const PUBLIC_CASE = {
  standard: "MA.4.3E",
  title: "The Trail Math",
  bigQuestion: "Priya hiked 3/8 of the trail this morning and 2/8 after lunch. How much of the trail did she hike in all?",
  trapLine: "Add the tops, add the bottoms. 3/8 plus 2/8 is 5/16. That's what I'm logging.",
  evidenceBank: [
    "Winding Wendy is marked in 8 equal sections",
    "Priya passed 3 section markers in the morning and 2 more after lunch",
    "5/16 is less than the 3/8 Priya had already hiked by lunch",
    "Lina's three jumps of 1/8, then two more, land on 5/8",
    "Adding fractions with the same denominator adds how many pieces, not the size of the pieces"
  ],
  coldOpenMessages: [
    { who: "system", text: "Pine Ridge Trail — Winding Wendy to her friends — is marked into 8 equal sections. Priya hiked some this morning and more after lunch." },
    { who: "bo", text: "Priya! Log your total before you head home. How much of Wendy did you hike today?" },
    { who: "priya", text: "Morning was 3/8. Afternoon was 2/8. Doing the math now." },
    { who: "wendy", text: "Every one of my sections is the same length. I'd know. I've been this trail for fifty years." },
    { who: "dev", text: "I was with her all afternoon. We passed two markers after lunch. I counted." },
    { who: "lina", text: "I'm marked in eighths too. Three hops got her to 3/8 by lunch. I was watching." },
    { who: "wendy", text: "And for the record, I don't have sixteen of anything." },
    { who: "priya", text: "Add the tops, add the bottoms. 3/8 plus 2/8 is 5/16. That's what I'm logging." }
  ],
  selfCheckQuestions: [
    "Did I use how many trail sections Priya actually passed?",
    "Did I explain why the denominator stays 8?",
    "Did I compare 5/16 to the 3/8 she had already hiked by lunch?",
    "Did I use Lina's jumps as a second way to show it?",
    "Did I give Ranger Bo the correct total and a rule he can use?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Priya believe?", placeholder: "In your own words, what is Priya's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Priya's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask what fraction of the trail Priya still has left, and whether that is more or less than half of Wendy.";
