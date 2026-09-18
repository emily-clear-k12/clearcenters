import { Suspense } from "react";
import UnitGuideClient from "./UnitGuideClient";

export const metadata = { title: "Unit teaching guide · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UnitGuideClient />
    </Suspense>
  );
}
