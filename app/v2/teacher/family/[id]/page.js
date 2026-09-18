import FamilyNoteClient from "./FamilyNoteClient";

export const metadata = { title: "Family note · CI2.0" };

export default function Page({ params }) {
  const id = params?.id || "";
  return <FamilyNoteClient noteId={id} />;
}
