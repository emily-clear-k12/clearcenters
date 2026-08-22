// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  cassidy: { name: "Cassidy the Candidate", emoji: "\ud83d\uddf3\ufe0f", color: "#F2A93B", hint: "Confident that recycling makes zero difference." },
  reed: { name: "Reed the Recycling Bin", emoji: "\u267b\ufe0f", color: "#22C55E", hint: "Has his own real, measurable impact data." },
  larry: { name: "Larry the Landfill", emoji: "\ud83d\uddd1\ufe0f", color: "#697386", hint: "Admits he's filling up faster without diversion." },
  batty: { name: "Batty the Battery", emoji: "\ud83d\udd0b", color: "#EF4444", hint: "Warns what happens if disposed of improperly." },
  diaz: { name: "Principal Diaz", emoji: "\ud83c\udfeb", color: "#7B5DFF", hint: "Needs real numbers before funding next year's program." }
};

export const PUBLIC_CASE = {
  standard: "5.11A",
  title: "The Campaign Against Recycling",
  bigQuestion: "Does a class recycling program actually make a real difference, or is it just for show?",
  trapLine: "Recycling bin, landfill, doesn't matter \u2014 same difference in the end.",
  evidenceBank: [
    "Recycling program data: 40% reduction in landfill waste over one year in the case community",
    "Recycling one ton of paper saves roughly 17 trees",
    "Landfill capacity tracked as filling up faster without diversion to recycling",
    "Proper battery disposal keeps chemicals out of the water supply (documented case)"
  ],
  coldOpenMessages: [
    { who: "system", text: "Cassidy is campaigning for student council and wants to cut the recycling program." },
    { who: "cassidy", text: "Recycling bin, landfill, doesn't matter \u2014 same difference in the end. Waste of time and money." },
    { who: "diaz", text: "That's a big claim. I need real numbers before I decide on next year's funding." },
    { who: "reed", text: "I've actually got data. Waste dropped 40% since the program started." },
    { who: "larry", text: "And I can confirm \u2014 I'm filling up a lot faster on the days stuff doesn't get diverted to him." },
    { who: "batty", text: "Don't forget me \u2014 dispose of me wrong and I leak straight into the water supply." },
    { who: "diaz", text: "That's a lot more than \"no difference.\"" },
    { who: "cassidy", text: "Recycling bin, landfill, doesn't matter \u2014 same difference in the end." }
  ],
  selfCheckQuestions: [
    "Did I use at least one specific number from the evidence?",
    "Did I name at least two of the three solution types?",
    "Did I explain why Cassidy's \"same difference\" claim doesn't hold up?",
    "Did I connect the solution to a real reduction in environmental impact?",
    "Did I recommend or affirm a specific solution as actually effective?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Cassidy believe?", placeholder: "In your own words, what is Cassidy's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Cassidy's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design one conservation, recycling, or proper-disposal solution for a resource used in their own classroom or home, and predict its measurable impact.";
