// ClearDecode ruin K6 · trans-, super-, -ive, -logy (TEKS 5.3(C)).
// Near the top of the ladder: every earlier pattern is fair game in the
// inscriptions, plus trans- (across), super- (above, beyond), -ive (doing or
// tending to) and -logy (the study of). Not yet: Greek roots as a set (K7),
// Latin roots (K8).
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid look-alikes that end in -ive with no suffix (five,
// live, give, alive, drive, archive). Checked by tools/cleardecode-check.cjs.
export default {
  id: "K6",
  name: "The Transport Hall",
  find: "^(trans|super)|ive$|logy$",
  code: {
    label: "trans-, super-, -ive, -logy",
    spellings: ["trans-", "super-", "-ive", "-logy"],
    rule: "trans- means across or into something new (transport). super- means above or beyond (supersonic). -ive means doing or tending to do something (protective). -logy means the study of (biology). Some words just end in i-v-e, like five and give. Cover the ending: is a base word left?",
  },
  sort: {
    yes: "Word part vault", yesHint: "transform · massive",
    no: "Look-alike vault", noHint: "five · olive",
    hintYes: (w) => `${w} has a real word part: trans-, super-, -ive or -logy.`,
    hintNo: (w) => `${w} only looks like it has the part. Cover it and no base word is left.`,
  },
  codex: [
    { w: "transform", parts: ["trans", "form"], hi: 0 },
    { w: "transmit", parts: ["trans", "mit"], hi: 0 },
    { w: "supersonic", parts: ["super", "son", "ic"], hi: 0 },
    { w: "massive", parts: ["mass", "ive"], hi: 1 },
    { w: "protective", parts: ["pro", "tect", "ive"], hi: 2 },
    { w: "biology", parts: ["bio", "logy"], hi: 1 },
  ],
  checks: [
    ["transform", "formal", "forming"], ["transmit", "submit", "admit"], ["supersonic", "sonic", "sonar"],
    ["massive", "masses", "massed"], ["protective", "protected", "protector"], ["biology", "biome", "biologist"],
    ["transplant", "planted", "planter"], ["superstar", "starry", "stardust"], ["explosive", "explode", "exploded"],
    ["inventive", "invented", "inventor"], ["superpower", "powerful", "powered"], ["ecology", "echo", "economy"],
  ],
  vaultPicks: [
    ["transfer", "refer", "ferry"], ["supercharge", "charged", "charger"], ["expensive", "expense", "expenses"],
    ["geology", "geologist", "geode"], ["attractive", "attracted", "attraction"], ["translate", "relate", "later"],
    ["supersize", "sizes", "sizing"], ["detective", "detected", "detector"],
  ],
  // For the sort: real trans-/super-/-ive/-logy words are the bank; the
  // contrast words only look like they have the part.
  bank: ["transport", "transform", "transmit", "transfer", "transplant", "translate", "supersonic", "superhero", "superstar", "supermarket", "superpower", "superheat", "supercharge", "supersize", "superglue", "active", "inactive", "massive", "expensive", "explosive", "protective", "inventive", "attractive", "defective", "effective", "impressive", "destructive", "creative", "selective", "collective", "detective", "biology", "geology", "ecology", "technology", "zoology"],
  contrast: ["five", "dive", "drive", "give", "alive", "olive", "hive", "arrive", "strive", "supper", "supply", "support", "train", "logo"],
  // Games: many look-alikes above end in i-v-e, so the decoys here don't match at all.
  game: {
    targets: ["transport", "transform", "transmit", "supersonic", "superstar", "massive", "protective", "explosive", "inventive", "biology", "geology", "ecology", "supersize", "transplant"],
    decoys: ["supper", "supply", "support", "sunset", "train", "trace", "logo", "lodge", "diver", "driver", "olives", "hives"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "supersonic", cuts: [2, 5, 8] },
      { w: "transformer", cuts: [5, 9] },
      { w: "protective", cuts: [3, 6] },
      { w: "technology", cuts: [4, 7, 8] },
      { w: "inventive", cuts: [2, 5] },
      { w: "biology", cuts: [2, 4, 5] },
    ],
  },
  forge: {
    items: [
      { w: "transform", clue: "change into a new shape", parts: ["trans", "form"], explain: "trans + form. trans- means across or into something new, and a form is a shape." },
      { w: "supersonic", clue: "faster than sound", parts: ["super", "sonic"], explain: "super + sonic. super- means above or beyond, and sonic means sound." },
      { w: "protective", clue: "keeping something safe", parts: ["protect", "ive"], explain: "protect + ive. -ive means doing that: a protective shell protects." },
      { w: "biology", clue: "the study of living things", parts: ["bio", "logy"], explain: "bio + logy. bio means life, and -logy means the study of." },
      { w: "geology", clue: "the study of rocks and land", parts: ["geo", "logy"], explain: "geo + logy. geo means earth, and -logy means the study of." },
      { w: "superheated", clue: "heated past the usual top heat", parts: ["super", "heat", "ed"], explain: "super + heat + ed. super- means beyond, and -ed means it already happened." },
      { w: "transplanted", clue: "moved a plant to a new spot", parts: ["trans", "plant", "ed"], explain: "trans + plant + ed. trans- means across, so the plant went across to a new place." },
      { w: "inactive", clue: "not doing anything, switched off", parts: ["in", "act", "ive"], explain: "in + act + ive. in- means not, act is the base, and -ive means doing it." },
    ],
    extra: [{ t: "re", k: "pre" }, { t: "port", k: "base" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "massive", parts: ["m", "a", "ss", "ive"], extra: ["iv", "eve"] },
    { w: "transmit", parts: ["trans", "m", "i", "t"], extra: ["tranz", "e"] },
    { w: "superstar", parts: ["super", "s", "t", "ar"], extra: ["supper", "or"] },
    { w: "biology", parts: ["b", "i", "o", "logy"], extra: ["ology", "lojy"] },
    { w: "inventive", parts: ["i", "n", "v", "e", "n", "t", "ive"], extra: ["iv", "eve"] },
    { w: "transplant", parts: ["trans", "p", "l", "a", "n", "t"], extra: ["tranz", "e"] },
    { w: "explosive", parts: ["e", "x", "p", "l", "o", "s", "ive"], extra: ["iv", "eve"] },
  ],
  chains: [
    ["dive", "five", "fire", "fine", "mine"],
    ["hive", "live", "line", "lane"],
  ],
  heart: [],
  vaultFake: [["supervond", "transvond", "unvond"], ["plorgology", "plorgive", "plorgish"], ["transglim", "superglim", "subglim"], ["blentive", "blentish", "blentful"]],
  inscriptions: [
    {
      title: "Log 51",
      text: "Past the Map Room, a long tunnel led down to a hall so wide that our lamps could not reach the far wall. Ray found a switch, and a row of lights came on. Nobody spoke. The hall was full of transport ships, lined up nose to tail, dusty but not broken. Each ship was massive, with a protective shell of thick metal. Gus let out a low whistle. \"These are not cargo ships,\" he said. \"These were built to transport people.\"",
    },
    {
      title: "Log 52",
      text: "At the far end of the hall sat one ship much bigger than the rest. Its engine was supersized, as tall as a tower. Kit and Mel climbed up for a closer look. The engine was built to use the hot water under the ice. It could transform heat into power and transmit that power to every ship. \"This is impressive,\" said Kit. \"The builders were inventive. They used what the planet gave them.\" But the supersized engine was cold. One part was missing.",
    },
    {
      title: "Log 53",
      text: "On a desk near the big ship, we found the builders' notes, cut into thin metal sheets. Some were biology notes: drawings of plants and animals the builders had planned to transplant to a new world. Others were geology notes about rocks, ice, and hot springs. Sam read the last sheet aloud: \"Our sun grows weaker. The ice gets thicker each year.\" Mel was quiet for a moment. \"That is why they had to transport so much,\" she said.",
    },
    {
      title: "Log 54",
      text: "Under the builders' notes was a small panel. Behind it, packed in a protective case, sat a heavy cube that hummed. It was the missing part of the engine: a supercharger, hidden so that nobody could misuse it. When Tam held it near the engine, lights ran up its side, active for the first time in ages. \"We will not use it yet,\" said Tam. \"But now we know how the transport ships left.\" We call it the Supercharger Core.",
    },
  ],
  relic: { name: "The Supercharger Core", caption: "The missing part of the builders' supersized engine. It turned the heat under the ice into power for their transport ships." },
  story: "The crew finds a hall of the builders' transport ships and a supersized engine, reads their biology and geology notes, and learns their sun was growing weaker.",
  spanish: "Strong cognates: trans- is the same in Spanish (transportar, transformar), super- is the same (supersónico), -ive is often -ivo/-iva (activo, protectivo, explosivo), and -logy is -logía (biología, geología, ecología).",
  miniLesson: {
    title: "trans-, super-, -ive and -logy",
    steps: [
      "Write transport and transform. Box trans-. Say: trans- means across or into something new.",
      "Write superstar and supersonic. Box super-. Say: super- means above or beyond.",
      "Write protect, then protective. Write act, then active. Say: -ive means doing that or tending to do it. Then show five and give: cover ive and no base word is left.",
      "Write biology and geology. Box -logy and say: the study of. Ask: what does a geology team study?",
      "Read together: \"Each ship was massive, with a protective shell of thick metal.\"",
    ],
  },
};
