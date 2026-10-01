// ClearDecode ruin I6 · drop the silent e; change y to i (UFLI 109-110).
// Decodable rule for this ruin: every pattern from Planets A-H and I1-I5, plus
// dropping a silent e before an ending that starts with a vowel (save, saving;
// hope, hoped; late, latest) and changing a final consonant + y to i before
// -ed, -es, -er, -est (cry, cried; try, tries), plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. The drop-e half of `find` matches one vowel + one consonant + ending
// (hoping, named, safest, makers), so logs avoid words like water, over,
// never and opened that look like that but have no dropped e.
export default {
  id: "I6",
  name: "The Hiding Place",
  find: "(^|[^aeiou])[aeiou][^aeiouwxy](ing|ed|ers?|est)$|(ied|ies|ier|iest|ily)$",
  code: { label: "drop e; y to i", spellings: ["a dropped e", "y changed to i"], rule: "If a word ends in silent e, drop the e before an ending that starts with a vowel (save, saving; hope, hoped). If a word ends in a consonant and y, change the y to i before -ed, -es, -er or -est (cry, cried; try, tries). Keep the y before -ing (crying)." },
  sort: {
    yes: "Spelling changed", yesHint: "hoping · cried",
    no: "No change", noHint: "hopeful · crying",
    hintYes: (w) => `${w}: the base word changed before the ending. An e was dropped, or a y became i.`,
    hintNo: (w) => `${w}: the ending was added with no change to the base word.`,
  },
  codex: [
    { w: "hoped", parts: ["h", "oped"], hi: 1 },
    { w: "riding", parts: ["r", "iding"], hi: 1 },
    { w: "wider", parts: ["w", "ider"], hi: 1 },
    { w: "tries", parts: ["tr", "ies"], hi: 1 },
    { w: "spied", parts: ["sp", "ied"], hi: 1 },
    { w: "happiest", parts: ["happ", "iest"], hi: 1 },
  ],
  checks: [
    ["hoped", "hopped", "hopes"], ["riding", "ridding", "rides"], ["tries", "trays", "trims"],
    ["wider", "wide", "widely"], ["spied", "sped", "spies"], ["happiest", "happily", "happy"],
    ["named", "nodded", "names"], ["dried", "dries", "drying"], ["using", "uses", "useful"],
    ["closer", "closet", "closes"], ["smiling", "smelling", "smiles"], ["carried", "carries", "carrying"],
  ],
  vaultPicks: [
    ["baked", "backed", "bakes"], ["latest", "lately", "late"], ["shining", "shines", "shinning"],
    ["flies", "flees", "flags"], ["safest", "safety", "safely"], ["copied", "copying", "copy"],
    ["voted", "votes", "vetted"], ["traded", "trades", "treads"],
  ],
  // For the sort: changed-spelling words are the bank; contrast words add an ending with no change
  // (a consonant ending keeps the e, -ing keeps the y, and y after a vowel stays).
  bank: ["hoped", "riding", "wider", "tries", "spied", "happiest", "named", "using", "closer", "smiling", "baked", "latest", "shining", "safest", "voted", "traded", "waved", "skated", "hiding", "joking", "making", "taking", "widest", "nicer", "later", "used", "lined", "glided", "cried", "tried", "dried", "flies", "skies", "carried", "happier", "easily"],
  contrast: ["hopeful", "safely", "useful", "careful", "lately", "saves", "hopes", "crying", "trying", "played", "stayed", "enjoyed", "joyful", "flying", "lonely", "homeless"],
  wall: {
    mode: "syllables",
    words: [
      { w: "hoping", cuts: [2] },
      { w: "riding", cuts: [2] },
      { w: "happiest", cuts: [3, 5] },
      { w: "carried", cuts: [3] },
      { w: "smiling", cuts: [3] },
      { w: "safest", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "hoping", clue: "wishing for something right now", parts: ["hop", "ing"], explain: "hope + ing: drop the e, then add -ing. One p, so it still says hope, not hop." },
      { w: "saving", clue: "keeping something safe right now", parts: ["sav", "ing"], explain: "save + ing: the e was dropped because -ing starts with a vowel." },
      { w: "latest", clue: "the most late, or the newest", parts: ["lat", "est"], explain: "late + est: the e was dropped before -est." },
      { w: "used", clue: "put to work before", parts: ["us", "ed"], explain: "use + ed: the e was dropped, so the two e's do not pile up." },
      { w: "cried", clue: "called out, or shed tears", parts: ["cri", "ed"], explain: "cry + ed: change the y to i, then add -ed." },
      { w: "tries", clue: "has a go at it", parts: ["tri", "es"], explain: "try + es: change the y to i, then add -es." },
      { w: "happiest", clue: "the most happy of all", parts: ["happi", "est"], explain: "happy + est: change the y to i, then add -est." },
      { w: "safely", clue: "in a safe way", parts: ["safe", "ly"], explain: "safe + ly: keep the e. -ly starts with a consonant, so nothing changes." },
      { w: "crying", clue: "shedding tears right now", parts: ["cry", "ing"], explain: "cry + ing: keep the y. Changing it would put two i's in a row." },
    ],
    extra: [{ t: "y", k: "base" }, { t: "e", k: "base" }, { t: "ful", k: "suf" }],
  },
  door: [
    { w: "hoping", parts: ["h", "o", "p", "ing"], extra: ["pp", "oa"] },
    { w: "tried", parts: ["t", "r", "i", "ed"], extra: ["y", "igh"] },
    { w: "riding", parts: ["r", "i", "d", "ing"], extra: ["dd", "igh"] },
    { w: "safest", parts: ["s", "a", "f", "est"], extra: ["ff", "ai"] },
    { w: "spies", parts: ["s", "p", "i", "es"], extra: ["y", "igh"] },
    { w: "smiling", parts: ["s", "m", "i", "l", "ing"], extra: ["ll", "igh"] },
    { w: "skated", parts: ["s", "k", "a", "t", "ed"], extra: ["tt", "ai"] },
  ],
  chains: [
    ["riding", "hiding", "hiking", "liking"],
    ["cried", "dried", "dries", "tries"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "two", "you", "they", "their", "again", "are", "do", "what", "who", "where", "water", "only", "come"],
  vaultFake: [["plading", "pladding", "plades"], ["grivest", "grivvest", "grives"], ["smied", "smyed", "smyes"], ["druking", "drukking", "drukes"]],
  inscriptions: [
    {
      title: "Log 1: Hiding from the snow",
      text: "The Frost Rod led us to a planet of deep snow, the coldest place we had landed yet. Snow was piling up so fast that we were hiding in the ship for two days. On the third day, the sky was blue, and the Frost Rod was shining a bright white. \"It is telling us we are close,\" said Ray. We put on our ice suits and went out, taking the rod with us.",
    },
    {
      title: "Log 2: A line of stones",
      text: "We hiked across the snow, hoping to find a mark of the makers. Kit was the one who spotted it: a line of stones, poking up from the snow. The stones were lined up like a path. \"This is not by chance,\" she said. We tried to dig by the last stone, but the snow was packed hard. Gus tried three times to cut into it. On the next try, his drill broke into a room under the snow.",
    },
    {
      title: "Log 3: The hiding place",
      text: "We slid down into the room. It was a hiding place, and the makers had saved things in it: boxes, crates and tools, all lined up in neat rows. Mel smiled. \"They did not leave in a rush,\" she said. \"They were making room on a ship, taking only what they needed.\" In the biggest crate, Ray spied a box with a lid of ice.",
    },
    {
      title: "Log 4: The Star Lens",
      text: "Ray lifted the lid. Inside was a round lens, the size of a hand. When he held it up to the Frost Rod, the next lines of the message came back: \"...We were planning a long trip, and we hoped to come back. We tried to leave a path for you. It is saved in a place we named the...\" \"Named the what?\" cried Kit. Ray was smiling. \"The lens is a map,\" he said. \"It is pointing to the coldest place yet.\" We call it the Star Lens.",
    },
  ],
  relic: { name: "The Star Lens", caption: "A lens the makers hid under the snow. It adds to their message: \"We tried to leave a path for you. It is saved in a place we named the...\"" },
  story: "The crew digs into a hiding place under the snow where the makers saved what they could not take, and finds a lens with the next part of their message and a map to the coldest place yet.",
  spanish: "Spanish has no silent e: every e is said (nube, clase), so students may keep the e (hopeing) or drop it everywhere. Spanish also changes y and i in writing (leer, leyó), so the y-to-i swap can feel familiar: in English, cry becomes cried, but crying keeps the y.",
  miniLesson: {
    title: "Drop the e, change y to i",
    steps: [
      "Write hope. Add -ing. Say: -ing starts with a vowel, so drop the e: hoping. Then add -ful: hopeful. -ful starts with a consonant, so keep the e.",
      "Write hoping and hopping side by side. Read both. Say: one p, long o (hope); two p's, short o (hop).",
      "Write cry. Add -ed: cried. Add -es: cries. Say: a consonant and y at the end, so change y to i.",
      "Write crying. Ask: why keep the y? -ing already starts with i, and two i's in a row would look wrong. Keep the y before -ing.",
      "Read one sentence together: \"We tried to leave a path for you. It is saved in a place we named the...\"",
    ],
  },
};
