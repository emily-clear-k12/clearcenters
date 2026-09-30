"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../../components/teacher/BridgeUI";
import ClearKeysTabs from "../../../../components/teacher/ClearKeysTabs";
import ClearKeysReportView from "../../../../components/teacher/ClearKeysReportView";
import { summarizeStudent } from "../../../../lib/clearkeysReport";

// ClearKeys Report page (Sept 29, 2026). Data from /api/teacher/typing-track.
function Report() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setReady(true);
      supabase.from("classes").select("id, name, grade").eq("teacher_id", data.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/teacher/typing-track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "list", classId, accessToken: session?.access_token }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setRows(data.students || []);
    } catch (err) { setError(err.message); }
  }, [classId]);
  useEffect(() => { setRows(null); load(); }, [load]);

  if (!ready) return <div className="cc-loading">Loading...</div>;
  const cls = classes.find((c) => c.id === classId);
  const grade = [3, 4, 5].includes(Number(cls?.grade)) ? Number(cls.grade) : 4;
  const summaries = rows ? rows.map((r) => summarizeStudent(r.firstName, r.progress, grade)) : null;

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <PageHeading title="ClearKeys report" subtitle="Typing speed, accuracy and year goals">
        {classes.length > 1 && <ClassTabs classes={classes} value={classId} onChange={setClassId} />}
      </PageHeading>
      <ClearKeysTabs active="report" classId={classId} />
      {error && <div className="cc-error" role="alert">{error}</div>}
      {!classes.length ? <Empty>Make a class first.</Empty> : summaries === null ? <div className="cc-empty">Loading students…</div> : <ClearKeysReportView className={cls?.name} summaries={summaries} grade={grade} />}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Report /></Suspense>;
}
