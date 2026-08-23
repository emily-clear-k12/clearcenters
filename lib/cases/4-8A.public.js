// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.8A).

export const CAST = {
  mo: { name: "Mo", emoji: "⚪", color: "#F59E0B", hint: "Thinks the energy skips right over him." },
  front: { name: "Front", emoji: "🔴", color: "#EF4444", hint: "Gets the credit, stops immediately." },
  end: { name: "End", emoji: "🔵", color: "#3B82F6", hint: "Didn't move at all without Mo." },
  tray: { name: "The Water Tray", emoji: "🌊", color: "#22C55E", hint: "The ripple travels; the cork doesn't." },
  cup: { name: "The Paper Cup", emoji: "🥤", color: "#8B5CF6", hint: "Buzzed from all the way across the room." },
  nadia: { name: "Nadia", emoji: "🔬", color: "#0D9488", hint: "Fifteen minutes and three marbles short." }
};

export const PUBLIC_CASE = {
  standard: "4.8A",
  title: "The Middle Marbles Quit",
  bigQuestion: "The middle marbles barely move, but take one away and the end marble stops dead. What are they doing?",
  trapLine: "The energy jumps from the front marble to the end one and skips over us. We don't move, so we're not doing anything.",
  evidenceBank: [
    "When one middle marble is pulled out, the last marble doesn't move at all",
    "The middle marbles barely move but the end one flies off",
    "The ripple crosses the tray but the floating cork just bobs in place",
    "The drum was across the room and the cup still buzzed",
    "Energy can move through things without the things travelling"
  ],
  coldOpenMessages: [
    { who: "system", text: "Five marbles, touching in a row. Roll one into the end and the far one flies off. This has worked for years. Today three of them walked out." },
    { who: "nadia", text: "Mo. Demo's in fifteen minutes and I'm three marbles short. Talk to me." },
    { who: "mo", text: "There's nothing to talk about. Front moves. End flies off. We sit here. It's been years and I've never gone anywhere." },
    { who: "front", text: "I mean, I don't go anywhere either? I stop almost the second I hit the line." },
    { who: "end", text: "And I go flying. Which I've honestly never understood, because Front never reaches me." },
    { who: "nadia", text: "Mo, do you remember Tuesday, when you stepped out of the line for a minute?" },
    { who: "end", text: "Oh — I didn't move. At all. Not one millimetre. I stood there the whole round." },
    { who: "tray", text: "If it helps, I do something similar. Tap one end of me and the ripple crosses the whole tray, but the cork just bobs up and down. It never actually travels." },
    { who: "cup", text: "And I buzzed when someone hit a drum on the far side of the room. Nothing touched me. Nothing flew into me." },
    { who: "mo", text: "That's all very nice for the two of you. The energy jumps from the front marble to the end one and skips over us. We don't move, so we're not doing anything." }
  ],
  selfCheckQuestions: [
    "Did I use what happened when a middle marble was taken out?",
    "Did I answer whether the energy skipped the middle marbles or went through them?",
    "Did I explain why barely moving still counts as doing something?",
    "Did I use the water ripple or the drum as a second example?",
    "Did I say what actually travels down the line, as a rule Nadia could use?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Mo believe?", placeholder: "In your own words, what is Mo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Mo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them predict what happens with eight marbles instead of five, and whether the far marble would move sooner, later, or the same — and say what that tells them about the path.";
