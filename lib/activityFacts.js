// One list for every teacher page. Name, picture, plain sentence, and the
// four facts a teacher decides on. `what` (Sept 29, 2026) is the short
// plain-words subtitle shown under the name everywhere a teacher sees it. Practice / Prove it / Make it is the row
// on a standard's page. Signal Ops is a Frequency Rush setting, not its own tile.

export const ACTIVITY_FACTS = {
  frequency_rush: {
    what: "Quick-answer practice game",
    label: "Frequency Rush",
    image: "/teacher/challenges/frequency_rush.jpg",
    sentence: "Students practice words or questions in a game.",
    minutes: "About 10 min",
    turnsIn: "A game score",
    scored: "Scores itself",
    who: "Solo or whole class",
    row: "practice",
  },
  classification_lab: {
    what: "Sort items into groups",
    label: "Classification Lab",
    image: "/lab/room.jpg",
    sentence: "Students sort items into groups by a rule, then fill in a Venn.",
    minutes: "About 20 min",
    turnsIn: "A sort",
    scored: "Scores itself",
    who: "Solo",
    row: "practice",
  },
  signal_defense: {
    what: "Whole-class question game",
    label: "Signal Ops",
    image: "/teacher/challenges/signal_defense.jpg",
    sentence: "The whole class answers together to defend one base.",
    minutes: "About 15 min",
    turnsIn: "A class game",
    scored: "Scores itself",
    who: "Whole class",
    row: "practice",
  },
  mission_map: {
    what: "Follow evidence to a conclusion",
    label: "Mission Map",
    image: "/teacher/challenges/mission_map.jpg",
    sentence: "Students move through checkpoints and build a chain of reasons.",
    minutes: "About 20 min",
    turnsIn: "A written chain",
    scored: "You grade it",
    who: "Solo",
    row: "prove",
  },
  fact_check_desk: {
    what: "Judge if claims are true",
    label: "Signal Check",
    image: "/teacher/challenges/fact_check_desk.jpg",
    sentence: "Students mark each signal true, misleading, or false.",
    minutes: "About 15 min",
    turnsIn: "Verdicts",
    scored: "You grade it",
    who: "Solo",
    row: "prove",
  },
  simulation_lab: {
    what: "Run a virtual experiment",
    label: "Simulation Lab",
    image: "/teacher/challenges/simulation_lab.jpg",
    sentence: "Students change one thing and explain what happened.",
    minutes: "About 20 min",
    turnsIn: "An explanation",
    scored: "You grade it",
    who: "Solo",
    row: "prove",
  },
  assembly_deck: {
    what: "Build a paragraph from sentences",
    label: "Assembly Deck",
    image: "/teacher/challenges/assembly_deck.jpg",
    sentence: "Students build the piece, leave the wrong parts out, and say why.",
    minutes: "About 20 min",
    turnsIn: "A built piece",
    scored: "You grade it",
    who: "Solo",
    row: "prove",
  },
  exhibit_hall: {
    what: "Build a museum exhibit",
    label: "Exhibit Hall",
    image: "/maker/hall.jpg",
    sentence: "Students choose what belongs in an exhibit and write the labels.",
    minutes: "About 20 min",
    turnsIn: "An exhibit",
    scored: "Scores itself",
    who: "Solo",
    row: "prove",
  },
  expedition_station: {
    what: "Three-part story quest",
    label: "Expedition Station",
    image: "/teacher/challenges/expedition_station.jpg",
    sentence: "Students work through a quest, a few tasks at a time.",
    minutes: "About 20 min",
    turnsIn: "Quest answers",
    scored: "Scores itself",
    who: "Solo",
    row: "prove",
  },
  group_chat: {
    what: "Explain what went wrong in a chat",
    label: "Group Chat",
    image: "/teacher/challenges/group_chat.jpg",
    sentence: "Students take a role and explain what is really going on.",
    minutes: "About 20 min",
    turnsIn: "A written answer",
    scored: "You grade it",
    who: "Solo",
    row: "prove",
  },
  maker_studio: {
    what: "Make something to show learning",
    label: "Maker Studio",
    image: "/teacher/challenges/museum_exhibit.jpg",
    sentence: "Students make something from a prompt you choose.",
    minutes: "About 15 min",
    turnsIn: "A creation",
    scored: "You grade it",
    who: "Solo",
    row: "make",
  },
  broadcast_booth: {
    what: "Record a short audio report",
    label: "Broadcast Booth",
    image: "/teacher/challenges/newsroom.jpg",
    sentence: "Students record a short report in their own voice.",
    minutes: "About 25 min",
    turnsIn: "A recording",
    scored: "You grade it",
    who: "Solo",
    row: "make",
  },
  relay_station: {
    what: "Typing practice",
    label: "ClearKeys",
    image: "/teacher/products/keys.jpg",
    sentence: "Students practice typing, one letter at a time.",
    minutes: "About 10 min",
    turnsIn: "Typed text",
    scored: "Scores itself",
    who: "Solo",
    // Sept 29: ClearKeys readings now show under their standards on Assign.
    row: "practice",
  },
};

export const ROW_ORDER = ["practice", "prove", "make"];
export const ROW_LABEL = { practice: "Practice", prove: "Prove it", make: "Make it" };
export const ROW_BLURB = { practice: "Build it up", prove: "Show your thinking", make: "Create something" };

export function activityFacts(key) {
  return ACTIVITY_FACTS[key] || ACTIVITY_FACTS.group_chat;
}

export function factsLine(key) {
  const facts = activityFacts(key);
  return [facts.minutes, facts.turnsIn, facts.scored, facts.who].join(" · ");
}

export function rowRank(engine) {
  const rank = ROW_ORDER.indexOf(activityFacts(engine).row);
  return rank < 0 ? ROW_ORDER.length : rank;
}
