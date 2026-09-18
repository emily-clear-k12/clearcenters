import StudentMyDayClient from "./StudentMyDayClient";

// CI2.0 Student · My Day — replaces the old ClearCenters dashboard re-export.
export const metadata = {
  title: "My Day · CI2.0 Student",
};

export default function StudentMyDayPage() {
  return <StudentMyDayClient />;
}
