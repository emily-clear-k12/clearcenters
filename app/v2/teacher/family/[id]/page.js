import { Suspense } from "react";
import FamilyNoteClient from "./FamilyNoteClient";

export const metadata = { title: "Family note · CI2.0" };

export default function Page({ params }) {
  const id = params?.id || "";
  return (
    <Suspense fallback={<main style={{ minHeight: "40vh" }} />}>
      <FamilyNoteClient noteId={id} />
    </Suspense>
  );
}
