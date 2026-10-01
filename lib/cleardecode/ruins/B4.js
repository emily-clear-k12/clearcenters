// ClearDecode ruin B4 · ch, wh, ph (UFLI 48-50).
// Decodable rule for this ruin: all short vowels, single consonants, plural -s,
// ff/ll/ss/zz, ck, sh, th, and now ch, wh, ph, plus heart words. No blends yet
// (st, tr, nd, mp... come at B6), no ng/nk (B5), no endings -ed/-ing.
// Checked by tools/cleardecode-check.cjs.
export default {
  id: "B4",
  name: "The Chasm",
  find: "ch|wh|ph",
  code: { label: "ch, wh, ph", spellings: ["ch", "wh", "ph"], rule: "Two letters, one sound: ch says /ch/ as in chop, wh says /w/ as in whip, ph says /f/ as in graph" },
  sort: {
    yes: "Letter team vault", yesHint: "chop · whip",
    no: "No team vault", noHint: "shop · hip",
    hintYes: (w) => `${w} has ch, wh, or ph: two letters that make one sound.`,
    hintNo: (w) => `${w} has no ch, wh, or ph. Look at the letter team again.`,
  },
  codex: [
    { w: "chop", parts: ["ch", "o", "p"], hi: 0 },
    { w: "much", parts: ["m", "u", "ch"], hi: 2 },
    { w: "rich", parts: ["r", "i", "ch"], hi: 2 },
    { w: "whip", parts: ["wh", "i", "p"], hi: 0 },
    { w: "when", parts: ["wh", "e", "n"], hi: 0 },
    { w: "glyph", parts: ["g", "l", "y", "ph"], hi: 3 },
  ],
  checks: [
    ["chop", "shop", "top"], ["much", "mush", "mud"], ["whip", "hip", "wit"],
    ["rich", "rid", "rip"], ["chin", "shin", "thin"], ["when", "hen", "then"],
    ["chess", "mess", "less"], ["whiz", "fizz", "his"], ["chat", "that", "hat"],
    ["such", "suck", "sun"], ["glyph", "glib", "gulp"], ["check", "deck", "peck"],
  ],
  vaultPicks: [
    ["chug", "hug", "shrug"], ["whack", "hack", "shack"], ["bench", "bend", "bell"], ["chill", "hill", "still"],
    ["which", "wish", "wit"], ["chimp", "limp", "shrimp"], ["whisk", "risk", "wisp"], ["dolphin", "doll", "dollop"],
  ],
  bank: ["chop", "chip", "chin", "chat", "chess", "chill", "chug", "chum", "chap", "check", "chick", "much", "such", "rich", "which", "whip", "when", "whiz", "whack", "whim", "whiff", "wham", "graph", "glyph", "dolphin", "champ", "chimp", "bench", "lunch", "whisk", "chest"],
  contrast: ["shop", "top", "hip", "wit", "ship", "mush", "rid", "shin", "hen", "mess", "that", "hat", "suck", "deck", "fizz", "hug"],
  wall: {
    mode: "sounds",
    words: [
      { w: "chop", cuts: [2, 3] },
      { w: "much", cuts: [1, 2] },
      { w: "whip", cuts: [2, 3] },
      { w: "rich", cuts: [1, 2] },
      { w: "chess", cuts: [2, 3] },
      { w: "whiff", cuts: [2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "chop", parts: ["ch", "o", "p"], extra: ["sh", "c"] },
    { w: "much", parts: ["m", "u", "ch"], extra: ["sh", "c"] },
    { w: "whip", parts: ["wh", "i", "p"], extra: ["w", "sh"] },
    { w: "when", parts: ["wh", "e", "n"], extra: ["w", "th"] },
    { w: "rich", parts: ["r", "i", "ch"], extra: ["sh", "k"] },
    { w: "chill", parts: ["ch", "i", "ll"], extra: ["sh", "l"] },
    { w: "chat", parts: ["ch", "a", "t"], extra: ["th", "sh"] },
  ],
  chains: [
    ["chin", "chip", "chap", "chat", "that"],
    ["when", "then", "than", "that", "what"],
  ],
  heart: ["the", "a", "said", "was", "of", "to", "do", "we", "she", "he", "who", "and", "is", "his", "has", "as", "what", "one", "from", "put", "too", "no", "were", "they", "are", "go", "by"],
  vaultFake: [["chab", "shab", "zab"], ["whog", "shog", "vog"], ["phum", "shum", "thum"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The ship got to the rim of a big pit. The pit was chill, so Mel and Kit had to zip up. Bits of rock sat in the mud. \"Which path do we pick?\" said Kit. Phil, who can fix the ship, did a check. \"That path. It has chop cuts on the rocks.\" The chop cuts were in sets of six. \"When did they cut them?\" said Mel. No one can tell yet.",
    },
    {
      title: "Crew log 2",
      text: "Kit led us on the path. It got dim, but Phil had a lit rod. Then the path hit a wall. Much of the wall had chop cuts on it. Mel got a whiff of wet moss. Then she got a shock. One rock in the wall had a chip in it, as big as a mug. \"What is it?\" said Kit. Phil did not tap it. \"Which of us will check it?\" he said.",
    },
    {
      title: "Crew log 3",
      text: "Mel got the chip. It was not a rock. It was a thin chip of tin, and it had a path cut on it. The path had six dots. \"The dots are the chop cuts on the rocks!\" said Kit. Then, with a thud, the wall shot up. A chill whiff of fog hit us. \"Who will go in?\" said Phil. Mel had the chip, so Mel led.",
    },
    {
      title: "Crew log 4",
      text: "Mel got the chip up to the lit rod. On the wall of the hall was a big map. The path on the chip was on the map, too. But on the map, the path ran on and on, from dot to dot, up to a big dot by the sun. \"Which ship ran that path?\" said Kit. \"And when?\" No one can tell yet. Phil put the chip in a tin box. We will check it at the lab. It has much to tell us.",
    },
  ],
  relic: { name: "The Path Chip", caption: "A thin tin chip with a path of six dots cut on it. On the big map, the path runs on, far past the pits." },
  story: "In the cold pits, chop cuts lead the crew to a hidden hall and a tin chip whose path of dots runs off the map, toward the sun.",
  spanish: "Spanish has ch with the same sound (chocolate), so ch usually transfers well. Spanish has no wh, and Spanish spells the /f/ sound with f, never ph (foto, not photo). Many Spanish speakers mix up ch and sh, so practice chip vs. ship and chop vs. shop.",
  miniLesson: {
    title: "ch, wh, ph: two letters, one sound",
    steps: [
      "Write ch, wh, ph on cards. Say: each team is two letters that make one sound. ch /ch/, wh /w/, ph /f/.",
      "Write chop and shop. Read both. Students feel the difference: /ch/ is a quick pop, /sh/ is a long hush.",
      "Say a word (chin, whip, much, graph). Students hold up the card for the team they hear and say where it is: start or end.",
      "Build chip with tiles, then change one letter at a time: chip, chap, chat, that.",
      "Read together: \"Which path has the chop cuts?\"",
    ],
  },
};
