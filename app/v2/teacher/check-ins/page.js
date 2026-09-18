import { Suspense } from "react";
import CheckInsClient from "./CheckInsClient";

export const metadata = { title: "Check-ins · CI2.0" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckInsClient />
    </Suspense>
  );
}
