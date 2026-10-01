// ClearCode ruin B2 · ck (UFLI 44).
// Decodable rule for this ruin: single consonants, all short vowels, plural
// and verb -s, ff/ll/ss/zz and all/oll/ull (B1), plus ck, plus heart words.
// No sh, th or other digraphs yet, no blends (they come at B6). Checked by
// tools/clearcode-check.cjs.
export default {
  id: "B2",
  name: "The Hill Dock",
  find: "ck",
  code: { label: "ck", spellings: ["ck"], rule: "ck says /k/ right after a short vowel at the end of a short word, as in rock" },
  sort: {
    yes: "ck vault", yesHint: "rock · neck",
    no: "No ck vault", noHint: "rot · net",
    hintYes: (w) => `${w} has ck right after a short vowel, so ck says /k/.`,
    hintNo: (w) => `${w} has no ck. Read the last sound again.`,
  },
  codex: [
    { w: "rock", parts: ["r", "o", "ck"], hi: 2 },
    { w: "lock", parts: ["l", "o", "ck"], hi: 2 },
    { w: "jack", parts: ["j", "a", "ck"], hi: 2 },
    { w: "neck", parts: ["n", "e", "ck"], hi: 2 },
    { w: "tick", parts: ["t", "i", "ck"], hi: 2 },
    { w: "rack", parts: ["r", "a", "ck"], hi: 2 },
  ],
  checks: [
    ["rock", "rot", "rob"], ["lock", "log", "lot"], ["jack", "jab", "jam"],
    ["neck", "net", "peg"], ["tick", "tip", "tin"], ["rack", "rag", "ran"],
    ["back", "bag", "bat"], ["sick", "sit", "sip"], ["luck", "lug", "lull"],
    ["pick", "pig", "pit"], ["sack", "sag", "sat"], ["kick", "kit", "kid"],
  ],
  vaultPicks: [
    ["hack", "had", "ham"], ["peck", "pet", "pen"], ["lick", "lid", "lit"], ["tuck", "tug", "tub"],
    ["mock", "mop", "mob"], ["pack", "pat", "pal"], ["wick", "wig", "win"], ["muck", "mud", "mug"],
  ],
  bank: ["rock", "lock", "jack", "neck", "tick", "rack", "back", "sick", "luck", "pick", "sack", "kick", "hack", "peck", "lick", "tuck", "mock", "pack", "wick", "muck", "deck", "dock", "duck", "sock", "tack", "lack", "buck", "puck", "nick"],
  contrast: ["rot", "rob", "log", "lot", "jab", "net", "tip", "rag", "bag", "sit", "lug", "pig", "sat", "kit", "cot", "mud"],
  wall: {
    mode: "sounds",
    words: [
      { w: "rock", cuts: [1, 2] },
      { w: "lock", cuts: [1, 2] },
      { w: "jack", cuts: [1, 2] },
      { w: "neck", cuts: [1, 2] },
      { w: "tick", cuts: [1, 2] },
      { w: "sack", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "rock", parts: ["r", "o", "ck"], extra: ["c", "k"] },
    { w: "lock", parts: ["l", "o", "ck"], extra: ["c", "k"] },
    { w: "jack", parts: ["j", "a", "ck"], extra: ["c", "k"] },
    { w: "neck", parts: ["n", "e", "ck"], extra: ["c", "k"] },
    { w: "tick", parts: ["t", "i", "ck"], extra: ["c", "k"] },
    { w: "luck", parts: ["l", "u", "ck"], extra: ["c", "k"] },
    { w: "pack", parts: ["p", "a", "ck"], extra: ["c", "k"] },
  ],
  chains: [
    ["rock", "lock", "lick", "luck", "duck"],
    ["back", "pack", "peck", "neck", "deck"],
  ],
  heart: ["the", "a", "said", "to", "of", "as", "has", "and", "is", "go", "who", "water", "they", "come"],
  vaultFake: [["gock", "gack", "gick"], ["teck", "tack", "tick"], ["jeck", "jack", "jick"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The bell is back at the lab. Tam and Kit go back to the hull. At the back of the hull is a big rock. A lock is set in the rock. Kit did not pick the lock. Kit hit it, and the lock ticks. Tick, tick, tick. \"Is it on?\" said Kit. \"It ticks,\" said Tam. \"Get back!\" Kit and Tam got back, but the rock did not pop. The tick, tick, tick did not let up.",
    },
    {
      title: "Crew log 2",
      text: "Gus and Mel get to the rock. Gus has a jack in a sack. Gus sets the jack at the rock and jacks it up. Up, up, up! At the back of the rock is a pit. The pit is not dim. It has a rock deck, and on the deck is a dock. Water laps at the dock. \"A dock in a hill?\" said Mel. Back up top, the lock ticks on.",
    },
    {
      title: "Crew log 3",
      text: "Kit and Tam go up on the deck. At the dock is a sub. It has a lid, and on the lid is a lock. The lock has six dots on it. Mel had a pad of all the dots on the wall. Kit picks six dots, and Mel taps the six on the lock. Tick, tick, tick. The lock pops, and the lid rocks back. In the sub is a box. The box ticks, as the lock did.",
    },
    {
      title: "Crew log 4",
      text: "Gus picks up the box. It is not big, but it is a lock box, and it has dots on it, as the bell did. Tick, tick. Mel sets it in a sack. \"It will go back to the lab,\" said Mel. Kit sat on the dock. Water hits the dock. \"Who set a dock in a hill?\" said Kit. \"Did the subs go off on the water? And will they come back?\"",
    },
  ],
  relic: { name: "The Tick Box", caption: "A small locked box from a sub at a hidden dock. It ticks, and its dots match the Moss Bell." },
  story: "A ticking lock in a rock leads the crew down to a dock hidden inside a hill, where an old sub holds a locked box that still ticks.",
  spanish: "Spanish spells the /k/ sound with c or qu and never uses ck. Teach ck as the English spelling for /k/ right after a short vowel, and contrast it with words that end in k after a consonant later on.",
  miniLesson: {
    title: "ck after a short vowel: rock, neck",
    steps: [
      "Write rock and neck. Underline ck. Say: two letters, one sound, /k/.",
      "Ask: what comes right before ck? (a short vowel). That is when we use ck at the end.",
      "Read pairs: rot / rock, bag / back, lug / luck. Students tap the word with ck.",
      "Dictate 3 words (lock, tick, pack). Students say the sounds, then write ck for /k/.",
      "Read together: \"The lock on the rock ticks.\"",
    ],
  },
};
