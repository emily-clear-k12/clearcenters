import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getLabCase } from "../../../../lib/cases/classification-lab/catalog";
import { gradeClassificationPage } from "../../../../lib/cases/classification-lab/index.server";

const PAGE_NAMES = ["Sort", "Harder sort", "Venn"];

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount });
  } catch (err) {
    // a missed reward is never worth failing the check over
  }
}

function summary(lab, pages) {
  return PAGE_NAMES.map((name, index) => {
    const page = pages[index];
    if (!page) return `${name}: not checked`;
    return `${name}: ${page.correct}/${page.total}`;
  }).join("\n") + `\n${lab.title}`;
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const assignmentId = body.assignmentId;
  const pageIndex = Number(body.page);
  if (!assignmentId || ![0, 1, 2].includes(pageIndex)) {
    return NextResponse.json({ error: "Missing the page." }, { status: 400 });
  }

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin.from("assignments").select("id, class_id, case_standard").eq("id", assignmentId).single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  const lab = getLabCase(assignment.case_standard);
  if (!lab) return NextResponse.json({ error: "That case isn't wired up yet." }, { status: 404 });

  const graded = gradeClassificationPage(assignment.case_standard, pageIndex, body);
  if (!graded) return NextResponse.json({ error: "That page isn't wired up yet." }, { status: 404 });
  if (graded.needsLabels) return NextResponse.json({ need: "labels" });
  if (graded.unfinished) return NextResponse.json({ need: "pile" });

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, classification_lab_data, submitted_at")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const data = (existing && existing.classification_lab_data) || { pages: {} };
  const pages = { ...(data.pages || {}) };
  const already = pages[pageIndex];
  if (!already) {
    pages[pageIndex] = {
      correct: graded.correct,
      total: graded.total,
      items: graded.items,
      questions: graded.questions || null,
      rules: graded.rules || null,
      at: new Date().toISOString(),
    };
  }

  const done = [0, 1, 2].every((index) => pages[index]);
  const correct = [0, 1, 2].reduce((sum, index) => sum + (pages[index] ? pages[index].correct : 0), 0);
  const total = [0, 1, 2].reduce((sum, index) => sum + (pages[index] ? pages[index].total : 0), 0);
  const score = total ? Math.round((correct / total) * 100) : null;
  const payload = { pages, title: lab.title };
  const row = {
    classification_lab_data: payload,
    attempt1: summary(lab, pages),
    ai_score: done ? score : null,
    ai_rationale: done ? `Classification Lab. First check on each page. ${correct}/${total}.` : null,
    submitted_at: done ? (existing && existing.submitted_at) || new Date().toISOString() : existing ? existing.submitted_at : null,
  };

  if (existing) {
    await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("submissions").insert({ ...row, assignment_id: assignmentId, student_id: studentId });
  }

  let crystals = 0;
  if (done && !(existing && existing.submitted_at)) {
    crystals = 3;
    await awardCrystals(studentId, crystals);
  }

  return NextResponse.json({
    misses: graded.misses,
    total: graded.total,
    saved: !already,
    practice: !!already,
    done,
    crystals,
  });
}
