// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  milo: { name: "Milo the Messy Scientist", emoji: "\ud83e\uddd1\u200d\ud83d\udd2c", color: "#F2A93B", hint: "Changed three things at once and is sure he knows why." },
  zoe: { name: "Zoe the Careful Contestant", emoji: "\u2708\ufe0f", color: "#7B5DFF", hint: "Models what a real fair test looks like." },
  nia: { name: "Nia the Notebook", emoji: "\ud83d\udcd3", color: "#697386", hint: "Has the actual trial-by-trial data." },
  ana: { name: "Ana the Airplane", emoji: "\ud83d\udee9\ufe0f", color: "#00C2C7", hint: "Confused why her own results keep changing." },
  grant: { name: "Coach Grant", emoji: "\ud83c\udfc6", color: "#22C55E", hint: "Needs a legitimate winner for the contest." }
};

export const PUBLIC_CASE = {
  standard: "5.7B",
  title: "The Paper Airplane Contest",
  bigQuestion: "If you want to know whether fold style changes how far a paper airplane flies, what do you actually have to keep the same?",
  trapLine: "I tested it \u2014 I used a different fold AND threw harder AND switched paper weight all at once. Now I know thicker paper flies farther!",
  evidenceBank: [
    "Milo's trial 1: dart fold, gentle throw, thin paper \u2192 8 ft",
    "Milo's trial 2: glider fold, hard throw, thick paper \u2192 22 ft",
    "Three variables changed at once, so no single factor can be credited",
    "Fair-test example: same fold, same throw force, only paper weight changes across 3 trials \u2192 10 ft, 9 ft, 7 ft"
  ],
  coldOpenMessages: [
    { who: "system", text: "The paper airplane contest is underway, and Milo just posted his \"results.\"" },
    { who: "milo", text: "I tested it \u2014 different fold, threw harder, AND switched to thicker paper. Thicker paper wins, case closed!" },
    { who: "ana", text: "Wait, but I flew totally differently each time. How do we know which part actually mattered?" },
    { who: "grant", text: "Good question. I can't hand out a fair prize if the test wasn't fair." },
    { who: "zoe", text: "I kept my fold and throw exactly the same and only changed the paper. Want to see?" },
    { who: "nia", text: "Her three trials: 10 feet, 9 feet, 7 feet. Only the paper weight changed each time." },
    { who: "milo", text: "I tested it \u2014 I used a different fold AND threw harder AND switched paper weight all at once. Now I know thicker paper flies farther!" }
  ],
  selfCheckQuestions: [
    "Did I identify which single thing should be the only thing that changes?",
    "Did I name at least two things that need to stay the same?",
    "Did I explain why Milo's test can't actually prove what he thinks it proves?",
    "Did I use Zoe's fair-test data as the better example?",
    "Did I state the one-variable-at-a-time rule?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Milo believe?", placeholder: "In your own words, what is Milo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Milo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design their own fair test for a balloon rocket on a string, choosing one variable to change (breath amount) while keeping others (string length, angle) constant.";
