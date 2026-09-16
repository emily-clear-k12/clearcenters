import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getServerBriefing } from "../../../../lib/briefings/index.server";

function meaningfulWordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter((w) => w.replace(/[^a-zA-Z]/g, "").length >= 2).length;
}

function hasAnyKeyword(text, keywords) {
  const lower = String(text || "").toLowerCase();
  return keywords.some((k) => lower.includes(k.toLowerCase()));
}

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json();
  const { briefingId, phase, payload } = body || {};
  const server = getServerBriefing(briefingId);
  if (!server) {
    return NextResponse.json({ error: "Unknown briefing." }, { status: 404 });
  }

  if (phase === "intelDrop") {
    const chip = String(payload?.chip || "").trim();
    const claim = String(payload?.claim || "").trim();
    const combined = [chip, claim].filter(Boolean).join(" ");
    if (!chip && !claim) {
      return NextResponse.json({
        pass: false,
        soft: false,
        message: "Pick a claim chip first.",
      });
    }
    if (server.intelDrop.acceptChipOnly && chip) {
      const map = server.intelDrop.chipKeywords || {};
      const keys = map[chip] || [chip];
      const onTopic =
        hasAnyKeyword(combined, server.intelDrop.passKeywords) ||
        hasAnyKeyword(keys.join(" "), server.intelDrop.passKeywords) ||
        Boolean(map[chip]);
      return NextResponse.json({
        pass: true,
        soft: !onTopic,
        message: onTopic
          ? "Claim locked. Nice noticing."
          : "Claim locked. Keep an eye out for needs like safety, beliefs, or food/jobs as we go.",
      });
    }
    const words = meaningfulWordCount(claim || chip);
    if (words < (server.intelDrop.minMeaningfulWords || 1)) {
      return NextResponse.json({
        pass: false,
        soft: false,
        message: "HQ needs a real claim — try a short sentence about why this place exists.",
      });
    }
    const onTopic = hasAnyKeyword(combined, server.intelDrop.passKeywords);
    return NextResponse.json({
      pass: true,
      soft: !onTopic,
      message: onTopic
        ? "Claim locked. Nice noticing."
        : "Claim locked. Keep an eye out for needs like safety, beliefs, or food/jobs as we go.",
    });
  }

  if (phase === "fieldBrief") {
    const answers = payload?.answers || {};
    const keys = server.fieldBrief.quickChecks || {};
    const results = {};
    let correct = 0;
    for (const [id, expected] of Object.entries(keys)) {
      const ok = answers[id] === expected;
      results[id] = { correct: ok, expected };
      if (ok) correct += 1;
    }
    return NextResponse.json({
      pass: correct === Object.keys(keys).length,
      correct,
      total: Object.keys(keys).length,
      results,
    });
  }

  if (phase === "reasonSort") {
    const assignments = payload?.assignments || {};
    const keys = server.reasonSort?.answers || {};
    const results = {};
    let correct = 0;
    const total = Object.keys(keys).length;
    for (const [id, expected] of Object.entries(keys)) {
      const got = assignments[id];
      const ok = got === expected;
      results[id] = { correct: ok, expected, got: got || null };
      if (ok) correct += 1;
    }
    const missIds = Object.entries(results)
      .filter(([, r]) => !r.correct)
      .map(([id]) => id);
    return NextResponse.json({
      pass: correct === total && total > 0,
      correct,
      total,
      results,
      missIds,
      message:
        correct === total
          ? "Reason Sort locked — all clues match."
          : "Some clues need another bin. Tap a miss and try again.",
    });
  }

  if (phase === "opsChoice") {
    const picks = payload?.projectIds || [];
    const chips = payload?.chips || [];
    const justification = [payload?.justification, ...chips].filter(Boolean).join(" ");
    const ops = server.opsChoice || {};
    const requireCount = ops.requirePickCount || 2;
    const teksIds = ops.teksProjectIds || [];
    const distractorIds = ops.distractorIds || [];
    const reasonByProject = ops.projectReasonIds || {};

    if (picks.length !== requireCount) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: `Pick exactly ${requireCount} projects.`,
      });
    }

    const hitDistractor = picks.some((id) => distractorIds.includes(id));
    if (hitDistractor) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        distractor: true,
        message:
          "That fun park isn't one of the three community reasons. Pick two projects that help security and laws, religious freedom, or material well-being.",
      });
    }

    if (teksIds.length && !picks.every((id) => teksIds.includes(id))) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: "Pick two projects that match real community reasons.",
      });
    }

    if (ops.chipsOnlyOk && chips.length === 0 && !String(payload?.justification || "").trim()) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: "Tap at least one why chip.",
      });
    }

    const deferredTeks = teksIds.filter((id) => !picks.includes(id));
    const deferredReasonId = deferredTeks.length === 1 ? reasonByProject[deferredTeks[0]] || null : null;
    const gotDeferred = String(payload?.deferredReasonId || "").trim();
    if (ops.requireDeferredReason && deferredReasonId) {
      if (!gotDeferred) {
        return NextResponse.json({
          pass: false,
          softFail: true,
          message: "Name the real community reason that waits until next year.",
          deferredReasonId,
          deferredProjectIds: deferredTeks,
        });
      }
      if (gotDeferred !== deferredReasonId) {
        return NextResponse.json({
          pass: false,
          softFail: true,
          message: "Check which real reason is still waiting — then tap that chip.",
          deferredReasonId,
          deferredProjectIds: deferredTeks,
        });
      }
    }

    const justified = hasAnyKeyword(justification, ops.justificationKeywords || []);
    const chipsOk = ops.chipsOnlyOk && chips.length > 0;
    const pass = justified || chipsOk;
    return NextResponse.json({
      pass,
      softFail: !pass,
      deferred: payload?.allProjectIds?.filter((id) => !picks.includes(id)) || [],
      deferredProjectIds: deferredTeks,
      deferredReasonId,
      fundedProjectIds: picks,
      message: pass
        ? "Council vote recorded. See what improves now — and what waits until next year."
        : "Say why using community reasons (safe, believe, food/homes/jobs).",
    });
  }

  if (phase === "evidenceDrop") {
    const reason = String(payload?.reason || "").toLowerCase();
    const evidence = String(payload?.evidence || "").toLowerCase();
    const matchMap = server.evidenceDrop.reasonMatch || {};
    const knownReasons = Object.keys(matchMap);
    const reasonOk = knownReasons.includes(reason);
    const evidenceOk =
      reasonOk && (matchMap[reason] || []).some((k) => evidence.includes(k));
    let score = 0;
    if (reasonOk && evidenceOk) score = 2;
    else if (reasonOk || evidence.trim().length >= 3) score = 1;
    return NextResponse.json({
      pass: score >= 1,
      score,
      mustInclude: server.evidenceDrop.mustInclude,
      message:
        score === 2
          ? "Postcard locked — reason and evidence match."
          : score === 1
            ? "Almost — make sure your reason and evidence match."
            : "Name one TEKS reason and show evidence that matches it.",
    });
  }

  if (phase === "clearance") {
    const answers = payload?.answers || {};
    const keys = server.clearance.answers || {};
    const results = {};
    let autoCorrect = 0;
    let total = 0;
    const coherence = server.clearance.keepCoherence || null;
    for (const [id, expected] of Object.entries(keys)) {
      total += 1;
      // v3 keep-claim item: "<keep>|<because>". The OPINION is never
      // marked — which reason a student would keep is theirs and goes to
      // the teacher. Only the LOGIC of the sentence is checked, so an
      // ending that doesn't follow from the reason kept (or one that
      // argues with itself) comes back, and nothing else does. It's
      // excluded from the auto-score entirely rather than counted right.
      if (expected == null && coherence && String(answers[id] || "").includes("|")) {
        const [keep, because] = String(answers[id]).split("|");
        total -= 1; // not an auto-scored item
        if (because === server.clearance.keepSelfContradicting) {
          results[id] = {
            correct: null,
            teacherRead: true,
            coherent: false,
            message: server.clearance.keepContradictionMessage || "That sentence argues with itself — try the ending again.",
          };
        } else if (coherence[keep] !== because) {
          results[id] = {
            correct: null,
            teacherRead: true,
            coherent: false,
            message: server.clearance.keepMismatchMessage || "Does that ending come from the reason you kept?",
          };
        } else {
          results[id] = {
            correct: null,
            teacherRead: true,
            coherent: true,
            message: server.clearance.keepAcceptedMessage || "Filed — your teacher reads this one.",
          };
        }
        continue;
      }
      if (expected == null) {
        // Dynamic / soft item (e.g. c4 reuse): accept any of the three TEKS reasons
        // when client sends expectedId, else accept any non-empty answer.
        const got = String(answers[id] || "").toLowerCase();
        const expectedId = String(payload?.expectedIds?.[id] || "").toLowerCase();
        let ok = false;
        if (expectedId) ok = got === expectedId;
        else if (server.clearance.c4AcceptAnyReason && id === "c4") ok = ["a", "b", "c"].includes(got);
        else ok = Boolean(got);
        results[id] = { correct: ok, expected: expectedId || null };
        if (ok) autoCorrect += 1;
        continue;
      }
      const ok = String(answers[id] || "").toLowerCase() === String(expected).toLowerCase();
      results[id] = { correct: ok, expected: expected };
      if (ok) autoCorrect += 1;
    }
    // Legacy resume: ignore orphan c5 if present in payload
    if (answers.c5 != null && keys.c5 == null) {
      results.c5 = { correct: null, skipped: true };
    }
    // A keep-claim whose logic doesn't hold blocks clearance the same way a
    // wrong answer would — not because the opinion is wrong, but because
    // the sentence doesn't say what the student means yet.
    const incoherentKeep = Object.values(results).some((r) => r && r.teacherRead && r.coherent === false);
    return NextResponse.json({
      pass: !incoherentKeep && autoCorrect >= Math.ceil(total * 0.6),
      correct: autoCorrect,
      total,
      results,
    });
  }

  // --- v2 mechanics (see lib/briefings/schema/mechanics.schema.js) -------
  // Same public/server split and same "results dict + pass = every item
  // correct" shape as reasonSort above, so a lesson can mix any of these
  // in without the grading logic looking different per mechanic.

  if (phase === "quickReview") {
    const answer = String(payload?.answer || "");
    const qc = server.quickReview?.quickCheck || null;
    if (!qc) {
      // A quickReview phase with no quick check is allowed (pure recap) —
      // nothing to grade, just let the client move on.
      return NextResponse.json({ pass: true, correct: answer || "" });
    }
    const ok = answer === qc.correct;
    return NextResponse.json({
      pass: true, // ungated — a review quick-check informs, doesn't block
      correct: qc.correct,
      wasCorrect: ok,
      message: ok ? qc.rightMessage || "Right — that's the idea." : qc.wrongMessage || "Close — here's the reminder.",
    });
  }

  if (phase === "matchPairs") {
    const matches = payload?.matches || {};
    const keys = server.matchPairs?.answerKey || {};
    const results = {};
    let correct = 0;
    const total = Object.keys(keys).length;
    for (const [leftId, expected] of Object.entries(keys)) {
      const got = matches[leftId];
      const ok = got === expected;
      results[leftId] = { correct: ok, expected, got: got || null };
      if (ok) correct += 1;
    }
    return NextResponse.json({
      pass: correct === total && total > 0,
      correct,
      total,
      results,
      message: correct === total ? "Match Pairs locked — every pair fits." : "Some pairs need another look. Tap a miss and try again.",
    });
  }

  if (phase === "sequenceIt") {
    const order = Array.isArray(payload?.order) ? payload.order : [];
    const correctOrder = server.sequenceIt?.correctOrder || [];
    const results = {};
    let correct = 0;
    correctOrder.forEach((id, i) => {
      const ok = order[i] === id;
      results[id] = { correct: ok, expectedIndex: i, gotIndex: order.indexOf(id) };
      if (ok) correct += 1;
    });
    const total = correctOrder.length;
    return NextResponse.json({
      pass: correct === total && total > 0,
      correct,
      total,
      results,
      message: correct === total ? "Sequence It locked — that's the right order." : "Not quite in order yet — check the arrows.",
    });
  }

  if (phase === "labelPicture") {
    const placements = payload?.placements || {};
    const keys = server.labelPicture?.answerKey || {};
    const results = {};
    let correct = 0;
    const total = Object.keys(keys).length;
    for (const [hotspotId, expected] of Object.entries(keys)) {
      const got = placements[hotspotId];
      const ok = got === expected;
      results[hotspotId] = { correct: ok, expected, got: got || null };
      if (ok) correct += 1;
    }
    return NextResponse.json({
      pass: correct === total && total > 0,
      correct,
      total,
      results,
      message: correct === total ? "Labels locked — every hotspot matches." : "A label or two is off — tap it to try again.",
    });
  }

  if (phase === "trueFalseReason") {
    const answers = payload?.answers || {};
    const keys = server.trueFalseReason?.answerKey || {};
    const results = {};
    let correct = 0;
    const total = Object.keys(keys).length;
    for (const [id, expected] of Object.entries(keys)) {
      const got = String(answers[id] || "");
      const expectedStr = expected.isTrue ? "true" : "false";
      const ok = got === expectedStr;
      // Reason ships every time, right or wrong — it's meant to teach on
      // a miss, not just reveal the miss (per the mechanic's own design).
      results[id] = { correct: ok, expected: expectedStr, reason: expected.reason };
      if (ok) correct += 1;
    }
    return NextResponse.json({
      pass: correct === total && total > 0,
      correct,
      total,
      results,
      message: correct === total ? "Nice reasoning — every answer checks out." : "Read the reasons above, then try the misses again.",
    });
  }

  /* ---------------------------------------------------------------
   * v3 phases. Two rules run through all of these:
   *  - a miss never returns a bare "wrong" — it returns the sentence a
   *    teacher would say next, because these are teaching phases;
   *  - anything with no defensible single answer is not scored here at
   *    all. The teacher is the scorer of record; this route is a first
   *    reader.
   * --------------------------------------------------------------- */

  if (phase === "openingFrame") {
    // The prediction is deliberately NOT marked. It gets settled at the end
    // of storyTeach — that delay is the entire pedagogical point of it.
    const of = server.openingFrame || {};
    return NextResponse.json({
      pass: true,
      recorded: payload?.prediction || null,
      message: of.lockMessage || "Locked in. You'll find out by watching the town get built.",
    });
  }

  if (phase === "storyTeach") {
    const beatId = String(payload?.beatId || "");
    const named = String(payload?.named || "");
    const keys = server.storyTeach?.beats || {};
    const beat = keys[beatId];
    if (!beat) {
      return NextResponse.json({ pass: false, softFail: true, message: "That beat isn't part of this briefing." });
    }
    const ok = named === beat.reason;
    return NextResponse.json({
      pass: ok,
      softFail: !ok,
      beatId,
      message: ok
        ? beat.rightMessage || "That's it — written into your ledger."
        : beat.nameWrong || "Look again at what was missing that winter. Which reason is that?",
    });
  }

  if (phase === "synthesis") {
    const sy = server.synthesis || {};
    const step = String(payload?.step || "");

    if (step === "order") {
      const correctOrder = sy.correctOrder || [];
      const soFar = Array.isArray(payload?.soFar) ? payload.soFar : [];
      const expected = correctOrder[soFar.length];
      const ok = String(payload?.pick || "") === expected;
      const last = ok && soFar.length + 1 === correctOrder.length;
      return NextResponse.json({
        pass: ok,
        softFail: !ok,
        complete: last,
        message: ok
          ? last
            ? sy.orderDoneMessage || "That's the order. Now the harder half — why each one followed the last."
            : sy.orderNextMessage || "Yes. What came next?"
          : soFar.length === 0
            ? sy.orderFirstHint || "Start at the beginning. Which of these could the very first families have had?"
            : sy.orderHint || "Not next. Each problem arrives because of what the last one fixed.",
      });
    }

    if (step === "break") {
      const removals = sy.removals || {};
      const spec = removals[String(payload?.removed || "")];
      if (!spec) {
        return NextResponse.json({ pass: false, softFail: true, message: "Pick which one to take away first." });
      }
      const idx = Number(payload?.pick);
      const ok = idx === spec.correctIndex;
      return NextResponse.json({
        pass: ok,
        softFail: !ok,
        message: ok ? spec.rightMessage : (spec.wrongMessages || [])[idx] || "Follow the people first — who leaves, and what goes with them?",
      });
    }

    return NextResponse.json({ pass: false, softFail: true, message: "Unknown step." });
  }

  /* ---------------------------------------------------------------
   * v3 type-specific phases (Sept 16, 2026).
   *
   * Three teach phases and three synthesis phases, one pair per shape:
   *   ssComparison  sideBySide   + contrastSynthesis
   *   ssPeople      theDecision  + contributionSynthesis
   *   ssCategory    wrongDesk    + boundarySynthesis
   *
   * The three teach phases are the same branch with a different key name,
   * because they grade the same move: the student NAMES the reason, and
   * naming it is what writes the ledger line. `namedKeyFor` below keeps the
   * per-shape vocabulary in the packs rather than smearing it through here.
   *
   * The three synthesis phases are likewise one branch each, with two steps:
   * "sort" (an item into a column, keyed by sortAnswers) and one final
   * counterfactual ("change" for contrast, "remove" for the other two —
   * both accepted everywhere, since the difference is only a word).
   * --------------------------------------------------------------- */

  /** One teach round: did the student name the right reason? */
  function gradeNamedRound(packKey, keyName) {
    const rounds = (server[packKey] || {}).rounds || {};
    const round = rounds[String(payload?.roundId || "")];
    if (!round) {
      return NextResponse.json({ pass: false, softFail: true, message: "That round isn't part of this briefing." });
    }
    const picked = String(payload?.[keyName] || "");
    const ok = picked === round[keyName];
    return NextResponse.json({
      pass: ok,
      softFail: !ok,
      roundId: String(payload?.roundId || ""),
      message: ok
        ? round[`${keyName.replace(/Id$/, "")}Right`] || "That's it — written into your ledger."
        : round[`${keyName.replace(/Id$/, "")}Wrong`] || "Look again. Which one actually decided it?",
    });
  }

  if (phase === "sideBySide") return gradeNamedRound("sideBySide", "whyId");
  if (phase === "theDecision") return gradeNamedRound("theDecision", "kindId");
  if (phase === "wrongDesk") return gradeNamedRound("wrongDesk", "ruleId");

  /** One synthesis phase: a keyed sort, then one keyed counterfactual. */
  function gradeSynthesisPhase(packKey) {
    const sy = server[packKey] || {};
    const step = String(payload?.step || "");

    if (step === "sort") {
      const answers = sy.sortAnswers || {};
      const itemId = String(payload?.itemId || "");
      if (!(itemId in answers)) {
        return NextResponse.json({ pass: false, softFail: true, message: "That card isn't part of this briefing." });
      }
      const ok = String(payload?.columnId || "") === answers[itemId];
      // `complete` is advisory — the client already knows how many cards it
      // has placed. It's here so a later report can tell a finished sort from
      // an abandoned one without replaying every call.
      return NextResponse.json({
        pass: ok,
        softFail: !ok,
        itemId,
        message: ok
          ? sy.sortRightMessage || "Filed."
          : (sy.sortWrongMessages || {})[itemId] || "Not that one. Read it again — what is it actually telling you?",
      });
    }

    // "change" (contrastSynthesis) and "remove" (the other two) are the same
    // graded move under two names: pull one thing out, say what breaks.
    if (step === "change" || step === "remove") {
      const spec = sy.changeOne || sy.removeOne;
      if (!spec) {
        return NextResponse.json({ pass: false, softFail: true, message: "Nothing to change here." });
      }
      const idx = Number(payload?.pick);
      const ok = idx === spec.correctIndex;
      return NextResponse.json({
        pass: ok,
        softFail: !ok,
        message: ok
          ? spec.rightMessage || "Right — and that's the whole idea."
          : (spec.wrongMessages || [])[idx] || "Try it the other way round: take that away and see what still works.",
      });
    }

    return NextResponse.json({ pass: false, softFail: true, message: "Unknown step." });
  }

  if (phase === "contrastSynthesis") return gradeSynthesisPhase("contrastSynthesis");
  if (phase === "contributionSynthesis") return gradeSynthesisPhase("contributionSynthesis");
  if (phase === "boundarySynthesis") return gradeSynthesisPhase("boundarySynthesis");

  if (phase === "transfer") {
    const tr = server.transfer || {};
    const tapped = Array.isArray(payload?.tapped) ? payload.tapped : [];
    const claim = String(payload?.claim || "");
    const spotReasons = tr.spotReasons || {};
    const best = tr.bestClaim || "";
    const reasons = tapped.map((id) => spotReasons[id] || "none");

    // A "fun, not a reason" spot is the misconception this phase is built
    // to catch — checked before anything else so its feedback wins.
    if (reasons.includes("none")) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: tr.decoyMessage || "That one's fun, but having fun isn't one of the reasons people form a community. What else did you spot?",
      });
    }
    const allMatchClaim = reasons.length > 0 && reasons.every((r) => r === claim);
    if (allMatchClaim && claim === best) {
      return NextResponse.json({
        pass: true,
        correct: reasons.length,
        total: reasons.length,
        message: tr.rightMessage || "Strong case — and you found the reason this town can prove twice.",
      });
    }
    if (allMatchClaim) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: tr.onlyOneProofMessage || "Both your proofs point that way — but this town only has one of them. Is there a reason you can prove twice?",
      });
    }
    if (reasons.length > 1 && reasons[0] === reasons[1]) {
      return NextResponse.json({
        pass: false,
        softFail: true,
        message: tr.mismatchMessage || "Your two proofs agree with each other, but they don't show the reason you picked. Change one to match the other.",
      });
    }
    return NextResponse.json({
      pass: false,
      softFail: true,
      message: tr.splitMessage || "Your two proofs are pointing at two different reasons. Pick the reason you can prove twice.",
    });
  }

  return NextResponse.json({ error: "Unknown phase." }, { status: 400 });
}
