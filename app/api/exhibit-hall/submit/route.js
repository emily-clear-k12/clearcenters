import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getExhibitCase } from "../../../../lib/cases/exhibit-hall/catalog";
import { gradeExhibit } from "../../../../lib/cases/exhibit-hall/index.server";

const REASON = {
  point: "Doesn't prove the point",
  place: "Wrong place",
  myth: "A myth or mistake",
  picture: "Misleading picture",
  topic: "True but off-topic",
  side: "Wrong side",
};

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount });
  } catch (err) {
    // a missed reward is never worth failing the turn-in over
  }
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const assignmentId = body.assignmentId;
  if (!assignmentId) return NextResponse.json({ error: "Missing the assignment." }, { status: 400 });

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin.from("assignments").select("id, class_id, case_standard").eq("id", assignmentId).single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  const exhibit = getExhibitCase(assignment.case_standard);
  if (!exhibit) return NextResponse.json({ error: "That case isn't wired up yet." }, { status: 404 });

  const split = exhibit.layout === "split";
  const groups = body.groups || { left: [], right: [], both: [] };
  const splitFilled = ["left", "right", "both"].every((zone) => (groups[zone] || []).length > 0) && body.bin && body.reason;
  const filled = split ? splitFilled : Array.isArray(body.wall) && body.wall.filter(Boolean).length === 4 && body.bin && body.reason;
  if (!filled) return NextResponse.json({ need: "wall" });

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, exhibit_hall_data, submitted_at")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.exhibit_hall_data) || {};
  const first = prior.firstWall || (split
    ? { groups, bin: body.bin, reason: body.reason, stamps: body.stamps || {} }
    : { wall: body.wall, bin: body.bin, reason: body.reason, stamps: body.stamps || {} });
  const graded = gradeExhibit(assignment.case_standard, { ...body, wall: first.wall, groups: first.groups, bin: first.bin, reason: first.reason });
  const name = (id) => (exhibit.cards.find((item) => item.id === id) || {}).title || "empty";
  const lines = body.lines || {};
  const sideLines = split
    ? ["left", "right", "both"].map((zone) => {
      const spot = exhibit.spots.find((item) => item.id === zone);
      const titles = (first.groups[zone] || []).map(name).join(", ") || "empty";
      const line = lines[zone] || {};
      return `${spot ? spot.label : zone}: ${titles}. This side shows ${line.what || "___"}.`;
    })
    : first.wall.map((id, index) => {
      const line = id ? lines[id] || {} : {};
      return `${exhibit.spots[index].label}: ${id ? name(id) : "empty"}${id ? `. I notice ${line.what || "___"}. This helps because ${line.why || "___"}.` : ""}`;
    });
  const exhibitText = [
    body.plaque || "No plaque yet",
    `Look first at ${body.best?.one || "___"} and ${body.best?.two || "___"}.`,
    ...sideLines,
    `Left out: ${first.bin ? name(first.bin) : "nothing"} · ${REASON[first.reason] || "no reason"}. Someone might think ${body.fooled || "___"}. This stays out because ${body.leftOut || "___"}.`,
    `Still in storage: ${body.held || "(nothing written)"}`,
    `Wall: ${graded.wallLevel}. ${graded.wallNote}`,
    `Short response: ${body.finding || "(blank)"}`,
    `Multiple choice: ${body.heatPick || "(blank)"}`,
    `Multi-select: ${(body.sandPicks || []).join(", ") || "(blank)"}`,
    `True or false: ${body.daysFalse == null ? "(blank)" : body.daysFalse ? "False" : "True"}`,
    `Inline choice: ${body.notePick || "(blank)"}`,
    `Questions: ${graded.questions} of 4.`,
    `Suggested level: ${graded.level}`,
  ].join("\n");

  const payload = {
    firstWall: first,
    plaque: body.plaque || "",
    best: body.best || { one: "", two: "" },
    lines,
    fooled: body.fooled || "",
    leftOut: body.leftOut || "",
    held: body.held || "",
    finding: body.finding || "",
    heatPick: body.heatPick || null,
    sandPicks: body.sandPicks || [],
    daysFalse: body.daysFalse,
    notePick: body.notePick || null,
    wallLevel: graded.wallLevel,
    wallNote: graded.wallNote,
    questions: graded.questions,
    level: graded.level,
    title: exhibit.title,
  };

  const turningIn = body.kind === "turnin";
  const row = {
    exhibit_hall_data: payload,
    attempt1: exhibitText,
    ai_score: turningIn ? graded.level : existing ? existing.ai_score : null,
    ai_rationale: turningIn ? `Exhibit Hall. Wall ${graded.wallLevel}. Questions ${graded.questions}/4. Suggested level ${graded.level}. The teacher releases the grade.` : null,
    submitted_at: turningIn ? (existing && existing.submitted_at) || new Date().toISOString() : existing ? existing.submitted_at : null,
  };

  if (existing) await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
  else await supabaseAdmin.from("submissions").insert({ ...row, assignment_id: assignmentId, student_id: studentId });

  let crystals = 0;
  if (turningIn && !(existing && existing.submitted_at)) {
    crystals = 3;
    await awardCrystals(studentId, crystals);
  }

  return NextResponse.json({ ok: true, done: turningIn, crystals });
}
