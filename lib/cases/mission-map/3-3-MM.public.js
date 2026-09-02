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

export const PUBLIC_CASE = {
  standard: "3.3-MM",
  teksLabel:
    "TEKS 3.7A — Forces (Texas Grade 3 Science; magnetism named explicitly as an at-a-distance force; cross-referenced with 3.6A Physical Properties of Matter)",
  grade: 3,
  subject: "Science",
  title: "Magnet Maze",
  tagline: "A maze full of objects — only some of them will let you build a bridge across.",

  mission: {
    briefText:
      "A robot explorer is stuck in a maze scattered with objects — paper clips, buttons, foil, nails, and more. The only way across each gap is to prove which objects a magnet will actually pull toward it. Test the evidence at each stop before you decide what belongs on the bridge.",
    goal: "Use evidence about magnetism to figure out which objects magnets attract — and which ones just look like they should.",
  },

  mapImage: "/mission-map/3-3-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: Four objects are blocking the path. Which ones are even worth testing with a magnet?",
      evidence: {
        type: "data",
        label: "OBJECT TRAY",
        text: "A metal paper clip, a plastic button, a wood block, and a sheet of aluminum foil are sitting on the tray.",
      },
      choices: [
        { id: "a", text: "The paper clip and the foil, since they're both metal" },
        { id: "b", text: "The plastic button, since it's the shiniest one" },
        { id: "c", text: "The wood block, since it's the biggest" },
        { id: "d", text: "All four, since anything could stick to a magnet" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Only the metal objects — the paper clip and the foil — are actually worth testing for magnetism.",
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
        text: "The paper clip snaps straight onto the magnet the instant it gets close.",
      },
      choices: [
        { id: "a", text: "Yes — the paper clip is attracted to the magnet" },
        { id: "b", text: "No — it only looks like it's sticking" },
        { id: "c", text: "It's too small to tell" },
        { id: "d", text: "Paper clips are never magnetic" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Quick test confirmed: the paper clip is attracted to the magnet.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: Now test the foil — and an iron nail from further down the maze.",
      evidence: {
        type: "data",
        label: "TEST RESULTS",
        text: "The iron nail snaps onto the magnet immediately. The aluminum foil doesn't move at all, even held right against the magnet.",
      },
      choices: [
        { id: "a", text: "The nail is magnetic, but the foil isn't — not all metals stick to magnets" },
        { id: "b", text: "Both must be magnetic, since they're both metal" },
        { id: "c", text: "Neither is magnetic, since foil isn't" },
        { id: "d", text: "The foil test must have been done wrong" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The iron nail stuck, but the aluminum foil didn't — proof that being a metal isn't enough on its own to be magnetic.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 30 },
      prompt: "Stop 4: A pile of paper clips is mixed in with packing peanuts. What's the best tool to sort them?",
      evidence: {
        type: "passage",
        text: "The paper clips are iron and magnetic. The packing peanuts are plastic foam and definitely not magnetic.",
      },
      choices: [
        { id: "a", text: "A magnet wand — it'll pull out the paper clips and leave the peanuts behind" },
        { id: "b", text: "A pair of scissors" },
        { id: "c", text: "A flashlight" },
        { id: "d", text: "There's no way to sort them without picking through by hand" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A magnet is the right tool here because it can pull the magnetic paper clips away from the non-magnetic peanuts.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 56 },
      prompt: "Stop 5: A recycling center wants to sort a mixed bin of steel cans and aluminum cans using a magnet. Will that work?",
      evidence: {
        type: "passage",
        text: "Steel cans are magnetic. Aluminum cans, like the foil from Stop 3, are not.",
      },
      choices: [
        { id: "a", text: "Yes — a magnet will pull out the steel cans and leave the aluminum cans behind" },
        { id: "b", text: "No — a magnet can't sort any metal cans at all" },
        { id: "c", text: "Yes — a magnet will grab every can, steel or aluminum" },
        { id: "d", text: "It depends on the color of the can" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A magnet can separate steel cans (magnetic) from aluminum cans (not magnetic) — the same pattern as the nail and foil.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 26 },
      prompt: "Stop 6: Which statement actually matches everything the maze proved?",
      evidence: {
        type: "passage",
        text: "Across every stop, magnets pulled some metal objects and completely ignored others.",
      },
      choices: [
        { id: "a", text: "Magnets attract some materials, like iron or steel, but not every metal" },
        { id: "b", text: "Magnets attract every metal object" },
        { id: "c", text: "Magnets attract anything shiny" },
        { id: "d", text: "Magnets only work on objects that are painted" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The maze's own evidence proves magnets attract some materials — like iron or steel — but not every metal.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain the rule you figured out about what magnets actually attract. Your answer should: (1) name at least one material that stuck to the magnet and one that didn't, and (2) explain why \"it's metal\" isn't enough on its own to predict whether something is magnetic.",

  responseStems: [
    "I found out that ___ stuck to the magnet, but ___ did not.",
    "Just because something is a metal, like ___, doesn't mean ___.",
    "The rule I figured out is that magnets attract ___.",
  ],

  selfCheckQuestions: [
    "I named at least one object that stuck and one that didn't.",
    "I explained that not every metal is magnetic, not just that magnets are 'sometimes weird.'",
    "I used real evidence from the case file, like the nail or the foil.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
