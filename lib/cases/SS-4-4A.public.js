// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.4A, TEKS 4.4A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  noah: { name: "Noah Back-to-Normal", emoji: "↩️", color: "#F59E0B", hint: undefined },
  war: { name: "Willa War Impact", emoji: "⚔️", color: "#EF4444", hint: undefined },
  freedom: { name: "Freddie Freedom File", emoji: "🔓", color: "#22C55E", hint: undefined },
  rebuild: { name: "Rina Reconstruction", emoji: "🏛️", color: "#3B82F6", hint: undefined },
  synth: { name: "Cal Change Tracker", emoji: "📊", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.4A",
  title: "The War Ended. Did Texas Change?",
  bigQuestion: "How did the Civil War and Reconstruction change life in Texas?",
  trapLine: "The Civil War ended, so Texas quickly went back to the way it was before.",
  evidenceBank: [
    "The Civil War caused loss, economic disruption, and political change in Texas.",
    "Slavery ended, creating a major change in law and life.",
    "Texas had to rebuild government and society while new laws and political conflicts reshaped the state."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student says Reconstruction was just the time when Texas returned to normal after the Civil War. The class has to test whether 'back to normal' fits the evidence." },
    { who: "noah", text: "If the war was over, wouldn’t Texas just go back to normal?" },
    { who: "war", text: "War leaves effects even after the fighting stops." },
    { who: "freedom", text: "Ending slavery was not a return to the old system—it was a major change." },
    { who: "rebuild", text: "Texas had to rebuild its government and work through new laws and political conflicts." },
    { who: "synth", text: "To test 'back to normal,' compare life before and after the war." }
  ],
  selfCheckQuestions: [
    "Did I explain at least one impact of the Civil War on Texas?",
    "Did I explain why the end of slavery was a major change?",
    "Did I explain that Reconstruction involved rebuilding government or society?",
    "Did I compare Texas before and after the war?",
    "Did I explain why Texas did not simply return to the way it had been before the war?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Noah claiming?", placeholder: "State the back-to-normal idea..." },
  { key: "war", label: "What impact did the Civil War have on Texas?", placeholder: "Use loss/economy/politics evidence..." },
  { key: "freedom", label: "What major change came with the end of slavery?", placeholder: "Explain the change..." },
  { key: "recon", label: "What did Reconstruction require Texas to rebuild or change?", placeholder: "Use government/society evidence..." },
  { key: "conclusion", label: "Why is 'back to normal' inaccurate?", placeholder: "Compare before and after..." }
];

export const PUSH_ANGLE = "Before/After Board: write three changes that make 'back to normal' an inaccurate description.";
