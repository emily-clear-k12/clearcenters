// Mission Map — "Theme Evidence Escape" — Grade 5 ELAR.
//
// From the library concept ELAR 5.3. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 5), per rule 11: **5.8A — "infer multiple themes within a
// text using text evidence."**
//
// Note the word MULTIPLE. The library concept is about ranking evidence for ONE
// theme claim; on its own that would under-reach 5.8A. So cp5 adds a second
// theme the same story supports (mistakes can become chances to grow), with its
// own evidence, and the final response asks for both. That is the one place
// this case goes beyond the library, and it is there to meet the standard's
// own wording.
//
// The trap is the library's: evidence that is TRUE but only retells plot (the
// team finished fourth). It is set against the turning-point realization in a
// showdown. The library's "strength meter" ranking was deliberately not built
// as a sequence checkpoint — ranking the two middle items is arguable, and a
// checkpoint must have one defensible answer.
//
// Also covered by Signal Check (ELA.5.8A).

export const PUBLIC_CASE = {
  standard: "5.15-MM",
  teksLabel:
    "TEKS 5.8A — Inferring Multiple Themes with Text Evidence (Texas Grade 5 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "ELAR",
  title: "Theme Evidence Escape",
  tagline: "Not all true evidence is strong evidence. Only the strongest gets you out.",

  mission: {
    briefText:
      "You are locked in the Evidence Room with a story about a relay race and a theme claim on the wall. The exit only opens for evidence strong enough to prove a lesson, not just to retell what happened. Weigh every piece carefully, and watch for a second lesson hiding in the same story.",
    goal: "Choose the strongest evidence for a theme, reject evidence that only retells the plot, and recognize that one story can support more than one theme.",
  },

  mapImage: "/mission-map/5-15-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Exit 1: Read the theme claim on the wall. What kind of statement is it?",
      evidence: {
        type: "passage",
        label: "THE THEME CLAIM",
        text: "\"Caring about your teammates matters more than winning.\"",
      },
      choices: [
        { id: "a", text: "A lesson about life that a story can teach" },
        { id: "b", text: "An event that happens in the story" },
        { id: "c", text: "A description of the setting" },
        { id: "d", text: "A fact that can be looked up in a book" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The claim is a theme: a lesson about life, not an event from the story.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Exit 2: Read the story. Which piece of evidence most strongly supports the theme claim?",
      evidence: {
        type: "passage",
        label: "THE STORY",
        text: "Priya was the fastest runner on her relay team. During the final handoff, Ava dropped the baton, and the team finished fourth. Priya stormed off the track, furious. Then she noticed Ava sitting alone behind the bleachers, wiping her eyes. Priya thought, She feels even worse than I do. She sat down beside Ava and said, \"We'll practice handoffs together every day until we get it right.\" That night, Priya wrote in her journal: Winning felt good last year. Helping Ava felt better.",
      },
      choices: [
        { id: "a", text: "The team finished fourth." },
        { id: "b", text: "Priya was the fastest runner on her team." },
        { id: "c", text: "Priya's journal: \"Winning felt good last year. Helping Ava felt better.\"" },
        { id: "d", text: "Ava dropped the baton." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Strongest evidence: \"Winning felt good last year. Helping Ava felt better.\" Priya states the lesson herself.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Exit 3: Why is the journal entry such strong evidence?",
      evidence: {
        type: "passage",
        label: "EVIDENCE TEST",
        text: "Strong theme evidence shows a lesson, a change, or an important realization.",
      },
      choices: [
        { id: "a", text: "It is the last sentence in the story." },
        { id: "b", text: "It shows Priya realizing that helping her teammate mattered more to her than winning." },
        { id: "c", text: "It mentions last year." },
        { id: "d", text: "It is the longest sentence." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The journal entry shows what Priya learned. It compares winning and helping directly, and helping wins.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Exit 4: Two cadets each offer one more piece of evidence for the theme. Both are true. Which one is strong enough to use?",
      evidenceA: {
        type: "passage",
        label: "RAFA'S EVIDENCE",
        text: "\"The team finished fourth.\"",
        choiceLabel: "Rafa's evidence is stronger",
      },
      evidenceB: {
        type: "passage",
        label: "IVY'S EVIDENCE",
        text: "\"Priya thought, She feels even worse than I do.\"",
        choiceLabel: "Ivy's evidence is stronger",
      },
      correctSide: "B",
      evidenceLogEntry: "Ivy's evidence shows the moment Priya's thinking changes. Rafa's is true, but it only retells what happened in the race.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Exit 5: Quick check. One story can hold more than one theme. Which second theme does this story ALSO support?",
      evidence: {
        type: "passage",
        label: "A SECOND LOOK",
        text: "\"We'll practice handoffs together every day until we get it right.\"",
      },
      choices: [
        { id: "a", text: "A mistake can become a chance to grow." },
        { id: "b", text: "Running fast is the only skill that matters." },
        { id: "c", text: "Windy days are bad for races." },
        { id: "d", text: "It is better to quit than to lose." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Second theme: a mistake can become a chance to grow. The dropped baton turns into a plan to practice together.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Exit: The door opens for a cadet who can state what makes theme evidence strong.",
      evidence: {
        type: "passage",
        label: "THE EXIT",
        text: "Strong: the journal entry, the realization about Ava. Weak: fourth place, the fastest runner.",
      },
      choices: [
        { id: "a", text: "Any true sentence from the story is strong theme evidence." },
        { id: "b", text: "Strong theme evidence shows a lesson, a change, or an important realization." },
        { id: "c", text: "The first sentence of a story is always the strongest evidence." },
        { id: "d", text: "Evidence about winning is always the strongest." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Strong theme evidence shows a lesson, a change, or an important realization, not just what happened.",
    },
  ],

  finalResponsePrompt:
    "Write your escape report. Your answer should: (1) explain how the story supports the theme \"Caring about your teammates matters more than winning,\" using the strongest evidence, (2) name a second theme the story supports and give evidence for it, and (3) explain why \"The team finished fourth\" is weak evidence for a theme.",

  responseStems: [
    "The story shows that caring about teammates matters more than winning when ___.",
    "This is strong evidence because ___.",
    "A second theme is ___, shown when ___.",
    "\"The team finished fourth\" is weak evidence because ___.",
  ],

  selfCheckQuestions: [
    "I used the strongest evidence, not just any true sentence.",
    "I explained how my evidence shows a lesson or a change.",
    "I named a second theme and supported it.",
    "I explained why plot-only evidence is weak.",
    "I quoted or closely paraphrased the text.",
  ],
};
