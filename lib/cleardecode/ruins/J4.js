// ClearDecode ruin J4 · soft c and g; ch as /sh/ and /k/; silent gn, gh, t (UFLI 117-118).
// Decodable rule for this ruin: every pattern from Planets A-I and J1-J3, plus
// c and g before e, i or y (city, cycle, gem, giant), ch as /sh/ (chef,
// machine) and /k/ (echo, school), and the silent letters in gn (sign),
// gh (ghost) and stle/sten (castle, listen), plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. Logs avoid look-alikes that match it but are not this code: ch as
// /ch/ (each, check), igh/eigh/ough (light, eight, through), a hard g before
// e or i (get, give, began), and gn with a sounded g (signal, magnet).
export default {
  id: "J4",
  name: "The Ghost Ship",
  find: "c[eiy]|g[eiy]|ch|gn|gh|stle|sten",
  code: {
    label: "soft c and g; ch; silent letters",
    spellings: ["ce, ci, cy", "ge, gi, gy", "ch (chef, echo)", "gn, gh", "stle, sten"],
    rule: "C and g usually say /s/ and /j/ before e, i or y (city, cycle, gem, giant). Ch can say /sh/ (chef, machine) or /k/ (echo, school). Some letters are silent: the g in sign, the h in ghost, the t in listen and castle.",
  },
  sort: {
    yes: "Tricky code", yesHint: "city · chef · sign",
    no: "Plain code", noHint: "cat · gap · list",
    hintYes: (w) => `${w} has a soft c or g, a ch that says /sh/ or /k/, or a silent letter.`,
    hintNo: (w) => `${w} has no soft c or g, no /sh/ or /k/ ch, and no silent letter.`,
  },
  codex: [
    { w: "city", parts: ["ci", "ty"], hi: 0 },
    { w: "gentle", parts: ["gen", "tle"], hi: 0 },
    { w: "chef", parts: ["ch", "ef"], hi: 0 },
    { w: "echo", parts: ["e", "cho"], hi: 1 },
    { w: "sign", parts: ["si", "gn"], hi: 1 },
    { w: "listen", parts: ["li", "sten"], hi: 1 },
  ],
  checks: [
    ["city", "kitty", "pity"], ["gentle", "mental", "dental"], ["chef", "shed", "shell"],
    ["echo", "ego", "elbow"], ["sign", "sin", "sing"], ["listen", "lesson", "list"],
    ["ghost", "host", "gust"], ["castle", "cattle", "cast"], ["cement", "comment", "moment"],
    ["machine", "magazine", "marine"], ["school", "spool", "stool"], ["design", "desire", "demand"],
  ],
  vaultPicks: [
    ["germ", "term", "firm"], ["cider", "rider", "wider"], ["gym", "jam", "gum"],
    ["chorus", "horse", "hornet"], ["chute", "shut", "shoot"], ["gnaw", "saw", "paw"],
    ["whistle", "whisper", "missile"], ["fasten", "faster", "fastest"],
  ],
  // For the sort: tricky-code words are the bank; contrast words have hard c and g
  // (before a, o, u), plain ch-free spellings, and no silent letters.
  bank: ["city", "cell", "cent", "cement", "center", "circle", "cycle", "fancy", "space", "voice", "cider", "gem", "gentle", "giant", "gym", "germ", "huge", "energy", "engine", "chef", "machine", "chute", "echo", "school", "chorus", "ache", "sign", "design", "gnaw", "gnat", "ghost", "ghostly", "listen", "castle", "whistle", "fasten", "glisten"],
  contrast: ["cat", "cot", "cut", "gap", "gas", "gum", "gust", "golden", "cargo", "camp", "cast", "list", "host", "sin", "shed"],
  wall: {
    mode: "syllables",
    words: [
      { w: "citizen", cuts: [2, 4] },
      { w: "machine", cuts: [2] },
      { w: "castle", cuts: [3] },
      { w: "cylinder", cuts: [3, 5] },
      { w: "designer", cuts: [2, 6] },
      { w: "energy", cuts: [2, 4] },
    ],
  },
  forge: {
    items: [
      { w: "nicely", clue: "in a nice way", parts: ["nice", "ly"], explain: "nice + ly. Keep the e: it sits right after the c and keeps it soft, so the c still says /s/." },
      { w: "hugely", clue: "in a very big way", parts: ["huge", "ly"], explain: "huge + ly. Keep the e: it keeps the g soft, so it still says /j/." },
      { w: "largest", clue: "the most large of all", parts: ["larg", "est"], explain: "large + est. Drop the e, then add -est. The e in -est keeps the g soft." },
      { w: "racing", clue: "going fast right now", parts: ["rac", "ing"], explain: "race + ing. Drop the e. The i in -ing keeps the c soft, so it still says /s/." },
      { w: "recycled", clue: "used again in a new way", parts: ["re", "cycl", "ed"], explain: "re + cycle + ed. re- means again. The first c says /s/ because y comes next; the second c says /k/ because l comes next." },
      { w: "unsigned", clue: "with no name signed on it", parts: ["un", "sign", "ed"], explain: "un + sign + ed. The g stays silent when you add parts: signs, signed, unsigned." },
      { w: "listening", clue: "hearing with care right now", parts: ["listen", "ing"], explain: "listen + ing. The t stays silent: lis-ten-ing." },
    ],
    extra: [{ t: "ful", k: "suf" }, { t: "dis", k: "pre" }, { t: "ice", k: "base" }],
  },
  door: [
    { w: "city", parts: ["c", "i", "t", "y"], extra: ["s", "k"] },
    { w: "gem", parts: ["g", "e", "m"], extra: ["j", "gh"] },
    { w: "chef", parts: ["ch", "e", "f"], extra: ["sh", "ff"] },
    { w: "echo", parts: ["e", "ch", "o"], extra: ["ck", "k"] },
    { w: "sign", parts: ["s", "i", "gn"], extra: ["n", "igh"] },
    { w: "ghost", parts: ["gh", "o", "s", "t"], extra: ["g", "oa"] },
    { w: "castle", parts: ["c", "a", "s", "tle"], extra: ["sle", "sel"] },
  ],
  chains: [
    ["rice", "race", "pace", "page", "cage"],
    ["light", "sight", "sighs", "signs"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "you", "they", "their", "are", "only", "where"],
  vaultFake: [["cimbo", "kimbo", "cambo"], ["gesk", "gask", "gusk"], ["cylp", "kilp", "calp"]],
  inscriptions: [
    {
      title: "Log 1: A ship in the dark",
      text: "Days went by as the Star Lens led us across the long dark. Out the window we saw only black space. Then Kit spotted a shape on the scope: a ship as big as a city block, drifting with its power cut. \"It is a makers' ship,\" said Ray. We sent a call, but no reply came. Mel ran a scan. No heat, no sound, no signs of life. It was as silent as a ghost. Gus named it the Ghost Ship. After that, we all spoke in soft voices.",
    },
    {
      title: "Log 2: The sign on the hull",
      text: "We docked by the air lock of the Ghost Ship. Cut deep into the hull next to it was a sign in the makers' code. Ray read it out bit by bit: \"This ship is not lost. It rests here for a reason. Listen, and it will tell you the way.\" \"So the ship is a sign as well,\" said Tam. \"It is a marker, left in the dark for us.\" Gus placed his hand on the cold metal. Then he fastened his helmet and pressed the lock.",
    },
    {
      title: "Log 3: The machine at the center",
      text: "Inside, the halls were dark and cold, and every step made an echo. We passed a galley where a chef had left a pan on the stove, and a gym with its bikes still in rows. The makers were not on the ship, and their pods were missing. They had not left in a rush. Then, in the center of the ship, we came to a huge machine. Deep inside it, a soft blue glow went on and off, slow and steady. \"It is not dead,\" said Mel. \"It is keeping time.\"",
    },
    {
      title: "Log 4: The Echo Disc",
      text: "Next to the machine, Ray found a small case with the same sign on its lid. Inside was a thin disc. He held it up to the Star Lens, and a gentle voice came from the disc, in the makers' code: \"...We left this ship in the dark so that you will not be lost. Go on. You are close to the place we named...\" Then the voice went silent. We listened to it three times. We call it the Echo Disc, and we will keep it safe.",
    },
  ],
  relic: { name: "The Echo Disc", caption: "A disc from the makers' silent ship. It adds to their message: \"We left this ship in the dark so that you will not be lost.\"" },
  story: "The crew boards a silent makers' ship drifting in the dark, reads the sign on its hull, and finds a disc that says the ship was left there on purpose to guide them.",
  spanish: "In Spanish, c before e or i also says /s/ in most of Latin America (ciudad, centro), so soft c feels familiar. Spanish g before e or i says a breathy /h/ (gente, gigante), not /j/, so contrast gente with gentle. Spanish ch always says /ch/, and Spanish has no silent g or t, so students may say every letter in sign or listen.",
  miniLesson: {
    title: "Soft c and g, two sounds of ch, silent letters",
    steps: [
      "Write cat, cot, cut and city, cell, cycle. Say: c says /k/ before a, o, u, and /s/ before e, i, y. Do the same with gas, gum and gem, giant, gym.",
      "Write chef and echo. Say: ch can say /sh/ (chef, machine) or /k/ (echo, school). If /ch/ does not make a real word, try /sh/, then /k/.",
      "Write sign, ghost, listen, castle. Cross out the silent letter in each: g, h, t, t. Read each word with the letter crossed out.",
      "Sort six cards together: city, cat, chef, chip, sign, sin. Ask: which ones have a tricky code? Why?",
      "Read one sentence together: \"It rests here for a reason. Listen, and it will tell you the way.\"",
    ],
  },
};
