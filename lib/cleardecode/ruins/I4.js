// ClearDecode ruin I4 · prefix dis- plus a review of the affixes so far (UFLI 105-106).
// Decodable rule for this ruin: every pattern from Planets A-H, I1's -s/-es and
// -er/-est, I2's -ly/-less/-ful, I3's un-/pre-/re-, plus the prefix dis- (not,
// or the opposite) on base words with no spelling change, plus heart words.
// No doubling words (stopped, getting: I5) and no drop-e or y-to-i words
// (hoped, agreed, cried: I6). Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid look-alikes like dish, disk and distant.
export default {
  id: "I4",
  name: "The Silent Tower",
  find: "^dis",
  code: { label: "dis- (and the word parts so far)", spellings: ["dis-"], rule: "dis- goes at the front of a base word and means not or the opposite (disarm, distrust). Some words just start with d-i-s, like dish and distant. Cover dis and check: is a base word left?" },
  sort: {
    yes: "dis- vault", yesHint: "disarm · distrust",
    no: "Look-alike vault", noHint: "dish · distant",
    hintYes: (w) => `${w} is dis- plus a base word, so it means not or the opposite.`,
    hintNo: (w) => `${w} only starts with d-i-s. Cover dis and no base word is left.`,
  },
  codex: [
    { w: "distrust", parts: ["dis", "trust"], hi: 0 },
    { w: "disarm", parts: ["dis", "arm"], hi: 0 },
    { w: "disown", parts: ["dis", "own"], hi: 0 },
    { w: "dismount", parts: ["dis", "mount"], hi: 0 },
    { w: "disagree", parts: ["dis", "agree"], hi: 0 },
    { w: "disloyal", parts: ["dis", "loyal"], hi: 0 },
  ],
  checks: [
    ["disarm", "rearm", "armed"], ["distrust", "trusted", "trusty"], ["disown", "owner", "owning"],
    ["dismount", "remount", "mounted"], ["disagree", "agreeing", "agrees"], ["disloyal", "loyal", "loyally"],
    ["disband", "banded", "bandit"], ["disgrace", "graceful", "graceless"], ["disorder", "ordered", "orderly"],
    ["discharge", "charged", "charging"], ["disuse", "useful", "useless"], ["disregard", "regarding", "regards"],
  ],
  vaultPicks: [
    ["discount", "recount", "counted"], ["dislodge", "lodged", "lodging"], ["disclose", "closer", "closest"],
    ["disinfect", "infected", "infecting"], ["displace", "replace", "placed"], ["distaste", "tasteful", "tasteless"],
    ["disjoint", "jointed", "rejoin"], ["disrespect", "respectful", "respected"],
  ],
  // For the sort: true dis- words are the bank; the contrast words only start with d-i-s.
  bank: ["distrust", "disarm", "disown", "dismount", "disagree", "disloyal", "disband", "disconnect", "dislike", "disuse", "disable", "disgrace", "displace", "discharge", "disclose", "dislodge", "disinfect", "disorder", "discount", "disregard", "disrespect", "distaste", "disjoint", "disarmed", "disowned", "distrustful", "disgraceful", "disconnected", "dismounted", "disagreeing", "disembark", "disallow"],
  contrast: ["dish", "disk", "disc", "distant", "district", "discus", "dismal", "discuss", "distance", "disaster", "dispatch", "display", "dishes", "distinct"],
  // Games: decoys start with d-i-s but have no prefix, plus a few re-/un- words for review.
  game: {
    targets: ["disarm", "distrust", "disown", "dismount", "disagree", "disloyal", "disband", "disconnect", "disorder", "discount", "disinfect", "displace", "distrustful", "disconnected"],
    decoys: ["dish", "disk", "distant", "district", "discus", "dismal", "discuss", "distance", "display", "dispatch", "disaster", "reconnect", "unarmed", "rearm"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "disagreeing", cuts: [3, 4, 8] },
      { w: "distrustful", cuts: [3, 8] },
      { w: "disconnected", cuts: [3, 6, 10] },
      { w: "dismounted", cuts: [3, 8] },
      { w: "disloyal", cuts: [3, 6] },
      { w: "disowning", cuts: [3, 6] },
    ],
  },
  forge: {
    items: [
      { w: "disarm", clue: "take the weapons or power away", parts: ["dis", "arm"], explain: "dis + arm. The prefix dis- means the opposite: arm it, then disarm it." },
      { w: "distrustful", clue: "not trusting, full of doubt", parts: ["dis", "trust", "ful"], explain: "dis + trust + ful. dis- means not, and -ful means full of." },
      { w: "disconnected", clue: "came apart, no longer joined", parts: ["dis", "connect", "ed"], explain: "dis + connect + ed. dis- means the opposite, and -ed means it already happened." },
      { w: "disloyal", clue: "not loyal to your crew", parts: ["dis", "loyal"], explain: "dis + loyal. The prefix dis- means not." },
      { w: "unlocked", clue: "opened the lock", parts: ["un", "lock", "ed"], explain: "un + lock + ed. From the last ruin: un- means the opposite." },
      { w: "reloading", clue: "loading again", parts: ["re", "load", "ing"], explain: "re + load + ing. re- means again, and -ing means it is happening now." },
      { w: "harmlessly", clue: "in a way that does no harm", parts: ["harm", "less", "ly"], explain: "harm + less + ly. -less means without, then -ly tells how." },
      { w: "darkest", clue: "the most dark of all", parts: ["dark", "est"], explain: "dark + est. -est compares three or more." },
    ],
    extra: [{ t: "pre", k: "pre" }, { t: "trust", k: "base" }, { t: "er", k: "suf" }],
  },
  door: [
    { w: "distrust", parts: ["dis", "t", "r", "u", "s", "t"], extra: ["des", "diss"] },
    { w: "disarm", parts: ["dis", "ar", "m"], extra: ["des", "or"] },
    { w: "disown", parts: ["dis", "ow", "n"], extra: ["des", "oa"] },
    { w: "dismount", parts: ["dis", "m", "ou", "n", "t"], extra: ["diss", "ow"] },
    { w: "disloyal", parts: ["dis", "l", "oy", "a", "l"], extra: ["diss", "oi"] },
    { w: "disband", parts: ["dis", "b", "a", "n", "d"], extra: ["des", "diss"] },
    { w: "discount", parts: ["dis", "c", "ou", "n", "t"], extra: ["diss", "ow"] },
  ],
  chains: [
    ["trust", "crust", "crest", "chest"],
    ["count", "mount", "mound", "sound"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "two", "you", "they", "their", "again", "too", "are", "do", "what", "who", "where", "water", "only"],
  vaultFake: [["disvump", "revump", "unvump"], ["disgleb", "regleb", "pregleb"], ["dispronk", "repronk", "unpronk"]],
  inscriptions: [
    {
      title: "Log 1: The silent tower",
      text: "The Frost Rod led us to a planet of rock and ice. On a high ridge stood a tall tower, but its lights were dark. \"That is a signal tower,\" said Kit, \"and it looks disconnected.\" Tam did not rush in. She distrusts a place that is too still. Gus did not agree. \"Distrust will not get us far,\" he said. \"The makers did not disown this place. They left it for a crew like us.\" In the end, we all went up the ridge.",
    },
    {
      title: "Log 2: Disarmed",
      text: "Inside the tower, two drones stood by the steps. When we came close, red lights blinked on them. Mel held up a hand. \"Do not panic,\" she said. \"They are not harmful. They are just distrustful of us.\" Ray found a switch on the back of each drone. He disconnected a cord and disarmed them, one at a time. \"Disarming a drone is not the same as harming it,\" he said. We went up the steps, quick and quiet, and did not dislodge a thing.",
    },
    {
      title: "Log 3: The cut cable",
      text: "At the top of the tower, a thick cable ran up to a beacon on the roof. The cable was cut, and the beacon was disconnected. Kit and Gus disagree on most things. Kit said to join the cut ends. Gus said to put in a new cable from the ship. In the end, Tam joined the cut ends and sealed them with tape. \"If it is disconnected again,\" she said, \"we will not get it back.\" The beacon gave a click, and a cube on the wall lit up.",
    },
    {
      title: "Log 4: More of the message",
      text: "The cube began like the Replay Cube: \"We are not lost. If you can read this, you can follow us. Look for the...\" This time, the text did not stop there: \"...planet where hot water runs under the ice. We...\" Then the signal cut off. Ray did not distrust it for a second. \"The makers did not disown us,\" said Mel. \"They left the rest in parts for a crew that can read their code.\" Tam disconnected the coil from the beacon. We call it the Signal Coil.",
    },
  ],
  relic: { name: "The Signal Coil", caption: "A coil from the makers' tower beacon. It carried more of their message: \"Look for the planet where hot water runs under the ice.\"" },
  story: "The crew climbs a silent tower, disarms its guard drones, and reconnects a cut cable so the makers' beacon can play more of their unfinished message.",
  spanish: "dis- matches Spanish des- and dis- (desconectar = disconnect, desarmar = disarm, desconfiar = distrust, desleal = disloyal), so students can use what they know. Point out that English spells it d-i-s, not d-e-s.",
  miniLesson: {
    title: "dis- means not or the opposite",
    steps: [
      "Write arm. Add dis-: disarm. Write trust. Add dis-: distrust. Say: dis- goes at the front and means not or the opposite.",
      "Show look-alikes: dish, distant. Cover dis. Ask: is a base word left? No, so there is no prefix.",
      "Review the prefixes so far on one line: unlock, reload, preheat, disarm. Students say what each prefix means.",
      "Build distrustful with cards: dis + trust + ful. Students read the base word first, then add one part at a time.",
      "Read one sentence together: \"He disconnected a cord and disarmed them, one at a time.\"",
    ],
  },
};
