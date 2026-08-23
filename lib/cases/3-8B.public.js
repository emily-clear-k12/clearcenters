// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.8B).

export const CAST = {
  teo: { name: "Teo", emoji: "⚾", color: "#F59E0B", hint: "Keeps fetching a heavier ball." },
  ramp: { name: "The Ramp", emoji: "📐", color: "#8B5CF6", hint: "Nobody has changed where they let go." },
  small: { name: "The Small Ball", emoji: "⚪", color: "#3B82F6", hint: "Scored both the 2 and the 9." },
  cups: { name: "The Cups", emoji: "🥤", color: "#22C55E", hint: "Count themselves after every run." },
  dee: { name: "Dee", emoji: "📋", color: "#0D9488", hint: "Wants to know what changes next." }
};

export const PUBLIC_CASE = {
  standard: "3.8B",
  title: "A Bigger Ball Will Not Fix It",
  bigQuestion: "The same small ball knocked over 2 cups once and 9 cups another time. What was different?",
  trapLine: "I need a bigger, heavier ball. That's what knocks more cups down.",
  evidenceBank: [
    "The small ball from the bottom knocked over 2 cups",
    "The same small ball from the top knocked over 9 cups",
    "The big ball from the bottom only knocked over 3 cups",
    "Between test A and test B only the speed was different",
    "The ball released at the top rolls fastest"
  ],
  coldOpenMessages: [
    { who: "system", text: "Ten cups at the bottom of a ramp. Best score wins. Teo's best all afternoon is two." },
    { who: "dee", text: "Teo, before you get another ball — can I read you the table?" },
    { who: "teo", text: "I know what it says. Small ball, two cups. That's why I need a bigger one." },
    { who: "dee", text: "Small ball, released at the bottom: two cups. Small ball, released at the top: nine." },
    { who: "small", text: "That was me. Both times. I didn't change at all in between." },
    { who: "cups", text: "We can confirm. The fast run sent us flying. The slow one just tipped the front row over." },
    { who: "ramp", text: "Letting go higher up means the ball has longer to speed up before it reaches the cups." },
    { who: "teo", text: "That can't be the whole of it. I need a bigger, heavier ball. That's what knocks more cups down." }
  ],
  selfCheckQuestions: [
    "Did I use the cup counts from the table?",
    "Did I point out that the ball was the same in both runs?",
    "Did I say what was actually different between them?",
    "Did I say why letting go at the top makes it faster?",
    "Did I give Dee the rule about speed and energy?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Teo believe?", placeholder: "In your own words, what is Teo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Teo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them plan one more run that would beat nine cups, say exactly what they would change, and explain why that change would work.";
