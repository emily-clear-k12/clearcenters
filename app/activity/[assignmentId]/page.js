import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getPublicCase } from "../../../lib/cases/index.public";
import { getSignalCheckPublicCase } from "../../../lib/cases/signal-check/index.public";
import { getMissionMapPublicCase } from "../../../lib/cases/mission-map/index.public";
import { getSimulationLabPublicCase } from "../../../lib/cases/simulation-lab/index.public";
import { getSignalDefensePublicCase } from "../../../lib/cases/signal-defense/index.public";
import ActivityClient from "./ActivityClient";
import SignalCheckClient from "./SignalCheckClient";
import MissionMapClient from "./MissionMapClient";
import SimulationLabClient from "./SimulationLabClient";
import FrequencyRushClient from "./FrequencyRushClient";
import SignalDefenseClient from "./SignalDefenseClient";

export default async function ActivityPage({ params }) {
  const { assignmentId } = params;
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (!student) {
    redirect("/login");
  }

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, due_date, pacing_mode")
    .eq("id", assignmentId)
    .single();

  // Verify this assignment actually belongs to the student's own class â€”
  // without this check, a student could guess another class's assignment id.
  if (!assignment || assignment.class_id !== student.class_id) {
    redirect("/home");
  }

  // If this assignment was narrowed to specific students, only those
  // students may access it â€” everyone else in the class is turned away
  // even though the assignment does belong to their class.
  const { data: targets } = await supabaseAdmin
    .from("assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);

  if (targets && targets.length > 0) {
    const isTargeted = targets.some((t) => t.student_id === studentId);
    if (!isTargeted) {
      redirect("/home");
    }
  }

  // A case's `engine` column decides which challenge type's content and
  // game engine this assignment uses â€” "group_chat" (the default) and
  // "fact_check_desk" (Signal Check). Newsroom ("newsroom_bn" etc.) was
  // disconnected on Aug 25 2026 while it's reworked â€” any case row with a
  // "newsroom*" engine now falls through to the generic "not ready yet"
  // screen below, same as any other unwired case, until it's reconnected.
  const { data: caseRow } = await supabaseAdmin
    .from("cases")
    .select("engine, title")
    .eq("standard", assignment.case_standard)
    .maybeSingle();

  const engine = (caseRow && caseRow.engine) || "group_chat";
  const isSignalCheck = engine === "fact_check_desk";
  // Frequency Rush's own branch, added Sept 8 2026 alongside its first
  // Individual Practice cases â€” added up front rather than as an
  // afterthought, per the exact lesson from the Mission Map miss documented
  // below. Frequency Rush skips the shared existingSubmission/alreadySubmitted
  // gating entirely: Individual Practice is deliberately replayable
  // (unlimited replays, per the design doc), so there's no "already done,
  // go to Share" state here the way every other engine has one.
  const isFrequencyRush = engine === "frequency_rush";
  if (isFrequencyRush) {
    return (
      <FrequencyRushClient
        assignmentId={assignmentId}
        caseTitle={caseRow ? caseRow.title : null}
      />
    );
  }
  // Signal Ops / Signal Defense's own branch, added Sept 11 2026 alongside
  // its first case (3.6B-SD) â€” same early-return shape as Frequency Rush
  // just above. Replayable like Individual Practice for now (no
  // alreadySubmitted lockout).
  //
  // Layered pass #1 (content pipeline): loads the REAL per-standard
  // question bank from lib/cases/signal-defense/ by the assignment's own
  // case_standard. Falls back to null (widget's built-in bank) if a
  // standard has no authored file yet.
  //
  // Layered pass #2 (Sept 12 2026): SignalDefenseClient injects that bank
  // via window.SignalDefense.setQuestionBank and posts a score summary on
  // mission end via /api/signal-defense/submit.
  //
  // Layered pass #3 (Sept 12 2026 V1 live crew): when a teacher has an open
  // Signal Ops session for this assignment, the client auto-joins (no code)
  // and syncs shared Salvage / Power / Base Health. Solo + fake crew remain
  // the fallback when no live session exists.
  const isSignalDefense = engine === "signal_defense";
  if (isSignalDefense) {
    const signalDefenseCase = getSignalDefensePublicCase(assignment.case_standard);
    return (
      <SignalDefenseClient
        assignmentId={assignmentId}
        caseTitle={caseRow ? caseRow.title : null}
        caseStandard={assignment.case_standard}
        questionBank={signalDefenseCase ? signalDefenseCase.questions : null}
        studentFirstName={student.first_name || null}
      />
    );
  }
  // Mission Map's own branch â€” this was missing entirely until Sept 1, 2026,
  // which meant every Mission Map assignment (3.1-MM, 4.1-MM, 5.1-MM) fell
  // through to the generic group_chat lookup below (which has never heard of
  // these standards, since they live in their own lib/cases/mission-map/
  // registry, not lib/cases/index.public.js) and landed on the "This mission
  // isn't ready yet" screen instead of MissionMapClient. Caught while adding
  // the Save Progress button to Mission Map, not by a live report.
  const isMissionMap = engine === "mission_map";
  // Simulation Lab's own branch, added Sept 3 2026 alongside the engine's
  // first case (3.8B-SL) â€” added up front this time, precisely to avoid
  // repeating the exact missing-branch bug class documented above for
  // Mission Map.
  const isSimulationLab = engine === "simulation_lab";
  const caseEntry = isSignalCheck || isMissionMap || isSimulationLab ? null : getPublicCase(assignment.case_standard);
  const signalCheckCase = isSignalCheck ? getSignalCheckPublicCase(assignment.case_standard) : null;
  const missionMapCase = isMissionMap ? getMissionMapPublicCase(assignment.case_standard) : null;
  const simulationLabCase = isSimulationLab ? getSimulationLabPublicCase(assignment.case_standard) : null;
  if (!caseEntry && !signalCheckCase && !missionMapCase && !simulationLabCase) {
    return (
      <div style={{ minHeight: "100vh", background: "#16243F", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "sans-serif", textAlign: "center", padding: 20 }}>
        <div>
          <h1>This mission isn't ready yet</h1>
          <p style={{ color: "rgba(255,255,255,.6)" }}>The content for this case hasn't been wired into the app yet. Try Bee Disappearance Mystery for now!</p>
        </div>
      </div>
    );
  }

  const { data: existingSubmission } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  // A submission the teacher sent back for revision should NOT lock the
  // student out of the mission â€” only a submitted AND not-sent-back
  // submission is treated as final/done.
  const revisionRequested = !!(existingSubmission && existingSubmission.revision_requested);
  const alreadySubmitted = !!(existingSubmission && existingSubmission.submitted_at) && !revisionRequested;
  const revisionFeedback = revisionRequested ? existingSubmission.teacher_feedback || null : null;

  if (isSignalCheck) {
    return (
      <SignalCheckClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={signalCheckCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isMissionMap) {
    return (
      <MissionMapClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={missionMapCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isSimulationLab) {
    return (
      <SimulationLabClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={simulationLabCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  return (
    <ActivityClient
      assignmentId={assignmentId}
      caseStandard={assignment.case_standard}
      publicCase={caseEntry.publicCase}
      cast={caseEntry.cast}
      organizerFields={caseEntry.organizerFields}
      existingSubmission={existingSubmission}
      alreadySubmitted={alreadySubmitted}
      revisionRequested={revisionRequested}
      revisionFeedback={revisionFeedback}
      samSkin={student.equipped_sam_skin}
      samNickname={student.sam_nickname}
    />
  );
}

