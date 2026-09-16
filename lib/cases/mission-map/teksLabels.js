// Mission Map case code -> the real TEKS standard that case actually teaches.
//
// Sept 16, 2026. Mission Map numbers its cases sequentially as internal
// concept numbers — 3.1-MM, 3.2-MM, 3.3-MM — unlike every other engine,
// which puts the real standard in that slot (Signal Check's "5.6A-SC",
// Simulation Lab's "3.8B-SL"). So a Mission Map case code is NOT a TEKS
// code: "Rescue the Pollination Path" is filed as 3.1-MM but teaches TEKS
// 3.12B. That's true of 23 of the 25 cases; only 4.6-MM and 5.7-MM line up
// with their real standard, and those two only by coincidence.
//
// Each case file already carries the real standard in its own `teksLabel`
// field, researched and in several cases audited (see 3-1-MM.public.js for
// the audit that found that case had been built outside any real standard
// at all). Nothing displayed it. The Standards report in particular groups
// and labels rows by the raw case code, so a teacher saw "(3.1-MM)" — a
// number that looks like TEKS 3.1 and isn't — and had no way to see that
// the case covers 3.12B, or to connect it to another engine's coverage of
// that same standard.
//
// This map exists so the teacher library, the student activity header and
// the Standards report can all show the real standard. It's a small flat
// list of strings on purpose: the alternative was importing all 25 case
// files into client bundles that only need one line of text from each.
//
// The long-form labels in the case files carry provenance in parentheses
// ("...confirmed Aug 31, 2026 against the real, current TEKS document") —
// that detail belongs in the case file, not on a teacher's screen, so the
// short form is what's stored here.
//
// KEEPING THIS IN SYNC: when a case is added or re-anchored to a different
// standard, update its `teksLabel` in the case file AND the matching line
// here. A missing entry isn't fatal — every caller falls back to the case
// code — it just means that case shows its internal number again.
export const MISSION_MAP_TEKS = {
  "3.1-MM": "TEKS 3.12B — Food Chains & Ecosystem Changes",
  "3.2-MM": "TEKS 3.10A — Weather",
  "3.3-MM": "TEKS 3.7A — Forces",
  "3.4-MM": "TEKS 3.12C — Environmental Changes",
  "3.5-MM": "TEKS 3.7C — Government Services",
  "3.6-MM": "TEKS 3.4C — Map Elements",
  "3.7-MM": "TEKS 3.1A — How Communities Change",
  "3.8-MM": "TEKS 3.6A — Supply & Demand",
  "4.1-MM": "TEKS 4.9B — Moon Patterns",
  "4.2-MM": "TEKS 4.10A — Water Cycle",
  "4.3-MM": "TEKS 4.10B — Weathering, Erosion & Deposition",
  "4.4-MM": "TEKS 4.12B — Food Webs",
  "4.5-MM": "TEKS 4.10C — Weather vs. Climate",
  "4.6-MM": "TEKS 4.6A — Four Physical Regions of Texas",
  "4.7-MM": "TEKS 4.4C — Railroads in Texas",
  "4.8-MM": "TEKS 4.19A — Primary & Secondary Sources",
  "4.9-MM": "TEKS 4.22A — Democratic Decision Making",
  "5.1-MM": "TEKS 5.7A & 5.7B — Equal & Unequal Forces / Force Investigation",
  "5.2-MM": "TEKS 5.8B — Electrical Circuits & Energy Transformations",
  "5.3-MM": "TEKS 5.6A — Physical Properties of Matter",
  "5.4-MM": "TEKS 5.12B — Changes in Food Webs",
  "5.5-MM": "TEKS 5.19A — Rights Guaranteed by the Bill of Rights",
  "5.6-MM": "TEKS 5.15B — Checks & Balances",
  "5.7-MM": "TEKS 5.7B — Geographic Factors & Settlement",
  "5.8-MM": "TEKS 5.23E — Point of View",
};

// The full label, e.g. "TEKS 3.12B — Food Chains & Ecosystem Changes".
// Returns null for anything that isn't a Mission Map case, so callers can
// fall back to whatever they showed before.
export function missionMapTeksLabel(standard) {
  return MISSION_MAP_TEKS[standard] || null;
}

// Just the standard code, e.g. "3.12B" — for tight spots like a case tile
// chip where the full label won't fit.
export function missionMapTeksCode(standard) {
  const label = MISSION_MAP_TEKS[standard];
  if (!label) return null;
  const m = label.match(/^TEKS\s+(.+?)\s+—/);
  return m ? m[1] : null;
}
