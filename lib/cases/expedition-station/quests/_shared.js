// Shared pieces for Expedition Station quests written as separate files.
// Each quest file default-exports one quest object in the same shape as
// The Frozen Relay in catalog.js. catalog.js imports and registers them.

export const CREW = ["Commander Vega", "Kai (engineer)", "Nova (scientist)", "S.A.M. (helper)"];

// Acts 2–3 stay locked until the client supports Travel, Repair, Numberless,
// Sort Bay, compare, point-mode Tune lines, and one-way scoops.
export function acts({ titles, completes, teasers, openings2, openings3 }) {
  return {
    1: { title: titles[0], short: titles[0].replace(/^Act 1 · /, ""), complete: completes[0], teaser: teasers[0], tasks: [1, 2, 3, 4], challenge: 5 },
    2: { title: titles[1], short: titles[1].replace(/^Act 2 · /, ""), locked: true, opening: openings2, complete: completes[1], teaser: teasers[1], tasks: [6, 7, 8, 9], challenge: 10 },
    3: { title: titles[2], short: titles[2].replace(/^Act 3 · /, ""), locked: true, opening: openings3, complete: completes[2], teaser: "Mission complete. Commander Vega will send your next transmission soon.", tasks: [11, 12, 13, 14], challenge: 15 },
  };
}

// Mark tasks 6–15 locked (content is written; machines are not built yet).
export function lockLater(tasks) {
  Object.keys(tasks).forEach((k) => {
    if (Number(k) >= 6) tasks[k].locked = true;
  });
  return tasks;
}
