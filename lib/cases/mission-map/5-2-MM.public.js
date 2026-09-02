// Mission Map — "Restore the Circuit Lab" — Grade 5 Science.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.8B — Electrical Circuits & Energy Transformations.** "Demonstrate
// that electrical energy in a complete circuit can transform into motion,
// light, and sound energy." Direct fit — the library's own "rule out the
// battery, rule out the bulb, find the break in the path" structure already
// tests exactly what a complete-vs-broken circuit needs, and its final
// gate's energy-transformation question matches the standard's own wording
// almost exactly.
//
// Uses the new "showdown" checkpoint type at cp2 — "rule out the battery"
// and "rule out the bulb" are two competing suspects in the same mystery,
// which is a natural showdown shape: which piece of evidence actually
// clears a suspect.

export const PUBLIC_CASE = {
  standard: "5.2-MM",
  teksLabel:
    "TEKS 5.8B — Electrical Circuits & Energy Transformations (Texas Grade 5 Science; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Science",
  title: "Restore the Circuit Lab",
  tagline: "The bulb won't light. Is it the battery, the bulb, or something in between?",

  mission: {
    briefText:
      "The lab's demonstration circuit went dark right before a big presentation. Two suspects seem obvious — a dead battery or a burnt-out bulb — but the real answer might be somewhere else in the path entirely. Test the evidence at each station before you decide what to fix.",
    goal: "Use evidence to find why a circuit isn't working, and explain the energy transformation that happens once it's fixed.",
  },

  mapImage: "/mission-map/5-2-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Station 1: Is the battery actually the problem?",
      evidence: {
        type: "data",
        label: "STATION 1 — BATTERY TEST",
        text: "A brand-new battery, inserted correctly, was swapped into the circuit. The bulb still doesn't light.",
      },
      choices: [
        { id: "a", text: "No — a fresh, correctly-inserted battery still didn't fix it, so the battery isn't the problem" },
        { id: "b", text: "Yes — the battery must always be the problem when a bulb doesn't light" },
        { id: "c", text: "It's impossible to test a battery without disassembling the whole circuit" },
        { id: "d", text: "The battery test doesn't tell you anything useful" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "A fresh, correctly-inserted battery didn't fix the bulb — the battery has been ruled out.",
    },
    {
      id: "cp2",
      order: 2,
      type: "showdown",
      position: { x: 26, y: 40 },
      prompt: "Station 2: Is the bulb itself the problem?",
      evidenceA: {
        type: "data",
        label: "BULB TESTED ELSEWHERE",
        text: "The exact same bulb lights up perfectly fine when placed in a different, known-working circuit.",
        choiceLabel: "The bulb works fine — rule it out",
      },
      evidenceB: {
        type: "passage",
        label: "A GUESS",
        text: "\"It's probably the bulb — bulbs burn out all the time.\"",
        choiceLabel: "The bulb is probably the problem",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "The bulb lit up fine in a different circuit — it's ruled out too, based on an actual test, not a guess.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Station 3: With the battery and bulb both ruled out, where else could the path be broken?",
      evidence: {
        type: "data",
        label: "STATION 3 — WIRE INSPECTION",
        text: "One wire is touching only the very edge of the bulb's metal base, not making solid contact with it.",
      },
      choices: [
        { id: "a", text: "The path is broken at that loose wire connection, not at the battery or the bulb" },
        { id: "b", text: "Wires can never be the source of a circuit problem" },
        { id: "c", text: "This wire is fine since it's touching the bulb at all" },
        { id: "d", text: "The problem must be back at the battery after all" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A loose wire connection at the bulb's base is breaking the path, even though both the battery and bulb work fine on their own.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Station 4: What's the fix?",
      evidence: {
        type: "passage",
        text: "A complete circuit needs an unbroken path for electrical energy to travel all the way around.",
      },
      choices: [
        { id: "a", text: "Reconnect the wire firmly to the bulb's base so the path is complete" },
        { id: "b", text: "Replace the battery again" },
        { id: "c", text: "Replace the bulb again" },
        { id: "d", text: "Nothing can be done — a loose wire can never be fixed" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Firmly reconnecting the loose wire completes the path and should let electrical energy flow again.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Station 5: Once the wire is fixed and the switch closes, what actually happens?",
      evidence: {
        type: "data",
        label: "STATION 5 — RESTORED CIRCUIT",
        text: "The bulb glows brightly, and it's slightly warm to the touch after being on for a minute.",
      },
      choices: [
        { id: "a", text: "Electrical energy travels through the complete path and transforms into light energy and thermal energy" },
        { id: "b", text: "The bulb glows without using any energy at all" },
        { id: "c", text: "Electrical energy disappears once the bulb lights up" },
        { id: "d", text: "Only sound energy is produced by a lit bulb" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The lit, warm bulb shows electrical energy transforming into light energy and thermal energy through the complete path.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Station 6: A new circuit has a dead battery. Another has a loose wire but a fine battery. Which fix applies to which?",
      evidence: {
        type: "passage",
        text: "This mission proved a complete path matters just as much as working parts — testing narrows down which one is actually broken.",
      },
      choices: [
        { id: "a", text: "The dead-battery circuit needs a new battery; the loose-wire circuit needs its connection fixed — different problems need different fixes" },
        { id: "b", text: "Both circuits need a new battery, since that's always the fix" },
        { id: "c", text: "Both circuits need a new bulb, since that's always the fix" },
        { id: "d", text: "There's no way to tell which circuit has which problem" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Different circuit problems need different fixes — testing each part is what tells you which one actually needs fixing.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how you figured out what was wrong with the circuit and what happened once it was fixed. Your answer should: (1) explain how the evidence ruled out the battery and the bulb before finding the real problem, and (2) describe the energy transformation that happens when the fixed circuit lights up.",

  responseStems: [
    "I ruled out the battery because ___.",
    "I ruled out the bulb because ___.",
    "Once the circuit was fixed, electrical energy transformed into ___.",
  ],

  selfCheckQuestions: [
    "I explained how the battery was ruled out with real evidence, not just a guess.",
    "I explained how the bulb was ruled out with real evidence, not just a guess.",
    "I named the actual problem (the loose wire) and how it was fixed.",
    "I named at least one type of energy the circuit transforms into (light, thermal, sound, or motion).",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
