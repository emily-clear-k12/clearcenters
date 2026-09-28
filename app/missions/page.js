import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
import MissionsClient from "./MissionsClient";
import { readStudentId } from "../../lib/studentSession";

export default async function MissionsPage() {
  const studentId = readStudentId();

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const assignments = await getVisibleAssignmentsForStudent(studentId, student.class_id);

  return <MissionsClient student={student} assignments={assignments} />;
}
