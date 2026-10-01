// ClearDecode ruin I3 · prefixes un-, pre-, re- (UFLI 103-104).
// Decodable rule for this ruin: every pattern from Planets A-H, I1's -s/-es and
// -er/-est, I2's -ly/-less/-ful, plus the prefixes un- (not, or the opposite),
// re- (again, or back) and pre- (before) on base words with no spelling
// change, plus heart words. No dis- yet (I4), and no doubling or drop-e words
// (I5, I6). Checked by tools/cleardecode-check.cjs.
export default {
  id: "I3",
  name: "The Sealed Gate",
  find: "^(un|pre|re)",
  code: { label: "un-, pre-, re-", spellings: ["un-", "pre-", "re-"], rule: "A prefix goes at the front of a base word and changes its meaning. un- means not or the opposite, re- means again or back, pre- means before." },
  sort: {
    yes: "Prefix vault", yesHint: "unpack · reload",
    no: "Look-alike vault", noHint: "under · red",
    hintYes: (w) => `${w} is a prefix plus a base word you know.`,
    hintNo: (w) => `${w} only looks like it has a prefix. The start is just part of the word.`,
  },
  codex: [
    { w: "unpack", parts: ["un", "pack"], hi: 0 },
    { w: "refill", parts: ["re", "fill"], hi: 0 },
    { w: "preheat", parts: ["pre", "heat"], hi: 0 },
    { w: "unsafe", parts: ["un", "safe"], hi: 0 },
    { w: "reload", parts: ["re", "load"], hi: 0 },
    { w: "prepaid", parts: ["pre", "paid"], hi: 0 },
  ],
  checks: [
    ["refill", "fill", "filling"], ["unload", "reload", "loaded"], ["preheat", "reheat", "heated"],
    ["unsafe", "safe", "safely"], ["unpack", "repack", "packing"], ["repaint", "painted", "painter"],
    ["unkind", "kindly", "kinder"], ["prepaid", "repaid", "unpaid"], ["rewind", "winding", "unwind"],
    ["unseen", "seeing", "seen"], ["retell", "telling", "teller"], ["unfold", "folded", "folder"],
  ],
  vaultPicks: [
    ["replay", "player", "played"], ["unlit", "lighting", "lit"], ["preset", "reset", "setting"],
    ["unplug", "plugged", "plugs"], ["reseal", "sealed", "sealing"], ["recheck", "checked", "checker"],
    ["pretest", "tested", "tester"], ["unhook", "hooked", "hooking"],
  ],
  // For the sort: true prefix words are the bank; the contrast words only look like they start with a prefix.
  bank: ["unpack", "unload", "unlock", "unzip", "unfold", "unseen", "unsafe", "unkind", "unlit", "unfit", "unhook", "unpaid", "untrue", "unsold", "unplug", "unwrap", "unhelpful", "unharmed", "preheat", "prepay", "preset", "pretest", "precut", "prepaid", "premade", "prefix", "restart", "reload", "refill", "reheat", "retell", "recheck", "replay", "repaint", "reseal", "reset", "rewind", "rerun", "rewrite", "reopen"],
  contrast: ["red", "under", "press", "uncle", "reef", "reach", "rest", "rent", "read", "ready", "unit", "reptile", "preach", "relish"],
  // Games: decoys start with un, re or pre but have no prefix.
  game: {
    targets: ["unpack", "refill", "preheat", "unsafe", "reload", "prepaid", "unkind", "repaint", "unseen", "rewind", "pretest", "unfold", "unplug", "reheat"],
    decoys: ["red", "under", "press", "uncle", "reef", "reach", "rest", "rent", "ready", "unit", "preach", "reptile"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "reloading", cuts: [2, 6] },
      { w: "unpacking", cuts: [2, 6] },
      { w: "preheated", cuts: [3, 7] },
      { w: "unhelpful", cuts: [2, 6] },
      { w: "reopen", cuts: [2, 3] },
      { w: "prepaid", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "reload", clue: "load again", parts: ["re", "load"], explain: "re + load. The prefix re- means again." },
      { w: "unpacked", clue: "took everything out of a pack", parts: ["un", "pack", "ed"], explain: "un + pack + ed. un- means the opposite, and -ed means it already happened." },
      { w: "preheat", clue: "heat before you use it", parts: ["pre", "heat"], explain: "pre + heat. The prefix pre- means before." },
      { w: "unhelpful", clue: "not helpful", parts: ["un", "help", "ful"], explain: "un + help + ful. un- means not, and -ful means full of." },
      { w: "repainted", clue: "painted again", parts: ["re", "paint", "ed"], explain: "re + paint + ed. re- means again, and -ed means it already happened." },
      { w: "prepaid", clue: "paid before", parts: ["pre", "paid"], explain: "pre + paid. If it is prepaid, you paid before you got it." },
    ],
    extra: [{ t: "less", k: "suf" }, { t: "lock", k: "base" }, { t: "ly", k: "suf" }],
  },
  door: [
    { w: "unpack", parts: ["un", "p", "a", "ck"], extra: ["on", "in"] },
    { w: "reload", parts: ["re", "l", "oa", "d"], extra: ["ree", "ri"] },
    { w: "preheat", parts: ["pre", "h", "ea", "t"], extra: ["pri", "per"] },
    { w: "unfold", parts: ["un", "f", "o", "l", "d"], extra: ["on", "an"] },
    { w: "refill", parts: ["re", "f", "i", "ll"], extra: ["ree", "ri"] },
    { w: "prepaid", parts: ["pre", "p", "ai", "d"], extra: ["pri", "per"] },
    { w: "unseen", parts: ["un", "s", "ee", "n"], extra: ["in", "on"] },
  ],
  chains: [
    ["reseal", "reseat", "reheat", "repeat"],
    ["unsold", "untold", "unfold"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "you", "they", "again", "too", "are"],
  vaultFake: [["previm", "revim", "unvim"], ["unplaze", "replaze", "preplaze"], ["reblim", "unblim", "preblim"], ["unstoff", "restoff", "prestoff"]],
  inscriptions: [
    {
      title: "Log 1: The sealed gate",
      text: "The Frost Rod led us to a gate in a cliff of black rock. The gate was unmarked and unlit, and it was locked tight. Our tools did not dent it, so we had to rethink our plan. Next to the gate was a panel of buttons. Each button had a word part on it: un, re, pre, lock, load, heat. Kit pressed un, then lock. The gate gave a deep click and slid open. It was unlocked!",
    },
    {
      title: "Log 2: Power and heat",
      text: "Inside, the halls were dark and cold. The power had run down long ago. Ray found a second panel and pressed re, then load. The power was reloaded, and the lights came on, one hall at a time. But the rooms were still too cold to stay in. Mel pressed pre, then heat. Soon the next hall was preheated, and the frost on the walls began to melt. We repacked our kits and went on.",
    },
    {
      title: "Log 3: The cubes",
      text: "In the next room were crates, sealed shut. We unpacked them one by one. Inside were metal cubes, unharmed after all this time. Each cube had a button on its side that said replay. Tam pressed one. A line of the makers' code lit up on the cube, then cut off. She pressed replay again. The same line came back, unfinished. \"These are a message,\" said Ray. \"But it is in parts.\"",
    },
    {
      title: "Log 4: The last cube",
      text: "The last cube sat on a stand by itself. It was the strongest and brightest of them all. When Ray pressed replay, three lines lit up: \"We are not lost. If you can read this, you can follow us. Look for the...\" Then the text cut off, unfinished, like the rest. Ray reread the lines three times. We resealed the crates and left the halls the way we found them. We call the last cube the Replay Cube.",
    },
  ],
  relic: { name: "The Replay Cube", caption: "A cube that replays part of the makers' last message: \"We are not lost.\" The rest is still missing." },
  story: "The crew opens a sealed gate by joining word parts, powers up the makers' halls, and finds cubes that replay part of a message the makers left for anyone who could read their code.",
  spanish: "re- and pre- work the same way in Spanish (repetir, rehacer, prefijo, precalentar = preheat), so students can lean on what they know. un- matches Spanish in- or des- (unkind = poco amable, unpack = desempacar, unsafe = inseguro).",
  miniLesson: {
    title: "un-, re-, pre- at the front of a word",
    steps: [
      "Write pack. Add un-: unpack. Add re-: repack. Say: a prefix goes at the front and changes the meaning.",
      "Teach the meanings: un- means not or the opposite, re- means again, pre- means before. Give one example of each: unsafe, reload, preheat.",
      "Show look-alikes: red, under, press. Cover the start. Ask: is a base word left? No, so there is no prefix.",
      "Sort 6 cards together: unlock, uncle, refill, reef, preheat, preach. Students box the prefix only when a real base word is left.",
      "Read one sentence together: \"Mel pressed pre, then heat, and the hall was preheated.\"",
    ],
  },
};
