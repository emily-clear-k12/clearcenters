import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getPublicCase } from "../../../lib/cases/index.public";
import { getSignalCheckPublicCase } from "../../../lib/cases/signal-check/index.public";
import ActivityClient from "./ActivityClient";
import SignalCheckClient from "./SignalCheckClient";

export default async function ActivityPage({ params }) {
  const { assignmentId } = params;
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id")
    .eq("id", studentId)
    .single();

  if (!student) {
    redirect("/login");
  }

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, due_date")
    .eq("id", assignmentId)
    .single();

  // Verify this assignment actually belongs to the student's own class —
  // without this check, a student could guess another class's assignment id.
  if (!assignment || assignment.class_id !== student.class_id) {
    redirect("/home");
  }

  // If this assignment was narrowed to specific students, only those
  // students may access it — everyone else in the class is turned away
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
  // game engine this assignment uses — "group_chat" (the default) and
  // "fact_check_desk" (Signal Check). Newsroom ("newsroom_bn" etc.) was
  // disconnected on Aug 25 2026 while it's reworked — any case row with a
  // "newsroom*" engine now falls through to the generic "not ready yet"
  // screen below, same as any other unwired case, until it's reconnected.
  const { data: caseRow } = await supabaseAdmin
    .from("cases")
    .select("engine")
    .eq("standard", assignment.case_standard)
    .maybeSingle();

  const engine = (caseRow && caseRow.engine) || "group_chat";
  const isSignalCheck = engine === "fact_check_desk";

  const caseEntry = isSignalCheck ? null : getPublicCase(assignment.case_standard);
  const signalCheckCase = isSignalCheck ? getSignalCheckPublicCase(assignment.case_standard) : null;

  if (!caseEntry && !signalCheckCase) {
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
  // student out of the mission — only a submitted AND not-sent-back
  // submission is treated as final/done.
  const revisionRequested = !!(existingSubmission && existingSubmission.revision_requested);
  const alreadySubmitted = !!(existingSubmission && existingSubmission.submitted_at) && !revisionRequested;
  const revisionFeedback = revisionRequested ? existingSubmission.teacher_feedback || null : null;

  if (isSignalCheck) {
    return (
      <SignalCheckClient
        assignmentId={assignmentId}
        caseStandard={assignment.case_standard}
        publicCase={signalCheckCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
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
    />
  );
}
