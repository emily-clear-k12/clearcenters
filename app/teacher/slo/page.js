"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, PageHeading } from "../../../components/teacher/BridgeUI";

export default function SloPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) {
        router.push("/login");
        return;
      }
      setEmail(data.user.email || "");
    });
  }, [router]);

  return (
    <BridgePage teacherEmail={email}>
      <PageHeading title="Learning goals" subtitle="This page is not ready yet." />
      <section className="cc-panel">
        <p className="cc-muted">Coming soon.</p>
      </section>
    </BridgePage>
  );
}
