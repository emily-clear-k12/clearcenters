import { cookies, headers } from "next/headers";
import { isSandboxHost } from "../lib/demo/site";
import DemoFrame from "../components/DemoFrame";

export const metadata = {
  title: "ClearCenters HQ",
  description: "Your mission hub for learning, evidence, and adventure.",
};

export default function RootLayout({ children }) {
  const demo = cookies().get("cc_demo")?.value === "1" && isSandboxHost(headers().get("host"));
  const student = Boolean(cookies().get("cc_student_id")?.value);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', sans-serif" }}>{demo && <DemoFrame student={student} />}{children}</body>
    </html>
  );
}
