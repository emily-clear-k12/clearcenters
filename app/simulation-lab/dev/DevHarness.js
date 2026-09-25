"use client";

import SimulationLabClient from "../../activity/[assignmentId]/SimulationLabClient";

// Fake network for the dev harness (see page.js). Installed synchronously
// before the student component mounts so its first effects already see it.
function installShim() {
  if (typeof window === "undefined" || window.__slxShim) return;
  window.__slxShim = true;
  const real = window.fetch.bind(window);
  window.__slxCalls = [];
  window.fetch = async (url, opts) => {
    const u = typeof url === "string" ? url : url.url;
    if (u.startsWith("/api/submission/save")) {
      window.__slxCalls.push({ url: u, body: opts && opts.body ? JSON.parse(opts.body) : null });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (u.startsWith("/api/simulation-lab/submit")) {
      window.__slxCalls.push({ url: u, body: opts && opts.body ? JSON.parse(opts.body) : null });
      const res = await real("/api/simulation-lab/dev-score", opts);
      const data = await res.clone().json().catch(() => null);
      window.__slxLastSubmit = data;
      return res;
    }
    if (u.startsWith("/api/distress-call")) return new Response("{}", { status: 404 });
    return real(url, opts);
  };
}

export default function DevHarness({ standard, publicCase, submitted, skin }) {
  installShim();
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("fresh") === "1" && !window.__slxFresh) {
    window.__slxFresh = true;
    try { localStorage.removeItem(`cc_simlab2_dev-${standard}_dev-student`); } catch (e) { /* ignore */ }
  }
  return (
    <SimulationLabClient
      assignmentId={`dev-${standard}`}
      studentId="dev-student"
      caseStandard={standard}
      publicCase={publicCase}
      existingSubmission={null}
      alreadySubmitted={submitted}
      revisionRequested={false}
      revisionFeedback={null}
      samSkin={skin}
      samNickname={null}
    />
  );
}
