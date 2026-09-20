import { Suspense } from "react";
import StandardReportClient from "./StandardReportClient";

export const metadata = { title: "Standard report · CI2.0" };

export default function Page({ params }) {
  const code = params?.code ? decodeURIComponent(params.code) : "";
  return (
    <Suspense fallback={null}>
      <StandardReportClient code={code} />
    </Suspense>
  );
}
