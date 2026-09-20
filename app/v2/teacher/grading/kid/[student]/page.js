import { Suspense } from "react";
import KidGradingClient from "./KidGradingClient";

export const metadata = { title: "Kid grades · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KidGradingClient />
    </Suspense>
  );
}
