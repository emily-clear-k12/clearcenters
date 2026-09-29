import { redirect } from "next/navigation";

// Sept 29, 2026: Student Progress is retired. It overlapped Reports, so the
// class view is Reports → Students and each student has one work page.
// Old links land on Reports with the same class picked. The old page is in
// git history if anything from it is needed.
export default function OldStudentProgress({ searchParams }) {
  const classId = searchParams?.classId;
  redirect(classId ? `/teacher/reports?classId=${encodeURIComponent(classId)}&tab=students` : "/teacher/reports?tab=students");
}
