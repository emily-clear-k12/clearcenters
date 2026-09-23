// Safe to import from client components.
// Assembly Deck — ELA.5.12C-AD. TEKS 5.12C — "compose argumentative texts,
// including opinion essays, using genre characteristics and craft" — with
// 5.11B(i), "organizing with purposeful structure, including an introduction,
// transitions, and a conclusion." Quoted from Emily's official ELAR TEKS PDF
// (Grades 3-5, verified Sept 20, 2026).
// Three rounds of four slots, then assembly. Runs about 22 minutes.

export const PUBLIC_CASE = {
  standard: "ELA.5.12C-AD",
  mode: "paragraph",
  grade: 5,
  subject: "ELAR",
  title: "The Case for Later Practice",
  estimatedMinutes: 20,
  brief: [
    "The athletic director is deciding whether to move fifth-grade practice from 7:00 a.m. to after school. She will read one argument from each side.",
    "Yours argues for the later time. A real argument needs a claim with evidence, an honest answer to the other side, and a specific ask.",
    "Build all three paragraphs, sort out what would weaken the argument, then set the order.",
  ],
  source: {
    title: "SURVEY AND RESEARCH PACKET",
    lines: [
      "Of 84 fifth graders surveyed, 61 said they eat nothing before 7:00 a.m. practice.",
      "Morning practice attendance averages 68 percent. After-school practice last spring averaged 91 percent.",
      "The school day starts at 8:10 a.m.",
      "The gym is booked by middle school teams until 4:30 p.m. on Tuesdays and Thursdays.",
      "Four families told the coach an after-school time would create a pickup problem for younger siblings.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "The claim and the data behind it",
      goal: "Build the paragraph that states what you want and shows why the data supports it.",
      slots: [
        { id: "topic", label: "Claim", hint: "What are you arguing for?", accepts: 1 },
        { id: "evidence", label: "Evidence from the packet", hint: "Two pieces of real data", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why that data supports the claim", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What this paragraph establishes", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "Fifth-grade practice should move from 7:00 a.m. to after school." },
        { id: "r1p2", text: "Of 84 fifth graders surveyed, 61 said they eat nothing at all before morning practice." },
        { id: "r1p3", text: "Morning practice attendance averages 68 percent. After-school practice averaged 91 percent last spring." },
        { id: "r1p4", text: "Players who arrive fed get more out of the same hour. The 23-point attendance gap shows far more of them can make an after-school time." },
        { id: "r1p5", text: "A practice needs players present and able to work. On both counts, our own numbers favor the later time." },
        { id: "r1p6", text: "Morning practice is the worst idea anyone has ever had." },
        { id: "r1p7", text: "Almost every fifth grader eats a full breakfast before morning practice." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "anecdote", "offtopic"],
    },
    {
      id: "r2",
      label: "The other side, answered",
      goal: "Build the paragraph that takes the strongest objection seriously and answers it.",
      slots: [
        { id: "topic", label: "The objection", hint: "Name the best argument against you", accepts: 1 },
        { id: "evidence", label: "Evidence from the packet", hint: "Two facts that make the objection real", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why the objection does not sink the claim", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "Where that leaves the objection", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The strongest argument against moving practice is that afternoons are already crowded." },
        { id: "r2p2", text: "The gym is booked by middle school teams until 4:30 on Tuesdays and Thursdays." },
        { id: "r2p3", text: "Four families told the coach an after-school time would create a pickup problem for younger siblings." },
        { id: "r2p4", text: "Both are scheduling problems with scheduling answers: a 4:30 start on two days, and a carpool for the four families who asked." },
        { id: "r2p5", text: "The objection is real. But it argues for a careful schedule, not for a 7:00 a.m. practice that a third of the team misses." },
        { id: "r2p6", text: "People who want morning practice just do not care about kids." },
        { id: "r2p7", text: "No family raised any concern about an after-school time." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "anecdote", "offtopic"],
    },
    {
      id: "r3",
      label: "The ask",
      goal: "Build the paragraph that tells the athletic director exactly what to do.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What are you asking for, specifically?", accepts: 1 },
        { id: "evidence", label: "Evidence", hint: "Two details that make the ask workable", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why this version is worth trying", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "A closing line that leaves the decision clear", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "Move fifth-grade practice to 3:30 p.m., with a 4:30 start on Tuesdays and Thursdays." },
        { id: "r3p2", text: "That schedule works around the middle school gym bookings without losing a single practice day." },
        { id: "r3p3", text: "It also gives the four families with pickup concerns a fixed time to plan around." },
        { id: "r3p4", text: "If attendance climbs toward 91 percent, the team gains several extra practices a month without adding an hour to anyone's day." },
        { id: "r3p5", text: "One season would show whether the numbers hold. If they do not, move practice back." },
        { id: "r3p6", text: "My cousin's school practices after lunch and they won a championship." },
        { id: "r3p7", text: "Everyone already agrees this change should happen." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["anecdote", "unsupported", "contradicts", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one argument. What order should the athletic director read them in?",
    hint: "An argument earns the right to ask for something. Answering the objection before making the ask is what makes the ask hard to refuse.",
    slots: [
      { id: "first", label: "Opens the argument" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the argument" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "Tap the one sentence in your argument that names the strongest objection to your own proposal.",
      hint: "An argument that never states the other side has not answered it.",
    },
    quickCheck: {
      prompt: "Why does the argument report the 23-point attendance gap instead of just saying attendance is better?",
      choices: [
        { id: "a", text: "It is evidence a skeptical reader can check." },
        { id: "b", text: "It makes the paragraph longer." },
        { id: "c", text: "It shows the writer is on the team." },
        { id: "d", text: "It proves the coach is wrong about everything." },
      ],
    },
  },
  explain: {
    prompt: "Write two or three sentences to the athletic director: your argument spends a whole paragraph on the case against you. Explain why that paragraph makes the argument stronger, not weaker.",
    criteria: [
      "Name the objection your report takes seriously.",
      "Say how the report answers it.",
      "Say what a reader would think if the report had left the objection out.",
    ],
  },
  board: null,
};
