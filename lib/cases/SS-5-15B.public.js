// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.15B, TEKS 5.15B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.15B, for example).

export const CAST = {
  president: { name: "President Parker", emoji: "🏛️", color: "#F59E0B", hint: "Thinks a presidential yes ends the process." },
  congress: { name: "Casey Congress", emoji: "📜", color: "#3B82F6", hint: "Owns legislative checks." },
  court: { name: "Justice Jay", emoji: "⚖️", color: "#8B5CF6", hint: "Owns judicial review idea." },
  balance: { name: "Bree Balance", emoji: "🔄", color: "#22C55E", hint: "Connects checks to limiting power." },
  clerk: { name: "Mr. Reed", emoji: "🗂️", color: "#0D9488", hint: "Needs a correct civics explainer." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.15B",
  title: "The President Said Yes. Case Closed?",
  bigQuestion: "If the president approves something, is the decision automatically final, or can other branches still check that power?",
  trapLine: "The president said yes, so the other branches cannot do anything about it.",
  evidenceBank: [
    "The president can sign or veto legislation.",
    "Congress can override a presidential veto with enough votes.",
    "Courts can review laws or government actions for constitutionality."
  ],
  coldOpenMessages: [
    { who: "system", text: "A city youth-civics office printed a poster that says, “The president said yes. Case closed.” The team must decide whether that description of U.S. government is accurate." },
    { who: "president", text: "The president said yes, so the other branches cannot do anything about it." },
    { who: "congress", text: "Congress writes laws, but our power is not unlimited either." },
    { who: "court", text: "A law can still be examined against the Constitution." },
    { who: "balance", text: "The point is not stopping government. It is preventing one part from controlling everything." },
    { who: "clerk", text: "I need a diagram caption showing at least two checks and the reason the system exists." }
  ],
  selfCheckQuestions: [
    "Did I explain that each branch has powers and limits?",
    "Did I describe at least one check involving the president and Congress?",
    "Did I describe a judicial check or another valid branch limit?",
    "Did I explain why checks and balances prevent too much power in one branch?",
    "Did I clearly reject the idea that one branch gets the final word on everything?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does President Parker assume?", placeholder: "State the claim..." },
  { key: "check1", label: "What is one check another branch can use?", placeholder: "Name the branch and the check..." },
  { key: "check2", label: "What is a second check or limit?", placeholder: "Use a different relationship..." },
  { key: "purpose", label: "Why does the system include these checks?", placeholder: "Explain the purpose..." },
  { key: "judgment", label: "Does “the president said yes” mean case closed? Why?", placeholder: "Use the evidence to decide..." }
];

export const PUSH_ANGLE = "Power Map Repair: draw or write two arrows showing one branch checking another, then explain why those arrows matter.";
