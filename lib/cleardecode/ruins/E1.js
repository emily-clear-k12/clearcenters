// ClearDecode ruin E1 · tch, dge (UFLI 69-71).
// Decodable rule for this ruin: everything on Planets A-D (short vowels,
// consonant teams, blends, silent e, soft c and g, endings -es/-ed/-ing,
// closed + closed and open syllables) plus tch and dge after a short vowel,
// plus heart words. No -ild/-old/-ind (E2), no y as a vowel (E3), no -le
// (E4), no r-controlled vowels, no vowel teams. Checked by
// tools/cleardecode-check.cjs.
export default {
  id: "E1",
  name: "Hatch Ridge",
  find: "tch|dge",
  code: { label: "tch and dge", spellings: ["tch", "dge"], rule: "right after a short vowel, /ch/ is spelled tch and /j/ is spelled dge: hatch, ledge" },
  sort: {
    yes: "tch and dge vault", yesHint: "hatch · ledge",
    no: "ch and ge vault", noHint: "bench · page",
    hintYes: (w) => `${w} has a short vowel right before tch or dge.`,
    hintNo: (w) => `${w} has ch or ge, not tch or dge. Look at the letter before it.`,
  },
  codex: [
    { w: "hatch", parts: ["h", "a", "tch"], hi: 2 },
    { w: "sketch", parts: ["s", "k", "e", "tch"], hi: 3 },
    { w: "notch", parts: ["n", "o", "tch"], hi: 2 },
    { w: "ledge", parts: ["l", "e", "dge"], hi: 2 },
    { w: "badge", parts: ["b", "a", "dge"], hi: 2 },
    { w: "ridge", parts: ["r", "i", "dge"], hi: 2 },
  ],
  checks: [
    ["hatch", "hat", "hash"], ["ledge", "leg", "led"], ["notch", "not", "nook"],
    ["ditch", "dish", "dig"], ["badge", "bag", "bad"], ["match", "mash", "mat"],
    ["ridge", "rid", "rig"], ["fetch", "fed", "feet"], ["budge", "bug", "bud"],
    ["patch", "path", "pat"], ["wedge", "wed", "web"], ["stretch", "stress", "stench"],
  ],
  vaultPicks: [
    ["catch", "cash", "cat"], ["edge", "egg", "end"], ["smudge", "smug", "snug"], ["pitch", "pit", "pinch"],
    ["judge", "jug", "just"], ["kitchen", "kitten", "chicken"], ["hedge", "head", "hen"], ["clutch", "club", "clunk"],
  ],
  bank: ["hatch", "latch", "match", "patch", "catch", "scratch", "batch", "snatch", "fetch", "sketch", "stretch", "ditch", "pitch", "switch", "stitch", "itch", "notch", "blotch", "clutch", "hutch", "kitchen", "hatchet", "satchel", "edge", "ledge", "wedge", "hedge", "ridge", "bridge", "badge", "judge", "nudge", "budge", "smudge", "fudge", "dodge", "lodge", "pledge", "trudge"],
  contrast: ["rich", "much", "such", "bench", "lunch", "inch", "pinch", "crunch", "branch", "cage", "page", "huge", "stage", "rage", "wage"],
  wall: {
    mode: "syllables",
    words: [
      { w: "hatchet", cuts: [5] },
      { w: "kitchen", cuts: [5] },
      { w: "satchel", cuts: [5] },
      { w: "switches", cuts: [6] },
      { w: "fetching", cuts: [5] },
      { w: "stretches", cuts: [7] },
    ],
  },
  forge: {
    items: [
      { w: "hatches", clue: "more than one hatch", parts: ["hatch", "es"], explain: "hatch + es. After tch, add -es to mean more than one." },
      { w: "patched", clue: "fixed a hole, in the past", parts: ["patch", "ed"], explain: "patch + ed. The ending -ed means it already happened." },
      { w: "fetching", clue: "going to get something right now", parts: ["fetch", "ing"], explain: "fetch + ing. The ending -ing means it is happening now." },
      { w: "sketches", clue: "more than one quick drawing", parts: ["sketch", "es"], explain: "sketch + es. After tch, add -es to mean more than one." },
      { w: "bridges", clue: "more than one bridge", parts: ["bridge", "s"], explain: "bridge + s. The word already ends in e, so just add -s." },
      { w: "ledges", clue: "more than one ledge", parts: ["ledge", "s"], explain: "ledge + s. The word already ends in e, so just add -s." },
    ],
    extra: [{ t: "match", k: "base" }, { t: "badge", k: "base" }],
  },
  door: [
    { w: "hatch", parts: ["h", "a", "tch"], extra: ["ch", "sh"] },
    { w: "ledge", parts: ["l", "e", "dge"], extra: ["ge", "j"] },
    { w: "sketch", parts: ["s", "k", "e", "tch"], extra: ["ch", "sh"] },
    { w: "badge", parts: ["b", "a", "dge"], extra: ["ge", "j"] },
    { w: "ditch", parts: ["d", "i", "tch"], extra: ["ch", "sh"] },
    { w: "ridge", parts: ["r", "i", "dge"], extra: ["ge", "j"] },
    { w: "stretch", parts: ["s", "t", "r", "e", "tch"], extra: ["ch", "sh"] },
  ],
  chains: [
    ["hatch", "latch", "match", "patch", "pitch"],
    ["badge", "budge", "judge", "nudge"],
  ],
  heart: ["the", "a", "of", "to", "was", "said", "they", "water", "our", "by", "from"],
  vaultFake: [["plodge", "plog", "plotch"], ["vatch", "vadge", "vat"], ["brudge", "brug", "brutch"], ["zetch", "zedge", "zet"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "We went on in the pitch black tunnel. Sam held the lamp, and Gus held the sled with Unit Nine on it. The tunnel came to a stop at a hatch in the bedrock. The hatch had a latch and a notch. Kit set the token in the notch. It was a match! The latch went click, and the hatch came open.",
    },
    {
      title: "Crew log 2",
      text: "Past the hatch was a ledge. At the edge of the ledge was a vast pit. A thin stone bridge went across the pit. The bridge had no sides. Tam went on it, then Mel and Kit. The sled got stuck on the bridge, and it did not budge. Gus had to nudge it, inch by inch. At the end of the bridge, we went up a ridge.",
    },
    {
      title: "Crew log 3",
      text: "On top of the ridge was a vast cave. The bedrock had black smudges on it. The smudges went in a big ring. \"Ships left from this spot,\" said Tam. Mel did a fast sketch of the smudges. Kit went to a shaft at the top of the cave. She had to stretch to get the lamp up. The shaft went up and up, past the tunnels and past the hilltop, to the sun. \"So they did not hide in the tunnels,\" said Gus. \"They left.\"",
    },
    {
      title: "Crew log 4",
      text: "Sam went to a ditch at the edge of the cave. In the ditch was a small metal badge. Tam held it up to the lamp. On the badge was an etched ship. The ship went past a big sun, to a planet with water on it. Then Unit Nine gave a hum, and its lens began to blink. \"They went to a planet with water,\" said Mel. \"Then we must fetch our ship,\" said Kit, \"and catch up with them.\"",
    },
  ],
  relic: { name: "The Etched Badge", caption: "A metal badge found in the launch cave. Etched on it: a ship passing a big sun on its way to a planet with water." },
  story: "The token opens a hatch to a bridge, a ridge and a vast cave marked by ship launches. The builders did not just hide underground. They left, and a badge shows a ship heading for a planet with water.",
  spanish: "Spanish ch sounds like English ch, but Spanish never spells it tch. Spanish also has no /j/ as in judge (Spanish j sounds like /h/), so give extra practice hearing /j/ in badge and spelling it dge.",
  miniLesson: {
    title: "tch and dge after a short vowel",
    steps: [
      "Write hatch and ledge. Box tch and dge. Say: these come right after a short vowel.",
      "Write bench and hatch side by side. Ask: what comes before ch in bench? (n, a consonant). Before tch in hatch? (a, a short vowel).",
      "Write cage and badge. Ask: is the a short or long? Long a gets ge; short a gets dge.",
      "Dictate four words (ditch, ridge, lunch, page). Students decide tch/ch or dge/ge before they write.",
      "Read together: \"Kit set the token in the notch, and the hatch came open at the edge of the ledge.\"",
    ],
  },
};
