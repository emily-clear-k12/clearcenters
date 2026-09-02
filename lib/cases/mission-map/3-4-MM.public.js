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

export const PUBLIC_CASE = {
  standard: "3.4-MM",
  teksLabel:
    "TEKS 3.12C — Environmental Changes (Texas Grade 3 Science; re-anchored from an unverifiable \"basic needs\" premise — see header comment)",
  grade: 3,
  subject: "Science",
  title: "Unlock the Habitat Trail",
  tagline: "A pond trail just survived a drought and a flood. What happened to the frogs that live there?",

  mission: {
    briefText:
      "Park rangers have been watching a pond along the Cedar Hollow nature trail all year. First a drought nearly dried it up. Then heavy rain flooded it again. The rangers need help figuring out what really happened to the frog population through both changes — using real trail evidence, not guesses.",
    goal: "Use evidence about environmental changes — like drought and flooding — to explain whether an organism thrived, perished, or had to relocate.",
  },

  mapImage: "/mission-map/3-4-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Stop 1: Which organism is this trail investigation actually about?",
      evidence: {
        type: "passage",
        text: "The rangers' notes track one species all year: the leopard frogs that live at Cedar Hollow Pond.",
      },
      choices: [
        { id: "a", text: "The leopard frogs living at the pond" },
        { id: "b", text: "Every animal in the entire park" },
        { id: "c", text: "Just the plants along the trail" },
        { id: "d", text: "The rangers themselves" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "This investigation tracks the leopard frog population at Cedar Hollow Pond.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stop 2: During the drought, what happened at the pond?",
      evidence: {
        type: "data",
        label: "RANGER LOG — DROUGHT WEEK",
        text: "The pond shrank to less than half its normal size. The mud around the edges cracked and dried. Ranger counts found far fewer frogs calling at night than usual.",
      },
      choices: [
        { id: "a", text: "The drought made conditions worse for the frogs — many likely moved away or didn't survive" },
        { id: "b", text: "The drought had no effect on the frogs at all" },
        { id: "c", text: "The drought made more frogs appear out of nowhere" },
        { id: "d", text: "Frogs don't need water, so the drought didn't matter" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "During the drought, the shrinking pond and cracked mud lined up with far fewer frogs being heard at night.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Stop 3: After heavy rain refilled the pond, what changed?",
      evidence: {
        type: "data",
        label: "RANGER LOG — AFTER THE FLOOD",
        text: "The pond refilled to normal size within two weeks. New plant growth appeared around the banks. Ranger counts found frog calls back to their usual nighttime level.",
      },
      choices: [
        { id: "a", text: "The refilled pond let the frog population recover and thrive again" },
        { id: "b", text: "The flood was just as bad for the frogs as the drought was" },
        { id: "c", text: "The frog count going back up is unrelated to the water returning" },
        { id: "d", text: "Frogs can't come back to a pond once they've left it" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Once the pond refilled and plants grew back, frog calls returned to their normal level — the population recovered.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stop 4: A volunteer hands you a photo of frogs from a totally different park — a desert park hundreds of miles away. Does it belong in this investigation?",
      evidence: {
        type: "passage",
        label: "VOLUNTEER'S PHOTO",
        text: "\"Look, this desert park's frogs handled a drought just fine — so maybe Cedar Hollow's frogs weren't really affected either.\"",
      },
      choices: [
        { id: "a", text: "No — a different species in a totally different environment doesn't tell you what happened at Cedar Hollow" },
        { id: "b", text: "Yes — any frog photo from any drought counts as evidence here" },
        { id: "c", text: "Yes — desert frogs and pond frogs always react the same way" },
        { id: "d", text: "It doesn't matter either way" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The desert photo looked relevant, but a different species in a different environment doesn't override Cedar Hollow's own local evidence.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stop 5: A new road project is planned that would divert some of the stream feeding the pond. Based on the drought pattern, what would you predict?",
      evidence: {
        type: "passage",
        text: "The drought already showed what happens when less water reaches the pond: it shrinks, and the frog population drops.",
      },
      choices: [
        { id: "a", text: "Diverting the stream would likely shrink the pond again and hurt the frog population, the same way the drought did" },
        { id: "b", text: "Diverting the stream would have no effect, since roads and ponds are unrelated" },
        { id: "c", text: "Diverting the stream would definitely help the frogs" },
        { id: "d", text: "There's no way to predict anything about a change that hasn't happened yet" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The drought pattern predicts that less water reaching the pond — from a diverted stream or a dry spell — would shrink it and hurt the frog population again.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stop 6: Which statement best matches everything the trail evidence showed this year?",
      evidence: {
        type: "passage",
        text: "The pond's frog population dropped during the drought and recovered after the flood — direct, local, measured evidence both times.",
      },
      choices: [
        { id: "a", text: "Environmental changes like drought and flooding can cause an organism to struggle, or to thrive, depending on how the change affects its environment" },
        { id: "b", text: "Frog populations never change no matter what happens to their environment" },
        { id: "c", text: "Every environmental change is equally bad for every organism" },
        { id: "d", text: "Frogs simply disappear and reappear for no reason" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "This year's own evidence shows environmental changes can cause an organism to struggle or to thrive, depending on how the change affects its environment.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain what happened to Cedar Hollow's frog population during the drought and after the flood. Your answer should: (1) describe the environmental change and how the frog population responded each time, and (2) explain why the desert park's photo wasn't real evidence for this investigation.",

  responseStems: [
    "During the drought, the frog population ___ because ___.",
    "After the flood, the frog population ___ because ___.",
    "The desert photo didn't count as evidence because ___.",
  ],

  selfCheckQuestions: [
    "I described what happened to the frogs during the drought AND after the flood.",
    "I connected the environmental change (less water, more water) to what happened to the frogs.",
    "I explained why the desert photo wasn't real evidence for this pond.",
    "I used real numbers or details from the ranger logs, not just \"it got bad\" or \"it got better.\"",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
