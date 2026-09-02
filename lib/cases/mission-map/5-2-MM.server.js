// Mission Map — "Restore the Circuit Lab" — SERVER ONLY.
// Never import this from a client component. See 5-2-MM.public.js for the
// TEKS 5.8B alignment.

export const SERVER_CASE = {
  standard: "5.2-MM",
  title: "Restore the Circuit Lab",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "showdown", correctSide: "A" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The battery was ruled out because a fresh, correctly-inserted battery was tested in the circuit and the bulb still didn't light. The bulb was ruled out because that exact same bulb lit up perfectly fine when tested in a different, known-working circuit — an actual test, not just a guess that bulbs burn out. The real problem turned out to be a loose wire barely touching the edge of the bulb's base, breaking the path even though both the battery and bulb worked fine on their own. Once that wire was reconnected firmly and the circuit was complete, electrical energy was able to travel through the whole path and transform into light energy (the glowing bulb) and thermal energy (the bulb feeling warm to the touch).",

  mustInclude: [
    "Explains how evidence (not a guess) ruled out both the battery and the bulb as the problem",
    "Identifies the actual problem (the loose wire connection) and explains why a complete path matters",
    "Names at least one specific energy transformation (light and/or thermal energy) that happens once the circuit works",
  ],
};
