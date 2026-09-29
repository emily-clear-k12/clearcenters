import { redirect } from "next/navigation";

// Sept 29, 2026: retired. The Standards tab on Reports replaces this page.
// This folder can be deleted.
export default function OldStandardsReport() {
  redirect("/teacher/reports?tab=standards");
}
