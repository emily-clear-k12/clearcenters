// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  ollie: { name: "Ollie the Outlet", emoji: "\ud83d\udd0c", color: "#F2A93B", hint: "Blamed first, but actually fine." },
  bo: { name: "Bo the Bulb", emoji: "\ud83d\udca1", color: "#EF4444", hint: "The actual broken link, hiding in the middle of the string." },
  cora: { name: "Cora the Cord", emoji: "\ud83d\udd17", color: "#7B5DFF", hint: "Already checked out fine \u2014 rules out one suspect." },
  testy: { name: "Testy the Tester", emoji: "\ud83d\udd0d", color: "#00C2C7", hint: "Has the pass/fail results, bulb by bulb." },
  grandma: { name: "Grandma Jo", emoji: "\ud83c\udf84", color: "#22C55E", hint: "Wants her porch lights fixed before the party." }
};

export const PUBLIC_CASE = {
  standard: "5.8B",
  title: "The Holiday Light String Mystery",
  bigQuestion: "Why won't the whole string of holiday lights turn on, even though the outlet clearly has power?",
  trapLine: "The lights won't turn on? Must be me \u2014 I'm always the one blamed first.",
  evidenceBank: [
    "Outlet tested with a different working lamp \u2014 power confirmed fine",
    "Cord tested separately \u2014 no breaks or shorts found",
    "Bulb-by-bulb tester run down the string: every bulb passes except Bulb 14",
    "Once Bulb 14 is replaced, the entire string lights up"
  ],
  coldOpenMessages: [
    { who: "system", text: "Grandma Jo's porch light string won't turn on, and everyone has a guess why." },
    { who: "grandma", text: "I need these lights working before the party tonight. What's wrong?" },
    { who: "ollie", text: "The lights won't turn on? Must be me \u2014 I'm always the one blamed first." },
    { who: "cora", text: "I already checked myself \u2014 no breaks, no shorts. I'm fine." },
    { who: "grandma", text: "Well something's wrong. Can we test it properly?" },
    { who: "testy", text: "Let's go bulb by bulb. Testing... testing... testing..." },
    { who: "testy", text: "Everything passes except... Bulb 14." },
    { who: "ollie", text: "The lights won't turn on? Must be me \u2014 I'm always the one blamed first." }
  ],
  selfCheckQuestions: [
    "Did I explain what a circuit actually needs to work?",
    "Did I use the outlet and cord test results as evidence?",
    "Did I identify what the tester actually found?",
    "Did I say whether it was fair to blame the outlet first?",
    "Did I explain why fixing one part fixed the whole string?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Ollie believe?", placeholder: "In your own words, what is Ollie's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Ollie's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students troubleshoot a new broken circuit (a toy or fan) using the same complete-path testing method.";
