// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.11A).

export const CAST = {
  wendy: { name: "Wendy", emoji: "🌬️", color: "#22C55E", hint: "Says renewable settles it." },
  sol: { name: "The Solar Array", emoji: "🔆", color: "#F59E0B", hint: "Useless at 3am, and says so." },
  gen: { name: "The Generator", emoji: "⛽", color: "#6B7280", hint: "Always available, never replaceable." },
  log: { name: "The Wind Log", emoji: "📈", color: "#8B5CF6", hint: "Has the nine still nights." },
  radio: { name: "The Radio", emoji: "📻", color: "#3B82F6", hint: "Cannot have a dead window." },
  mara: { name: "Director Mara", emoji: "📋", color: "#0D9488", hint: "Won't sign without the trade-offs." }
};

export const PUBLIC_CASE = {
  standard: "4.11A",
  title: "Wendy Says Just Use Wind",
  bigQuestion: "The camp needs power at 3am in February. Which source can promise that, and what does each one cost to use?",
  trapLine: "Renewable means unlimited. Use me. There is no downside to discuss.",
  evidenceBank: [
    "Last February had 9 nights with almost no wind",
    "Solar gives about 4 usable hours a day in midwinter, none at 3am",
    "The generator runs any hour in any weather",
    "Diesel has to be trucked in and can't be replaced once burned",
    "The radio can't have a four-hour dead window"
  ],
  coldOpenMessages: [
    { who: "system", text: "Cedar Camp is off the grid. The medical cabin radio must be able to transmit every hour of every night, including 3am in February." },
    { who: "mara", text: "I sign this plan today. I'm not signing anything until somebody names a disadvantage for each option." },
    { who: "radio", text: "Mine is simple and I'll keep saying it. Able to transmit, at any hour. A four-hour dead window means nobody gets called." },
    { who: "sol", text: "Then I should be honest early. Summer, I'm your best option by a distance. Midwinter I manage about four usable hours." },
    { who: "sol", text: "None of which are at three in the morning. In any season. Ever." },
    { who: "log", text: "I have Wendy's nightly figures. Last February there were nine nights where her output was very close to zero." },
    { who: "gen", text: "I'd run all nine. Any hour, any weather. That's the whole of my pitch, and I know how I'm regarded around here." },
    { who: "mara", text: "And your disadvantage, out loud, please." },
    { who: "gen", text: "Diesel gets trucked in. It burns once. It does not come back. There won't be more of it made in your lifetime." },
    { who: "wendy", text: "Which is precisely why you should just use me. Renewable means unlimited. Use me. There is no downside to discuss." }
  ],
  selfCheckQuestions: [
    "Did I sort the sources into renewable and nonrenewable?",
    "Did I use the still February nights or the 3am problem?",
    "Did I name an advantage for a source other than wind?",
    "Did I name a disadvantage for the generator as well?",
    "Did I answer what 'renewable' actually means, for Wendy?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Wendy believe?", placeholder: "In your own words, what is Wendy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Wendy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them choose a source for a different camp building — the summer-only dining hall — and say which advantages and disadvantages change when the job changes.";
