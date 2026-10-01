// ClearDecode ruin G4 · long i: ie, igh (UFLI 87-88).
// Inscriptions use only patterns taught up to G4 (short vowels, consonant
// teams, blends, silent e, endings -s/-es/-ed/-ing, syllables, tch/dge, y,
// -le, r-controlled vowels, ai/ay, ee/ea/ey, oa/ow/oe, ie/igh) plus heart
// words. No oo (H1), no ou/ow as in cow (H5) in the logs. Checked by
// tools/cleardecode-check.cjs.
export default {
  id: "G4",
  name: "The High Light",
  find: "ie|igh",
  code: { label: "long i", spellings: ["igh", "ie"], rule: "igh is three letters for one sound, as in light. ie at the end of a short word says long i, as in tie" },
  sort: {
    yes: "Long i vault", yesHint: "light · tie",
    no: "Short i vault", noHint: "lit · tip",
    hintYes: (w) => `${w} has the long i code (igh or ie), so the i is long.`,
    hintNo: (w) => `${w} has no igh or ie, so the i is short.`,
  },
  codex: [
    { w: "light", parts: ["l", "igh", "t"], hi: 1 },
    { w: "night", parts: ["n", "igh", "t"], hi: 1 },
    { w: "high", parts: ["h", "igh"], hi: 1 },
    { w: "sight", parts: ["s", "igh", "t"], hi: 1 },
    { w: "tie", parts: ["t", "ie"], hi: 1 },
    { w: "lie", parts: ["l", "ie"], hi: 1 },
  ],
  checks: [
    ["light", "lit", "lot"], ["night", "nit", "net"], ["high", "hug", "hay"],
    ["sight", "sit", "set"], ["tie", "toe", "tea"], ["tight", "tilt", "tint"],
    ["fright", "fret", "fit"], ["right", "rot", "rat"], ["sigh", "sag", "say"],
    ["might", "mitt", "mat"], ["lie", "lay", "low"], ["slight", "slit", "slat"],
  ],
  vaultPicks: [
    ["midnight", "midway", "midst"], ["highway", "hallway", "halfway"], ["spotlight", "spotted", "spotless"], ["delight", "delete", "deli"],
    ["frighten", "fritter", "flatten"], ["mighty", "misty", "minty"], ["tonight", "tonic", "token"], ["flashlight", "flashing", "flashcard"],
  ],
  bank: ["tie", "pie", "lie", "ties", "magpie", "necktie", "high", "sigh", "thigh", "light", "night", "right", "sight", "might", "fight", "tight", "bright", "flight", "fright", "slight", "highway", "midnight", "sunlight", "spotlight", "flashlight", "starlight", "daylight", "lightning", "tonight", "mighty", "highland", "nightfall", "frighten", "delight"],
  contrast: ["lit", "sit", "fit", "rip", "tip", "slim", "grin", "flit", "trim", "spin", "mist", "chin", "drift", "brick", "wind", "ship"],
  wall: {
    mode: "syllables",
    words: [
      { w: "midnight", cuts: [3] },
      { w: "highway", cuts: [4] },
      { w: "sunlight", cuts: [3] },
      { w: "delight", cuts: [2] },
      { w: "frighten", cuts: [6] },
      { w: "tonight", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "lighting", clue: "making something light up right now", parts: ["light", "ing"], explain: "light + ing. The ending -ing means it is happening now." },
      { w: "flights", clue: "more than one flight", parts: ["flight", "s"], explain: "flight + s. The ending -s means more than one." },
      { w: "sighed", clue: "let out a long breath in the past", parts: ["sigh", "ed"], explain: "sigh + ed. The ending -ed means it already happened." },
      { w: "ties", clue: "more than one tie", parts: ["tie", "s"], explain: "tie + s. The ending -s means more than one." },
      { w: "frightened", clue: "made someone scared in the past", parts: ["frighten", "ed"], explain: "frighten + ed. The ending -ed means it already happened." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "night", k: "base" }, { t: "high", k: "base" }],
  },
  door: [
    { w: "light", parts: ["l", "igh", "t"], extra: ["ie", "i"] },
    { w: "night", parts: ["n", "igh", "t"], extra: ["ie", "i"] },
    { w: "tie", parts: ["t", "ie"], extra: ["igh", "y"] },
    { w: "high", parts: ["h", "igh"], extra: ["ie", "i"] },
    { w: "sight", parts: ["s", "igh", "t"], extra: ["ie", "i"] },
    { w: "fright", parts: ["f", "r", "igh", "t"], extra: ["ie", "i"] },
    { w: "pie", parts: ["p", "ie"], extra: ["igh", "y"] },
  ],
  chains: [
    ["light", "might", "night", "sight", "fight"],
    ["slight", "flight", "fright", "bright", "blight"],
  ],
  heart: ["the", "a", "to", "of", "was", "said", "were", "they", "he", "she", "be", "into", "from"],
  vaultFake: [["smight", "smit", "smat"], ["vight", "vit", "vot"], ["blie", "blay", "bloe"], ["prigh", "prag", "prog"]],
  inscriptions: [
    {
      title: "Explorer's log: the far cliff",
      text: "We sailed the boat along the sea road for five days. The glow floats kept us on the right path. On the fifth night, Kit held up a hand. Far off, high on a cliff, a light was flashing. On, off, on, off. It was not a star. Ray said it might be a signal. The makers had left a light on, and it was still bright.",
    },
    {
      title: "Explorer's log: the steep path",
      text: "At first light, we left the boat on the sand and went up a steep path. It was tight and high, with a long drop on the right side. Mel did not like it. \"Just keep going,\" said Gus. At the top of the cliff was a tall stone spire with a huge lamp on top. In the sunlight, its light was faint. Inside the spire, steps went up and up into the dark.",
    },
    {
      title: "Explorer's log: the lamp",
      text: "We got to the top of the steps just as night fell. The lamp was as big as a tent, and it was made of glass. Ray lifted a lid on its side. Inside was a lens as wide as a dish. When the lamp lit up, its bright beam did not shine on the sea. It went up, high into the sky. Tam was silent. Then he said, \"This light was not for boats. It might be for ships that fly.\"",
    },
    {
      title: "Explorer's log: the night lens",
      text: "Kit lifted the lens from the lamp. It was light and as thin as a leaf. When she held it up to the night sky, the stars in it lit up in a bright line, like a path. \"It is a flight path,\" said Ray. \"The makers left by ship, and they left us a map.\" We will take the night lens back to the lab. Tonight, we will plot the stars it shows.",
    },
  ],
  relic: { name: "The Night Lens", caption: "Hold it up to the night sky and its stars light up in a line: a flight path the builders left behind." },
  story: "At the end of the sea road, a builder lamp on a high cliff points its beam at the sky, and its lens shows a flight path: the builders did not just sail, they flew.",
  spanish: "Long i sounds like Spanish 'ai' (as in 'aire' or 'hay'), so the sound transfers. Spanish has no silent gh, so igh (three letters, one sound) needs practice. Spanish ie says /ye/ (as in 'tiene'), so watch for students reading tie as 'tee-eh.'",
  miniLesson: {
    title: "Long i: igh and ie",
    steps: [
      "Write light and tie. Underline igh and ie. Say: both spell the long i sound. In igh, the g and h are silent.",
      "Show lit and light side by side. Read both, pointing to the vowel each time.",
      "Sort 6 cards together: night, pie, high, tie, bright, lie.",
      "Dictate 3 words (sight, fright, high). Students tap the three letters of igh as one sound.",
      "Read one sentence together: \"The bright light was high on the cliff at night.\"",
    ],
  },
};
