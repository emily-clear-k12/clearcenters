import { Suspense } from "react";
import AssignmentReportClient from "./AssignmentReportClient";

export const metadata = { title: "Assignment report · CI2.0" };

export default function Page({ params }) {
  const id = params?.id ? decodeURIComponent(params.id) : "";
  return (
    <Suspense fallback={null}>
      <AssignmentReportClient assignmentId={id} />
    </Suspense>
  );
}
