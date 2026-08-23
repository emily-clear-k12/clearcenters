// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.11C).

export const CAST = {
  rigby: { name: "Rigby", emoji: "🚜", color: "#F59E0B", hint: "Wants the shorter drive." },
  gran: { name: "The Granite Core", emoji: "⬛", color: "#6B7280", hint: "Nowhere inside for water to sit." },
  sand: { name: "The Sandstone Core", emoji: "🟨", color: "#F59E0B", hint: "Full of connected pore spaces." },
  lens: { name: "The Hand Lens", emoji: "🔍", color: "#8B5CF6", hint: "Shows the gaps, or the lack of them." },
  scale: { name: "The Scale", emoji: "⚖️", color: "#22C55E", hint: "One core gained 58 g. One gained none." },
  yara: { name: "Yara", emoji: "🧑‍🌾", color: "#0D9488", hint: "Pays for one well, wants it right." }
};

export const PUBLIC_CASE = {
  standard: "4.11C",
  title: "Rigby Wants to Drill Here",
  bigQuestion: "Both sites have rock under them. Why can one of them store water and the other can't?",
  trapLine: "Rock is rock. Water's underground everywhere. I'll drill here, it's closer, let's go.",
  evidenceBank: [
    "The granite core had no visible spaces between the crystals",
    "The sandstone core had visible connected gaps between its grains",
    "Water ran straight off the granite and left it dry underneath",
    "The sandstone went from 410 g dry to 468 g soaked",
    "The granite weighed 612 g before and 612 g after soaking"
  ],
  coldOpenMessages: [
    { who: "system", text: "One well, one attempt, two possible sites. The near field is a twenty-minute shorter drive than the far one." },
    { who: "rigby", text: "Near field. Twenty minutes closer, and there's rock under both. Let's go." },
    { who: "yara", text: "I'm paying for one well, Rigby. Not the closer one. The one with water." },
    { who: "lens", text: "Then somebody should look at these two cores, because they are not the same thing at all." },
    { who: "lens", text: "Near field: crystals locked together, no visible spaces anywhere. Far field: rounded grains with real gaps between them." },
    { who: "sand", text: "That's me. And my gaps join up — water doesn't just sit on my surface, it moves through me." },
    { who: "gran", text: "Whereas I'm solid through. Nothing against water. There's simply nowhere in me for it to be." },
    { who: "yara", text: "Somebody poured water on both, didn't they?" },
    { who: "scale", text: "They did. Sandstone: 410 grams dry, 468 soaked. Granite: 612 dry, 612 soaked. Not one gram." },
    { who: "rigby", text: "Which I'd say proves my point about it being a wet year. Rock is rock. Water's underground everywhere. I'll drill here, it's closer, let's go." }
  ],
  selfCheckQuestions: [
    "Did I name what's inside one rock that isn't inside the other?",
    "Did I say why the spaces have to connect to each other?",
    "Did I use the dry and soaked masses?",
    "Did I use what happened when water was poured on each core?",
    "Did I answer Rigby's claim that rock is just rock?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Rigby believe?", placeholder: "In your own words, what is Rigby's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Rigby's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them decide which of the two rocks they'd want directly beneath a landfill liner instead, and explain why the better rock for a well is the worse rock for that job.";
