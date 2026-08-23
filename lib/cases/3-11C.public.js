// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.11C).

export const CAST = {
  kip: { name: "Kip", emoji: "🥤", color: "#F59E0B", hint: "Thinks recycling covers everything." },
  cup: { name: "The Takeaway Cup", emoji: "🥤", color: "#8B5CF6", hint: "One of about 720." },
  bottle: { name: "The Reusable Bottle", emoji: "🧴", color: "#3B82F6", hint: "One item for the whole year." },
  pot: { name: "The Pencil Pot", emoji: "🖍️", color: "#22C55E", hint: "Was a jam jar last week." },
  tunde: { name: "Tunde", emoji: "🖌️", color: "#0D9488", hint: "Has two empty columns." }
};

export const PUBLIC_CASE = {
  standard: "3.11C",
  title: "It Is Fine, I Will Just Recycle It",
  bigQuestion: "Kip puts every cup in the blue bin. So why does the poster have two more columns?",
  trapLine: "I recycle it, so it doesn't matter how many I use.",
  evidenceBank: [
    "Kip uses about 4 paper cups a day, roughly 720 a year",
    "One reusable bottle is one item for the whole year",
    "A recycled cup still needs a truck, washing and remaking",
    "The jam jar used as a pencil pot needed no truck at all",
    "Recycling is better than binning, but it is not free"
  ],
  coldOpenMessages: [
    { who: "system", text: "A hall poster with three columns: REDUCE, REUSE, RECYCLE. Two of them are empty." },
    { who: "tunde", text: "I need one real example for each column. Kip, you go through a lot of cups — anything for the first two?" },
    { who: "kip", text: "I put every single one in the blue bin. That covers it." },
    { who: "cup", text: "That's the third column though. And there's about seven hundred and twenty of me a year." },
    { who: "bottle", text: "Whereas I'm one. One bottle. Washed each evening, used again every morning." },
    { who: "tunde", text: "One versus seven hundred and twenty. That's a different column entirely." },
    { who: "pot", text: "And I was a jam jar last week. Rinse, new job, done. No truck came anywhere near me." },
    { who: "kip", text: "The truck's coming anyway though. I recycle it, so it doesn't matter how many I use." }
  ],
  selfCheckQuestions: [
    "Did I name all three things on the poster?",
    "Did I give a real example for REDUCE?",
    "Did I give a real example for REUSE?",
    "Did I say what recycling still costs?",
    "Did I tell Tunde where recycling comes out of the three?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Kip believe?", placeholder: "In your own words, what is Kip's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Kip's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them take one more everyday item — a lunch bag, a pencil or a plastic fork — and give a reduce idea, a reuse idea and a recycle idea for it.";
