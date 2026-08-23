// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.13B, TEKS 3.13B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  mia: { name: "Mia One-Person", emoji: "1️⃣", color: "#F59E0B", hint: undefined },
  computer: { name: "Cody Computer", emoji: "💻", color: "#3B82F6", hint: undefined },
  health: { name: "Holly Health", emoji: "🥛", color: "#22C55E", hint: undefined },
  ripple: { name: "Riley Ripple", emoji: "🔗", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.13B",
  title: "It Helped More Than One Person",
  bigQuestion: "How can a scientific breakthrough or new technology affect a whole community?",
  trapLine: "A new technology mainly helps the person who uses it first.",
  evidenceBank: [
    "Computers can help students learn, businesses organize work, and people communicate.",
    "Pasteurization can make some foods and drinks safer by reducing harmful microorganisms.",
    "Vaccines can protect individuals and can also reduce the spread of some diseases in communities."
  ],
  coldOpenMessages: [
    { who: "system", text: "A community newspaper is making an 'Impact Chain' for a new technology. One student draws only one arrow from the invention to the first person who uses it." },
    { who: "mia", text: "If one person uses the invention, isn’t that where the effect ends?" },
    { who: "computer", text: "One computer can connect to learning, jobs, and communication." },
    { who: "health", text: "Some discoveries affect health beyond just one person." },
    { who: "ripple", text: "Look for the ripple: person, group, then community." }
  ],
  selfCheckQuestions: [
    "Did I identify a scientific breakthrough or technology?",
    "Did I explain one direct effect?",
    "Did I explain an effect on a group or organization?",
    "Did I explain a broader community effect?",
    "Did I explain why the impact can spread beyond one user?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "direct", label: "What is one direct effect of the breakthrough or technology?", placeholder: "Who uses it first?" },
  { key: "group", label: "How could a group benefit?", placeholder: "School? business? families?" },
  { key: "community", label: "How could the whole community be affected?", placeholder: "Think beyond one person..." },
  { key: "claim", label: "Why doesn't the effect stop with the first user?", placeholder: "Trace the ripple..." }
];

export const PUSH_ANGLE = "Impact Chain Add-On: add one new arrow showing an effect the first newspaper draft missed.";
