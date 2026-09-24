import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { loadStarChart } from "../../lib/starChart";
import StarChartClient from "./StarChartClient";

// Sept 24, 2026 — the student's Star Chart, "My Sky"
// (FrequencyRush_Fluency_Expansion_v1.md §11.10c). Only this student's own
// stars, from the Frequency Rush activities they can see. Never compared to
// classmates.
export default async function StudentStarChartPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id")
    .eq("id", studentId)
    .single();
  if (!student) redirect("/login");

  let chart = { students: [], activities: [] };
  if (student.class_id) {
    try {
      chart = await loadStarChart(supabaseAdmin, { classId: student.class_id, onlyStudentId: student.id });
    } catch (err) {
      console.error("Star Chart: couldn't load for student:", err.message);
    }
  }

  return <StarChartClient studentId={student.id} firstName={student.first_name} activities={chart.activities} />;
}
