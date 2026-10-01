// ClearCode ruin E4 · consonant + -le (UFLI 75-76). Inscriptions use only
// patterns taught up to E4 (short vowels, -s, consonant teams, blends, silent e,
// soft c and g, endings, syllables, open and closed syllables, tch/dge,
// -ild/-old/-ind/-olt/-ost, y as a vowel, and consonant + -le) plus heart words.
// No r-controlled vowels, no vowel teams. Checked by tools/clearcode-check.cjs.
export default {
  id: "E4",
  name: "Cable Hub",
  find: "[^aeiou]le$",
  code: { label: "consonant + -le", spellings: ["-le"], rule: "A consonant + le at the end of a word makes its own syllable, as in can-dle. The e is silent." },
  sort: {
    yes: "-le vault", yesHint: "candle · simple",
    no: "-el and -al vault", noHint: "tunnel · metal",
    hintYes: (w) => `${w} ends with a consonant + le. That last syllable says /ul/ with a silent e.`,
    hintNo: (w) => `${w} ends with el or al, not le.`,
  },
  codex: [
    { w: "simple", parts: ["sim", "ple"], hi: 1 },
    { w: "nozzle", parts: ["noz", "zle"], hi: 1 },
    { w: "candle", parts: ["can", "dle"], hi: 1 },
    { w: "rattle", parts: ["rat", "tle"], hi: 1 },
    { w: "title", parts: ["ti", "tle"], hi: 1 },
    { w: "bundle", parts: ["bun", "dle"], hi: 1 },
  ],
  checks: [
    ["candle", "candy", "canal"], ["simple", "simply", "symbol"], ["title", "tile", "total"],
    ["bundle", "bunch", "tunnel"], ["nozzle", "nose", "novel"], ["little", "lit", "label"],
    ["middle", "model", "midst"], ["tumble", "tub", "tunnel"], ["jungle", "junk", "jug"],
    ["paddle", "pad", "pedal"], ["puzzle", "pizza", "pulse"], ["rattle", "rat", "rival"],
  ],
  vaultPicks: [
    ["bottle", "bottom", "bolt"], ["kettle", "kept", "kennel"], ["sample", "sand", "signal"], ["gentle", "gem", "general"],
    ["struggle", "strung", "struck"], ["topple", "top", "topped"], ["sizzle", "size", "sized"], ["crumble", "crumb", "crumbs"],
  ],
  bank: ["simple", "nozzle", "candle", "rattle", "title", "bundle", "little", "middle", "tumble", "jungle", "paddle", "puzzle", "bottle", "kettle", "sample", "gentle", "struggle", "topple", "sizzle", "crumble", "handle", "cable", "table", "stable", "able", "rifle", "bugle", "tackle", "buckle", "crackle", "grumble", "humble", "wobble", "saddle", "riddle"],
  contrast: ["label", "camel", "panel", "tunnel", "travel", "gravel", "model", "metal", "petal", "pedal", "medal", "signal", "final", "total", "rival", "level"],
  wall: {
    mode: "syllables",
    words: [
      { w: "candle", cuts: [3] },
      { w: "puzzle", cuts: [3] },
      { w: "title", cuts: [2] },
      { w: "tumble", cuts: [3] },
      { w: "tackle", cuts: [4] },
      { w: "nozzle", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "candles", clue: "more than one candle", parts: ["candle", "s"], explain: "candle + s. The word already ends in e, so just add -s." },
      { w: "bottles", clue: "more than one bottle", parts: ["bottle", "s"], explain: "bottle + s. The word already ends in e, so just add -s." },
      { w: "handles", clue: "more than one handle", parts: ["handle", "s"], explain: "handle + s. The ending -s means more than one." },
      { w: "tables", clue: "more than one table", parts: ["table", "s"], explain: "table + s. The ending -s means more than one." },
      { w: "tumbles", clue: "falls and rolls (it ___ down)", parts: ["tumble", "s"], explain: "tumble + s. Add -s to an action word for he, she or it." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "ing", k: "suf" }, { t: "puzzle", k: "base" }],
  },
  door: [
    { w: "candle", parts: ["c", "a", "n", "d", "le"], extra: ["el", "al"] },
    { w: "puzzle", parts: ["p", "u", "zz", "le"], extra: ["el", "z"] },
    { w: "simple", parts: ["s", "i", "m", "p", "le"], extra: ["el", "al"] },
    { w: "title", parts: ["t", "i", "t", "le"], extra: ["el", "al"] },
    { w: "tumble", parts: ["t", "u", "m", "b", "le"], extra: ["el", "al"] },
    { w: "nozzle", parts: ["n", "o", "zz", "le"], extra: ["el", "z"] },
    { w: "bottle", parts: ["b", "o", "tt", "le"], extra: ["el", "t"] },
  ],
  chains: [
    ["fumble", "humble", "tumble", "rumble", "mumble"],
    ["saddle", "paddle", "puddle", "muddle", "middle"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "they", "one", "what", "go"],
  vaultFake: [["gromble", "gromb", "gromby"], ["tozzle", "tozz", "tozzy"], ["glimple", "glimp", "glimpy"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Mel and Tam went into a long tunnel in the rock. Thick cables ran along the walls in a bundle as big as a man. Mel held up a candle. It was so still that the candle did not wobble. Then, from the end of the tunnel, came a rattle. Tam felt a little jumpy. \"It is just the cables,\" said Mel. But Mel did not let go of the candle.",
    },
    {
      title: "Crew log 2",
      text: "The tunnel ended at a vast hall. Stone homes sat in stacks up its sides, as thick as a jungle. Not one home had a candle lit. In the middle of the hall sat a ship on a stand. It had a hatch with a big handle. Rattle, rattle. A cable hung from the hull, and it swung and hit the side of the ship. Mel had to smile. \"It was just a cable,\" said Mel.",
    },
    {
      title: "Crew log 3",
      text: "Tam got a grip on the handle and gave it a tug. The hatch swung open. Inside the ship sat a table, and on the table was a simple puzzle of stone tiles. The tiles sat in a jumble. Mel set them in a line. They made the same dots and line as the sky disc. But the back of the ship was empty. It had no jets. \"They did not finish this ship,\" said Tam. \"Then what did they fly in?\"",
    },
    {
      title: "Crew log 4",
      text: "Tam held the candle up to the hull. A brass handle sat in a slot by the hatch. It was not like the hatch handle. It had the dots and the line cut into it, and it fit Tam's hand just so. \"It must go with the ship,\" said Mel. Tam slid the handle into a bag. It was a little thing, but it felt like a big step. As they left the hall, the cable gave one last rattle.",
    },
  ],
  relic: { name: "The Brass Handle", caption: "A brass handle cut with the same dots and line as the sky disc, left beside a ship the builders never finished." },
  story: "Deep in a cable-lined tunnel, the crew finds the builders' hidden city and a ship with no jets, which raises a new question: if they did not fly this ship, what did they fly in?",
  spanish: "Spanish words like cable and simple share the spelling but are said with a clear e at the end (CAH-bleh). In English the e is silent and the last syllable sounds like /bul/. Spanish words end in -al or -el, so expect spellings like \"candel.\"",
  miniLesson: {
    title: "Consonant + -le: can-dle, sim-ple",
    steps: [
      "Write candle. Cover dle with your hand. Read can. Uncover and read dle as /dul/. Say: the e is silent.",
      "Rule: count back three letters from the end and split there. Model it with puzzle, title, tumble.",
      "Students split and read 4 words on whiteboards: bundle, simple, rattle, nozzle.",
      "Show candle and tunnel. Ask: which ends in le, which ends in el? Both sound the same, so we have to look.",
      "Read together: \"Mel held the candle by its little handle.\"",
    ],
  },
};
