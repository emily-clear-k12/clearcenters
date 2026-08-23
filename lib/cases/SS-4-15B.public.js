// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.15B, TEKS 4.15B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Wait-to-Vote", emoji: "⏳", color: "#F59E0B", hint: undefined },
  letter: { name: "Lena Letter Writer", emoji: "✉️", color: "#3B82F6", hint: undefined },
  service: { name: "Sam Service Project", emoji: "🧹", color: "#22C55E", hint: undefined },
  history: { name: "Holly Historic Preservation", emoji: "🏛️", color: "#8B5CF6", hint: undefined },
  synth: { name: "Rae Civic Action", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.15B",
  title: "Can One Citizen Make a Difference?",
  bigQuestion: "How can individuals voluntarily participate in state and local civic affairs?",
  trapLine: "If you are not old enough to vote, there is not much you can do to help your community.",
  evidenceBank: [
    "Citizens can write respectful letters to public officials about local or state issues.",
    "People can volunteer in service projects that improve their community.",
    "Citizens can help protect important historic places and respectfully hold officials accountable."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says civic participation mostly starts when people are old enough to vote. The class has to decide whether younger people and other citizens can still make a difference." },
    { who: "max", text: "If I can’t vote yet, what civic action can I really take?" },
    { who: "letter", text: "A clear, respectful letter can bring attention to a community concern." },
    { who: "service", text: "Service projects can improve a place directly, even without an election." },
    { who: "history", text: "Citizens have also worked to protect important places and community history." },
    { who: "synth", text: "The strongest civic action matches the problem to a useful way to participate." }
  ],
  selfCheckQuestions: [
    "Did I explain at least two ways individuals can voluntarily participate in civic affairs?",
    "Did I match the civic action to the problem or goal?",
    "Did I include a respectful way to communicate with or hold officials accountable?",
    "Did I include service or historic preservation as another form of participation?",
    "Did I explain why civic participation is not limited to voting?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "problem", label: "What community problem needs attention?", placeholder: "Name the issue..." },
  { key: "action1", label: "What is one civic action a person could take?", placeholder: "Letter? service? preservation?" },
  { key: "action2", label: "What is another possible action?", placeholder: "Use a different method..." },
  { key: "fit", label: "Which action best fits the problem, and why?", placeholder: "Match action to issue..." },
  { key: "claim", label: "Why is 'wait until you can vote' too limited?", placeholder: "Use the evidence..." }
];

export const PUSH_ANGLE = "Action Plan: choose a local issue and build a three-step civic participation plan.";
