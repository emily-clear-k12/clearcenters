// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.3E, TEKS 4.3E).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia Problem-Solved", emoji: "✅", color: "#F59E0B", hint: undefined },
  annex: { name: "Alex Annexation File", emoji: "🇺🇸", color: "#3B82F6", hint: undefined },
  border: { name: "Bella Border File", emoji: "🗺️", color: "#EF4444", hint: undefined },
  war: { name: "Will War File", emoji: "⚔️", color: "#8B5CF6", hint: undefined },
  impact: { name: "Inez Impact Map", emoji: "📍", color: "#22C55E", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.3E",
  title: "Texas Joins the United States — Problem Solved?",
  bigQuestion: "How did annexation change Texas, and how was it connected to the U.S.-Mexican War?",
  trapLine: "Once Texas joined the United States, the Texas-Mexico conflict was over.",
  evidenceBank: [
    "Texas was annexed by the United States in 1845.",
    "Mexico had not accepted Texas independence and disputes over the border continued.",
    "The U.S.-Mexican War changed control of large areas of land and reshaped the region."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student makes a timeline ending with '1845: Texas joins the United States. Problem solved.' The class has to decide whether the story really ends there." },
    { who: "mia", text: "If Texas joined the United States, why would there still be a conflict?" },
    { who: "annex", text: "Annexation changed Texas's political status." },
    { who: "border", text: "Joining the United States did not erase the disagreement over Texas." },
    { who: "war", text: "The conflict grew instead of simply disappearing." },
    { who: "impact", text: "To judge annexation, look at what changed next—not just the date Texas joined." }
  ],
  selfCheckQuestions: [
    "Did I explain what annexation meant for Texas?",
    "Did I explain that disputes with Mexico continued after annexation?",
    "Did I connect annexation and border tensions to the U.S.-Mexican War?",
    "Did I explain at least one impact of the war on the region?",
    "Did I explain why annexation did not immediately solve every conflict?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "event", label: "What changed when Texas was annexed?", placeholder: "Explain the political change..." },
  { key: "problem", label: "What problem still remained?", placeholder: "Use the dispute evidence..." },
  { key: "war", label: "How was annexation connected to the U.S.-Mexican War?", placeholder: "Explain the link..." },
  { key: "impact", label: "What changed because of the war?", placeholder: "Use the map/territory evidence..." },
  { key: "claim", label: "Why is 'problem solved' too simple?", placeholder: "Connect annexation to later events..." }
];

export const PUSH_ANGLE = "Timeline Repair: add two events after 'Texas joins the United States' that show what happened next.";
