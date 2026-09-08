import { supabaseAdmin } from "./supabaseAdmin";
import { getSignalCheckServerCase } from "./cases/signal-check/index.server";
import { engineSupportsDistressCall } from "./distressCallEngines";

export { engineSupportsDistressCall };

// Distress Call (§4 of the Sept 7 design doc) is a flag on an assignment,
// not a new engine — but its meter can only count the INSTANT-graded part
// of a case (checkpoints, verdicts), never the open-ended written response,
// which gets an AI first-pass and a teacher score later. Not every engine
// has an instant-graded portion at all: Group Chat's cases are pure
// open-response + AI scoring with nothing deterministic to count, so a
// Distress Call on a Group Chat assignment would have nothing honest to
// measure. Rather than invent a stand-in metric (e.g. "did they submit at
// all"), engines with no instant-graded portion are simply left out of
// ENGINE_ADAPTERS below, and the teacher-side toggle (assign/new/page.js)
// only offers Distress Call for a case whose engine has an adapter here.
// Extending an engine to support Distress Call later is exactly one new
// entry in this map, nothing else changes.

function missionMapProgress(row) {
  const score = row.mission_map_data?.checkpointScore;
  if (!score) return null;
  return { correct: score.correctCount || 0, total: score.total || 0 };
}

function simulationLabProgress(row) {
  const data = row.simulation_lab_data;
  if (!data) return null;
  const cp = data.checkpointScore || { correctCount: 0, total: 0 };
  const dt = data.dataTableScore || { correctCount: 0, total: 0 };
  return { correct: (cp.correctCount || 0) + (dt.correctCount || 0), total: (cp.total || 0) + (dt.total || 0) };
}

// Signal Check doesn't pre-store per-statement correctness the way Mission
// Map/Simulation Lab do — it's re-derived here against the same rubric the
// submit route grades against. Only "dropdown" and "dropdown-open" stem
// modes have a deterministic verdict field (`verdict`); the fully-open mode
// asks for free-typed verdict text, which isn't something a rubric match
// can grade instantly, so that mode contributes nothing to the meter.
function signalCheckProgress(row, caseStandard) {
  const data = row.signal_data;
  if (!data || !data.stemMode || data.stemMode === "open") return null;
  const caseData = getSignalCheckServerCase(caseStandard);
  if (!caseData || !caseData.statements) return null;
  const ids = Object.keys(caseData.statements);
  let correct = 0;
  ids.forEach((id) => {
    const rubric = caseData.statements[id];
    const a = (data.statementAnswers || {})[id] || {};
    if (a.verdict === rubric.correctVerdict) correct += 1;
  });
  return { correct, total: ids.length };
}

// Keys here must match DISTRESS_CALL_ENGINES in lib/distressCallEngines.js —
// that file is the client-safe list the assign screen checks before showing
// the toggle at all; this map is the actual per-engine grading logic.
const ENGINE_ADAPTERS = {
  mission_map: missionMapProgress,
  simulation_lab: simulationLabProgress,
  fact_check_desk: signalCheckProgress,
};

// Computes a Distress Call's live meter. Nothing is stored for the meter
// itself — it's recomputed fresh from `submissions` every time this is
// called, per §6's "live feeling comes from the classroom, not the
// software": a poll every few seconds is plenty, no push infrastructure
// needed.
export async function computeDistressCallProgress(assignmentId) {
  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, distress_call, distress_call_target, distress_call_deadline, distress_call_reward_points, distress_call_reward_given")
    .eq("id", assignmentId)
    .maybeSingle();

  if (!assignment || !assignment.distress_call) {
    return { active: false };
  }

  const { data: caseRow } = await supabaseAdmin
    .from("cases")
    .select("engine, title")
    .eq("standard", assignment.case_standard)
    .maybeSingle();

  const engine = (caseRow && caseRow.engine) || "group_chat";
  const adapter = ENGINE_ADAPTERS[engine];
  if (!adapter) {
    return { active: true, supported: false, engine, caseTitle: caseRow?.title || null };
  }

  // Same targeting rule every other engine uses: specific students if the
  // assignment was narrowed, otherwise the whole class.
  const { data: targetRows } = await supabaseAdmin
    .from("assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);

  let targetedStudentIds = (targetRows || []).map((t) => t.student_id);
  if (targetedStudentIds.length === 0) {
    const { data: classStudents } = await supabaseAdmin
      .from("students")
      .select("id")
      .eq("class_id", assignment.class_id);
    targetedStudentIds = (classStudents || []).map((s) => s.id);
  }

  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("student_id, mission_map_data, simulation_lab_data, signal_data")
    .eq("assignment_id", assignmentId)
    .in("student_id", targetedStudentIds.length > 0 ? targetedStudentIds : ["00000000-0000-0000-0000-000000000000"]);

  let current = 0;
  let studentsSubmitted = 0;
  (submissions || []).forEach((row) => {
    const progress = adapter(row, assignment.case_standard);
    if (progress) {
      current += progress.correct;
      if (progress.total > 0) studentsSubmitted += 1;
    }
  });

  const target = assignment.distress_call_target || null;
  const rewardPoints = assignment.distress_call_reward_points || 0;
  let rewardGiven = !!assignment.distress_call_reward_given;

  // The crystal-point prize (added per Emily's Sept 8 ask, after the Live
  // Ops Board itself shipped) is set once, up front, when the teacher
  // creates the Distress Call — not decided after the fact — so the class
  // knows what they're playing for from the start, and it fires the moment
  // they hit it without the teacher needing to be watching. Awarded exactly
  // once via a conditional UPDATE that only succeeds for whichever request
  // gets there first: this route is polled every few seconds by both the
  // student badge and the teacher's Live Ops Board, so multiple requests can
  // notice the target was just cleared at nearly the same instant. Postgres
  // serializes concurrent UPDATEs to the same row, so only one of those
  // requests ever sees rows affected — that's the one that actually hands
  // out points; every request after that just reports rewardGiven: true.
  if (target && rewardPoints > 0 && !rewardGiven && current >= target) {
    const { data: claimed } = await supabaseAdmin
      .from("assignments")
      .update({ distress_call_reward_given: true })
      .eq("id", assignmentId)
      .eq("distress_call_reward_given", false)
      .select("id");

    if (claimed && claimed.length > 0) {
      await Promise.all(
        targetedStudentIds.map((id) =>
          supabaseAdmin.rpc("increment_crystal_points", { p_student_id: id, p_amount: rewardPoints })
        )
      );
    }
    rewardGiven = true;
  }

  return {
    active: true,
    supported: true,
    engine,
    caseTitle: caseRow?.title || null,
    current,
    target,
    deadline: assignment.distress_call_deadline || null,
    studentsTargeted: targetedStudentIds.length,
    studentsSubmitted,
    rewardPoints,
    rewardGiven,
  };
}
