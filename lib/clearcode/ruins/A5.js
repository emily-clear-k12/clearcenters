// ClearCode ruin A5 · all short vowels + plural -s (UFLI 19-21, 41). Last ruin
// on Planet A.
// Decodable rule for this ruin: single consonants, all five short vowels,
// plural -s, plus heart words. No blends, no digraphs. Logs avoid verb -s,
// possessive 's and "its", so the -s words a student taps are all plurals.
// find: a consonant + s at the end of a word (cogs, jets). Words like is, has,
// bus, gas, yes end in a vowel + s, so they are not plurals and do not match.
// "^s$" lets the lone "s" chip in the codex count as the code.
// Checked by tools/clearcode-check.cjs.
export default {
  id: "A5",
  name: "Pod Pits",
  find: "[^aeious]s$|^s$",
  code: { label: "plural -s", spellings: ["-s"], rule: "add s to a word to mean more than one: pod, pods" },
  sort: {
    yes: "More than one vault", yesHint: "pods · jets",
    no: "Just one vault", noHint: "pod · bus",
    hintYes: (w) => `${w} is ${w.slice(0, -1)} + s, so it means more than one.`,
    hintNo: (w) => `${w} means just one. No -s was added to make it more.`,
  },
  codex: [
    { w: "caps", parts: ["c", "a", "p", "s"], hi: 3 },
    { w: "pins", parts: ["p", "i", "n", "s"], hi: 3 },
    { w: "pods", parts: ["p", "o", "d", "s"], hi: 3 },
    { w: "huts", parts: ["h", "u", "t", "s"], hi: 3 },
    { w: "jets", parts: ["j", "e", "t", "s"], hi: 3 },
    { w: "logs", parts: ["l", "o", "g", "s"], hi: 3 },
  ],
  checks: [
    ["caps", "cups", "cops"], ["pins", "pans", "pens"], ["jets", "jet", "jots"],
    ["huts", "hats", "hits"], ["logs", "legs", "lugs"], ["rigs", "rugs", "rags"],
    ["bugs", "bags", "begs"], ["nets", "net", "nuts"], ["pots", "pits", "pets"],
    ["tubs", "tabs", "tub"], ["dens", "den", "dins"], ["mops", "mobs", "mop"],
  ],
  vaultPicks: [
    ["fins", "fans", "fin"], ["cubs", "cabs", "cub"], ["pegs", "pigs", "pugs"], ["bats", "bets", "bits"],
    ["tops", "tips", "taps"], ["mugs", "mug", "mags"], ["rods", "rod", "reds"], ["vans", "van", "vats"],
  ],
  bank: ["caps", "pins", "pods", "jets", "huts", "logs", "cups", "nets", "pots", "pits", "rigs", "bags", "tubs", "dens", "mops", "fins", "cubs", "pegs", "bats", "tops", "mugs", "rods", "vans", "kits", "webs", "lids", "pans", "bins", "hens", "tins", "vats", "pups", "gaps", "bugs", "legs", "cogs", "maps"],
  contrast: ["cap", "pin", "pod", "jet", "hut", "log", "cup", "net", "bus", "gas", "yes", "his", "lid", "mop", "bag", "ten"],
  game: { decoys: ["cap", "pin", "pod", "jet", "hut", "log", "cup", "net", "bus", "gas", "yes", "his", "lid", "mop", "bag", "ten"] },
  wall: {
    mode: "sounds",
    words: [
      { w: "caps", cuts: [1, 2, 3] },
      { w: "jets", cuts: [1, 2, 3] },
      { w: "pods", cuts: [1, 2, 3] },
      { w: "huts", cuts: [1, 2, 3] },
      { w: "pins", cuts: [1, 2, 3] },
      { w: "logs", cuts: [1, 2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "caps", parts: ["c", "a", "p", "s"], extra: ["u", "z"] },
    { w: "logs", parts: ["l", "o", "g", "s"], extra: ["a", "z"] },
    { w: "jets", parts: ["j", "e", "t", "s"], extra: ["i", "z"] },
    { w: "pods", parts: ["p", "o", "d", "s"], extra: ["a", "z"] },
    { w: "huts", parts: ["h", "u", "t", "s"], extra: ["o", "z"] },
    { w: "pins", parts: ["p", "i", "n", "s"], extra: ["e", "z"] },
    { w: "bugs", parts: ["b", "u", "g", "s"], extra: ["a", "z"] },
  ],
  chains: [
    ["cats", "cuts", "huts", "hats", "hams"],
    ["pins", "pens", "pets", "pots", "dots"],
  ],
  heart: ["the", "a", "said", "was", "and", "to", "of", "put", "who", "go", "we", "by"],
  vaultFake: [["vobs", "vob", "vabs"], ["teps", "tep", "taps"], ["kems", "kem", "kims"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Kit, Mel, and Gus got to the pits. Six big pits sat in the mud. In the pits sat six tin pods. The pods had lids. The lids had rams on top. Gus had to tap the pods. Tap, tap. The pods hum. Mel got the maps. Six dots on the maps. Six pits on the maps. \"Six pits, six pods,\" said Kit.",
    },
    {
      title: "Crew log 2",
      text: "Gus and Kit had to get the lids up. The lids had big pins in the rims. Gus had to tug the pins. Tug, tug, tug. Pop! Pop! Pop! Six lids got up. In the pods sat tin tabs. On the tabs sat red dots. Mel put the tabs in a bag. Six tabs, six dots. \"Tabs, not cogs?\" said Mel. \"Tabs can fit,\" said Kit.",
    },
    {
      title: "Crew log 3",
      text: "Mel set the tabs on a mat. Tab by tab, the tabs fit. The red dots met. It was a map! It was not a map of the pits. It was a map of six big suns. Gus had to sit. \"Six suns,\" said Gus. Kit got the Sun Cup. Six suns sat on the rim of the cup. Six suns on the cup, six suns on the tabs!",
    },
    {
      title: "Crew log 4",
      text: "Gus put the tabs in a tin box. Mel set the box on the bags in the jet. The Ram Map, the Fog Pot, the Sun Cup, the Jet Pin, and the six tabs. Rams on lids. Rams on pots. Rams on tabs. Who had the rams? Did the rams go to the six suns? \"The rams hid the maps,\" said Kit. \"Can we get to the suns?\" Gus and Mel had to nod. Up, up, up!",
    },
  ],
  relic: { name: "The Six Tabs", caption: "Six tin tabs, one from each pod. Fit them together and the red dots make a map of six suns." },
  story: "The crew pops open six ram-marked pods, and the tin tabs inside fit together into a map of six suns, the same suns cut on the Sun Cup.",
  spanish: "Spanish also adds -s for more than one (gato, gatos), so the idea transfers. The new part is the sound: in English the -s often says /z/ (logs, pins), and Spanish speakers may drop the final s or the consonant before it.",
  miniLesson: {
    title: "Plural -s: pod, pods",
    steps: [
      "Hold up one pen, then three. Say: one pen, three pens. The s means more than one.",
      "Write pod and pods, jet and jets. Cover the s, read the base word, then uncover and read it again.",
      "Point out the sound: in jets the s says /s/; in pods and logs it says /z/. Both are the same -s.",
      "Sort word cards into Just one and More than one: bus, pods, gas, jets, yes, cups. Ask each time: does the s mean more than one?",
      "Read together: \"Six pods had six tin tabs.\"",
    ],
  },
};
