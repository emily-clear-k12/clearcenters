import { redirect } from "next/navigation";

export default function JoinPage({ params }) {
  const code = params.code;
  redirect(`/login?classCode=${encodeURIComponent(code)}`);
}
