import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getPublicCase } from "../../../lib/cases/index.public";
import ActivityClient from "./ActivityClient";

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

  const caseEntry = getPublicCase(assignment.case_standard);

  if (!caseEntry) {
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

  return (
    <ActivityClient
      assignmentId={assignmentId}
      caseStandard={assignment.case_standard}
      publicCase={caseEntry.publicCase}
      cast={caseEntry.cast}
      organizerFields={caseEntry.organizerFields}
      existingSubmission={existingSubmission}
      alreadySubmitted={!!(existingSubmission && existingSubmission.submitted_at)}
    />
  );
}
