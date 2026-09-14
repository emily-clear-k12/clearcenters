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
    for (const [id, expected] of Object.entries(keys)) {
      total += 1;
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
    return NextResponse.json({
      pass: autoCorrect >= Math.ceil(total * 0.6),
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

  return NextResponse.json({ error: "Unknown phase." }, { status: 400 });
}
