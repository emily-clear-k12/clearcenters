import { redirect } from "next/navigation";

// Sept 29, 2026: retired. The Standards tab on Reports (including "Not
// taught yet") replaces this page. This folder can be deleted.
export default function OldCurriculumReport() {
  redirect("/teacher/reports?tab=standards");
}
