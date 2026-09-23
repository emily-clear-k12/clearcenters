// Mission Map — "Magnet Maze" — Grade 3 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **3.7A — Forces.** "Demonstrate and describe forces acting on objects
// through contact or at a distance, including magnetism, gravity, pushes,
// and pulls." Magnetism is named explicitly as an at-a-distance force — a
// clean, direct fit, cross-referenced with 3.6A (Physical Properties of
// Matter, which separately lists magnetism as a property to measure/test).
// No re-anchor needed; the library's own content (sort by material, test
// attraction, the classic "not all metals stick" trap) already sits inside
// the real standard.
//
// Uses the new "quickScan" checkpoint type at cp2 — a single fast
// stick/no-stick read, deliberately lighter than the surrounding gates, as
// a pacing beat rather than a new mechanic (see MissionMap_Digital_Design_v1.md
// v10 for the type's intent).

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.3-MM",
  teksLabel:
    "TEKS 3.7A — Forces (Texas Grade 3 Science; magnetism named explicitly as an at-a-distance force; cross-referenced with 3.6A Physical Properties of Matter)",
  grade: 3,
  subject: "Science",
  title: "Magnet Maze",
  tagline: "A maze is full of objects. Only some of them can help you build a bridge.",

  mission: {
    briefText:
      "A robot explorer is stuck in a maze. Objects are all over the floor: paper clips, buttons, foil, nails, and more. To cross each gap, you must prove which objects a magnet will pull. Test the evidence at each stop. Then decide what goes on the bridge.",
    goal: "Use evidence to find out which objects magnets attract. Watch for objects that only look like they should.",
  },

  mapImage: "/mission-map/3-3-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: Four objects block the path. Which ones are worth testing with a magnet?",
      evidence: {
        type: "data",
        label: "OBJECT TRAY",
        text: "Four things sit on the tray. There is a metal paper clip and a plastic button. There is a wood block and a sheet of aluminum foil.",
      },
      choices: [
        { id: "a", text: "The plastic button, since it's the shiniest" },
        { id: "b", text: "The paper clip and the foil, since they're both metal" },
        { id: "c", text: "The wood block, since it's the biggest" },
        { id: "d", text: "All four, since anything could stick" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Only the metal objects are worth testing. That means the paper clip and the foil.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 40 },
      prompt: "Stop 2: Quick test — does the paper clip stick?",
      evidence: {
        type: "data",
        label: "QUICK TEST",
        text: "The paper clip snaps onto the magnet as soon as it gets close.",
      },
      choices: [
        { id: "a", text: "Yes — the paper clip is attracted to the magnet" },
        { id: "b", text: "No. It only looks like it's sticking." },
        { id: "c", text: "It's too small to tell" },
        { id: "d", text: "Paper clips are never magnetic" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Quick test confirmed: the paper clip is attracted to the magnet.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: Now test the foil. Test an iron nail from farther down the maze too.",
      evidence: {
        type: "data",
        label: "TEST RESULTS",
        text: "The iron nail snaps onto the magnet right away. The aluminum foil does not move at all, even right next to the magnet.",
      },
      choices: [
        { id: "a", text: "The nail is magnetic, but the foil is not. Not all metals stick to magnets." },
        { id: "b", text: "Both must be magnetic, since they're both metal" },
        { id: "c", text: "Neither is magnetic, since foil isn't" },
        { id: "d", text: "The foil test must have been done wrong" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The iron nail stuck. The aluminum foil did not. Being metal is not enough to be magnetic.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 30 },
      prompt: "Stop 4: Paper clips are mixed in with packing peanuts. What is the best tool to sort them?",
      evidence: {
        type: "passage",
        text: "The paper clips are made of iron. They are magnetic. The packing peanuts are plastic foam. They are not magnetic.",
      },
      choices: [
        { id: "a", text: "A pair of scissors" },
        { id: "b", text: "A magnet wand. It pulls out the paper clips and leaves the peanuts." },
        { id: "c", text: "A flashlight" },
        { id: "d", text: "You can only sort them by hand" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A magnet is the right tool. It pulls out the magnetic paper clips and leaves the peanuts.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 56 },
      prompt: "Stop 5: A recycling center has a bin of steel cans and aluminum cans. Can a magnet sort them?",
      evidence: {
        type: "passage",
        text: "Steel cans are magnetic. Aluminum cans, like the foil from Stop 3, are not.",
      },
      choices: [
        { id: "a", text: "No. A magnet can't sort metal cans at all." },
        { id: "b", text: "Yes. A magnet will grab every can, steel or aluminum." },
        { id: "c", text: "Yes. A magnet will pull out the steel cans and leave the aluminum cans." },
        { id: "d", text: "It depends on the color of the can" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "A magnet can pull out the steel cans and leave the aluminum cans. It is the same as the nail and the foil.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 26 },
      prompt: "Stop 6: Which statement matches everything the maze proved?",
      evidence: {
        type: "passage",
        text: "At every stop, the magnet pulled some metal objects. It did not pull others at all.",
      },
      choices: [
        { id: "a", text: "Magnets attract some materials, like iron or steel, but not every metal" },
        { id: "b", text: "Magnets attract every metal object" },
        { id: "c", text: "Magnets attract anything shiny" },
        { id: "d", text: "Magnets only work on objects that are painted" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Magnets attract some materials, like iron or steel. They do not attract every metal.",
    },
  ],

  finalResponsePrompt:
    "Explain the rule you found about what magnets attract. Your answer should: (1) name one material that stuck to the magnet and one that did not, and (2) explain why being metal is not enough to know if something is magnetic.",

  responseStems: [
    "I found out that ___ stuck to the magnet, but ___ did not.",
    "Something can be a metal, like ___, and still ___.",
    "The rule I figured out is that magnets attract ___.",
  ],

  selfCheckQuestions: [
    "I named at least one object that stuck and one that didn't.",
    "I explained that not every metal is magnetic.",
    "I used evidence from the case file, like the nail or the foil.",
    "I read my answer back, and it makes sense.",
  ],
};
