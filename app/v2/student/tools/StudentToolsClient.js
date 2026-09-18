"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StudentToolsPanel from "../../../../components/v2/StudentToolsPanel";
import {
  loadStudentPrefs,
  TEXT_SIZE_CLASS,
  textSizeFontPx,
} from "../../../../lib/v2/demoStudentPrefs";
import { getActiveDemoStudent } from "../../../../lib/v2/demoStudentDay";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const WARM_BG = "linear-gradient(165deg, #F6F0FF 0%, #FFF9EE 55%, #F3EEFF 100%)";

/**
 * Full-page Student Tools shell — glass look matching My Day / activity.
 * Honors ci2.student.prefs.{kid} text size.
 */
export default function StudentToolsClient() {
  const [prefs, setPrefs] = useState(() => loadStudentPrefs());
  const student = getActiveDemoStudent();

  useEffect(() => {
    const refresh = () => setPrefs(loadStudentPrefs());
    refresh();
    const onStorage = (e) => {
      if (!e.key || e.key.startsWith("ci2.student.prefs.")) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-student-prefs-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-student-prefs-updated", refresh);
    };
  }, []);

  const textSize = prefs.textSize || "M";
  const shownName = prefs.displayName || student.name;

  return (
    <main
      className={TEXT_SIZE_CLASS[textSize] || TEXT_SIZE_CLASS.M}
      data-ci2-text-size={textSize}
      style={{
        minHeight: "100vh",
        background: WARM_BG,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: `${textSizeFontPx(textSize)}px`,
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <Link
            href="/v2/student"
            style={{
              border: `1px solid ${LINE}`,
              background: "rgba(255,255,255,.8)",
              color: INK,
              borderRadius: 999,
              padding: "8px 14px",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ← My Day
          </Link>
          <span style={{ fontSize: 13, color: MUTED, alignSelf: "center" }}>
            {shownName} · Room 12 · {textSize}
          </span>
        </div>
        <StudentToolsPanel backHref="/v2/student" />
      </div>
    </main>
  );
}
