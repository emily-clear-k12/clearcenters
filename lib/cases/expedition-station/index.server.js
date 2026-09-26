import { getExpeditionQuest } from "./catalog.js";

function eqFrac(a, b) {
  if (!a || !b) return false;
  const an = Number(a.n);
  const ad = Number(a.d);
  const bn = Number(b.n);
  const bd = Number(b.d);
  if (![an, ad, bn, bd].every((x) => Number.isFinite(x)) || ad === 0 || bd === 0) return false;
  return an * bd === bn * ad;
}

function scoopKey(scoops) {
  const counts = {};
  (scoops || []).forEach((size) => {
    const s = Number(size);
    counts[s] = (counts[s] || 0) + 1;
  });
  return Object.keys(counts)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => `${k}x${counts[k]}`)
    .join("+");
}

function scoopSum(scoops) {
  return (scoops || []).reduce((sum, size) => sum + Number(size), 0);
}

function starsFor(wrongTries, usedHint) {
  const p = (wrongTries || 0) + (usedHint ? 1 : 0);
  if (p === 0) return 3;
  if (p === 1) return 2;
  return 1;
}

function wrongHint(task, attempt) {
  if (!task.wrong || !attempt) return task.hint;
  const match = task.wrong.find((w) => {
    if (w.step != null && attempt.step != null && w.step !== attempt.step) return false;
    if (w.error != null) return attempt.error === w.error;
    if (w.who != null) return attempt.who === w.who;
    if (w.item != null) return Array.isArray(attempt.items) && attempt.items.includes(w.item);
    if (w.n != null && attempt.n != null) return eqFrac(w, attempt);
    if (w.step != null && w.n == null) return attempt.step === w.step;
    return false;
  });
  return (match && match.hint) || task.hint;
}


// ---- ELAR and science answer kinds (Sept 26) ----
// choice     { correct }                    body { choice }
// multi      { correct: [ids] }             body { picks: [ids] }  (exact set)
// highlight  { groups: [[ids], ...] }       body { sentences: [ids] } (one from each group, nothing extra)
// edit       { fixes: { tokenId: text } }   body { fixes: { tokenId: text } } (all fixed, nothing extra)
// order      { correct: [ids], alsoAccept?: [[ids]] }  body { order: [ids] }
// number     { value, tolerance? }          body { value }
// write      { minWords }                   body { written } (teacher-scored; completion only)
// parts      { parts: [answer, ...] }       body { step, ...fields for that part }

function sameSet(a, b) {
  const x = [...new Set((a || []).map(String))].sort();
  const y = [...new Set((b || []).map(String))].sort();
  return x.length === y.length && x.every((v, i) => v === y[i]);
}

function wordCount(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function hintFor(task, test) {
  const match = (task.wrong || []).find(test);
  return (match && match.hint) || null;
}

// Grades one answer spec. `step` is the part number for parts (or null).
function gradeOne(task, ans, body, step) {
  const onStep = (w) => (step == null ? w.step == null : w.step === step);
  switch (ans.kind) {
    case "choice": {
      const choice = String(body.choice || "");
      const ok = choice === String(ans.correct);
      return { ok, hint: ok ? null : hintFor(task, (w) => onStep(w) && w.choice === choice) };
    }
    case "multi": {
      const picks = Array.isArray(body.picks) ? body.picks.map(String) : [];
      const ok = sameSet(picks, ans.correct);
      const bad = picks.find((p) => !ans.correct.map(String).includes(p));
      const hint = !ok ? hintFor(task, (w) => onStep(w) && w.pick != null && (bad ? w.pick === bad : false)) || hintFor(task, (w) => onStep(w) && w.missing === true) : null;
      return { ok, hint };
    }
    case "highlight": {
      const picked = Array.isArray(body.sentences) ? body.sentences.map(String) : [];
      const groups = ans.groups.map((g) => g.map(String));
      const allowed = new Set(groups.flat());
      const extra = picked.find((id) => !allowed.has(id));
      const eachGroup = groups.every((g) => picked.some((id) => g.includes(id)));
      const ok = !extra && eachGroup && picked.length === groups.length;
      let hint = null;
      if (!ok) hint = (extra && hintFor(task, (w) => onStep(w) && w.sentence === extra)) || null;
      if (!ok && !hint && picked.length !== groups.length) hint = `Highlight ${groups.length === 1 ? "one sentence" : `${groups.length} sentences`}.`;
      return { ok, hint };
    }
    case "edit": {
      const fixes = body.fixes && typeof body.fixes === "object" ? body.fixes : {};
      const need = Object.keys(ans.fixes);
      const extra = Object.keys(fixes).find((id) => !need.includes(id));
      const wrongFix = need.find((id) => String(fixes[id] || "") !== String(ans.fixes[id]));
      const ok = !extra && !wrongFix;
      let hint = null;
      if (!ok) {
        const target = extra || wrongFix;
        hint = hintFor(task, (w) => onStep(w) && w.token === target);
        if (!hint && wrongFix && !fixes[wrongFix]) hint = `There ${need.filter((id) => !fixes[id]).length === 1 ? "is 1 mistake" : `are ${need.filter((id) => !fixes[id]).length} mistakes`} left to fix.`;
      }
      return { ok, hint, left: need.filter((id) => String(fixes[id] || "") !== String(ans.fixes[id])).length };
    }
    case "order": {
      const order = Array.isArray(body.order) ? body.order.map(String) : [];
      const options = [ans.correct, ...(ans.alsoAccept || [])].map((o) => o.map(String));
      const ok = options.some((o) => o.length === order.length && o.every((v, i) => v === order[i]));
      const firstOff = ok ? null : ans.correct.map(String).findIndex((v, i) => v !== order[i]);
      return { ok, hint: ok ? null : hintFor(task, (w) => onStep(w) && w.position === firstOff) };
    }
    case "number": {
      const value = Number(body.value);
      const ok = Number.isFinite(value) && Math.abs(value - Number(ans.value)) <= (ans.tolerance || 0);
      return { ok, hint: ok ? null : hintFor(task, (w) => onStep(w) && w.value != null && Number(w.value) === value) };
    }
    case "write": {
      const written = String(body.written || "").trim();
      const ok = wordCount(written) >= (ans.minWords || 1);
      return { ok, hint: ok ? null : `Write at least ${ans.minWords} words.`, teacherWritten: written };
    }
    case "sort": {
      const placements = body.placements && typeof body.placements === "object" ? body.placements : {};
      const wrongItems = Object.keys(ans.bins).filter((id) => placements[id] !== ans.bins[id]);
      const ok = wrongItems.length === 0;
      return { ok, hint: ok ? null : hintFor(task, (w) => onStep(w) && w.item != null && wrongItems.includes(w.item)), wrongItems };
    }
    default:
      return null;
  }
}

const GENERIC_KINDS = ["choice", "multi", "highlight", "edit", "order", "number", "write"];

export function gradeExpeditionTask(standard, taskId, body) {
  const quest = getExpeditionQuest(standard);
  if (!quest) return null;
  const task = quest.tasks[taskId];
  if (!task || task.locked || !task.answer) return null;

  const wrongTries = Number(body.wrongTries) || 0;
  const usedHint = !!body.usedHint;
  const ans = task.answer;

  if (ans.kind === "frac") {
    const attempt = { n: Number(body.n), d: Number(body.d) };
    const ok = eqFrac(attempt, ans);
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : wrongHint(task, attempt),
      feedback: ok ? task.rightFeedback || "Nice work — that matches the fuel." : "Not yet. Try again.",
      answerShown: null,
    };
  }

  if (ans.kind === "debate") {
    const who = String(body.who || "").toLowerCase();
    const reason = String(body.reason || "").toUpperCase();
    const written = String(body.written || "").trim();
    const whoOk = who === ans.who;
    const reasonOk = reason === ans.reason;
    const ok = whoOk && reasonOk && written.length >= 8;
    let hint = task.hint;
    const dh = task.debateHints || {};
    if (whoOk && !reasonOk) hint = dh.wrongReason || "Right person, check the reason. What size are the parts?";
    if (!whoOk) hint = dh.wrongWho || "Watch the fuel, not the numbers. How many thirds of the tank are full?";
    if (whoOk && reasonOk && written.length < 8) hint = "Tell Kai in your own words — a short sentence is enough.";
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : hint,
      feedback: ok ? (task.debateHints && task.debateHints.right) || "Nova is right — the parts stay thirds." : "Not yet. Try again.",
      needsWritten: written.length < 8,
      teacherWritten: written,
    };
  }

  if (ans.kind === "scoops") {
    const step = body.step || "missing";
    if (step === "missing") {
      const attempt = { n: Number(body.n), d: Number(body.d) };
      const ok = eqFrac(attempt, ans.missing);
      return {
        ok,
        step: "missing",
        next: ok ? "scoops" : null,
        stars: 0,
        hint: ok ? null : wrongHint(task, attempt),
        feedback: ok ? (ans.waysNeeded > 1 ? "Yes — now fill it two ways." : "Yes — now fill it with scoops.") : "Not yet. How much more to reach the line?",
      };
    }
    const ways = Array.isArray(body.ways) ? body.ways : [];
    if (ways.length < ans.waysNeeded) {
      return { ok: false, step: "scoops", hint: ans.waysNeeded > 1 ? "You need two different scoop sets." : "Fill it with scoops first.", feedback: ans.waysNeeded > 1 ? "Add another way." : "Add your scoops." };
    }
    const keys = ways.map(scoopKey);
    if (new Set(keys).size < ans.waysNeeded) {
      return {
        ok: false,
        step: "scoops",
        hint: "Same scoops, different order. Same total! Try different scoops.",
        feedback: "Those two ways match. Try a different set of scoops.",
      };
    }
    const need = ans.missing.n;
    const allSum = ways.every((w) => scoopSum(w) === need);
    if (!allSum) {
      return {
        ok: false,
        step: "scoops",
        hint: task.hint,
        feedback: `One of those scoop sets does not add to ${ans.missing.n}/${ans.missing.d}.`,
      };
    }
    return {
      ok: true,
      step: "scoops",
      stars: starsFor(wrongTries, usedHint),
      feedback: task.rightFeedback || "Two ways to the same total — the sled can go!",
    };
  }

  if (ans.kind === "challenge") {
    const step = Number(body.step) || 1;
    if (step === 1) {
      const attempt = { n: Number(body.n), d: Number(body.d), step: 1 };
      const ok = eqFrac(attempt, ans.level);
      return {
        ok,
        step: 1,
        next: ok ? 2 : null,
        stars: 0,
        hint: ok ? null : wrongHint(task, attempt),
        feedback: ok ? "Level is right. Now find the gap to the safe line." : "Not yet. Take it one night at a time.",
      };
    }
    const attempt = { n: Number(body.n), d: Number(body.d), step: 2 };
    const ok = eqFrac(attempt, ans.above);
    return {
      ok,
      step: 2,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : wrongHint(task, attempt),
      feedback: ok ? "Safe by 1/8 — the heater holds through the cold snap!" : "Not yet. Count the jumps from the safe line up.",
    };
  }

  if (GENERIC_KINDS.includes(ans.kind)) {
    const r = gradeOne(task, ans, body, null);
    return {
      ok: r.ok,
      stars: r.ok ? (task.teacherScored ? 3 : starsFor(wrongTries, usedHint)) : 0,
      hint: r.ok ? null : r.hint || task.hint,
      feedback: r.ok ? task.rightFeedback || "Nice work." : "Not yet. Try again.",
      teacherWritten: r.teacherWritten || null,
    };
  }

  if (ans.kind === "parts") {
    const step = Number(body.step) || 1;
    const part = ans.parts[step - 1];
    if (!part) return null;
    const r = gradeOne(task, part, body, step);
    if (!r) return null;
    const last = step === ans.parts.length;
    return {
      ok: r.ok,
      step,
      next: r.ok && !last ? step + 1 : null,
      stars: r.ok && last ? starsFor(wrongTries, usedHint) : 0,
      hint: r.ok ? null : r.hint || task.hint,
      feedback: r.ok ? (last ? task.rightFeedback || "All parts done!" : `Part ${step} is right. On to part ${step + 1}.`) : "Not yet. Try again.",
      teacherWritten: r.teacherWritten || null,
    };
  }

  // ---- Acts 2–3 answer kinds (Sept 26) ----

  if (ans.kind === "mistake") {
    const tapOk = String(body.tap || "") === ans.tap;
    const error = String(body.error || "").toUpperCase();
    const errorOk = error === ans.error;
    const attempt = { n: Number(body.n), d: Number(body.d) };
    const fixOk = eqFrac(attempt, ans.fix);
    const ok = tapOk && errorOk && fixOk;
    let hint = task.hint;
    if (!tapOk) hint = "Look again at Kai's answer. Which number doesn't fit the pieces he started with?";
    else if (!errorOk) hint = wrongHint(task, { error });
    else if (!fixOk) hint = wrongHint(task, attempt);
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : hint,
      feedback: ok ? task.rightFeedback || "Fixed! 3/5 + 1/5 = 4/5. The parts stay fifths." : "Not yet. Try again.",
    };
  }

  if (ans.kind === "numberless") {
    const step = body.step || "questions";
    if (step === "questions") {
      const picks = Array.isArray(body.picks) ? body.picks.map(String) : [];
      const valid = new Set(ans.sensible);
      const ok = picks.length > 0 && picks.every((p) => valid.has(p));
      return {
        ok,
        step: "questions",
        next: ok ? "solve" : null,
        stars: 0,
        hint: ok ? null : wrongHint(task, { step: "questions" }),
        feedback: ok ? "Good questions. Here are the numbers." : "One of those can't be answered from the story.",
      };
    }
    const attempt = { n: Number(body.n), d: Number(body.d) };
    const ok = eqFrac(attempt, ans.missing);
    return {
      ok,
      step: "solve",
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : wrongHint(task, attempt),
      feedback: ok ? task.rightFeedback || "The tank is full. The crew has water for the storm!" : "Not yet. Try again.",
    };
  }

  if (ans.kind === "steps") {
    const step = Number(body.step) || 1;
    const target = ans.steps[step - 1];
    if (!target) return null;
    const attempt = { n: Number(body.n), d: Number(body.d), step };
    const ok = eqFrac(attempt, target);
    const last = step === ans.steps.length;
    return {
      ok,
      step,
      next: ok && !last ? step + 1 : null,
      stars: ok && last ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : wrongHint(task, attempt),
      feedback: ok ? (last ? task.rightFeedback || "Challenge complete!" : `Step ${step} is right. On to step ${step + 1}.`) : "Not yet. Try again.",
    };
  }

  if (ans.kind === "compare") {
    const who = String(body.who || "").toLowerCase();
    const attempt = { n: Number(body.n), d: Number(body.d) };
    const whoOk = who === ans.who;
    const diffOk = eqFrac(attempt, ans.diff);
    const ok = whoOk && diffOk;
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : !whoOk ? wrongHint(task, { who }) : wrongHint(task, attempt),
      feedback: ok ? task.rightFeedback || "Right! Kai hiked 5/6 km, which is 1/6 km farther than Nova." : "Not yet. Try again.",
    };
  }

  if (ans.kind === "sort") {
    const placements = body.placements && typeof body.placements === "object" ? body.placements : {};
    const wrongItems = Object.keys(ans.bins).filter((id) => placements[id] !== ans.bins[id]);
    const ok = wrongItems.length === 0;
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      wrongItems: ok ? [] : wrongItems,
      hint: ok ? null : wrongHint(task, { items: wrongItems }),
      feedback: ok ? task.rightFeedback || "Every pack is in the right bin. The strongest packs go to the tower!" : `${wrongItems.length} ${wrongItems.length === 1 ? "item is" : "items are"} in the wrong bin.`,
    };
  }

  return null;
}

export function summarizeExpedition(quest, cards) {
  const lines = [];
  let starSum = 0;
  let weighted = 0;
  let weightMax = 0;
  Object.keys(quest.tasks)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((id) => {
      const task = quest.tasks[id];
      const card = cards[id];
      if (!task || task.locked) return;
      const weight = task.challenge ? 2 : 1;
      weightMax += 3 * weight;
      if (card && card.done) {
        const s = card.stars || 0;
        starSum += s;
        weighted += s * weight;
        lines.push(
          `Task ${id} · ${task.title}: ${s} star${s === 1 ? "" : "s"}${task.challenge ? " (challenge ×2)" : ""}${
            card.sure ? ` · sure: ${card.sure}` : ""
          }${card.written ? `\n  Written: ${card.written}` : ""}`
        );
      } else {
        lines.push(`Task ${id} · ${task.title}: not done`);
      }
    });
  const score = weightMax ? Math.round((weighted / weightMax) * 100) : null;
  return { text: lines.join("\n"), starSum, weighted, weightMax, score };
}
