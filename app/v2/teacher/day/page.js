import { Suspense } from "react";
import StationDayClient from "../StationDayClient";

export const metadata = { title: "Daily Focus · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StationDayClient />
    </Suspense>
  );
}
