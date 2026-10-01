// ClearDecode ruin K4 · suffixes -able, -ible; -ity, -ty (UFLI 126).
// Decodable rule for this ruin: every pattern on the ladder through K3, plus
// -able and -ible (breakable, visible) that mean "can be," and -ity and -ty
// (gravity, safety) that name a quality. No K5+ prefixes (mis-, sub-, non-,
// im-, in-: no invisible), no trans-, -ive or roots. In the logs, the only
// words ending in -able, -ible or -ty are code words (no table, empty, frosty),
// so the "find the code" task stays fair.
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "K4",
  name: "The Vault of Things That Last",
  find: "(able|ible|ity|ty)$",
  code: { label: "-able, -ible; -ity, -ty", spellings: ["-able", "-ible", "-ity", "-ty"], rule: "-able and -ible mean \"can be\": breakable means it can break, visible means it can be seen. -ity and -ty turn a word into a quality: grave becomes gravity, safe becomes safety." },
  sort: {
    yes: "Can be (-able, -ible)", yesHint: "breakable · visible",
    no: "A quality (-ity, -ty)", noHint: "gravity · safety",
    hintYes: (w) => `${w} ends in ${w.endsWith("ible") ? "-ible" : "-able"}, which means "can be."`,
    hintNo: (w) => `${w} ends in ${w.endsWith("ity") ? "-ity" : "-ty"}, so it names a quality.`,
  },
  codex: [
    { w: "washable", parts: ["wash", "able"], hi: 1 },
    { w: "readable", parts: ["read", "able"], hi: 1 },
    { w: "flexible", parts: ["flex", "ible"], hi: 1 },
    { w: "gravity", parts: ["grav", "ity"], hi: 1 },
    { w: "safety", parts: ["safe", "ty"], hi: 1 },
    { w: "loyalty", parts: ["loyal", "ty"], hi: 1 },
  ],
  checks: [
    ["washable", "washing", "washer"], ["flexible", "flexing", "flexed"], ["readable", "reading", "reader"],
    ["gravity", "gravel", "gravy"], ["safety", "safely", "safest"], ["loyalty", "loyal", "loyally"],
    ["fixable", "fixing", "fixture"], ["edible", "edits", "editor"], ["humidity", "humid", "human"],
    ["reliable", "relying", "relied"], ["density", "dense", "dentist"], ["durable", "during", "duration"],
  ],
  vaultPicks: [
    ["bendable", "bending", "bender"], ["sensible", "sensing", "senses"], ["certainty", "certain", "certainly"],
    ["reality", "realize", "realist"], ["drinkable", "drinking", "drinker"], ["security", "secure", "securely"],
    ["legible", "legend", "legal"], ["electricity", "electric", "electrician"],
  ],
  // For the sort: "can be" words (-able, -ible) are the bank, quality words (-ity, -ty) are the contrast.
  bank: ["breakable", "unbreakable", "washable", "readable", "drinkable", "fixable", "bendable", "reachable", "movable", "usable", "valuable", "reliable", "comfortable", "enjoyable", "remarkable", "dependable", "durable", "suitable", "visible", "flexible", "edible", "audible", "sensible", "collapsible", "reversible", "legible"],
  contrast: ["gravity", "safety", "humidity", "reality", "ability", "electricity", "curiosity", "density", "security", "community", "loyalty", "certainty", "royalty", "velocity", "stability", "durability"],
  // Games: any -able, -ible, -ity or -ty word counts; decoys are the base words.
  game: {
    targets: ["breakable", "washable", "readable", "fixable", "reliable", "flexible", "visible", "edible", "gravity", "safety", "loyalty", "humidity", "reality", "density"],
    decoys: ["break", "wash", "read", "fix", "rely", "flex", "vision", "edit", "grave", "safe", "loyal", "humid", "real", "dense"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "reliability", cuts: [2, 4, 5, 8, 9] },
      { w: "comfortable", cuts: [3, 7, 8] },
      { w: "collapsible", cuts: [3, 7, 8] },
      { w: "electricity", cuts: [1, 4, 8, 9] },
      { w: "dependable", cuts: [2, 6, 7] },
      { w: "curiosity", cuts: [2, 4, 6, 7] },
    ],
  },
  forge: {
    items: [
      { w: "breakable", clue: "can be broken", parts: ["break", "able"], explain: "break + able. -able means can be: breakable means it can break." },
      { w: "unbreakable", clue: "cannot be broken", parts: ["un", "break", "able"], explain: "un + break + able. -able means can be, and un- means not: it can not break." },
      { w: "washable", clue: "can be washed clean", parts: ["wash", "able"], explain: "wash + able. -able means can be: washable means it can be washed." },
      { w: "flexible", clue: "can bend without snapping", parts: ["flex", "ible"], explain: "flex + ible. To flex is to bend; -ible means can be, so flexible means it can bend." },
      { w: "visible", clue: "can be seen", parts: ["vis", "ible"], explain: "vis + ible. vis means see, as in vision, and -ible means can be: it can be seen." },
      { w: "safety", clue: "the state of being safe", parts: ["safe", "ty"], explain: "safe + ty. -ty turns a describing word into a quality: safe, so safety." },
      { w: "loyalty", clue: "the quality of sticking with your crew", parts: ["loyal", "ty"], explain: "loyal + ty. -ty names the quality: someone loyal shows loyalty." },
      { w: "humidity", clue: "how much water is in the air", parts: ["humid", "ity"], explain: "humid + ity. Humid means damp; -ity names the quality: how humid the air is." },
    ],
    extra: [{ t: "re", k: "pre" }, { t: "read", k: "base" }, { t: "ness", k: "suf" }],
  },
  door: [
    { w: "washable", parts: ["w", "a", "sh", "able"], extra: ["ible", "abel"] },
    { w: "flexible", parts: ["f", "l", "e", "x", "ible"], extra: ["able", "ibel"] },
    { w: "safety", parts: ["s", "a", "f", "e", "ty"], extra: ["tee", "ti"] },
    { w: "gravity", parts: ["g", "r", "a", "v", "ity"], extra: ["ety", "itee"] },
    { w: "readable", parts: ["r", "ea", "d", "able"], extra: ["ible", "ee"] },
    { w: "edible", parts: ["e", "d", "ible"], extra: ["able", "abel"] },
    { w: "loyalty", parts: ["l", "oy", "a", "l", "ty"], extra: ["tee", "ti"] },
  ],
  chains: [
    ["purity", "parity", "rarity"],
    ["last", "vast", "vase", "base"],
  ],
  heart: [],
  vaultFake: [["drimpable", "drimping", "drimps"], ["flomible", "flomming", "floms"], ["trenity", "trening", "trens"], ["skobable", "skobbing", "skobs"]],
  inscriptions: [
    {
      title: "Log 43",
      text: "The ice door at the end of the Quiet Wing was so clear that the vault behind it was visible from the hall. When Ray pressed his hand to it, the door slid open. Inside, the air was warm, and the shelves glowed with soft light. A sign above them read: \"Things That Last.\" Everything here was durable and reliable. Kit picked up a metal sheet so flexible that she could fold it in half, and it sprang back flat with no mark at all. \"These things were built for safety,\" she said, \"and for a very long time.\"",
    },
    {
      title: "Log 44",
      text: "Not everything in the vault was unbreakable. On one shelf sat a row of breakable glass tubes, packed in thick foam for safety. Gus read the label: \"Fragile. Breakable. Handle with care.\" Inside each tube was a seed. \"They kept seeds from every plant on this planet,\" said Gus. \"They knew the ice was coming, and they made sure their plants had a future.\" Each tube was marked in large, clear code, so it would be readable by anyone who came after.",
    },
    {
      title: "Log 45",
      text: "At the back of the vault, Mel found a map carved into a block of stone. It was the path through the stars that the archive had shown us, but here every stop had a small mark. Mel worked out what the marks meant. Each one showed the safety and quality of a stop: a place to land, clean air, a spring of hot water. \"They did not just leave a path,\" said Mel. \"They tested it. Its reliability is the whole point. They made it with certainty, so anyone who follows can trust it.\"",
    },
    {
      title: "Log 46",
      text: "Behind the stone map hung a metal sheet, folded small. Ray opened it. It was the same map, made flexible so a crew could carry it, and so durable that it could not tear. \"This is the copy they meant for travelers,\" said Ray. \"For us.\" On the bottom edge, a line of code was clearly visible. It was a promise of stability: \"The path holds.\" Below it was an arrow pointing down. Sam scanned the floor. Under the vault, the archive went deeper still, to a room full of maps.",
    },
  ],
  relic: { name: "The Flexible Map", caption: "A metal map so flexible it folds to the size of a hand, and so durable it never tears. Every stop on the builders' path is marked safe." },
  story: "In the Vault of Things That Last, the crew finds what the builders made to be durable: seeds kept safe, and a tested, reliable map of their path through the stars.",
  spanish: "Strong cognates: -able and -ible are spelled the same in Spanish (flexible, visible, durable, comfortable / confortable) but said differently. -ity is often -idad (gravity / gravedad, reality / realidad, humidity / humedad), and -ty is often -dad or -tad (loyalty / lealtad).",
  miniLesson: {
    title: "-able and -ible mean \"can be\"; -ity and -ty name a quality",
    steps: [
      "Write break and wash. Add -able. Say: breakable means it can break; washable means it can be washed.",
      "Write flexible and visible. Say: -ible sounds the same as -able and means the same thing. You learn which one by seeing the word.",
      "Write safe and loyal. Add -ty. Say: safety and loyalty name a quality.",
      "Show the cognates: gravedad / gravity, realidad / reality, flexible / flexible.",
      "Read together: \"The map was flexible and durable, built for safety.\"",
    ],
  },
};
