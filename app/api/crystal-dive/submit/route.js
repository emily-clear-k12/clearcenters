import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getFrequencyRushWordSet, getFrequencyRushClassificationSet, getClassifyBanksForCase } from "../../../../lib/cases/frequency-rush";
import { getSkillSet, recomputeSkillItem } from "../../../../lib/frequencyRushSkills";
import { isCustomListCode, recomputeCustomItem } from "../../../../lib/frequencyRushCustomLists";

const MULTIPLIERS = [.5, .75, 1, 1, 1.25, 1.5];

function practiceFacts(answers) {
  const groups = new Map();
  for (const answer of answers) {
    const key = (answer.wordId ? "word:" : answer.type + ":") + (answer.wordId || answer.questionId);
    if (!groups.has(key)) groups.set(key, { label: answer.label, misses: 0, count: 0, totalMs: 0 });
    const item = groups.get(key);
    item.misses += Number(!answer.correct);
    item.count++;
    item.totalMs += answer.responseTimeMs;
  }
  return [...groups.values()].sort((a, b) => b.misses - a.misses || b.totalMs / b.count - a.totalMs / a.count).slice(0, 3).map((a) => a.label);
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (!body.sessionId || !Array.isArray(body.answers) || body.answers.length > 160) {
    return NextResponse.json({ error: "Invalid Crystal Dive run." }, { status: 400 });
  }

  const { data: session } = await supabaseAdmin.from("frequency_rush_sessions")
    .select("id, student_id, assignment_id, game_mode, ended_at").eq("id", body.sessionId).maybeSingle();
  if (!session || session.student_id !== studentId || session.game_mode !== "crystal_dive") {
    return NextResponse.json({ error: "Crystal Dive session not found." }, { status: 404 });
  }
  const { data: assignment } = await supabaseAdmin.from("assignments")
    .select("id, class_id, case_standard, game_skin").eq("id", session.assignment_id).single();
  const { data: student } = await supabaseAdmin.from("students").select("class_id").eq("id", studentId).single();
  if (!assignment || !student || assignment.class_id !== student.class_id || assignment.game_skin !== "crystal_dive") {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }
  const { data: targets, error: targetsError } = await supabaseAdmin.from("assignment_students").select("student_id").eq("assignment_id", assignment.id);
  if (targetsError) return NextResponse.json({ error: "Couldn't verify this assignment." }, { status: 500 });
  if (targets.length && !targets.some((target) => target.student_id === studentId)) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  // Return the previously committed spin outcome on retries, even when two
  // browser requests raced. The database function also locks the session.
  if (session.ended_at) {
    const { data: previous } = await supabaseAdmin.rpc("record_crystal_dive_run", {
      p_session_id: session.id, p_student_id: studentId, p_result: {},
    });
    if (previous) return NextResponse.json(previous);
    return NextResponse.json({ error: "This session is already finished." }, { status: 409 });
  }

  const { data: caseRow } = await supabaseAdmin.from("cases").select("engine, grade, subject, unit, standard")
    .eq("standard", assignment.case_standard).single();
  if (!caseRow || caseRow.engine !== "frequency_rush") return NextResponse.json({ error: "Question bank unavailable." }, { status: 404 });

  const standard = caseRow.standard || assignment.case_standard;
  const skill = getSkillSet(standard);
  let customList = null;
  if (!skill && isCustomListCode(standard)) {
    const { data } = await supabaseAdmin.from("frequency_rush_custom_lists").select("standard, title, words, include_meaning, include_spelling").eq("standard", standard).maybeSingle();
    customList = data;
  }
  const words = skill || customList ? [] : await getFrequencyRushWordSet(caseRow);
  const wordById = new Map(words.map((word) => [String(word.id), word]));
  const sorts = skill || customList ? [] : (await getClassifyBanksForCase(caseRow)).sortBins;
  const sortById = new Map(sorts.map((item) => [String(item.id), item]));
  const classifications = skill || customList ? [] : await getFrequencyRushClassificationSet(caseRow);
  const classById = new Map(classifications.map((item) => [String(item.id), item]));
  const graded = [];

  for (const answer of body.answers) {
    if (!answer || typeof answer !== "object") continue;
    const type = String(answer.type || "");
    const id = String(answer.questionId ?? answer.itemId ?? "");
    const responseTimeMs = Math.max(0, Math.min(120000, Number(answer.responseTimeMs) || 0));
    let correct = false, label = "", wordId = null;
    if (type === "sort_bins") {
      const item = customList ? recomputeCustomItem(customList, id) : skill ? recomputeSkillItem(standard, id) : sortById.get(id);
      if (!item) continue;
      correct = answer.choiceId != null && String(answer.choiceId) === String(item.correctBinId);
      label = item.prompt;
    } else if (type === "classification") {
      const item = classById.get(id);
      if (!item || !Array.isArray(item.items) || !item.items.length) continue;
      const submitted = answer.choiceId && typeof answer.choiceId === "object" ? answer.choiceId : {};
      correct = item.items.every((entry) => String(submitted[entry.id]) === String(entry.categoryId ?? entry.correctCategoryId));
      label = item.prompt || item.title || "Sort each item";
    } else if (["lock_signal", "true_false", "frequency_fill"].includes(type)) {
      const word = wordById.get(String(answer.wordId));
      if (!word || id !== String(word.id)) continue;
      wordId = String(word.id); label = word.word;
      if (type === "true_false") {
        const prompt = String(answer.prompt || "");
        const presented = prompt.startsWith(word.word + " means: ") ? prompt.slice((word.word + " means: ").length) : null;
        if (presented == null || !words.some((candidate) => candidate.definition === presented)) continue;
        correct = String(answer.choiceId) === String(presented === word.definition);
      } else correct = answer.choiceId != null && String(answer.choiceId) === wordId;
    } else continue;
    graded.push({ type, questionId: id, wordId, correct, responseTimeMs, label });
  }

  if (body.answers.length && !graded.length) return NextResponse.json({ error: "No assigned answers could be checked." }, { status: 400 });
  const correctCount = graded.filter((answer) => answer.correct).length;
  const percentCorrect = graded.length ? Math.round(correctCount * 100 / graded.length) : 0;
  const reported = Number(body.crystalsCollected);
  if (!Number.isSafeInteger(reported) || reported < 0) return NextResponse.json({ error: "Invalid crystal total." }, { status: 400 });
  // Mining is played in the browser. Bound its reported total before any
  // balance change; answer correctness and the wheel outcome are server-side.
  const collectionCap = Math.min(200, 10 + graded.length * 6 + Math.floor(graded.length / 4) * 10);
  const crystalsCollected = Math.min(collectionCap, reported);
  const spinCount = graded.length && correctCount === graded.length ? 2 : 1;
  const spins = Array.from({ length: spinCount }, () => {
    const index = Math.floor(Math.random() * MULTIPLIERS.length);
    return { index, award: crystalsCollected ? Math.max(1, Math.round(crystalsCollected * MULTIPLIERS[index])) : 0 };
  });
  const crystalsBanked = spins.reduce((sum, spin) => sum + spin.award, 0);
  const payload = { spins, crystalsCollected, crystalsBanked, correctCount, attempted: graded.length,
    answers: graded.map(({ type, questionId, wordId, correct, responseTimeMs }) => ({ type, questionId, wordId, correct, responseTimeMs })),
    percentCorrect, practiceFacts: practiceFacts(graded), layer: Math.max(1, Math.min(100, Number(body.layer) || 1)) };
  const { data, error } = await supabaseAdmin.rpc("record_crystal_dive_run", {
    p_session_id: session.id, p_student_id: studentId, p_result: payload,
  });
  if (error) return NextResponse.json({ error: "Couldn't save the run. Please try again." }, { status: 500 });
  return NextResponse.json(data);
}
