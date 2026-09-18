import { Suspense } from "react";
import StandardsInfoClient from "./StandardsInfoClient";

export const metadata = { title: "Standard info · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StandardsInfoClient />
    </Suspense>
  );
}
