// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.10C).

export const CAST = {
  rue: { name: "Rue", emoji: "🖼️", color: "#F59E0B", hint: "Thinks the photos got mixed up." },
  post: { name: "The Fence Post", emoji: "🪵", color: "#22C55E", hint: "Standing in both photos." },
  hill: { name: "Cedar Hill", emoji: "⛰️", color: "#8B5CF6", hint: "Green on Friday. Scarred on Tuesday." },
  log: { name: "The Quake Log", emoji: "📉", color: "#EF4444", hint: "Has the line for Tuesday, 3:14 am." },
  anaya: { name: "Anaya", emoji: "✍️", color: "#0D9488", hint: "Writing the caption for the hall." }
};

export const PUBLIC_CASE = {
  standard: "3.10C",
  title: "That Cannot Be the Same Hill",
  bigQuestion: "The two photos are three days apart and the same fence post is in both. How did the hill change that much, that fast?",
  trapLine: "Land doesn't change like that. That's a different hill. Somebody's mixed the photos up.",
  evidenceBank: [
    "The two photos were taken three days apart",
    "The same fence post is in both, with the same broken rail",
    "A magnitude 4.9 earthquake happened at 3:14 am on the Tuesday",
    "About 200 metres of hillside slid down",
    "The road was closed by lunchtime that same day"
  ],
  coldOpenMessages: [
    { who: "system", text: "Two photographs of Cedar Hill, pinned side by side, waiting for a caption." },
    { who: "anaya", text: "Rue, I need the caption by four. What happened to this hill?" },
    { who: "rue", text: "Nothing happened to it, because that's not the same hill. Land doesn't change like that." },
    { who: "hill", text: "It is me, though. Both of them. Green on the Friday, and rather less green after Tuesday." },
    { who: "post", text: "I'm in both photos. Same spot, same lean, same snapped top rail. Have a proper look." },
    { who: "anaya", text: "...the timestamps are three days apart." },
    { who: "log", text: "And I've got a line for the Tuesday. Magnitude 4.9. Three fourteen in the morning." },
    { who: "rue", text: "Three days is nothing. Land doesn't change like that. That's a different hill. Somebody's mixed the photos up." }
  ],
  selfCheckQuestions: [
    "Did I prove the two photos show the same place?",
    "Did I say how far apart the photos were taken?",
    "Did I name what caused the change?",
    "Did I give a number for how much of the hill moved?",
    "Did I answer Rue's idea that land only changes slowly?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Rue believe?", placeholder: "In your own words, what is Rue's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Rue's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out what a third photo taken a year later might show, and say which changes in that year would be fast ones and which would be slow.";
