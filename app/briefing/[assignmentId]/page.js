import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getPublicBriefing } from "../../../lib/briefings/index.public";
import BriefingClient from "./BriefingClient";

export default async function BriefingPlayerPage({ params }) {
  const { assignmentId } = params;
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) redirect("/login");

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (!student) redirect("/login");

  const { data: assignment } = await supabaseAdmin
    .from("briefing_assignments")
    .select("id, class_id, briefing_id, due_date")
    .eq("id", assignmentId)
    .maybeSingle();

  if (!assignment || assignment.class_id !== student.class_id) {
    redirect("/briefings");
  }

  const { data: targets } = await supabaseAdmin
    .from("briefing_assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);

  if (targets && targets.length > 0 && !targets.some((t) => t.student_id === studentId)) {
    redirect("/briefings");
  }

  const briefing = getPublicBriefing(assignment.briefing_id);
  if (!briefing) redirect("/briefings");

  const { data: submission } = await supabaseAdmin
    .from("briefing_submissions")
    .select("id, phase_state, scores, status, cleared_at")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  return (
    <BriefingClient
      student={student}
      assignment={assignment}
      briefing={briefing}
      initialSubmission={submission}
    />
  );
}
