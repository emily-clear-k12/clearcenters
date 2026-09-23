// Mission Map — "Unlock the Habitat Trail" — Grade 3 Science.
//
// From the library concept of the same name — originally framed as
// "match an animal's need (food/water/shelter/space) to habitat evidence."
// TEKS CHECKED FIRST against the real PDF, per the standing rule
// (ClearCenters_STATE.md §9 rule 11): **no Grade 3 Science standard tests a
// generic "basic needs" framework.** The real anchors are 3.12C
// (Environmental Changes — floods/droughts causing organisms to thrive,
// perish, or move to new locations) and 3.13A (external structures aiding
// survival). Re-anchored to 3.12C, which also lines up naturally with the
// library's own "Push Angle" (a storm damages part of the trail) — this
// becomes a mission about how an environmental change affects whether an
// animal can stay, thrive, or has to move, not a needs-matching mission.
// Same kind of pre-authoring catch as 3.1-MM's pollination mismatch and
// 4.5-MM's weather-vs-climate mismatch (see that file).
//
// Keeps the library's original trap gate (an out-of-place desert photo)
// almost unchanged — it still works perfectly under the new framing: local
// evidence about THIS environmental change beats an unrelated photo from
// somewhere else entirely.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.4-MM",
  teksLabel:
    "TEKS 3.12C — Environmental Changes (Texas Grade 3 Science; re-anchored from an unverifiable \"basic needs\" premise — see header comment)",
  grade: 3,
  subject: "Science",
  title: "Unlock the Habitat Trail",
  tagline: "A pond had a drought and then a flood. What happened to its frogs?",

  mission: {
    briefText:
      "Park rangers watched a pond on the Cedar Hollow trail all year. First, a drought almost dried it up. Then heavy rain flooded it. The rangers need to know what happened to the frog population. Use the trail evidence, not guesses.",
    goal: "Use evidence to explain how changes like drought and flooding affected a living thing. Did it thrive, die, or move away?",
  },

  mapImage: "/mission-map/3-4-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Stop 1: Which living thing is this investigation about?",
      evidence: {
        type: "passage",
        text: "The rangers' notes follow one kind of animal all year. It is the leopard frogs that live at Cedar Hollow Pond.",
      },
      choices: [
        { id: "a", text: "The leopard frogs living at the pond" },
        { id: "b", text: "Every animal in the entire park" },
        { id: "c", text: "Just the plants along the trail" },
        { id: "d", text: "The rangers themselves" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "This investigation is about the leopard frogs at Cedar Hollow Pond.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stop 2: During the drought, what happened at the pond?",
      evidence: {
        type: "data",
        label: "RANGER LOG — DROUGHT WEEK",
        text: "The pond shrank to less than half its size. The mud around it cracked and dried. Rangers heard far fewer frogs at night.",
      },
      choices: [
        { id: "a", text: "The drought had no effect on the frogs at all" },
        { id: "b", text: "The drought made more frogs appear out of nowhere" },
        { id: "c", text: "The drought made life harder for the frogs. Many likely moved away or died." },
        { id: "d", text: "Frogs don't need water, so the drought didn't matter" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "During the drought, the pond shrank. Rangers heard far fewer frogs at night.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Stop 3: After heavy rain refilled the pond, what changed?",
      evidence: {
        type: "data",
        label: "RANGER LOG — AFTER THE FLOOD",
        text: "The pond filled back up in two weeks. New plants grew along the banks. Rangers heard the usual number of frogs at night.",
      },
      choices: [
        { id: "a", text: "The flood was just as bad for the frogs as the drought" },
        { id: "b", text: "More frogs had nothing to do with the water coming back" },
        { id: "c", text: "The refilled pond let the frog population recover and thrive again" },
        { id: "d", text: "Frogs can't come back to a pond once they've left it" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The pond filled back up and plants grew. Frog calls came back to normal. The population recovered.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: A volunteer shows you a photo of frogs from a desert park far away. Does it belong in this investigation?",
      evidence: {
        type: "passage",
        label: "VOLUNTEER'S PHOTO",
        text: "\"The desert park's frogs were fine in a drought. So maybe the Cedar Hollow frogs were fine too.\"",
      },
      choices: [
        { id: "a", text: "Yes. Any frog photo from any drought counts." },
        { id: "b", text: "No. Different frogs in a different place can't tell us about Cedar Hollow." },
        { id: "c", text: "Yes. Desert frogs and pond frogs always act the same." },
        { id: "d", text: "It doesn't matter either way" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The desert photo is about different frogs in a different place. It can't tell us about Cedar Hollow.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A new road would send some of the stream water away from the pond. What do you predict?",
      evidence: {
        type: "passage",
        text: "The drought showed what happens when less water reaches the pond. The pond shrinks, and the frog population drops.",
      },
      choices: [
        { id: "a", text: "The pond would shrink again and the frogs would be hurt, like in the drought" },
        { id: "b", text: "It would do nothing, since roads and ponds are not connected" },
        { id: "c", text: "Diverting the stream would definitely help the frogs" },
        { id: "d", text: "You can't predict a change that hasn't happened yet" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Less water would shrink the pond again. That would hurt the frogs, just like the drought.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Which statement matches everything the evidence showed?",
      evidence: {
        type: "passage",
        text: "The frog population dropped in the drought. It came back after the flood. Rangers measured it both times.",
      },
      choices: [
        { id: "a", text: "Changes like drought and flooding can make a living thing struggle or thrive" },
        { id: "b", text: "Frog populations never change, no matter what happens" },
        { id: "c", text: "Every change is bad for every living thing" },
        { id: "d", text: "Frogs simply disappear and reappear for no reason" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A change in the environment can make a living thing struggle or thrive. It depends on the change.",
    },
  ],

  finalResponsePrompt:
    "Explain what happened to the frogs during the drought and after the flood. Your answer should: (1) tell each change and how the frogs responded, and (2) explain why the desert park photo was not evidence for this pond.",

  responseStems: [
    "During the drought, the frog population ___ because ___.",
    "After the flood, the frog population ___ because ___.",
    "The desert photo didn't count as evidence because ___.",
  ],

  selfCheckQuestions: [
    "I told what happened during the drought and after the flood.",
    "I connected the change in water to what happened to the frogs.",
    "I explained why the desert photo wasn't real evidence for this pond.",
    "I used numbers or details from the ranger logs.",
    "I read my answer back, and it makes sense.",
  ],
};
