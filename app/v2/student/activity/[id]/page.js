import StudentActivityClient from "./StudentActivityClient";

// CI2.0 Student · activity Start stub (skeleton shell).
export const metadata = {
  title: "Activity · CI2.0 Student",
};

export default function StudentActivityPage({ params }) {
  const id = params?.id || "";
  return <StudentActivityClient missionId={id} />;
}
