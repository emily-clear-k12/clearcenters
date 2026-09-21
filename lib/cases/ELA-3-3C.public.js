// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.3.3C. TEKS 3.3C — identify the meaning of and use words with affixes such as im- (into), non-, dis-, in- (not, non), pre-, -ness, -y, and -ful.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  tess: { name: "Tess", emoji: "💡", color: "#F59E0B", hint: "Just learned a rule. Loves it." },
  dizzy: { name: "Dizzy Dis", emoji: "🔄", color: "#8B5CF6", hint: "The prefix. Thinks she flips every word she touches." },
  agree: { name: "Agree", emoji: "👍", color: "#22C55E", hint: "A base word. Dizzy flipped him." },
  like: { name: "Like", emoji: "💚", color: "#3B82F6", hint: "A base word. Dizzy flipped her too." },
  display: { name: "Display", emoji: "🖼️", color: "#EF4444", hint: "Deeply offended." },
  park: { name: "Mr. Park", emoji: "🎨", color: "#0D9488", hint: "Made the flyer." }
};

export const PUBLIC_CASE = {
  standard: "ELA.3.3C",
  title: "Dis-Missed",
  bigQuestion: "Does 'dis-' mean 'not' in every word that starts with it?",
  trapLine: "Dis- always means not. So the art display means the art is not playing.",
  evidenceBank: [
    "Disagree means 'not agree,' and that fits the flyer",
    "Dislike means 'not like,' and that fits the flyer",
    "'Not playing' makes no sense for a wall of paintings",
    "Display means to show",
    "Dis- means 'not' when 'not + the base word' makes sense in the sentence"
  ],
  coldOpenMessages: [
    { who: "system", text: "Mr. Park hung a flyer outside the art room: \"Come see our art DISPLAY! Don't DISAGREE until you've seen it! You won't DISLIKE a single piece!\"" },
    { who: "dizzy", text: "Hi, I'm Dis! I flip words. Whatever I touch turns into its opposite. Watch." },
    { who: "agree", text: "She's right about me. Put her on the front and I'm 'not agree.' That fits the flyer." },
    { who: "like", text: "Same for me. 'Not like.' Fits fine." },
    { who: "display", text: "I am NOT a 'not' anything. Look at the flyer. Does 'not playing' make any sense for a wall full of paintings?" },
    { who: "park", text: "I made that flyer. I know what I meant." },
    { who: "tess", text: "Dis- always means not. So the art display means the art is not playing." }
  ],
  selfCheckQuestions: [
    "Did I test 'not + the base word' for each dis- word on the flyer?",
    "Did I explain why disagree and dislike fit?",
    "Did I explain why 'not playing' doesn't make sense?",
    "Did I say what display really means?",
    "Did I give Tess a better rule?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Tess believe?", placeholder: "In your own words, what is Tess's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Tess's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to find one more word that starts with dis- and test whether it means 'not.'";
