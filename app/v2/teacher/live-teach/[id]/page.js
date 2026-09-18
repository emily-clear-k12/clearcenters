import LiveTeachClient from "./LiveTeachClient";

export const metadata = { title: "Teach live · CI2.0" };

export default function Page({ params }) {
  const id = params?.id || "";
  return <LiveTeachClient lessonId={id} />;
}
