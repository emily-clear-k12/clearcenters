// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.12D, TEKS 5.12D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.12D, for example).

export const CAST = {
  tori: { name: "Tori Lane", emoji: "🛠️", color: "#F59E0B", hint: "Prefers one-worker, whole-product craftsmanship." },
  dev: { name: "Dev Patel", emoji: "⏱️", color: "#3B82F6", hint: "Tracks time and workflow." },
  lena: { name: "Lena Ortiz", emoji: "🔩", color: "#22C55E", hint: "Explains specialization." },
  malik: { name: "Malik Brooks", emoji: "🔗", color: "#8B5CF6", hint: "Explains division of labor." },
  mina: { name: "Ms. Mina Cho", emoji: "📈", color: "#0D9488", hint: "Needs a scalable production plan." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.12D",
  title: "The 500-Order Disaster",
  bigQuestion: "How can mass production, specialization, and division of labor help an economy grow?",
  trapLine: "The fastest way to make 500 products is for every worker to build each product from start to finish.",
  evidenceBank: [
    "The order is for 500 identical lunch boxes",
    "Workers lose time switching tools and tasks",
    "The old method works better for small custom orders"
  ],
  coldOpenMessages: [
    { who: "system", text: "BrightBox Workshop has received an order for 500 identical lunch boxes and has far less time than usual." },
    { who: "tori", text: "No panic. Everyone just builds boxes the normal way, one at a time." },
    { who: "dev", text: "The normal way includes a lot of switching tools and resetting workstations." },
    { who: "lena", text: "I am much faster at attaching hinges than at every other step." },
    { who: "malik", text: "What if the work moved through stations instead of each worker restarting every step?" },
    { who: "tori", text: "That sounds repetitive, not better." },
    { who: "mina", text: "Maybe. But we need to know whether it increases output and why that matters for growth." }
  ],
  selfCheckQuestions: [
    "Did I explain what specialization means in this production system?",
    "Did I explain how division of labor separates and coordinates tasks?",
    "Did I explain how those changes make mass production of many identical products more efficient?",
    "Did I connect increased output or efficiency to economic growth?",
    "Did I acknowledge at least one tradeoff, such as repetitive work, training needs, or reduced customization?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "old", label: "What problem does the old production method create for a large order?", placeholder: "Record evidence about time or task switching..." },
  { key: "special", label: "How could specialization change the work?", placeholder: "Who focuses on what task, and why?" },
  { key: "division", label: "How could division of labor organize the process?", placeholder: "Describe how separate jobs fit together..." },
  { key: "mass", label: "How do these ideas support mass production?", placeholder: "Connect the system to making many identical products..." },
  { key: "growth", label: "How can increased production support economic growth, and what is one tradeoff?", placeholder: "Explain the benefit and one limitation..." }
];

export const PUSH_ANGLE = "Workflow Redesign: create a four-step production line for the lunch boxes and explain how each step demonstrates specialization or division of labor.";
