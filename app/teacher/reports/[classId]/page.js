import { redirect } from "next/navigation";

// Sept 29, 2026: the old class report is retired. Reports now lives on one
// page with four tabs (app/teacher/reports/page.js). Old links land there
// with the same class picked. This folder can be deleted.
export default function OldClassReport({ params }) {
  redirect(`/teacher/reports?classId=${encodeURIComponent(params.classId || "")}`);
}
