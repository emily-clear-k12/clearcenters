// ClearDecode ruin K8 · Latin roots: port, struct, dict, spect, rupt, ject (past grade 5).
// The last ruin on the ladder: every earlier pattern is fair game in the
// inscriptions, plus these Latin roots: port (carry), struct (build), dict
// (say), spect (look), rupt (break), ject (throw).
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid words that hide these letters with a different
// meaning (portion, portal, sport, important). Checked by tools/cleardecode-check.cjs.
export default {
  id: "K8",
  name: "The Last Door",
  find: "port|struct|dict|spect|rupt|ject",
  code: {
    label: "Latin roots: port, struct, dict, spect, rupt, ject",
    spellings: ["port", "struct", "dict", "spect", "rupt", "ject"],
    rule: "A root is the main part of a word. These come from Latin: port = carry, struct = build, dict = say, spect = look, rupt = break, ject = throw. Find the root, then use the prefix and suffix around it to figure out the meaning.",
  },
  sort: {
    yes: "Root vault", yesHint: "portable · construct",
    no: "Look-alike vault", noHint: "insect · strict",
    hintYes: (w) => `${w} has a Latin root you know, and the root gives a clue to the meaning.`,
    hintNo: (w) => `${w} only looks like it has a root. None of the six roots is spelled inside it.`,
  },
  codex: [
    { w: "portable", parts: ["port", "a", "ble"], hi: 0 },
    { w: "construct", parts: ["con", "struct"], hi: 1 },
    { w: "predict", parts: ["pre", "dict"], hi: 1 },
    { w: "spectator", parts: ["spect", "a", "tor"], hi: 0 },
    { w: "interrupt", parts: ["in", "ter", "rupt"], hi: 2 },
    { w: "project", parts: ["pro", "ject"], hi: 1 },
  ],
  checks: [
    ["portable", "table", "notable"], ["construct", "constant", "contrast"], ["predict", "prefix", "preset"],
    ["spectator", "speckled", "spelling"], ["interrupt", "interest", "intercept"], ["project", "protect", "process"],
    ["reject", "react", "relax"], ["export", "expert", "escort"], ["dictate", "decorate", "delicate"],
    ["abrupt", "absent", "abroad"], ["structure", "strict", "strut"], ["respect", "reset", "resent"],
  ],
  vaultPicks: [
    ["inject", "insect", "infect"], ["support", "suppose", "supply"], ["eruption", "erosion", "election"],
    ["instruct", "instinct", "instant"], ["contradict", "contract", "contrast"], ["suspect", "suspend", "sustain"],
    ["destruction", "distraction", "destination"], ["passport", "passage", "passenger"],
  ],
  // For the sort: words with a Latin root are the bank; the contrast words only look like them.
  bank: ["transport", "import", "export", "report", "portable", "support", "porter", "passport", "airport", "construct", "instruct", "structure", "destruction", "construction", "instructor", "predict", "dictate", "dictionary", "contradict", "verdict", "prediction", "inspect", "respect", "spectator", "inspector", "suspect", "spectacle", "erupt", "eruption", "interrupt", "disrupt", "abrupt", "rupture", "project", "reject", "inject", "eject", "object", "projector", "subject"],
  contrast: ["insect", "infect", "expert", "speck", "spent", "spell", "strict", "strut", "porch", "part", "elect", "erect", "edit", "dent"],
  wall: {
    mode: "syllables",
    words: [
      { w: "transportation", cuts: [5, 8, 10] },
      { w: "construction", cuts: [3, 8] },
      { w: "prediction", cuts: [3, 6] },
      { w: "spectator", cuts: [4, 6] },
      { w: "interrupted", cuts: [2, 5, 9] },
      { w: "projector", cuts: [3, 6] },
    ],
  },
  forge: {
    items: [
      { w: "transport", clue: "carry across from one place to another", parts: ["trans", "port"], explain: "trans + port. trans- means across, and port means carry." },
      { w: "portable", clue: "light enough to carry", parts: ["port", "able"], explain: "port + able. port means carry, and -able means can be. You can carry it." },
      { w: "reject", clue: "throw back, say no to", parts: ["re", "ject"], explain: "re + ject. re- means back, and ject means throw." },
      { w: "prediction", clue: "a guess about what will come next", parts: ["pre", "dict", "ion"], explain: "pre + dict + ion. pre- means before, dict means say, and -ion makes it a thing." },
      { w: "inspector", clue: "a person who looks closely at things", parts: ["in", "spect", "or"], explain: "in + spect + or. in- means into, spect means look, and -or means a person who." },
      { w: "disruption", clue: "a break in what was going on", parts: ["dis", "rupt", "ion"], explain: "dis + rupt + ion. dis- means apart, and rupt means break." },
      { w: "instructor", clue: "a person who teaches", parts: ["in", "struct", "or"], explain: "in + struct + or. struct means build, so an instructor builds what you know." },
      { w: "construction", clue: "the act of building", parts: ["con", "struct", "ion"], explain: "con + struct + ion. con- means together, and struct means build." },
    ],
    extra: [{ t: "sub", k: "pre" }, { t: "form", k: "base" }, { t: "ly", k: "suf" }],
  },
  door: [
    { w: "report", parts: ["r", "e", "p", "or", "t"], extra: ["ur", "ar"] },
    { w: "predict", parts: ["p", "r", "e", "d", "i", "c", "t"], extra: ["k", "ck"] },
    { w: "project", parts: ["p", "r", "o", "j", "e", "c", "t"], extra: ["g", "ck"] },
    { w: "spectator", parts: ["s", "p", "e", "c", "t", "a", "t", "or"], extra: ["k", "er"] },
    { w: "construct", parts: ["c", "o", "n", "s", "t", "r", "u", "c", "t"], extra: ["k", "ck"] },
    { w: "inject", parts: ["i", "n", "j", "e", "c", "t"], extra: ["g", "ck"] },
    { w: "abrupt", parts: ["a", "b", "r", "u", "p", "t"], extra: ["o", "pp"] },
  ],
  chains: [
    ["inject", "insect", "infect"],
    ["eject", "elect", "erect"],
  ],
  heart: [],
  vaultFake: [["restruct", "respect", "reject"], ["portify", "portion", "port"], ["dictoval", "spectoval", "ruptoval"], ["jectorn", "portorn", "structorn"]],
  inscriptions: [
    {
      title: "Log 59",
      text: "At the very bottom of the archive was one last door. It was not like the others. It had no lock, no panel, and no handle. It was one smooth slab of stone, with rows of the builders' code carved across it. The construction was simple, but the message was long. Gus held up his lamp to inspect the carving. Nobody wanted to interrupt the silence. We stood back with respect. \"It is a message,\" said Kit. \"And it is written to whoever reads it.\"",
    },
    {
      title: "Log 60",
      text: "Tam read it out loud, chunk by chunk, the way we had learned. \"To the reader. Our sun is dimming. Long ago, our scientists could predict how it would end. Nothing we constructed could stop it, and we could not reject what the numbers said. So we built ships to transport our people, our seeds, and our stories across the stars. We did not leave because we wanted to. We left so that we could go on.\"",
    },
    {
      title: "Log 61",
      text: "The message went on. \"We left this archive so that what we knew would not be lost. Our instructions are here, and our unfinished projects, and every structure we built. If you can read this, you have learned our code. You may follow the path to our new world, and we will welcome you. Or you may stay and protect what we left. We ask only one thing: respect what you find.\"",
    },
    {
      title: "Log 62",
      text: "We talked for a long time. In the end, we all agreed. We would keep the archive safe, report what we found, and let nobody disrupt it. Then, one day, when our ship can transport us that far, we will follow. Tam pressed the Archive Key into a slot below the message, and a seal slid out into her hand, warm from the water under the ice. We call it the Builders' Seal. On Mudfall, we could not read one word of their code. Now we can read it all.",
    },
  ],
  relic: { name: "The Builders' Seal", caption: "The seal from the builders' last door. It belongs to whoever can read their code, and it marks the crew as keepers of the archive." },
  story: "At the last door, the crew reads the builders' final message: their sun was dimming, so they left for a new world. The crew decides to protect the archive and, one day, follow the builders' path.",
  spanish: "These Latin roots live on in Spanish: portar and transportar (port), construir and estructura (struct), dictar and predecir (dict), inspeccionar and respeto (spect), erupción and interrumpir (rupt), proyecto and inyectar (ject). Spanish speakers often know the meaning already.",
  miniLesson: {
    title: "Latin roots carry meaning",
    steps: [
      "Write the six roots with a meaning for each: port = carry, struct = build, dict = say, spect = look, rupt = break, ject = throw.",
      "Build transport from trans + port. Ask: what does it mean to carry across? Do the same with reject: throw back.",
      "Sort a stack of cards into the six roots: report, construct, predict, inspect, erupt, project, and more. Students say the meaning of each root out loud.",
      "Show look-alikes: insect, strict, expert. Ask: is a root spelled inside? No, so the meaning trick does not work.",
      "Read together: \"Nobody wanted to interrupt the silence. We stood back with respect.\"",
    ],
  },
};
