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
    if (w.n != null && attempt.n != null) return eqFrac(w, attempt);
    return false;
  });
  return (match && match.hint) || task.hint;
}

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
      feedback: ok ? "Nice work — that matches the fuel." : "Not yet. Try again.",
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
    if (whoOk && !reasonOk) hint = "Right person, check the reason. What size are the parts?";
    if (!whoOk) hint = "Watch the fuel, not the numbers. How many thirds of the tank are full?";
    if (whoOk && reasonOk && written.length < 8) hint = "Tell Kai in your own words — a short sentence is enough.";
    return {
      ok,
      stars: ok ? starsFor(wrongTries, usedHint) : 0,
      hint: ok ? null : hint,
      feedback: ok ? "Nova is right — the parts stay thirds." : "Not yet. Try again.",
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
        feedback: ok ? "Yes — now fill that gap two ways." : "Not yet. How much more to reach the line?",
      };
    }
    const ways = Array.isArray(body.ways) ? body.ways : [];
    if (ways.length < ans.waysNeeded) {
      return { ok: false, step: "scoops", hint: "You need two different scoop sets.", feedback: "Add another way." };
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
        hint: "Count by tenths from 3/10 as each scoop goes in.",
        feedback: "One of those scoop sets does not add to 4/10.",
      };
    }
    return {
      ok: true,
      step: "scoops",
      stars: starsFor(wrongTries, usedHint),
      feedback: "Two ways to the same total — the sled can go!",
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
