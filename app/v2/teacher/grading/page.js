import { Suspense } from "react";
import GradingInboxClient from "./GradingInboxClient";

export const metadata = { title: "Grading · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GradingInboxClient />
    </Suspense>
  );
}
