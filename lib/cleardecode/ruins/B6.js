// ClearDecode ruin B6 · consonant blends (UFLI 49, 53).
// Decodable rule for this ruin: all short vowels, single consonants, plural -s,
// ff/ll/ss/zz, ck, sh, th, ch, wh, ph, ng, nk, and now blends at the start
// (bl, cr, fr, gr, sl, sp, st, tr...), blends at the end (st, nd, mp, ft, lt...),
// and 3-letter blends (str, spr, scr, spl), plus heart words. No silent e,
// no endings -ed/-ing, no vowel teams, no r-controlled vowels.
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "B6",
  name: "Split Crest",
  find: "^(bl|br|cl|cr|dr|fl|fr|gl|gr|pl|pr|sc|sk|sl|sm|sn|sp|st|sw|tr|tw|spr|str|scr|spl)|(st|nd|nt|mp|ft|lt|lk|lp|sk|sp|ct|pt|xt)s?$",
  code: { label: "consonant blends", spellings: ["bl", "cr", "fr", "gr", "sl", "sp", "st", "tr", "str", "spl", "nd", "mp", "ft", "lt"], rule: "In a blend, two or three consonants sit side by side and you hear each sound: s-t in stop, m-p in camp, s-t-r in strap" },
  sort: {
    yes: "Blend vault", yesHint: "grip · camp",
    no: "No blend vault", noHint: "rip · cap",
    hintYes: (w) => `${w} has a blend: consonants side by side, and you hear each one.`,
    hintNo: (w) => `${w} has no blend. Each consonant sits next to a vowel.`,
  },
  codex: [
    { w: "stamp", parts: ["st", "a", "mp"], hi: 0 },
    { w: "grip", parts: ["gr", "i", "p"], hi: 0 },
    { w: "split", parts: ["spl", "i", "t"], hi: 0 },
    { w: "strap", parts: ["str", "a", "p"], hi: 0 },
    { w: "crest", parts: ["cr", "e", "st"], hi: 2 },
    { w: "hand", parts: ["h", "a", "nd"], hi: 2 },
  ],
  checks: [
    ["trap", "tap", "rap"], ["sled", "led", "set"], ["clip", "lip", "sip"],
    ["snap", "nap", "sap"], ["spin", "pin", "sin"], ["frog", "fog", "rob"],
    ["hand", "had", "ham"], ["lamp", "lap", "lab"], ["mist", "miss", "mitt"],
    ["raft", "rat", "ram"], ["belt", "bet", "bell"], ["strip", "rip", "sit"],
  ],
  vaultPicks: [
    ["crust", "cub", "rut"], ["flag", "lag", "fig"], ["drum", "rum", "dug"], ["skip", "sip", "kit"],
    ["pond", "pod", "pot"], ["gift", "gig", "fit"], ["swim", "win", "him"], ["scrub", "rub", "sub"],
  ],
  bank: ["stamp", "crest", "grip", "split", "hand", "strap", "trap", "crab", "clip", "snap", "spin", "frog", "lamp", "mist", "raft", "belt", "strip", "crust", "flag", "drum", "skip", "pond", "gift", "swim", "scrub", "plum", "frost", "slab", "brass", "cliff", "stand", "trust", "sprint", "scrap", "splash", "glass", "plank", "crisp", "drift", "blast"],
  contrast: ["rip", "tap", "rap", "lip", "sip", "nap", "pin", "fog", "had", "lap", "miss", "rat", "bet", "rub", "lag", "sub"],
  wall: {
    mode: "sounds",
    words: [
      { w: "stamp", cuts: [1, 2, 3, 4] },
      { w: "grip", cuts: [1, 2, 3] },
      { w: "crest", cuts: [1, 2, 3, 4] },
      { w: "split", cuts: [1, 2, 3, 4] },
      { w: "strap", cuts: [1, 2, 3, 4] },
      { w: "frost", cuts: [1, 2, 3, 4] },
    ],
  },
  forge: null,
  door: [
    { w: "stamp", parts: ["s", "t", "a", "m", "p"], extra: ["n", "b"] },
    { w: "grip", parts: ["g", "r", "i", "p"], extra: ["l", "e"] },
    { w: "crest", parts: ["c", "r", "e", "s", "t"], extra: ["l", "i"] },
    { w: "split", parts: ["s", "p", "l", "i", "t"], extra: ["r", "e"] },
    { w: "hand", parts: ["h", "a", "n", "d"], extra: ["m", "t"] },
    { w: "frog", parts: ["f", "r", "o", "g"], extra: ["l", "u"] },
    { w: "strap", parts: ["s", "t", "r", "a", "p"], extra: ["l", "i"] },
  ],
  chains: [
    ["slip", "slap", "flap", "flat", "flit"],
    ["mist", "must", "rust", "rest", "pest"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "we", "he", "they", "have", "from", "is", "his", "has", "as", "too", "so", "by", "were", "who", "where", "go"],
  vaultFake: [["glim", "gim", "lim"], ["snep", "nep", "sep"], ["strov", "tov", "sov"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The ring of links led us to a cliff. The rocks were slick with mist, and a strong gust hit us. Gus held a strap. \"We must not slip,\" he said. Kit went up in front. Step, grip, step, grip. At the top was a flat crest. In the crest was a split, as long as a bus, and in the split was a big brass slab. \"Stand back,\" said Kit. \"It has a crack in it.\"",
    },
    {
      title: "Crew log 2",
      text: "Tam and Gus slid the slab back. It hid a pit with a flat pad in it. The pad was black, and the rock next to it was black, too. \"A ship left from this spot,\" said Tam. \"It went up from this pad, with a big blast.\" Then Gus felt a bump on the pad. He got a grip on it, and it slid up in his hand. It was a brass stamp.",
    },
    {
      title: "Crew log 3",
      text: "On the end of the stamp was a crest: a cup with six dots in it. \"That crest was cut on the rocks in the pits,\" said Kit. \"It was on the gong at the dock, too,\" said Gus. \"They must have left it at all the spots they went to.\" Then Kit held the stamp up to the sun. A strip of the brass slid back. In it was a scrap of tin, as thin as a pin, with a list cut on it.",
    },
    {
      title: "Crew log 4",
      text: "Back at camp, Tam held the scrap up to the lamp. It was a list of steps. Step 1: the pits. Step 2: the tank. Step 3: the crest. The list went on and on, past the crest, to spots we have not got to yet. \"They left the steps so the next ship can get to them,\" said Tam. \"So we must crack the list, step by step.\" Gus felt a chill. Who left the list, and where did they go?",
    },
  ],
  relic: { name: "The Brass Stamp", caption: "A brass stamp with the builders' crest: a cup with six dots. Inside it, a thin scrap of tin lists their steps." },
  story: "On a split cliff, the crew finds a scorched launch pad and a brass stamp with the builders' crest, and inside it, a list of steps the builders left behind.",
  spanish: "Spanish has many of the same beginning blends (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, tr), so those transfer. Spanish words never start with s + consonant, so students may say \"estop\" for stop or \"espin\" for spin. Spanish words rarely end in two consonants, so final blends (hand, camp, raft) need extra practice: students may drop the last sound.",
  miniLesson: {
    title: "Blends: hear every sound",
    steps: [
      "Write rip and grip. Say: a blend is two consonants side by side, and we hear both. Stretch it: g-r-i-p.",
      "Hold up fingers for each sound in stamp: s, t, a, m, p. Five fingers, five sounds. Do the same for crest and split.",
      "Say a word (trap, hand, swim, raft). Students say if the blend is at the start, the end, or both.",
      "Build lap with tiles, then add one letter at a time: lap, slap, flap, flat.",
      "Read together: \"Gus held the strap and did not slip on the cliff.\"",
    ],
  },
};
