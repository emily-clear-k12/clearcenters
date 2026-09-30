// ClearKeys arcade (Sept 29, 2026). Games unlock by Foundations Track level.
export const ARCADE_GAMES = [
  {
    key: "meteor-keys",
    name: "Meteor Keys",
    line: "Letters fall like meteors. Press each one before it lands. Uses only the keys you know.",
    path: "/games/meteor-keys/index.html",
    image: "/cases/RS-4-TRACK.jpg",
    unlockLevel: 1,
    usesLearnedKeys: true,
  },
  {
    key: "word-blaster",
    name: "Word Blaster",
    line: "Scrap-drones are falling on Mechara. Type each drone's word to blast it.",
    path: "/games/mechara-word-blaster/index.html",
    image: "/planets/robot_relay_city.jpg",
    unlockLevel: 13,
    usesLearnedKeys: false,
  },
];

// currentLevel = the level the student is ON; a game opens once its unlock
// level has been passed (Meteor Keys is open from the start).
export function gameUnlocked(game, { currentLevel = 1, trackComplete = false } = {}) {
  if (!game) return false;
  if (trackComplete) return true;
  return game.unlockLevel <= 1 || currentLevel > game.unlockLevel;
}
