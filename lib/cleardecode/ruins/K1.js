// ClearDecode ruin K1 · -tion, -sion (UFLI 119). Sample ruin, written in full.
// Near the top of the ladder: every earlier pattern is fair game in the
// inscriptions. Checked by tools/cleardecode-check.cjs.
export default {
  id: "K1",
  name: "The Archive",
  find: "tion|sion",
  code: { label: "-tion and -sion", spellings: ["tion", "sion"], rule: "-tion and -sion at the end of a word say \"shun\". -sion can also say \"zhun,\" as in vision." },
  sort: {
    yes: "\"Shun\" vault", yesHint: "station · mission",
    no: "\"Zhun\" vault", noHint: "vision · explosion",
    hintYes: (w) => `${w} ends with the "shun" sound.`,
    hintNo: (w) => `${w} ends with the "zhun" sound, like vision.`,
  },
  codex: [
    { w: "station", parts: ["sta", "tion"], hi: 1 },
    { w: "mission", parts: ["mis", "sion"], hi: 1 },
    { w: "action", parts: ["ac", "tion"], hi: 1 },
    { w: "motion", parts: ["mo", "tion"], hi: 1 },
    { w: "vision", parts: ["vi", "sion"], hi: 1 },
    { w: "explosion", parts: ["ex", "plo", "sion"], hi: 2 },
  ],
  checks: [
    ["mission", "mitten", "missing"], ["motion", "motor", "mountain"], ["explosion", "explode", "exploring"],
    ["action", "active", "actor"], ["vision", "visit", "village"], ["nation", "native", "nature"],
    ["fraction", "fracture", "fragment"], ["decision", "decide", "decimal"], ["section", "second", "sector"],
    ["caption", "captain", "capture"], ["collision", "collide", "collie"], ["portion", "porter", "portal"],
  ],
  vaultPicks: [
    ["invasion", "invade", "invader"], ["option", "optic", "optimal"], ["erosion", "erode", "eroded"],
    ["mention", "mental", "mentor"], ["television", "telephone", "telescope"], ["direction", "director", "directly"],
    ["confusion", "confuse", "confused"], ["tension", "tense", "tenant"],
  ],
  // For the sort: "shun" words are the bank, "zhun" words are the contrast.
  bank: ["station", "mission", "action", "motion", "nation", "fraction", "section", "caption", "portion", "option", "mention", "tension", "mansion", "passion", "expansion", "connection", "direction", "inspection", "collection", "solution", "lotion", "question"],
  contrast: ["vision", "explosion", "collision", "decision", "invasion", "television", "division", "confusion", "erosion", "revision", "conclusion", "occasion"],
  // Games: any -tion/-sion word counts; decoys have neither.
  game: {
    targets: ["station", "mission", "action", "motion", "vision", "explosion", "nation", "decision", "section", "erosion", "option", "invasion", "fraction", "collision"],
    decoys: ["motor", "nature", "picture", "visit", "active", "native", "mental", "collide", "explode", "decide", "nectar", "captain"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "exploration", cuts: [2, 5, 7] },
      { w: "conversation", cuts: [3, 6, 8] },
      { w: "collision", cuts: [3, 5] },
      { w: "transmission", cuts: [5, 8] },
      { w: "navigation", cuts: [3, 4, 6] },
      { w: "expansion", cuts: [2, 5] },
    ],
  },
  forge: {
    items: [
      { w: "protection", clue: "the act of keeping something safe", parts: ["protect", "ion"], explain: "protect + ion. The ending -ion turns an action into a thing: to protect becomes protection." },
      { w: "inspection", clue: "a careful look at something", parts: ["inspect", "ion"], explain: "inspect + ion. To inspect is the action; an inspection is the thing you do." },
      { w: "reconnection", clue: "the act of linking up again", parts: ["re", "connect", "ion"], explain: "re + connect + ion. re- means again, and -ion makes it a thing." },
      { w: "disconnection", clue: "the act of breaking a link", parts: ["dis", "connect", "ion"], explain: "dis + connect + ion. dis- means the opposite, so disconnection is breaking a link." },
      { w: "direction", clue: "the way something goes", parts: ["direct", "ion"], explain: "direct + ion. To direct is to point the way; a direction is the way." },
    ],
    extra: [{ t: "in", k: "pre" }, { t: "collect", k: "base" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "station", parts: ["s", "t", "a", "tion"], extra: ["sion", "shun"] },
    { w: "mission", parts: ["m", "i", "s", "sion"], extra: ["tion", "shun"] },
    { w: "motion", parts: ["m", "o", "tion"], extra: ["sion", "shun"] },
    { w: "vision", parts: ["v", "i", "sion"], extra: ["tion", "zhun"] },
    { w: "action", parts: ["a", "c", "tion"], extra: ["sion", "shun"] },
    { w: "explosion", parts: ["e", "x", "p", "l", "o", "sion"], extra: ["tion", "zhun"] },
  ],
  chains: [
    ["nation", "notion", "motion", "lotion"],
    ["motion", "lotion", "potion"],
  ],
  heart: [],
  vaultFake: [["zorption", "zorping", "zorps"], ["plantion", "planting", "plants"], ["vreesion", "vreeting", "vrees"], ["glimtion", "glimting", "glims"]],
  inscriptions: [
    {
      title: "Log 31",
      text: "The mission today: reach the builders' archive. Our navigation screen showed a huge section of the planet under ice. Ray made the decision to land near the edge. As the ship touched down, a loud explosion of steam shot up from a crack in the ice. Nobody was hurt, but the collision of hot water and ice gave us a clue. Something under the surface still had power.",
    },
    {
      title: "Log 32",
      text: "We spent the morning on inspection. Behind the steam vent was a door with a caption carved above it, a row of words in the builders' code. Ray read it slowly, chunk by chunk: \"The station of memory.\" It was the archive. The door had no handle, only a small panel waiting for a combination.",
    },
    {
      title: "Log 33",
      text: "The combination was not a number. It was a word. Each button showed a word part: re, con, nect, tion. We pressed them in order and made the word reconnection. The door slid open with no tension at all, as if it had been waiting for us. Inside, rows of screens woke up one section at a time.",
    },
    {
      title: "Log 34",
      text: "The screens showed the builders' last transmission. They had not vanished. They had left on a long mission to a new world, and they built the archive so that anyone who learned their code could follow. At the end of the message was a direction, a path through the stars. But the archive had more sections, deeper under the ice. Tomorrow, our expedition goes deeper.",
    },
  ],
  relic: { name: "The Archive Key", caption: "The builders' archive opened for anyone who could read their code. This key proves you can." },
  story: "The crew finds the builders' archive under the ice and learns the builders did not vanish. They left on a mission and left directions for anyone who learned their code.",
  spanish: "Strong cognate pattern: -tion in English is often -ción in Spanish (station / estación, nation / nación, action / acción). Point out the match; the sound changes from 'see-OWN' to 'shun'.",
  miniLesson: {
    title: "-tion and -sion say \"shun\"",
    steps: [
      "Write station and mission. Box the endings. Say: both say \"shun.\"",
      "Write vision. Say it together. -sion can also say \"zhun.\"",
      "Clap the syllables in action, motion, explosion. The ending is always its own chunk.",
      "Show the cognates: nación / nation, estación / station.",
      "Read together: \"The mission had one action: protect the station.\"",
    ],
  },
};
