import { missionMapTeksCode, missionMapTeksLabel } from "./cases/mission-map/teksLabels";

// Frequency Rush units are filed under names like 5.FR.Energy, not a TEKS
// code. These are the standards named in each unit file.
const FR_UNITS = {
  "3.FR.Energy": ["3.8A"],
  "3.FR.Force-Motion": ["3.7B"],
  "3.FR.Matter-Properties": ["3.6A"],
  "3.FR.Matter-States": ["3.6B"],
  "3.FR.Resources": ["3.11C"],
  "4.FR.Ecosystems": ["4.12B"],
  "4.FR.Energy": ["4.8B"],
  "4.FR.Matter-Mixtures": ["4.6B"],
  "4.FR.Matter-Properties": ["4.6A"],
  "4.FR.Matter-States": ["4.6A"],
  "4.FR.Resources": ["4.11A"],
  "5.FR.Earth-Processes": ["5.10C"],
  "5.FR.Ecosystems": ["5.12A"],
  "5.FR.Energy": ["5.8B", "5.8C"],
  "5.FR.Matter-Properties": ["5.6A"],
  "5.FR.Matter-States": ["5.6A"],
  "5.FR.Organisms": ["5.13B"],
  "5.FR.Water-Weather": ["5.10A"],
  "SS.3.FR.Citizenship": ["3.9C"],
  "SS.3.FR.Communities": ["3.2B"],
  "SS.3.FR.Economics": ["3.6B"],
  "SS.3.FR.Geography": ["3.3A", "3.3B", "3.4C"],
  "SS.3.FR.Government": ["3.7A", "3.7C"],
  "SS.3.FR.Money": ["3.5A"],
  "SS.4.FR.American-Indians": ["4.1C"],
  "SS.4.FR.Economics": ["4.11A"],
  "SS.4.FR.Exploration": ["4.2A"],
  "SS.4.FR.Geography": ["4.8A"],
  "SS.4.FR.Regions": ["4.6A"],
  "SS.4.FR.Texas-Industries": ["4.4B", "4.4C", "4.5B"],
  "SS.5.FR.Colonial": ["5.1A"],
  "SS.5.FR.Economics": ["5.11A"],
  "SS.5.FR.Geography": ["5.8A", "5.8B", "5.6B", "5.6A"],
  "SS.5.FR.History": ["5.2A"],
  "SS.5.FR.Settlement": ["5.7A"],
};

function uniqueCodes(source) {
  const found = String(source || "").match(/\d+\.\d+[A-Z]?/gi) || [];
  return [...new Set(found.map((code) => code.toUpperCase()))];
}

export function codesFor(standard) {
  const raw = String(standard || "").trim();
  if (FR_UNITS[raw]) return FR_UNITS[raw];
  const mapped = missionMapTeksCode(raw);
  if (mapped) return uniqueCodes(mapped);
  if (/\.FR\./i.test(raw)) return [];
  let source = raw.replace(/-(?:SC|GC|FR|SL|SD|AD|RS|MM|CL|EX|XP|MS)(?:-[A-Z0-9]+)?$/i, "");
  source = source.replace(/^(MA|ELA|ELAR|SS|SCI|MATH)[.-]/i, "");
  source = source.replace(/^(\d+)-(\d+[A-Z]?)$/i, "$1.$2");
  return uniqueCodes(source);
}

export function shortTopic(text) {
  let line = String(text || "").trim();
  if (!line) return "";
  const parts = line.split(/\s+[—–]\s+/);
  if (/^TEKS\b/i.test(line) && parts[1]) line = parts.slice(1).join(" ").trim();
  line = line.replace(/^I can\s+/i, "");
  line = line.split(/,|\band\b|\bso\b/i)[0].trim().replace(/[.]+$/, "");
  if (line.length > 54) line = line.slice(0, 51).replace(/\s+\S*$/, "") + "…";
  return line ? line.charAt(0).toUpperCase() + line.slice(1) : "";
}

export function topicForCase(standard, learningTarget) {
  return shortTopic(missionMapTeksLabel(standard) || learningTarget || "");
}
