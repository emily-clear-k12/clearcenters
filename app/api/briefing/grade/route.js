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

  if (phase === "opsChoice") {
    const picks = payload?.projectIds || [];
    const chips = payload?.chips || [];
    const justification = [payload?.justification, ...chips].filter(Boolean).join(" ");
    if (picks.length !== (server.opsChoice.requirePickCount || 2)) {
      return NextResponse.json({
        pass: false,
        message: `Pick exactly ${server.opsChoice.requirePickCount || 2} projects.`,
      });
    }
    if (server.opsChoice.chipsOnlyOk && chips.length === 0 && !String(payload?.justification || "").trim()) {
      return NextResponse.json({
        pass: false,
        message: "Tap at least one why chip.",
      });
    }
    const justified = hasAnyKeyword(justification, server.opsChoice.justificationKeywords);
    return NextResponse.json({
      pass: justified || (server.opsChoice.chipsOnlyOk && chips.length > 0),
      deferred: payload?.allProjectIds?.filter((id) => !picks.includes(id)) || [],
      message:
        justified || chips.length
          ? "Council vote recorded. Check the debrief — every TEKS reason still matters."
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
        results[id] = { correct: ok };
        if (ok) autoCorrect += 1;
        continue;
      }
      const ok = String(answers[id] || "").toLowerCase() === String(expected).toLowerCase();
      results[id] = { correct: ok };
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

  return NextResponse.json({ error: "Unknown phase." }, { status: 400 });
}
