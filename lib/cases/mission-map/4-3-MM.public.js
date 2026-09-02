// Mission Map — "Erosion Bridge Mission" — Grade 4 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.10B — Weathering, Erosion & Deposition.** "Model and describe slow
// changes to Earth's surface caused by weathering, erosion, and
// deposition." Direct fit — the library's own gate order (weathering
// evidence, erosion evidence, deposition evidence, matching process to
// landform change) already walks through exactly these three processes.
//
// Uses the new "showdown" checkpoint type at cp4, replacing the library's
// original trap gate almost exactly: the bridge's fresh paint job is
// visible but irrelevant, while the sandbar's real sediment measurement is
// actual evidence of land change. Showdown makes that "which clue is
// actually evidence" trap literal instead of hiding it inside a 4-option
// multiple choice.

export const PUBLIC_CASE = {
  standard: "4.3-MM",
  teksLabel:
    "TEKS 4.10B — Weathering, Erosion & Deposition (Texas Grade 4 Science; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Science",
  title: "Erosion Bridge Mission",
  tagline: "The old river crossing looks different than it did last spring. What actually changed it?",

  mission: {
    briefText:
      "The footbridge over Miller's Creek has crossed the same spot for twenty years, but the riverbank underneath it looks different than it did last spring. The town engineer needs real evidence, not guesses, about what's been slowly reshaping the land — before deciding whether the bridge itself needs any changes.",
    goal: "Identify evidence of weathering, erosion, and deposition, and match each process to the actual landform change it caused.",
  },

  mapImage: "/mission-map/4-3-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stop 1: A rock near the bank has a wide new crack straight through it. What caused that?",
      evidence: {
        type: "data",
        label: "STOP 1 — BANK ROCK",
        text: "The rock has a fresh, deep crack. Water has clearly been seeping into small gaps and refreezing over the winter.",
      },
      choices: [
        { id: "a", text: "Weathering — water freezing and expanding inside the rock's cracks over time" },
        { id: "b", text: "Erosion — the rock has already been carried somewhere else" },
        { id: "c", text: "Deposition — new material has been added to the rock" },
        { id: "d", text: "The rock cracked on its own with no outside cause" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Freeze-thaw cracking is weathering — the rock is being physically broken down where it sits.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Stop 2: The creek water looks muddy brown today. What's happening?",
      evidence: {
        type: "data",
        label: "STOP 2 — WATER SAMPLE",
        text: "The water is carrying visible sand and soil particles downstream, especially near the outside edge of the bend.",
      },
      choices: [
        { id: "a", text: "Erosion — moving water is picking up and carrying sediment away" },
        { id: "b", text: "Weathering — the water is breaking rock apart right where it stands" },
        { id: "c", text: "Deposition — the water is dropping material in this exact spot" },
        { id: "d", text: "The mud has nothing to do with the water at all" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Sediment being carried away by moving water is erosion in action.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stop 3: A new sandbar has built up on the inside curve of the creek, downstream from Stop 2. What's forming it?",
      evidence: {
        type: "data",
        label: "STOP 3 — SANDBAR",
        text: "The water slows down on the inside of the bend, and the sediment it was carrying is settling out and piling up there.",
      },
      choices: [
        { id: "a", text: "Deposition — slower water is dropping the sediment it was carrying" },
        { id: "b", text: "Weathering — the sandbar formed from a rock breaking apart on the spot" },
        { id: "c", text: "Erosion — the sandbar is evidence of material being removed" },
        { id: "d", text: "Sandbars form instantly with no connection to the water's speed" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The new sandbar is deposition — sediment settling out where the water slowed down.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 32 },
      prompt: "Stop 4: The town engineer has two clues about what's changed at the bridge. Which one is actually evidence of land change?",
      evidenceA: {
        type: "data",
        label: "SANDBAR MEASUREMENT",
        text: "The new sandbar at Stop 3 has grown about eight inches since last spring, matching the sediment being eroded upstream.",
        choiceLabel: "This is real evidence of land change",
      },
      evidenceB: {
        type: "passage",
        label: "BRIDGE MAINTENANCE NOTE",
        text: "\"The bridge got a fresh coat of paint last month, so it looks different than it did in the spring.\"",
        choiceLabel: "This explains the change instead",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "The sandbar's growth is real evidence of erosion and deposition reshaping the bank — the bridge's paint job is visible, but it isn't evidence of land change at all.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: Match each part of the bend to the process reshaping it.",
      evidence: {
        type: "passage",
        text: "The outside of the creek's bend is losing land where the fast water cuts into it. The inside of the same bend is gaining land where the slow water drops sediment.",
      },
      choices: [
        { id: "a", text: "Erosion is cutting away the outside of the bend, while deposition is building up the inside of the bend" },
        { id: "b", text: "The exact same process is happening on both sides of the bend" },
        { id: "c", text: "Erosion is building up land and deposition is cutting it away" },
        { id: "d", text: "Neither side of the bend is actually changing" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Erosion cuts away the outside of the bend where water moves fastest; deposition builds up the inside where water slows down.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: A nearby beach looked completely different the morning after a big storm. What's the best explanation?",
      evidence: {
        type: "passage",
        text: "Storm waves are much stronger than everyday waves, so they can weather, erode, and deposit sand much faster than normal.",
      },
      choices: [
        { id: "a", text: "The same processes — weathering, erosion, and deposition — happened much faster because the storm's waves were stronger" },
        { id: "b", text: "Storms use a completely different process than everyday waves" },
        { id: "c", text: "The beach's overnight change has no scientific explanation" },
        { id: "d", text: "Only deposition can happen during a storm, never erosion" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A storm speeds up the same weathering, erosion, and deposition processes — it doesn't introduce a new one.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain what's been slowly reshaping the land at the Miller's Creek bridge. Your answer should: (1) name at least two of the three processes (weathering, erosion, deposition) with real evidence from the case file, and (2) explain why the bridge's paint job wasn't actual evidence of land change.",

  responseStems: [
    "I found evidence of ___ at Stop ___, which showed ___.",
    "The bridge's fresh paint job wasn't real evidence because ___.",
    "Water can break down, move, and drop materials — I saw this when ___.",
  ],

  selfCheckQuestions: [
    "I named at least two of the three processes: weathering, erosion, deposition.",
    "I used real evidence from the case file, like the cracked rock or the sandbar measurement.",
    "I explained why the bridge's paint job didn't count as evidence.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
