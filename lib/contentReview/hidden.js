// Content held back from teachers until a review fix lands.
// Remove a line when its fix is merged. Source: ClearCenters_Content_Review.xlsx
// Engine names are the ones the app uses. Signal Ops is signal_defense.
export const HIDDEN_CONTENT = [
  { engine: "assembly_deck", code: "3.6A-AD", reason: "facts" },
  { engine: "assembly_deck", code: "MA.3.4K-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.3.5A-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.3.5B-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.4.4H-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.4.5A-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.4.5B-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.4.9B-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.5.3K-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.5.3L-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "MA.5.4B-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "SS.3.14B-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "SS.3.7C-AD", reason: "answer key" },
  { engine: "assembly_deck", code: "SS.4.11C-AD", reason: "answer key" },
  { engine: "broadcast_booth", code: "SCI.3.13A-BB", reason: "standard" },
  { engine: "classification_lab", code: "SCI-4.12B-CL", reason: "standard" },
  { engine: "signal_defense", code: "3.10A-SD", reason: "facts" },
  { engine: "signal_defense", code: "3.7A-SD", reason: "answer key" },
  { engine: "signal_defense", code: "3.8B-SD", reason: "answer key" },
  { engine: "exhibit_hall", code: "3.2A-EX", reason: "answer key" },
  { engine: "exhibit_hall", code: "3.9A-EX", reason: "standard" },
  { engine: "exhibit_hall", code: "4.9A-EX", reason: "standard" },
  { engine: "exhibit_hall", code: "ELA.3.10C-EX", reason: "standard" },
  { engine: "exhibit_hall", code: "ELA.5.10D-EX", reason: "standard" },
  { engine: "exhibit_hall", code: "SS.4.14A-EX", reason: "facts" },
  { engine: "exhibit_hall", code: "SS.4.1A-EX", reason: "standard" },
  { engine: "exhibit_hall", code: "SS.5.5A-EX", reason: "standard" },
  { engine: "expedition_station", code: "ELA.3.3B-XP", reason: "fairness" },
  { engine: "expedition_station", code: "ELA.3.9D-XP", reason: "answer key" },
  { engine: "expedition_station", code: "ELA.3.9E-XP", reason: "answer key" },
  { engine: "expedition_station", code: "ELA.4.10E-XP", reason: "answer key" },
  { engine: "expedition_station", code: "ELA.5.13D-XP", reason: "answer key" },
  { engine: "expedition_station", code: "MA.3.3A-XP", reason: "answer key" },
  { engine: "group_chat", code: "3.13B", reason: "facts" },
  { engine: "group_chat", code: "4.8A", reason: "facts" },
  { engine: "group_chat", code: "5.13A", reason: "standard" },
  { engine: "group_chat", code: "5.6B", reason: "fairness" },
  { engine: "group_chat", code: "5.7B", reason: "standard" },
  { engine: "mission_map", code: "3.7-MM", reason: "answer key" },
  { engine: "mission_map", code: "4.1-MM", reason: "facts" },
  { engine: "mission_map", code: "4.4-MM", reason: "facts" },
  { engine: "mission_map", code: "5.10-MM", reason: "facts" },
  { engine: "mission_map", code: "5.3-MM", reason: "facts" },
  { engine: "signal_check", code: "3.10A-SC", reason: "standard" },
  { engine: "signal_check", code: "3.10C-SC", reason: "standard" },
  { engine: "signal_check", code: "3.13B-SC", reason: "accuracy" },
  { engine: "signal_check", code: "SS.4.6B-SC", reason: "accuracy" },
  { engine: "simulation_lab", code: "4.6B-SL", reason: "facts" },
];

const KEYS = new Set(HIDDEN_CONTENT.map((h) => `${h.engine}|${h.code}`));
const CODES = new Set(HIDDEN_CONTENT.map((h) => h.code));

export const HIDDEN_ASSIGN_MESSAGE = "This activity is being fixed and can't be assigned right now.";

export function isHiddenContent(engine, code) {
  const key = String(code || "");
  if (!key) return false;
  if (engine && KEYS.has(`${engine}|${key}`)) return true;
  return CODES.has(key);
}
