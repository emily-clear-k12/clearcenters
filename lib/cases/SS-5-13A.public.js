// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.13A, TEKS 5.13A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.13A, for example).

export const CAST = {
  edmund: { name: "Edmund Price", emoji: "👑", color: "#F59E0B", hint: "Sees the king and assumes the systems are the same." },
  gov: { name: "Governor Hale", emoji: "📜", color: "#3B82F6", hint: "Represents authority connected to the crown." },
  rebecca: { name: "Rebecca Ward", emoji: "🗳️", color: "#22C55E", hint: "Explains elected representation." },
  jonas: { name: "Jonas Reed", emoji: "🏘️", color: "#8B5CF6", hint: "Shows local self-government." },
  printer: { name: "Mrs. Bell", emoji: "🖨️", color: "#0D9488", hint: "Needs a comparison, not a one-word label." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.13A",
  title: "Who Gets the Final Say?",
  bigQuestion: "How were monarchy and representative government different in colonial America, and how could both forms of authority exist at the same time?",
  trapLine: "Because the English king had authority over the colonies, colonial governments were all basically monarchies and worked the same way.",
  evidenceBank: [
    "The English monarchy claimed authority over the colonies",
    "Some colonists elected representatives",
    "Some communities used local meetings to make decisions"
  ],
  coldOpenMessages: [
    { who: "system", text: "A colonial print shop is making a guide that compares ways colonies were governed." },
    { who: "edmund", text: "This comparison is easy: the king was in charge, so just write monarchy." },
    { who: "gov", text: "The crown did appoint officials and claim authority. That part is true." },
    { who: "rebecca", text: "Then why did colonists elect representatives to assemblies?" },
    { who: "jonas", text: "And why did some towns meet to make local decisions?" },
    { who: "edmund", text: "Those sound like small details under the king." },
    { who: "printer", text: "Maybe. Or maybe who chooses decision-makers is exactly the difference our guide needs to explain." }
  ],
  selfCheckQuestions: [
    "Did I explain that monarchy places political authority in a monarch or officials acting under the crown?",
    "Did I explain that representative government involves people choosing representatives to make decisions on their behalf?",
    "Did I use colonial evidence such as elected assemblies or local meetings?",
    "Did I compare where authority comes from and how decisions are made in the two systems?",
    "Did I avoid claiming that every colony worked exactly the same way or that colonial self-government included everyone equally?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Edmund believe about colonial government?", placeholder: "Record his claim..." },
  { key: "monarchy", label: "How does authority work in a monarchy?", placeholder: "Who holds or grants political authority?" },
  { key: "representative", label: "How does representative government work?", placeholder: "Who chooses representatives, and what do they do?" },
  { key: "local", label: "What evidence shows colonists practiced self-government?", placeholder: "Record assemblies or local decision-making evidence..." },
  { key: "compare", label: "How could royal authority and representative government both exist in colonial America?", placeholder: "Write the nuanced comparison..." }
];

export const PUSH_ANGLE = "Guidebook Repair: rewrite Edmund’s line “It was all monarchy” into a two-sentence guidebook explanation showing how royal authority and representative institutions could exist together.";
