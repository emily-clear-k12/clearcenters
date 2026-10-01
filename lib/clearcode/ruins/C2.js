// ClearCode ruin C2 · long i: i_e (UFLI 55).
// Decodable rule for this ruin: everything from Planets A and B (short vowels,
// plural -s, ff/ll/ss/zz, ck, sh, th, ch, wh, ph, ng, nk, blends) plus a_e and
// i_e, plus heart words. No o_e, u_e, e_e or soft c/g yet, no -ed/-ing endings
// (D1). Checked by tools/clearcode-check.cjs.
export default {
  id: "C2",
  name: "The Mine Shafts",
  find: "i[^aeiou]e",
  code: { label: "long i: i_e", spellings: ["i_e"], rule: "When a silent e comes after one consonant, the i says its name: pin becomes pine." },
  sort: {
    yes: "Long i vault", yesHint: "pine · bite",
    no: "Short i vault", noHint: "pin · bit",
    hintYes: (w) => `${w} has i, one consonant, then a silent e, so the i says its name.`,
    hintNo: (w) => `${w} has no silent e, so the i is short.`,
  },
  codex: [
    { w: "mine", parts: ["m", "ine"], hi: 1 },
    { w: "pipe", parts: ["p", "ipe"], hi: 1 },
    { w: "slide", parts: ["sl", "ide"], hi: 1 },
    { w: "shine", parts: ["sh", "ine"], hi: 1 },
    { w: "strike", parts: ["str", "ike"], hi: 1 },
    { w: "five", parts: ["f", "ive"], hi: 1 },
  ],
  checks: [
    ["pine", "pin", "pen"], ["bite", "bit", "bat"], ["ride", "rid", "rod"],
    ["hide", "hid", "had"], ["dime", "dim", "dam"], ["fine", "fin", "fun"],
    ["spine", "spin", "span"], ["shine", "shin", "shun"], ["slime", "slim", "slam"],
    ["twine", "twin", "win"], ["grime", "grim", "gram"], ["prime", "prim", "prom"],
  ],
  vaultPicks: [
    ["site", "sit", "set"], ["wipe", "whip", "wit"], ["ripe", "rip", "rap"], ["quite", "quit", "quack"],
    ["spite", "spit", "spot"], ["stripe", "strip", "strap"], ["lime", "limb", "lid"], ["snipe", "snip", "snap"],
  ],
  bank: ["mine", "pipe", "slide", "shine", "strike", "five", "pine", "bite", "ride", "hide", "dime", "fine", "spine", "slime", "twine", "grime", "prime", "site", "wipe", "ripe", "quite", "spite", "stripe", "lime", "line", "time", "wide", "side", "inside", "white", "while", "mile", "tile", "file", "vine", "nine", "spike", "smile", "drive", "glide"],
  contrast: ["pin", "bit", "rid", "hid", "dim", "fin", "spin", "shin", "slim", "twin", "grim", "sit", "rip", "quit", "strip", "whip"],
  // Sounds wall: the silent e stays with the consonant before it (no sound of its own).
  wall: {
    mode: "sounds",
    words: [
      { w: "mine", cuts: [1, 2] },
      { w: "pipe", cuts: [1, 2] },
      { w: "slide", cuts: [1, 2, 3] },
      { w: "shine", cuts: [2, 3] },
      { w: "strike", cuts: [1, 2, 3, 4] },
      { w: "spine", cuts: [1, 2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "mine", parts: ["m", "i", "n", "e"], extra: ["a", "e"] },
    { w: "slide", parts: ["s", "l", "i", "d", "e"], extra: ["a", "o"] },
    { w: "shine", parts: ["sh", "i", "n", "e"], extra: ["ch", "a"] },
    { w: "strike", parts: ["s", "t", "r", "i", "k", "e"], extra: ["ck", "a"] },
    { w: "five", parts: ["f", "i", "v", "e"], extra: ["e", "u"] },
    { w: "white", parts: ["wh", "i", "t", "e"], extra: ["w", "a"] },
    { w: "spine", parts: ["s", "p", "i", "n", "e"], extra: ["a", "o"] },
  ],
  chains: [
    ["mine", "line", "lime", "time", "tile"],
    ["ride", "hide", "hike", "bike", "bite"],
  ],
  heart: ["the", "a", "of", "to", "was", "said", "who", "he", "his", "by", "is", "as", "has", "they", "what", "one", "too"],
  vaultFake: [["vipe", "vip", "vap"], ["slibe", "slib", "slab"], ["drime", "drim", "drum"], ["thide", "thid", "thud"]],
  inscriptions: [
    {
      title: "Crew log 5",
      text: "The path on the slate plate led to a wide shaft in the rock. Kit hung a line on a spike and slid to the base. Gus and Tam came next. It was as black as ink. Pipes ran up the sides of the shaft, and a track went off in a long line. \"It is a mine,\" said Gus. \"But what did they dig in this mine?\"",
    },
    {
      title: "Crew log 6",
      text: "Tam, Kit, and Gus hike in a line next to the track. The mine is wide, and it is still. Then Gus spots a white strip on a pipe. He rubs it with his hand, and the strip shines! \"It is a lamp,\" said Kit. Gus taps it. Lamps blink on, one at a time, mile on mile. The mine is lit.",
    },
    {
      title: "Crew log 7",
      text: "Past the lamps, the track ends at a vast pit, a mile wide. Tam stands at the rim, side by side with Gus. At the base of the pit is a grid of halls and shafts, and all of it is lit. Kit spots shapes cut in the white walls: the sun, a lake, a flame. \"They hid from the sun,\" said Tam. \"Was it too hot on top?\" \"Was it the dust?\" said Kit. \"Who can tell?\" said Gus. \"It is time to get inside.\"",
    },
    {
      title: "Crew log 8",
      text: "A ramp drops to the grid. Inside a hall, Kit spots a lamp on a shelf. It is not like the lamps on the pipes. It is the size of a fist and has five sides. Gus lifts it, and it shines white in his hand. \"It still shines,\" said Gus. \"It is as if they left it lit, just in case.\" Kit and Tam smile. They will take the lamp back to the lab.",
    },
  ],
  relic: { name: "The Mine Lamp", caption: "A white lamp the size of a fist with five sides. It was still lit deep in the mine, as if the builders left it on for the next crew." },
  story: "Following the slate map down a mine shaft, the crew lights a mile of old lamps and finds the builders' halls hidden under the surface.",
  spanish: "The long i sound is the same as Spanish ai, as in 'baile', so the sound is familiar. The new part is the spelling: a silent e at the end, which Spanish never has.",
  miniLesson: {
    title: "Long i: i_e (pin, pine)",
    steps: [
      "Write pin. Read it. Add an e to make pine. Say: the silent e makes the i say its name.",
      "Read pairs together: rid/ride, slim/slime, strip/stripe. Students tap the e each time.",
      "Say a word (bite, bit, hide, hid). Students hold up a long i or short i card.",
      "Build mine with letter cards, then change one letter at a time: mine, line, lime, time.",
      "Read together: \"Five lamps shine in the mine.\"",
    ],
  },
};
