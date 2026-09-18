import ProjectShellClient from "./ProjectShellClient";

export const metadata = { title: "Project · CI2.0" };

export default function Page({ params }) {
  const id = params?.id || "";
  return <ProjectShellClient projectId={id} />;
}