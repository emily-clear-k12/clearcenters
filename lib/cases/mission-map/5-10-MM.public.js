// Mission Map — "Volume Vault" — Grade 5 Math.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real Texas Mathematics TEKS PDF (19 TAC §111.7), per rule 11:
// **5.6B — "determine the volume of a rectangular prism with whole number
// side lengths in problems related to the number of layers times the number
// of unit cubes in the area of the base."**
//
// The standard's own phrasing — layers times the base — is the structure of
// this case's middle gates, which is why the build goes base first, then
// layers, rather than jumping to l x w x h. 5.6A (recognizing a unit cube)
// is the secondary and sits at cp1.
//
// The library's trap is counting only the cubes a student can see. That is a
// genuinely hard habit at grade 5 and it is what the showdown at cp4 puts on
// trial.

export const PUBLIC_CASE = {
  standard: "5.10-MM",
  teksLabel:
    "TEKS 5.6B — Volume of a Rectangular Prism as Layers Times the Base (Texas Grade 5 Mathematics; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Math",
  title: "Volume Vault",
  tagline: "You can see fifteen cubes. The vault wants to know about the ones you cannot see.",

  mission: {
    briefText:
      "The cargo vault at Tarn Station refuses to release a crate until someone reports exactly how many supply cubes are packed inside it. Because the crate is a sealed rectangular box, only its front face remains visible through the narrow inspection window. A cadet reported the number she could count through the glass, and the vault rejected her figure without explanation.",
    goal: "Determine the volume of a rectangular prism by reasoning from the base layer upward. Explain why cubes concealed behind the visible face still belong in the total.",
  },

  mapImage: "/mission-map/5-10-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 72 },
      prompt: "Vault 1: The manifest describes what is inside. What is a supply cube worth, in measurement terms?",
      evidence: {
        type: "data",
        label: "CARGO MANIFEST",
        text: "The crate is packed with identical supply cubes. Each cube measures one unit on every edge, with no gaps between them.",
      },
      choices: [
        { id: "a", text: "Each cube is a unit cube, worth exactly one cubic unit of volume" },
        { id: "b", text: "Each cube is worth one square unit, because you can see its face" },
        { id: "c", text: "Each cube is worth three units, one for each dimension" },
        { id: "d", text: "A cube has no measurable volume until the crate is opened" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Each supply cube is a unit cube: one unit on every edge, one cubic unit of volume.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 44 },
      prompt: "Vault 2: Start with the bottom layer. How many cubes sit in it?",
      evidence: {
        type: "data",
        label: "BASE MEASUREMENTS",
        text: "The floor of the crate measures 5 cubes across and 3 cubes deep. The bottom layer is packed full.",
      },
      choices: [
        { id: "a", text: "8 cubes, because 5 + 3 = 8" },
        { id: "b", text: "15 cubes, because 5 x 3 = 15" },
        { id: "c", text: "5 cubes, because that is the longest edge" },
        { id: "d", text: "There is no way to know without seeing the layer" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The base holds 5 x 3 = 15 cubes. That is one full layer.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 42, y: 68 },
      prompt: "Vault 3: Quick check — how many layers are stacked in the crate?",
      evidence: {
        type: "data",
        label: "CRATE HEIGHT",
        text: "The inside of the crate stands 4 cubes tall. Each level is packed the same as the one below it.",
      },
      choices: [
        { id: "a", text: "1 layer" },
        { id: "b", text: "3 layers" },
        { id: "c", text: "4 layers" },
        { id: "d", text: "15 layers" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "The crate is 4 cubes tall, so there are 4 identical layers.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 36 },
      prompt: "Vault 4: Two reports were filed with the vault. Which one should it accept?",
      evidenceA: {
        type: "data",
        label: "REPORT FILED THROUGH THE WINDOW",
        text: "\"I counted every cube I can see on the front face: 5 across and 3 up, so 15 cubes. The crate holds 15.\"",
        choiceLabel: "Accept this report",
      },
      evidenceB: {
        type: "data",
        label: "REPORT FILED FROM THE MANIFEST",
        text: "\"The base layer holds 5 x 3 = 15 cubes, and the crate is 4 layers tall. 15 x 4 = 60. The crate holds 60 cubes.\"",
        choiceLabel: "Accept this report",
      },
      correctSide: "B",
      evidenceLogEntry: "15 cubes per layer, 4 layers: 15 x 4 = 60 cubic units. The face shows one layer, not the crate.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 60 },
      prompt: "Vault 5: The first report counted accurately. Every cube she named is really there. So why was it rejected?",
      evidence: {
        type: "passage",
        label: "VAULT NOTICE",
        text: "\"A face is flat. A crate is not. You have reported an area where a volume was requested.\"",
      },
      choices: [
        { id: "a", text: "She counted one layer and stopped, so she measured the area of a face instead of the space inside" },
        { id: "b", text: "She counted the wrong face of the crate" },
        { id: "c", text: "She should have added the layers instead of multiplying" },
        { id: "d", text: "She included cubes that were not really there" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Counting the visible face produces the area of a single layer, whereas volume requires every additional layer stacked behind it as well.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 30 },
      prompt: "Final Vault: State the rule the vault is checking for.",
      evidence: {
        type: "passage",
        label: "THE RELEASED CRATE",
        text: "60 cubic units. Fifteen cubes to a layer, four layers deep.",
      },
      choices: [
        { id: "a", text: "Volume is the number of unit cubes that fill a solid — the cubes in one layer times the number of layers" },
        { id: "b", text: "Volume is the number of cubes visible on the outside of a solid" },
        { id: "c", text: "Volume is the total length of all the edges added together" },
        { id: "d", text: "Volume is the same as the area of the largest face" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Volume is the number of unit cubes required to fill the entire solid. Calculate it as the base layer's cubes multiplied by the layers stacked above.",
    },
  ],

  finalResponsePrompt:
    "File the report the vault will accept. Your answer should: (1) give the volume with its unit and show how you built it from the base layer, and (2) explain why counting only the cubes visible through the window gave the wrong answer.",

  responseStems: [
    "The base layer holds ___ cubes because ___.",
    "There are ___ layers, so the volume is ___.",
    "Counting only the visible face was wrong because ___.",
  ],

  selfCheckQuestions: [
    "I gave the volume as a number with cubic units.",
    "I showed how many cubes are in one layer.",
    "I said how many layers there are.",
    "I explained why the hidden cubes still count.",
    "I said what the visible face actually measures.",
  ],
};
