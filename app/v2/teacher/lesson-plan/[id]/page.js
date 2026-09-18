import LessonPlanClient from "./LessonPlanClient";

export const metadata = { title: "Lesson plan · CI2.0" };

export default function Page({ params }) {
  const id = params?.id || "";
  return <LessonPlanClient lessonId={id} />;
}
