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

// ELAR and science quests are written before their task types exist on the
// student screen. Lock every act and task, and leave playableActs empty so the
// quest stays off the Assign page until the build session opens it.
export function lockEverything(quest) {
  Object.values(quest.acts).forEach((act) => {
    act.locked = true;
  });
  Object.values(quest.tasks).forEach((task) => {
    task.locked = true;
  });
  quest.playableActs = [];
  return quest;
}

// Build a passage from paragraphs of sentences. Sentence ids look like "A3.2"
// (passage A, paragraph 3, sentence 2) so highlight answers can point at them.
export function passage(id, meta, paragraphs) {
  return {
    id,
    ...meta,
    paragraphs: paragraphs.map((sentences, p) =>
      sentences.map((text, s) => ({ id: `${id}${p + 1}.${s + 1}`, text }))
    ),
  };
}

// Build an editable message. Words in {braces} are the mistakes; `options`
// lists the fixes a student can pick for each one (the right fix is kept in the
// task's answer, not here). Token ids look like "B:is".
export function editText(prefix, text, options) {
  const tokens = [];
  text.split(/(\{[^}]+\})/).forEach((chunk) => {
    if (!chunk) return;
    const m = chunk.match(/^\{([^}]+)\}$/);
    if (m) {
      tokens.push({ id: `${prefix}:${m[1]}`, text: m[1], options: options[m[1]] || [] });
    } else {
      chunk.split(/\s+/).filter(Boolean).forEach((word) => tokens.push({ text: word }));
    }
  });
  return { prefix, tokens };
}
