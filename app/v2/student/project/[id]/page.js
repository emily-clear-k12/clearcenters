import StudentProjectClient from "./StudentProjectClient";

// CI2.0 Student · Project Open shell (Later · Project).
export const metadata = {
  title: "Project · CI2.0 Student",
};

export default function StudentProjectPage({ params }) {
  const id = params?.id || "";
  return <StudentProjectClient projectId={id} />;
}
