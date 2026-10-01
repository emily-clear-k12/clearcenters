// ClearCode ruin I1 · suffixes -s/-es and -er/-est for comparing (UFLI 99-100).
// Planet I starts word parts. Decodable rule for this ruin: every pattern from
// Planets A-H (short vowels, consonant teams, blends, silent e, endings -s/-es/
// -ed/-ing on words that need no spelling change, syllables, tch/dge, -le,
// r-controlled vowels, vowel teams, silent letters) plus -er/-est added to a
// base word with no spelling change (colder, deepest), plus heart words.
// No -ly/-less/-ful or prefixes yet, and no doubling or drop-e words (I5, I6).
// Checked by tools/clearcode-check.cjs.
export default {
  id: "I1",
  name: "The Cold Steps",
  find: "(er|est|es)$",
  code: { label: "-es, -er, -est", spellings: ["-s", "-es", "-er", "-est"], rule: "-s or -es means more than one (add -es after s, x, sh, ch). -er compares two things; -est compares three or more. The base word does not change." },
  sort: {
    yes: "Compares two", yesHint: "colder · deeper",
    no: "Compares three or more", noHint: "coldest · deepest",
    hintYes: (w) => `${w} ends in -er, so it compares two things.`,
    hintNo: (w) => `${w} ends in -est, so it compares three or more things.`,
  },
  codex: [
    { w: "darker", parts: ["dark", "er"], hi: 1 },
    { w: "deepest", parts: ["deep", "est"], hi: 1 },
    { w: "branches", parts: ["branch", "es"], hi: 1 },
    { w: "louder", parts: ["loud", "er"], hi: 1 },
    { w: "thickest", parts: ["thick", "est"], hi: 1 },
    { w: "glasses", parts: ["glass", "es"], hi: 1 },
  ],
  checks: [
    ["darker", "dark", "darkest"], ["deepest", "deep", "deeper"], ["branches", "branch", "branched"],
    ["louder", "loud", "loudest"], ["thickest", "thick", "thicker"], ["dishes", "dish", "ditches"],
    ["softer", "soft", "softest"], ["highest", "high", "higher"], ["switches", "switch", "switched"],
    ["stronger", "strong", "strongest"], ["glasses", "glass", "classes"], ["smallest", "small", "smaller"],
  ],
  vaultPicks: [
    ["brighter", "bright", "brightest"], ["oldest", "old", "older"], ["foxes", "fox", "fixes"],
    ["quicker", "quick", "quickest"], ["sharpest", "sharp", "sharper"], ["benches", "bench", "bunches"],
    ["slower", "slow", "slowest"], ["lightest", "light", "lighter"],
  ],
  // For the sort: "-er" words are the bank, "-est" words are the contrast.
  bank: ["faster", "colder", "darker", "deeper", "longer", "shorter", "softer", "louder", "brighter", "higher", "lower", "slower", "quicker", "thicker", "older", "newer", "stronger", "sharper", "cleaner", "richer", "fresher", "taller", "smaller", "steeper", "cooler", "smarter", "weaker", "lighter", "tighter", "harder", "bolder"],
  contrast: ["fastest", "coldest", "darkest", "deepest", "longest", "highest", "loudest", "brightest", "smallest", "strongest", "oldest", "thickest", "sharpest", "softest", "steepest", "tallest"],
  // Games: any word with -es, -er or -est counts; decoys are the bare base words.
  game: {
    targets: ["faster", "coldest", "boxes", "darker", "deepest", "branches", "louder", "highest", "dishes", "stronger", "glasses", "sharpest", "switches", "older", "foxes", "benches"],
    decoys: ["fast", "cold", "box", "dark", "deep", "branch", "loud", "high", "dish", "strong", "glass", "sharp", "switch", "bench"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "brightest", cuts: [6] },
      { w: "switches", cuts: [6] },
      { w: "stronger", cuts: [6] },
      { w: "thickest", cuts: [5] },
      { w: "glasses", cuts: [5] },
      { w: "smallest", cuts: [5] },
    ],
  },
  forge: {
    items: [
      { w: "darker", clue: "having less light than another place", parts: ["dark", "er"], explain: "dark + er. The ending -er compares two things: this room is darker than that one." },
      { w: "brightest", clue: "the most bright of all", parts: ["bright", "est"], explain: "bright + est. The ending -est compares three or more: the brightest light beats all the rest." },
      { w: "branches", clue: "more than one branch", parts: ["branch", "es"], explain: "branch + es. Add -es after ch, sh, s or x to mean more than one." },
      { w: "louder", clue: "with more sound than another", parts: ["loud", "er"], explain: "loud + er. The ending -er compares two sounds." },
      { w: "thickest", clue: "more thick than all the others", parts: ["thick", "est"], explain: "thick + est. The ending -est picks the one at the top of the group." },
      { w: "switches", clue: "more than one switch", parts: ["switch", "es"], explain: "switch + es. Words that end in tch get -es to mean more than one." },
    ],
    extra: [{ t: "ing", k: "suf" }, { t: "deep", k: "base" }, { t: "s", k: "suf" }],
  },
  door: [
    { w: "darkest", parts: ["d", "ar", "k", "est"], extra: ["ist", "er"] },
    { w: "softer", parts: ["s", "o", "f", "t", "er"], extra: ["est", "ur"] },
    { w: "branches", parts: ["b", "r", "a", "n", "ch", "es"], extra: ["s", "is"] },
    { w: "deepest", parts: ["d", "ee", "p", "est"], extra: ["ist", "er"] },
    { w: "louder", parts: ["l", "ou", "d", "er"], extra: ["est", "or"] },
    { w: "dishes", parts: ["d", "i", "sh", "es"], extra: ["s", "is"] },
    { w: "highest", parts: ["h", "igh", "est"], extra: ["ist", "er"] },
  ],
  chains: [
    ["boxes", "foxes", "fixes", "mixes"],
    ["colder", "bolder", "holder", "folder"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "any", "one", "two", "they", "where", "here"],
  vaultFake: [["vlimpest", "vlimper", "vlimps"], ["groshes", "groshers", "groshing"], ["skolder", "skoldest", "skolds"], ["plinches", "plinch", "plinchest"]],
  inscriptions: [
    {
      title: "Log 1: The top step",
      text: "Our ship landed on a dark planet of black rock and dust. It was colder than any planet we had seen. Tam found steps cut into the rock, going down into the dark. On the top step, the makers had cut three lines: a long line, a longer line, and the longest line. \"It is a test,\" said Kit. \"The longest line points to the deepest step. That is where we must go.\"",
    },
    {
      title: "Log 2: Colder and darker",
      text: "We went down ten steps. Each step was darker and colder than the last. Gus held up a lamp, but its light was dim. Cut into the walls were boxes, and in the boxes were rods of ice. \"The rods get thicker as we go down,\" said Mel. Gus held one up. It was the coldest thing he had held. We packed one rod in a case and went on.",
    },
    {
      title: "Log 3: Two branches",
      text: "At the bottom of the steps, the path split into two branches. Kit said, \"The left branch is shorter, but the right one is steeper and deeper.\" Ray checked the lines cut in the walls. On the right, the lines got longer and longer. \"This way,\" he said. We went right. Those steps were the hardest we had climbed, and the dust was thicker than ash.",
    },
    {
      title: "Log 4: The coldest room",
      text: "The last step led to a small round room, the coldest spot on the planet. In the middle stood a white rod with frost on it. When Tam held it up, the frost grew thicker on one side. \"It points,\" said Gus. \"The colder the place, the brighter it glows.\" Ray looked at the rod for a long time. \"The makers did not stay here,\" he said. \"They went on, to a place colder than this.\" We call it the Frost Rod.",
    },
  ],
  relic: { name: "The Frost Rod", caption: "A rod of white stone that frosts over on the side that points to colder places. The makers went somewhere colder." },
  story: "The crew follows the makers' marks down a stair of colder and deeper steps and finds a rod that points the way to an even colder place, the first sign of where the makers went.",
  spanish: "Spanish compares with words, not endings (más frío = colder, el más frío = coldest), so teach -er and -est as the English way to say más and el más. Plural -es is familiar: Spanish adds -es too (luz, luces).",
  miniLesson: {
    title: "-er compares two, -est compares three or more",
    steps: [
      "Hold up two pencils. Say: this one is longer. Write long + er = longer. -er compares two.",
      "Add a third pencil. Say: this one is the longest. Write long + est = longest. -est compares three or more.",
      "Write box and dish. Say: we add -es after x, sh, ch and s, so we can hear the extra beat: boxes, dishes.",
      "Sort 6 cards together: colder, coldest, deeper, deepest, branches, glasses. Students cover the ending and read the base word first.",
      "Read one sentence together: \"The left branch is shorter, but the right one is deeper.\"",
    ],
  },
};
