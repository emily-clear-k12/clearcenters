// Practice games score themselves. They stay in Reports and Progress.
// They do not belong on the teacher's grading list.
export const PRACTICE_ENGINES = ["frequency_rush", "relay_station", "signal_defense"];

export const PRACTICE_GAME_SKINS = ["crystal_dive", "frequency_rush"];

export function isPracticeEngine(engine) {
  return PRACTICE_ENGINES.includes(engine);
}

export function isPracticeGame(engine, gameSkin) {
  return isPracticeEngine(engine) || PRACTICE_GAME_SKINS.includes(gameSkin);
}

export const AUTO_SCORE_ENGINES = ["classification_lab", "exhibit_hall", "expedition_station"];

export const NO_AI_ENGINES = ["maker_studio", "broadcast_booth"];
