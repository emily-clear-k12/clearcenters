import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import NotebookClient from "./NotebookClient";

export default async function NotebookPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // Only real, final submissions count as a "case file" worth keeping —
  // same submitted_at rule used everywhere else in the app (see the
  // draft-vs-submit fix in /api/submission/save).
  const { data: entries } = await supabaseAdmin
    .from("submissions")
    .select(
      "id, attempt1, attempt2, self_confidence, teacher_grade, teacher_feedback, released, submitted_at, assignments(case_standard, cases(title, learning_target))"
    )
    .eq("student_id", studentId)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false });

  return <NotebookClient student={student} entries={entries || []} />;
}
