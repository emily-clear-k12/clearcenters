import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { callClaude, extractJSON } from "../../../../lib/anthropic";
import { getAssemblyDeckServerCase, gradeRound, gradeRejections, gradeAssembly, gradeCase, gradePinpoint, gradeQuickCheck, gradeWhatIf, gradeRepair, gradeLook, trapSentences, trapVerdict, requesterReply } from "../../../../lib/cases/assembly-deck/index.server";
import { getAssemblyDeckPublicCase, getRound, CHALLENGE } from "../../../../lib/cases/assembly-deck/index.public";

// Assembly Deck (design doc §6). Four kinds of traffic:
//   "check"    -> grade one paragraph board. No AI call, nothing finalized.
//                 Attempt 1 and attempt 2 both come through here; on attempt 2
//                 the correct build comes back so the client can show it.
//   "rejects"  -> grade the reason the student gave for each leftover piece.
//   "assembly" -> grade the order the finished paragraphs were put in.
//   "trap"     -> S.A.M.'s Editor's Trap: one bad sentence slipped into a
//                 finished paragraph. Sent as plain text with no ids, so the
//                 payload cannot give the intruder away.
//   "trapAnswer" -> grade the sentence the student tapped, by position.
//   "pinpoint" -> Chief's Debrief question one: the student taps one sentence
//                 in the report they assembled. Graded by piece id.
//   "quickCheck" -> Chief's Debrief question two: one multiple-choice question
//                 on the standard.
//   "submit"   -> the whole case, regraded server-side from the boards the
//                 client sends, plus ONE Claude call on the written
//                 explanation. Crystals and the submission land here.
// The keys never leave this file's imports, so a student reading the page
// source sees the sentences but never which slot they belong in.

const CRYSTALS = { base: 3, cleanBuild: 2, cleanRejects: 2, cleanAssembly: 1, trapCaught: 2, pinpoint: 1, quickCheck: 1, whatIf: 1, repair: 1 };

async function gradeExplanation(serverCase, publicCase, text, grade) {
  const rubric = (serverCase.mustInclude || []).map((m) => "  - " + m).join("\n");
  // Read the grade off the case, not off the code — SS.3.* and MA.3.* are
  // third graders too, and a regex on the standard would miss them.
  const readingLevel = grade === 3 ? "third" : grade === 4 ? "fourth" : "fifth";
  // The question the student was actually asked comes from the case, not from
  // this file. It used to be hard-coded as "why did you leave those sentences
  // out" — the last question is now about the report itself, and it differs
  // per case.
  const asked = ((publicCase || {}).explain || {}).prompt || "(see rubric)";
  const prompt = `You are grading an elementary student's short written answer from ClearCenters' Assembly Deck. The student built a multi-paragraph report out of sentence tiles, sorted out the sentences that did not belong, put the paragraphs in order, and has now been asked one last written question about what they built. Score 0/1/2 against the rubric. Respond with ONLY a JSON object like {"score": 0, "glows": ["...", "..."], "grow": "...", "rationale": "..."} — no other text, no markdown, no code fence.

Case: ${serverCase.title}
The question the student was asked: ${asked}
A strong answer:
${rubric}
Model answer (one acceptable version, not the only one): ${serverCase.modelAnswer || "(none provided)"}
Pedagogical context: ${serverCase.aiContext || "(none)"}

A 2 meets every line of the rubric in the student's own words. A 1 meets part of it. A 0 misses most of it or shows a real misunderstanding.
"glows" are two specific, warm things the student actually did, written to the student as "you". "grow" is ONE concrete next step, also written to the student. Keep each under 20 words at a ${readingLevel}-grade reading level, in short sentences. "rationale" is 1-2 sentences for the teacher. Never mention scores or rubrics to the student.

Student's answer:
${text || "(nothing written)"}`;
  try {
    const raw = await callClaude({ messages: [{ role: "user", content: prompt }], max_tokens: 400 });
    const parsed = extractJSON(raw);
    return {
      score: typeof parsed.score === "number" ? parsed.score : null,
      glows: Array.isArray(parsed.glows) ? parsed.glows.slice(0, 2) : [],
      grow: parsed.grow || null,
      rationale: parsed.rationale || null,
    };
  } catch (err) {
    // An AI failure never costs the student their work.
    return { score: null, glows: [], grow: null, rationale: "[AI grading error] " + (err && err.message ? err.message : String(err)) };
  }
}

function summarizeForHumans(publicCase, graded, explanation, attempts, challenge, trapCaught) {
  const rounds = graded.rounds.map((r) => {
    const label = ((publicCase.rounds || []).find((x) => x.id === r.id) || {}).label || r.id;
    return `  ${label}: ${r.build.correct}/${r.build.total} placed, ${r.rejects.correct}/${r.rejects.total} leftovers explained`;
  });
  const debrief = [
    graded.pinpoint ? `Pinpoint (tap the sentence that…): ${graded.pinpoint.correct ? "correct" : "missed"}` : null,
    graded.quickCheck ? `Quick check (multiple choice): ${graded.quickCheck.correct ? "correct" : `chose ${graded.quickCheck.choiceId || "nothing"}, key ${graded.quickCheck.key}`}` : null,
  ].filter(Boolean);
  return [
    `Assembly Deck (${publicCase.title}) — ${graded.placement.correct}/${graded.placement.total} sentences placed, ${graded.decoys.correct}/${graded.decoys.total} leftovers correctly explained, paragraph order ${graded.assembly.correct}/${graded.assembly.total}.`,
    ...rounds,
    ...(debrief.length ? [`  ${debrief.join(" · ")}`] : []),
    `Boards checked ${attempts} time(s).${challenge ? " Ran Chief's Challenge (no hints, no reveal)." : ""}${trapCaught ? " Caught the Editor's Trap." : ""}`,
    `Written answer: ${explanation || "(nothing written)"}`,
  ].join("\n");
}

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount });
  } catch (err) {
    // a missed reward is never worth failing the submit over
  }
}

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { assignmentId, caseStandard, action, roundId, board, rejections, assembly, boards, explanation, attempt, challenge, trapCaught } = body;

  const serverCase = getAssemblyDeckServerCase(caseStandard);
  const publicCase = getAssemblyDeckPublicCase(caseStandard);
  if (!serverCase || !publicCase) return NextResponse.json({ error: "That case isn't wired up yet." }, { status: 404 });

  if (action === "check") {
    const g = gradeRound(serverCase, roundId, board || {});
    const quiet = !!publicCase.chain;
    const results = quiet
      ? g.results.map((r) => ({
          pieceId: r.pieceId,
          slotId: r.slotId,
          correct: r.correct,
          note: r.kind === "spot"
            ? "Right sentence, wrong spot."
            : r.kind === "out"
            ? "This one does not belong. Check the notes."
            : null,
        }))
      : g.results;
    const reveal = !quiet && !challenge && Number(attempt) >= 2 && !g.perfect ? (serverCase.rounds[roundId] || {}).key || null : null;
    return NextResponse.json({ results, correct: g.correct, total: g.total, perfect: g.perfect, reveal });
  }

  if (action === "rejects") {
    const g = gradeRejections(serverCase, roundId, rejections || {});
    // The leftovers get a word in: each one protests being thrown out, and the
    // real reason answers it. Protest lines live server-side so the tray never
    // hints at which sentences are decoys.
    const protests = (serverCase.rounds[roundId] || {}).decoyProtest || (serverCase.decoyProtest || {});
    return NextResponse.json({
      results: g.results.map((r) => ({ ...r, protest: protests[r.pieceId] || null })),
      correct: g.correct, total: g.total, perfect: g.perfect,
    });
  }

  if (action === "trap" || action === "trapAnswer") {
    const trap = serverCase.trap;
    if (!trap) return NextResponse.json({ trap: null });
    const round = getRound(publicCase, trap.roundId);
    const board = (boards || {})[trap.roundId] || {};
    if (action === "trap") {
      const t = trapSentences(serverCase, round, board);
      return NextResponse.json({ roundId: trap.roundId, label: round.label, sentences: t.sentences });
    }
    const verdict = trapVerdict(serverCase, round, board, body.chosenIndex);
    return NextResponse.json(verdict);
  }

  if (action === "pinpoint") {
    const g = gradePinpoint(serverCase, body.pinpointPieceId);
    if (!g) return NextResponse.json({ error: "This case has no debrief yet." }, { status: 404 });
    const why = publicCase.chain && !g.correct
      ? "Not that sentence. Read the question again and look for the line that answers it."
      : g.why;
    return NextResponse.json({ correct: g.correct, why });
  }

  if (action === "quickCheck") {
    const g = gradeQuickCheck(serverCase, body.quickCheckChoiceId);
    if (!g) return NextResponse.json({ error: "This case has no debrief yet." }, { status: 404 });
    if (publicCase.chain) {
      return NextResponse.json({
        correct: g.correct,
        why: g.correct ? g.why : "Not that one. Use the chain you built, then try once more.",
      });
    }
    return NextResponse.json({ correct: g.correct, why: g.why, key: g.key, keyWhy: g.keyWhy });
  }

  if (action === "assembly") {
    const g = gradeAssembly(serverCase, assembly || {});
    return NextResponse.json({ results: g.results, correct: g.correct, total: g.total, perfect: g.perfect, note: g.perfect ? serverCase.assemblyNote || null : null });
  }

  if (action === "whatIf") {
    const g = gradeWhatIf(serverCase, body.whatIfChoiceId);
    if (!g) return NextResponse.json({ error: "This case has no what-if." }, { status: 404 });
    return NextResponse.json({ correct: g.correct, why: g.why, key: g.key, keyWhy: g.keyWhy, walk: g.walk, walkLine: g.walkLine });
  }

  if (action === "look") {
    const g = gradeLook(serverCase, body.lookChoiceId, body.attempt);
    if (!g) return NextResponse.json({ error: "This case has nothing to look at." }, { status: 404 });
    return NextResponse.json(g);
  }

  // --- submit: regrade everything from the client's boards, then one AI call
  const graded = gradeCase(serverCase, {
    boards: boards || {},
    rejections: rejections || {},
    assembly: assembly || {},
    pinpointPieceId: body.pinpointPieceId,
    quickCheckChoiceId: body.quickCheckChoiceId,
  });
  const ai = await gradeExplanation(serverCase, publicCase, explanation, publicCase.grade);
  const attempts = Math.max(1, Math.floor(Number(attempt) || 1));
  const whatIf = gradeWhatIf(serverCase, body.whatIfChoiceId);
  const looked = gradeLook(serverCase, body.lookChoiceId, 1);
  const repair = looked || gradeRepair(serverCase, body.repairText, 1);
  const crystals =
    CRYSTALS.base +
    (graded.buildPerfect && attempts <= publicCase.rounds.length ? CRYSTALS.cleanBuild : 0) +
    (graded.rejectPerfect ? CRYSTALS.cleanRejects : 0) +
    (graded.assemblyPerfect ? CRYSTALS.cleanAssembly : 0) +
    (trapCaught ? CRYSTALS.trapCaught : 0) +
    (graded.pinpoint && graded.pinpoint.correct ? CRYSTALS.pinpoint : 0) +
    (graded.quickCheck && graded.quickCheck.correct ? CRYSTALS.quickCheck : 0) +
    (whatIf && whatIf.correct ? CRYSTALS.whatIf : 0) +
    (repair && repair.correct ? CRYSTALS.repair : 0) +
    (challenge ? CHALLENGE.bonusCrystals : 0);
  const reply = requesterReply(serverCase, graded, trapCaught);

  const fields = {
    attempt1: explanation || "",
    attempt2: summarizeForHumans(publicCase, graded, explanation, attempts, challenge, trapCaught),
    ai_score: ai.score,
    ai_rationale: ai.rationale,
    assembly_deck_data: {
      mode: publicCase.mode,
      boards: boards || {},
      rejections: rejections || {},
      assembly: assembly || {},
      attempts,
      placement: { ...graded.placement, perfect: graded.buildPerfect },
      decoys: { ...graded.decoys, perfect: graded.rejectPerfect },
      assemblyScore: { correct: graded.assembly.correct, total: graded.assembly.total, perfect: graded.assemblyPerfect },
      pinpoint: graded.pinpoint ? { pieceId: graded.pinpoint.pieceId, correct: graded.pinpoint.correct } : null,
      quickCheck: graded.quickCheck ? { choiceId: graded.quickCheck.choiceId, correct: graded.quickCheck.correct, key: graded.quickCheck.key } : null,
      rounds: graded.rounds.map((r) => ({ id: r.id, build: { correct: r.build.correct, total: r.build.total }, rejects: { correct: r.rejects.correct, total: r.rejects.total } })),
      explanation: explanation || "",
      glows: ai.glows,
      grow: ai.grow,
      crystalsEarned: crystals,
      challenge: !!challenge,
      trapCaught: !!trapCaught,
      whatIf: whatIf ? { choiceId: whatIf.choiceId, correct: whatIf.correct } : null,
      repair: repair ? { text: body.repairText || "", correct: repair.correct } : null,
      requesterTier: reply ? reply.tier : null,
    },
    submitted_at: new Date().toISOString(),
    revision_requested: false,
  };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, submitted_at")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const alreadyPaid = !!(existing && existing.submitted_at);

  if (existing) {
    const { error } = await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin.from("submissions").insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Crystals are paid once per assignment — a revision never pays twice.
  if (!alreadyPaid) await awardCrystals(studentId, crystals);
  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // streak is a nice-to-have
  }

  return NextResponse.json({
    success: true,
    glows: ai.glows,
    grow: ai.grow,
    score: ai.score,
    crystalsEarned: alreadyPaid ? 0 : crystals,
    placement: graded.placement,
    decoys: graded.decoys,
    assemblyScore: { correct: graded.assembly.correct, total: graded.assembly.total },
    pinpoint: graded.pinpoint ? { correct: graded.pinpoint.correct } : null,
    quickCheck: graded.quickCheck ? { correct: graded.quickCheck.correct } : null,
    whatIf: whatIf ? { correct: whatIf.correct } : null,
    repair: repair ? { correct: repair.correct } : null,
    assemblyNote: serverCase.assemblyNote || null,
    reply,
    challenge: !!challenge,
    trapCaught: !!trapCaught,
  });
}
