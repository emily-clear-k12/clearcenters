import { Suspense } from "react";
import ClassClient from "./ClassClient";

export default function ClassPage() {
  return (
    <Suspense fallback={<div className="cc-loading">Loading your class…</div>}>
      <ClassClient />
    </Suspense>
  );
}
