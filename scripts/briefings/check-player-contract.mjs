/* Player contract test — node scripts/briefings/check-player-contract.mjs
 *
 * lib/briefings/schema validates a lesson's DATA against the schema. Nothing
 * validated the data against the PLAYER, and that gap is what let nine
 * finished lessons sit in the repo for a week with no screens to render
 * them: every schema check passed, and a student would have landed on the
 * Clearance screen instead of the lesson.
 *
 * This walks every v3 lesson the way app/briefing/[assignmentId]/
 * BriefingClient.js and app/api/briefing/grade/route.js walk it: every field
 * the type-specific phases read, and every grade() call they make, replayed
 * against the real server pack. A lesson passes only if a student could tap
 * all the way through it without hitting an undefined.
 *
 * It is deliberately a SEPARATE file from the schema checks. The schema
 * answers "is this lesson well-formed?"; this answers "can the app we
 * actually shipped run it?" — and those two questions come apart every time
 * a new shape is added.
 */
// Run from the repo root. Every lesson pack lives flat in lib/briefings/.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const LESSON_DIR = join(process.cwd(), "lib", "briefings");

const problems = [];
let lessonCount = 0;

/* ---- the grade route's six new branches, transcribed ---- */
function gradeNamedRound(server, packKey, keyName, payload) {
  const rounds = (server[packKey] || {}).rounds || {};
  const round = rounds[String(payload.roundId || "")];
  if (!round) return { pass: false, message: "That round isn't part of this briefing." };
  const ok = String(payload[keyName] || "") === round[keyName];
  const base = keyName.replace(/Id$/, "");
  return { pass: ok, message: ok ? round[`${base}Right`] : round[`${base}Wrong`] };
}
function gradeSynthesisPhase(server, packKey, payload) {
  const sy = server[packKey] || {};
  if (payload.step === "sort") {
    const answers = sy.sortAnswers || {};
    const itemId = String(payload.itemId || "");
    if (!(itemId in answers)) return { pass: false, message: "That card isn't part of this briefing." };
    const ok = String(payload.columnId || "") === answers[itemId];
    return { pass: ok, message: ok ? sy.sortRightMessage : (sy.sortWrongMessages || {})[itemId] };
  }
  if (payload.step === "change" || payload.step === "remove") {
    const spec = sy.changeOne || sy.removeOne;
    if (!spec) return { pass: false, message: "Nothing to change here." };
    const ok = Number(payload.pick) === spec.correctIndex;
    return { pass: ok, message: ok ? spec.rightMessage : (spec.wrongMessages || [])[payload.pick] };
  }
  return { pass: false, message: "Unknown step." };
}

const TEACH = {
  sideBySide: { keyName: "whyId", optionsKey: "whyOptions", optionId: (o) => o.id, pickKey: "predictOptions" },
  theDecision: { keyName: "kindId", optionsKey: "kindOptions", optionId: (o) => o.id, pickKey: "decisionOptions" },
  wrongDesk: { keyName: "ruleId", optionsKey: "ruleOptions", optionId: (o) => o.id, pickKey: "routeOptions" },
};
const SYNTH = {
  contrastSynthesis: { middle: "causes", final: "changeOne", step: "change" },
  contributionSynthesis: { middle: "attributions", final: "removeOne", step: "remove" },
  boundarySynthesis: { middle: "boundaries", final: "removeOne", step: "remove" },
};

function check(id, cond, msg) {
  if (!cond) problems.push(`${id}: ${msg}`);
}

const packs = readdirSync(LESSON_DIR)
  .filter((f) => f.endsWith("-V3-BR.public.js"))
  .sort();

for (const pubFile of packs) {
  {
    const srvFile = pubFile.replace(".public.js", ".server.js");
    const { PUBLIC_BRIEFING: pub } = await import(pathToFileURL(join(LESSON_DIR, pubFile)).href);
    const { SERVER_BRIEFING: srv } = await import(pathToFileURL(join(LESSON_DIR, srvFile)).href);
    const id = pub.id;
    lessonCount++;

    const phases = pub.phases || [];
    check(id, phases.length > 0, "no phases array");

    for (const phase of phases) {
      // ---- teach phases ----
      if (TEACH[phase]) {
        const spec = TEACH[phase];
        const pack = pub[phase] || {};
        const rounds = pack.rounds || [];
        check(id, rounds.length >= 3, `${phase} has ${rounds.length} rounds — the player expects 3`);

        // The payoff the player renders at the end of the last round.
        check(id, Boolean(pack.resolvesPredictionTo), `${phase}.resolvesPredictionTo missing — payoff always reads "wrong"`);
        const predictIds = (pub.openingFrame?.predictOptions || []).map((o) => o.id);
        check(id, predictIds.includes(pack.resolvesPredictionTo), `${phase}.resolvesPredictionTo "${pack.resolvesPredictionTo}" is not an openingFrame option`);
        check(id, Boolean(pack.predictionRight && pack.predictionWrong), `${phase} missing predictionRight/predictionWrong`);
        check(id, (pack.predictionWrong || "").includes("{GUESS}"), `${phase}.predictionWrong has no {GUESS} slot`);

        const usedCauses = new Set();
        rounds.forEach((r, i) => {
          const where = `${phase} round ${i + 1} ("${r.id}")`;
          check(id, Boolean(r.id), `${where} has no id`);
          check(id, Boolean(r.ledgerLine), `${where} has no ledgerLine — the ledger renders blank`);

          // The ungraded prediction / route step.
          const picks = r[spec.pickKey] || [];
          check(id, picks.length >= 3, `${where}.${spec.pickKey} has ${picks.length} — the player expects 3+`);
          picks.forEach((o, oi) => {
            check(id, Boolean(o.text), `${where}.${spec.pickKey}[${oi}] has no text`);
            if (phase === "theDecision") {
              // Type 3 rule: nothing is `best`; exactly one is `actual`.
              check(id, !o.best, `${where} marks an option best — Type 3 decisions have no right answer`);
              check(id, Boolean(o.response), `${where}.decisionOptions[${oi}] has no response`);
            } else if (!o.best) {
              check(id, Boolean(o.whatIf), `${where}.${spec.pickKey}[${oi}] is wrong but has no whatIf`);
            }
          });
          if (phase === "theDecision") {
            check(id, picks.filter((o) => o.actual).length === 1, `${where} does not have exactly one option marked actual`);
            check(id, Boolean(r.whatHappened), `${where} has no whatHappened`);
            check(id, Boolean(r.consequence) && Boolean(r.cost), `${where} is missing consequence or cost`);
          } else {
            check(id, picks.filter((o) => o.best).length === 1, `${where} does not have exactly one option marked best`);
          }

          // The graded naming step: every offered option must be gradeable,
          // and the keyed one must actually pass.
          const opts = r[spec.optionsKey] || [];
          check(id, opts.length >= 3, `${where}.${spec.optionsKey} has ${opts.length} — the player expects 3`);
          let passes = 0;
          opts.forEach((o) => {
            const res = gradeNamedRound(srv, phase, spec.keyName, { roundId: r.id, [spec.keyName]: spec.optionId(o) });
            if (res.pass) passes++;
            check(id, Boolean(res.message), `${where}: naming "${spec.optionId(o)}" returns no message — S.A.M. says nothing`);
          });
          check(id, passes === 1, `${where}: ${passes} of ${opts.length} namings pass — exactly 1 should`);

          const keyed = ((srv[phase] || {}).rounds || {})[r.id];
          check(id, Boolean(keyed), `${where} has no server key at all`);
          if (keyed) usedCauses.add(keyed[spec.keyName]);

          if (r.stretch) {
            check(id, (r.stretch.options || []).length >= 2, `${where}.stretch needs 2+ options`);
            (r.stretch.options || []).forEach((o, si) =>
              check(id, Boolean(o.why), `${where}.stretch.options[${si}] has no why`)
            );
          }
          if (i < rounds.length - 1) check(id, Boolean(r.nextLabel), `${where} has no nextLabel`);
        });
        check(id, usedCauses.size === rounds.length, `${phase}: only ${usedCauses.size} distinct keyed reasons across ${rounds.length} rounds — one answer would pass twice`);
      }

      // ---- synthesis phases ----
      if (SYNTH[phase]) {
        const spec = SYNTH[phase];
        const pack = pub[phase] || {};
        const items = pack.sortItems || [];
        const columns = pack.columns || [];
        check(id, items.length >= 5, `${phase} has ${items.length} sortItems`);
        check(id, columns.length >= 2, `${phase} has ${columns.length} columns`);

        // Walk the sort exactly as the player does: select item, tap column.
        items.forEach((it) => {
          let passes = 0;
          columns.forEach((col) => {
            const res = gradeSynthesisPhase(srv, phase, { step: "sort", itemId: it.id, columnId: col.id });
            if (res.pass) passes++;
            check(id, Boolean(res.message), `${phase}: "${it.id}" into "${col.id}" returns no message`);
          });
          check(id, passes === 1, `${phase}: item "${it.id}" is right in ${passes} columns — should be exactly 1`);
          check(id, Boolean(it.text), `${phase}: item "${it.id}" has no text`);
        });
        check(id, Boolean((srv[phase] || {}).sortDoneMessage), `${phase} has no sortDoneMessage`);

        // Middle questions: publicly keyed, advance only on ok.
        const middle = pack[spec.middle] || [];
        check(id, middle.length >= 1, `${phase}.${spec.middle} is empty — Part 2 renders nothing`);
        middle.forEach((q, qi) => {
          check(id, Boolean(q.id) && Boolean(q.q), `${phase}.${spec.middle}[${qi}] missing id or q`);
          const oks = (q.options || []).filter((o) => o.ok).length;
          check(id, oks === 1, `${phase}.${spec.middle}[${qi}] has ${oks} options marked ok — should be 1`);
          (q.options || []).forEach((o, oi) =>
            check(id, Boolean(o.why), `${phase}.${spec.middle}[${qi}].options[${oi}] has no why — the student taps and nothing is said`)
          );
        });

        // The final counterfactual.
        const fin = pack[spec.final];
        check(id, Boolean(fin), `${phase}.${spec.final} missing — Part 3 renders nothing and the phase can never pass`);
        if (fin) {
          let passes = 0;
          (fin.options || []).forEach((o, oi) => {
            const res = gradeSynthesisPhase(srv, phase, { step: spec.step, pick: oi });
            if (res.pass) passes++;
            check(id, Boolean(res.message), `${phase}.${spec.final} option ${oi} returns no message`);
          });
          check(id, passes === 1, `${phase}.${spec.final}: ${passes} options pass — should be 1`);
        }
        check(id, Boolean(pack.bigIdea), `${phase} has no bigIdea — the phase ends on a blank green box`);
      }
    }

    // Art referenced by the new phases: fine if missing (onError hides it),
    // but a key pointing at nothing in `art` is a typo, not a pending asset.
    for (const phase of ["sideBySide", "theDecision", "wrongDesk", "storyTeach"]) {
      const rounds = (pub[phase] || {}).rounds || (pub[phase] || {}).beats || [];
      rounds.forEach((r) => {
        if (r.imageKey) {
          check(id, Boolean((pub.art || {})[r.imageKey]), `${phase} round "${r.id}" points at art."${r.imageKey}", which is not in the art map`);
        }
      });
    }
  }
}

console.log(`Walked ${lessonCount} lesson(s) through the player contract.`);
if (problems.length === 0) {
  console.log("No problems. Every field the six new phases read is present, and every grade call resolves.");
} else {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((x) => console.log("  · " + x));
  process.exitCode = 1;
}
