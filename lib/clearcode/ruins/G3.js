// ClearCode ruin G3 · long o: oa, ow (as in glow), oe (UFLI 86).
// Inscriptions use only patterns taught up to G3 (short vowels, consonant
// teams, blends, silent e, endings -s/-es/-ed/-ing, syllables, tch/dge, y,
// -le, r-controlled vowels, ai/ay, ee/ea/ey, oa/ow/oe) plus heart words.
// No ow as in cow (H5) and no oo (H1) in the logs. Checked by
// tools/clearcode-check.cjs.
export default {
  id: "G3",
  name: "Shadow Coast",
  find: "oa|ow|oe",
  code: { label: "long o", spellings: ["oa", "ow", "oe"], rule: "oa in the middle of a word, ow at the end, and oe in a few short words like toe" },
  sort: {
    yes: "Long o vault", yesHint: "boat · glow · toe",
    no: "Short o vault", noHint: "cot · rod",
    hintYes: (w) => `${w} has the long o code (oa, ow or oe), so the o is long.`,
    hintNo: (w) => `${w} has no oa, ow or oe, so the o is short.`,
  },
  codex: [
    { w: "boat", parts: ["b", "oa", "t"], hi: 1 },
    { w: "coast", parts: ["c", "oa", "st"], hi: 1 },
    { w: "road", parts: ["r", "oa", "d"], hi: 1 },
    { w: "slow", parts: ["sl", "ow"], hi: 1 },
    { w: "throw", parts: ["thr", "ow"], hi: 1 },
    { w: "toe", parts: ["t", "oe"], hi: 1 },
  ],
  checks: [
    ["coast", "cost", "cast"], ["road", "rod", "rid"], ["show", "shop", "shot"],
    ["toe", "tie", "tea"], ["cloak", "clock", "click"], ["groan", "grin", "green"],
    ["snow", "snag", "snap"], ["load", "lad", "lid"], ["coat", "cot", "cat"],
    ["below", "bell", "belt"], ["foam", "from", "form"], ["goat", "got", "gate"],
  ],
  vaultPicks: [
    ["roast", "rust", "rest"], ["window", "winding", "windy"], ["shadow", "shady", "shaded"], ["oak", "ask", "ark"],
    ["toast", "test", "taste"], ["boast", "best", "bust"], ["follow", "folly", "fold"], ["throat", "threat", "thrust"],
  ],
  bank: ["boat", "coat", "goat", "road", "load", "toad", "soap", "foam", "coast", "roast", "toast", "boast", "float", "cloak", "croak", "groan", "oak", "throat", "goal", "coal", "glow", "low", "slow", "show", "snow", "row", "flow", "grow", "throw", "blow", "below", "window", "shadow", "follow", "rainbow", "elbow", "toe", "foe", "tiptoe", "hoe"],
  contrast: ["cot", "rod", "got", "cost", "clock", "slot", "shop", "flop", "crop", "stock", "frog", "spot", "blot", "lock", "rob", "gloss"],
  wall: {
    mode: "syllables",
    words: [
      { w: "window", cuts: [3] },
      { w: "shadow", cuts: [3] },
      { w: "rainbow", cuts: [4] },
      { w: "railroad", cuts: [4] },
      { w: "below", cuts: [2] },
      { w: "elbow", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "floating", clue: "staying on top of the water right now", parts: ["float", "ing"], explain: "float + ing. The ending -ing means it is happening now." },
      { w: "boats", clue: "more than one boat", parts: ["boat", "s"], explain: "boat + s. The ending -s means more than one." },
      { w: "glowed", clue: "gave off a soft light in the past", parts: ["glow", "ed"], explain: "glow + ed. The ending -ed means it already happened." },
      { w: "coaches", clue: "more than one coach", parts: ["coach", "es"], explain: "coach + es. Words that end in ch take -es to mean more than one." },
      { w: "throwing", clue: "tossing something right now", parts: ["throw", "ing"], explain: "throw + ing. The ending -ing means it is happening now." },
    ],
    extra: [{ t: "load", k: "base" }, { t: "snow", k: "base" }, { t: "er", k: "suf" }],
  },
  door: [
    { w: "boat", parts: ["b", "oa", "t"], extra: ["ow", "o"] },
    { w: "coast", parts: ["c", "oa", "s", "t"], extra: ["ow", "o"] },
    { w: "snow", parts: ["s", "n", "ow"], extra: ["oa", "o"] },
    { w: "throw", parts: ["th", "r", "ow"], extra: ["oa", "oe"] },
    { w: "toe", parts: ["t", "oe"], extra: ["ow", "oa"] },
    { w: "road", parts: ["r", "oa", "d"], extra: ["ow", "o"] },
    { w: "slow", parts: ["s", "l", "ow"], extra: ["oa", "o"] },
  ],
  chains: [
    ["coat", "boat", "goat", "goal", "coal"],
    ["load", "road", "roam", "foam"],
  ],
  heart: ["the", "a", "to", "of", "was", "said", "were", "water", "they", "one", "he", "go"],
  vaultFake: [["broap", "brop", "brap"], ["skoat", "skot", "skat"], ["snoam", "snom", "snam"], ["vroe", "vree", "vry"]],
  inscriptions: [
    {
      title: "Explorer's log: the coast road",
      text: "The rain stone led us to the coast. A long stone road ran from the gate to the sea. Mel said the makers made the road for boats, not for feet. Slow waves rolled in below the cliffs. Then Tam yelled and held up a hand. A small float was drifting on the water, and it had a soft glow. It was green, like the rain stone.",
    },
    {
      title: "Explorer's log: the boat shed",
      text: "We followed the glow along the coast. The float led us to a boat shed cut into the rock. Inside, a long boat sat on a stone ramp. Its hull was made of oak, and its sails were as thin as a sheet. Gus tested the oak with his fist. \"Still strong,\" he said. A row of floats hung from a beam. They were all dark but one, and that one was still glowing.",
    },
    {
      title: "Explorer's log: the channel",
      text: "Ray and Mel loaded the boat, and we let the tide take us past the cliffs. The sea got dark and cold. In the shadow of the cliffs, the water was black. A big fin cut the water below us. Then it sank. At last, we came to a wide channel. Glowing floats sat on the sides of it in a long row, like a road on the sea. The makers had marked a safe path for boats.",
    },
    {
      title: "Explorer's log: the glow float",
      text: "At the end of the channel was a stone dock and a gate. On the gate, the makers had cut rows and rows of boats, all sailing away from the coast. In a slot on the gate sat a float with a strong green glow. Kit lifted it free. Under it was a line of code: \"Go by the sea road.\" The makers left this coast by boat. We will take the glow float back to the lab and show the team.",
    },
  ],
  relic: { name: "The Glow Float", caption: "The builders lined their sea roads with glowing floats so their boats could find a safe path in the dark." },
  story: "The rain signs lead the crew to the coast, where a channel lined with glowing floats shows that the builders left this coast by boat along a sea road.",
  spanish: "Long o is close to Spanish o (as in 'oso'), so the sound usually transfers. The work is the spellings: oa, ow and oe all spell one sound. Note for later: ow can also say /ow/ as in cow (taught in H5).",
  miniLesson: {
    title: "Long o: oa in the middle, ow at the end, oe in toe",
    steps: [
      "Write boat, glow and toe. Underline oa, ow and oe. Say: all three spell the long o sound.",
      "Ask: where is oa? (middle). Where is ow? (end). Point out that oe shows up in only a few short words.",
      "Sort 6 cards together: coast, snow, road, throw, toe, float.",
      "Dictate 3 words (coat, slow, toast). Students say the sound, then pick oa or ow.",
      "Read one sentence together: \"The slow boat floated past the coast.\"",
    ],
  },
};
