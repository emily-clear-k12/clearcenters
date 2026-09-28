import { TEKS_WORDING } from "./teksWording";
import { SS_TEKS } from "./briefings/teks/ss-teks-3-5";

function sentence(text) {
  const line = String(text || "").replace(/\s+/g, " ").trim();
  if (!line) return "";
  const cased = line.charAt(0).toUpperCase() + line.slice(1);
  return /[.!?]$/.test(cased) ? cased : `${cased}.`;
}

// The official student expectation for this grade's subject and code.
// Same number means different things in different subjects, so the subject is required.
export function standardWording(subject, code) {
  const key = String(code || "").replace(/^TEKS\s+/i, "").trim();
  if (!key) return "";
  if (subject === "Social Studies") {
    const entry = SS_TEKS[key];
    return entry ? sentence(entry.text) : "";
  }
  const table = TEKS_WORDING[subject] || {};
  if (table[key]) return table[key];
  const bare = key.replace(/[A-Z]$/, "");
  if (bare !== key && table[bare] && !Object.keys(table).some((item) => item !== bare && item.startsWith(bare))) {
    return table[bare];
  }
  return "";
}
