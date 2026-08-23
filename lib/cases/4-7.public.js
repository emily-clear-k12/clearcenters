// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.7).

export const CAST = {
  vic: { name: "Vic", emoji: "🕵️", color: "#F59E0B", hint: "Convinced somebody is cheating." },
  marble: { name: "The Marble", emoji: "🔵", color: "#3B82F6", hint: "Goes left every single round." },
  level: { name: "The Spirit Level", emoji: "📐", color: "#22C55E", hint: "Settled it in four seconds." },
  felt: { name: "The Felt", emoji: "🟩", color: "#8B5CF6", hint: "Grabs the marble as it passes." },
  gravity: { name: "Gravity", emoji: "⬇️", color: "#EF4444", hint: "Pulls without touching anything." },
  sim: { name: "Sim", emoji: "📋", color: "#0D9488", hint: "Accused first, wants her name back." }
};

export const PUBLIC_CASE = {
  standard: "4.7",
  title: "Somebody Is Tilting the Table",
  bigQuestion: "Nobody touched the table for four rounds and the marble still drifted left. What was acting on it?",
  trapLine: "nothing moves on its own. If the marble drifted, a knee moved this table, and I intend to find out whose.",
  evidenceBank: [
    "Four rounds with everyone standing back, and it still drifted left",
    "The spirit level shows the left side sits lower",
    "One table leg is shorter than the other three",
    "The same push went 84 cm on wood but only 31 cm on felt",
    "A book under the short leg made the drifting stop"
  ],
  coldOpenMessages: [
    { who: "system", text: "The marble game has been paused four times in ten minutes. Nobody wants to play any more." },
    { who: "sim", text: "I'd like it on the record that I was accused first and I have not been within six feet of that table since." },
    { who: "marble", text: "I went left. I always go left. I went left in all four of the rounds where nobody was anywhere near me." },
    { who: "vic", text: "Which is exactly what's suspicious. Something moved you. Something always moves things." },
    { who: "level", text: "Something did. It's the table. The left side sits lower — one of these legs is shorter than the other three." },
    { who: "gravity", text: "That would be my department. Downhill. Every marble, every table, every day, and I have never once had to touch anything to do it." },
    { who: "sim", text: "Vic. It's a short leg. It's been a short leg this whole time." },
    { who: "felt", text: "There's a second thing, while we're being thorough. Same push: 84 centimetres across the bare wood, 31 across me. I grab at things." },
    { who: "marble", text: "They put a book under the short leg two rounds ago and I rolled perfectly straight. I'd like that noted too." },
    { who: "vic", text: "I hear all of that, and I still say: nothing moves on its own. If the marble drifted, a knee moved this table, and I intend to find out whose." }
  ],
  selfCheckQuestions: [
    "Did I use the rounds where nobody was near the table?",
    "Did I name what pulls the marble toward the low side?",
    "Did I answer whether a force has to touch something to act on it?",
    "Did I use the difference between the felt half and the wood half?",
    "Did I say clearly enough to restart the game that nobody was cheating?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Vic believe?", placeholder: "In your own words, what is Vic's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Vic's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens if the felt half is moved to the low side of the table instead of the high side, and say which of the two effects that would change.";
