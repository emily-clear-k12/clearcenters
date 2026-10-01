// ClearDecode ruin I5 · the doubling rule (UFLI 107-108).
// Decodable rule for this ruin: every pattern from Planets A-H, I1's -s/-es and
// -er/-est, I2's -ly/-less/-ful, I3's un-/pre-/re-, I4's dis-, plus the
// doubling rule: a short word that ends in one vowel and one consonant doubles
// that consonant before -ed, -ing, -er, -est or -y (stopped, planning, biggest,
// sunny), plus heart words. No drop-e or y-to-i words yet (I6).
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid words like better, happy and summer that look doubled
// but are not a base word plus an ending.
export default {
  id: "I5",
  name: "Shipping Bay",
  find: "([bdgmnprt])\\1(ed|ing|er|est|y)$",
  code: { label: "doubling rule", spellings: ["a doubled letter + -ed", "-ing", "-er", "-est", "-y"], rule: "When a short word ends in one vowel and one consonant (stop, plan, big), double the last consonant before an ending that starts with a vowel: -ed, -ing, -er, -est, -y. The double letter keeps the vowel short." },
  sort: {
    yes: "Double it", yesHint: "stopped · planning",
    no: "Just add it", noHint: "jumped · cleaning",
    hintYes: (w) => `${w}: the base word ends in one vowel and one consonant, so the last letter doubles.`,
    hintNo: (w) => `${w}: the base word ends in two consonants or has a vowel team, so nothing doubles.`,
  },
  codex: [
    { w: "planned", parts: ["pl", "a", "nned"], hi: 2 },
    { w: "biggest", parts: ["b", "i", "ggest"], hi: 2 },
    { w: "shipping", parts: ["sh", "i", "pping"], hi: 2 },
    { w: "hotter", parts: ["h", "o", "tter"], hi: 2 },
    { w: "grabbed", parts: ["gr", "a", "bbed"], hi: 2 },
    { w: "sunny", parts: ["s", "u", "nny"], hi: 2 },
  ],
  checks: [
    ["hopped", "hoped", "hops"], ["planning", "planing", "plans"], ["biggest", "bigger", "big"],
    ["tapped", "taped", "taps"], ["hottest", "hotter", "hot"], ["grabbed", "grabs", "grab"],
    ["sunny", "suns", "sunk"], ["dragging", "drags", "dragon"], ["thinner", "thinker", "thinly"],
    ["shipped", "ships", "shift"], ["wettest", "wetter", "wets"], ["stopped", "stops", "stomped"],
  ],
  vaultPicks: [
    ["dropped", "drops", "droop"], ["jogging", "jogs", "joking"], ["chopped", "chops", "choked"],
    ["muddy", "mud", "must"], ["hugged", "hugs", "huge"], ["spotted", "spots", "sported"],
    ["trimmed", "trims", "trim"], ["foggy", "fog", "fogs"],
  ],
  // For the sort: doubled words are the bank; contrast words take an ending with no doubling.
  bank: ["stopped", "stopping", "planned", "planning", "bigger", "biggest", "hotter", "hottest", "sadder", "saddest", "wetter", "wettest", "thinner", "thinnest", "dropped", "dropping", "shipped", "shipping", "grabbed", "grabbing", "hopped", "hopping", "tapped", "tapping", "rubbed", "dragged", "jogging", "sunny", "foggy", "muddy", "funny", "chopped", "slipped", "flipped", "trimmed", "spotted", "digging", "getting", "setting", "unplugged"],
  contrast: ["jumped", "helping", "rested", "melted", "camping", "fixing", "boxed", "landing", "colder", "faster", "cleaned", "looked", "sharpest", "softer", "dusty", "rocky"],
  wall: {
    mode: "syllables",
    words: [
      { w: "planning", cuts: [4] },
      { w: "biggest", cuts: [3] },
      { w: "shopping", cuts: [4] },
      { w: "hottest", cuts: [3] },
      { w: "sunny", cuts: [3] },
      { w: "dropping", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "stopped", clue: "came to a stop", parts: ["stop", "p", "ed"], explain: "stop + p + ed: double the p so the o stays short." },
      { w: "planning", clue: "making a plan right now", parts: ["plan", "n", "ing"], explain: "plan + n + ing: double the n so the a stays short." },
      { w: "biggest", clue: "the most big of all", parts: ["big", "g", "est"], explain: "big + g + est: double the g so the i stays short. -est compares three or more." },
      { w: "sunny", clue: "full of sun", parts: ["sun", "n", "y"], explain: "sun + n + y: double the n so the u stays short. -y means full of." },
      { w: "dropped", clue: "let something fall", parts: ["drop", "p", "ed"], explain: "drop + p + ed: double the p so the o stays short." },
      { w: "hotter", clue: "more hot than another", parts: ["hot", "t", "er"], explain: "hot + t + er: double the t so the o stays short. -er compares two." },
      { w: "unplugged", clue: "pulled the plug out", parts: ["un", "plug", "g", "ed"], explain: "un + plug + g + ed: double the g so the u stays short. un- means the opposite." },
      { w: "jumping", clue: "leaping up right now", parts: ["jump", "ing"], explain: "jump + ing: no doubling. Jump already ends in two consonants, m and p." },
    ],
    extra: [{ t: "t", k: "base" }, { t: "ly", k: "suf" }, { t: "re", k: "pre" }],
  },
  door: [
    { w: "planned", parts: ["p", "l", "a", "nn", "ed"], extra: ["n", "d"] },
    { w: "biggest", parts: ["b", "i", "gg", "est"], extra: ["g", "ist"] },
    { w: "shipping", parts: ["sh", "i", "pp", "ing"], extra: ["p", "ch"] },
    { w: "hottest", parts: ["h", "o", "tt", "est"], extra: ["t", "ist"] },
    { w: "grabbed", parts: ["g", "r", "a", "bb", "ed"], extra: ["b", "d"] },
    { w: "sunny", parts: ["s", "u", "nn", "y"], extra: ["n", "ee"] },
    { w: "dropped", parts: ["d", "r", "o", "pp", "ed"], extra: ["p", "t"] },
  ],
  chains: [
    ["tapped", "topped", "hopped", "mopped"],
    ["jogging", "logging", "lagging", "tagging"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "two", "you", "they", "their", "again", "are", "do", "what", "who", "where", "here", "water", "only"],
  vaultFake: [["grobbed", "grobed", "grobs"], ["flimmest", "flimest", "flims"], ["blemmy", "blemy", "blems"], ["glabbing", "glabing", "glabs"]],
  inscriptions: [
    {
      title: "Log 1: Slipping and sliding",
      text: "The Frost Rod led us to a moon of ice. Our ship slipped as it landed, and we skidded to a stop next to a long row of docks. Ships had stopped here long ago. The docks were empty now, but the ice still had the tracks the ships left when they were dragged in and out. Kit was the first one to step out. She slipped, and Gus grabbed her arm. \"Thanks,\" she said, and she grinned.",
    },
    {
      title: "Log 2: The biggest map",
      text: "Inside the dock hall, a map was cut into the wall. It was the biggest map we had seen, with dots for planets and lines from dot to dot. Ray tapped one dot, and it lit up. \"The makers planned their trips here,\" he said. \"Each line is a trip they mapped out.\" Mel spotted a dot with a ring of ice. It was the coldest dot on the map. When she held the Frost Rod next to it, the rod frosted over.",
    },
    {
      title: "Log 3: The jammed hatch",
      text: "A hatch at the end of the hall was jammed shut. Gus and Ray tugged and tugged, but it did not budge. \"Stop,\" said Tam. \"We are getting no place.\" She found a lever next to the hatch and flipped it. Ice dripped from the frame, and the hatch popped open. Inside was a small room with a chipped metal desk. A dim light on the desk was still humming, after all this time.",
    },
    {
      title: "Log 4: The Planning Chip",
      text: "On the desk sat a flat chip in a slot. When Ray slipped it out, the next lines of the message ran across the wall: \"...planet where hot water runs under the ice. We stopped there, but we did not stay. We were planning a long trip, and we...\" Then the lines stopped. \"They had a plan,\" said Kit, \"and they left it for us to find.\" We packed the chip with the Signal Coil. We call it the Planning Chip.",
    },
  ],
  relic: { name: "The Planning Chip", caption: "A chip from the makers' dock desk. It adds to their message: \"We stopped there, but we did not stay. We were planning a long trip.\"" },
  story: "The crew lands at the makers' old shipping docks, finds a map of their trips, and pops open a jammed hatch to recover a chip with the next part of the makers' message.",
  spanish: "Spanish has no doubling rule, and its double letters (rr, ll) are their own sounds, so students may write stoped or planing. Spanish vowels have one sound each, so practice hearing short vowels: the double letter is a signal to keep the vowel short (hopped), and one letter can mean a long vowel (hoped).",
  miniLesson: {
    title: "Double the last letter to keep the vowel short",
    steps: [
      "Write stop. Ask: one vowel, one consonant at the end? Yes. Say: before -ed or -ing, double it: stop + p + ed = stopped.",
      "Write jump. Ask: one consonant at the end? No, it ends in m and p. So just add: jumped.",
      "Write hopped and hoped side by side. Read both. Say: the double p keeps the o short; one p lets it say its name.",
      "Build 6 words with cards: plan + ing, big + est, sun + y, help + ing, hot + er, rest + ed. Students decide: double it or just add it?",
      "Read one sentence together: \"Gus and Ray tugged and tugged, but it did not budge.\"",
    ],
  },
};
