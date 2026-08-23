// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.4D, TEKS 5.4D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.4D, for example).

export const CAST = {
  evan: { name: "Evan Brooks", emoji: "📋", color: "#F59E0B", hint: "Keeps putting each cause in a separate box." },
  maya: { name: "Maya Torres", emoji: "🗺️", color: "#3B82F6", hint: "Tracks why new territory kept reopening the slavery debate." },
  james: { name: "James Carter", emoji: "📰", color: "#22C55E", hint: "Sees the slavery debate splitting along regional lines." },
  priya: { name: "Priya Shah", emoji: "⚖️", color: "#8B5CF6", hint: "Asks what the states’ rights argument was actually about." },
  reed: { name: "Dr. Lena Reed", emoji: "🏛️", color: "#0D9488", hint: "Won’t approve an exhibit that hides the connections." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.4D",
  title: "The Cause File",
  bigQuestion: "Were slavery, sectionalism, and states' rights three separate causes of the Civil War, or did conflict over the expansion of slavery connect them?",
  trapLine: "Slavery was one issue, states' rights was another, and sectionalism was a third. They were separate causes, so no one issue was central.",
  evidenceBank: [
    "New western territories reopened arguments over slavery",
    "Regional positions on slavery grew farther apart",
    "States’ rights arguments often involved laws protecting or limiting slavery"
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum exhibit team is reviewing a wall called “Why the Nation Split.” The captions must be accurate before the exhibit opens." },
    { who: "reed", text: "Evan, walk us through your design." },
    { who: "evan", text: "Easy. Three equal boxes: SLAVERY, STATES’ RIGHTS, SECTIONALISM. Three separate causes." },
    { who: "maya", text: "Then where do I put all the arguments about whether slavery could expand into new western territories?" },
    { who: "evan", text: "In the slavery box." },
    { who: "priya", text: "Some of my states’ rights documents are arguing about who could protect or limit slavery." },
    { who: "james", text: "And my regional newspapers keep dividing over the slavery question." },
    { who: "evan", text: "That still sounds like three issues to me." },
    { who: "reed", text: "Or one issue may be running through the others. We need to prove which explanation fits the evidence." }
  ],
  selfCheckQuestions: [
    "Did I explain why the expansion of slavery became a repeated national conflict?",
    "Did I explain how disagreement over slavery contributed to sectionalism between regions?",
    "Did I explain how states’ rights disagreements in this case were connected to slavery?",
    "Did I explain the central role of the slavery expansion conflict in the road to the Civil War?",
    "Did I avoid treating slavery, sectionalism, and states’ rights as three unrelated causes?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Evan claiming about the causes?", placeholder: "Describe his three-separate-box explanation..." },
  { key: "expansion", label: "What does the evidence show about the expansion of slavery?", placeholder: "Record what Maya finds about new territories..." },
  { key: "sectionalism", label: "How did the slavery debate contribute to sectionalism?", placeholder: "Use James’s regional evidence..." },
  { key: "states_rights", label: "How did slavery connect to states’ rights disagreements?", placeholder: "Ask what the government dispute was actually about..." },
  { key: "judgment", label: "Does the three-separate-box model hold up? Why or why not?", placeholder: "Explain the relationship among the causes..." }
];

export const PUSH_ANGLE = "Exhibit Redesign: replace Evan’s three separate boxes with a visual or written model that shows how the expansion of slavery connects to sectionalism and states’ rights conflict, then write a new one-sentence exhibit caption.";
