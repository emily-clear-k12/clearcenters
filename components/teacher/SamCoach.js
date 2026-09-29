"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Sept 29, 2026: a first-week tour, one tip per sign-in (or tap Next tip).
// In the order a new teacher needs them. Stored under a new key so every
// teacher starts the tour from the top.
const TIPS = [
  { title: "Add your students first", text: "On the Class page, add names and print the sign-in cards. Students sign in with the class code and their 4-digit number.", href: "/teacher/class", action: "Open Class" },
  { title: "Assign from the standard", text: "On Assign, pick the standard you're teaching. Every activity for it is on one page, grouped Practice, Prove it and Make it.", href: "/teacher/assign/new", action: "Open Assign" },
  { title: "Grade with three marks", text: "Mark work Got it, Almost or Not yet. Press Enter to release it and move to the next student.", href: "/teacher/grade", action: "Grade work" },
  { title: "Students see released grades only", text: "A grade stays private until you release it. The student report and the family link only show released grades.", href: "/teacher/grade", action: "Open the review list" },
  { title: "The Gradebook", text: "Grades opens the Gradebook: every student and activity, by standard, or as cards. Download it for Skyward, Schoology or Excel.", href: "/teacher/gradebook", action: "Open the Gradebook" },
  { title: "Pull a small group", text: "In the Gradebook, tap Small groups and save the kids who need the same help. The group page plans the table time and shows who moved up.", href: "/teacher/groups", action: "Open Groups" },
  { title: "What to do this week", text: "Reports starts with a short to-do list: what to reteach, who is slipping, and who has past-due work.", href: "/teacher/reports", action: "Open Reports" },
  { title: "Tools live on the Class page", text: "Star Chart, word lists, typing texts, passages and rewards are under the Tools button on the Class page.", href: "/teacher/class", action: "Open Class" },
];
const STORE = "cc-sam-coach:v2:";

export function markTeacherLogin() {
  try {
    sessionStorage.setItem("cc-login-stamp", String(Date.now()));
  } catch (err) {
    /* private mode can block storage; the tip just waits */
  }
}

export function replaySamTips() {
  try {
    sessionStorage.setItem("cc-login-stamp", String(Date.now()));
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) keys.push(localStorage.key(i));
    keys.forEach((key) => {
      if (key && key.startsWith("cc-sam-coach:")) localStorage.removeItem(key);
    });
  } catch (err) {
    /* still send them to Today */
  }
}

export default function SamCoach({ teacherId }) {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    if (!teacherId) return undefined;
    let stamp = "";
    let saved = { index: 0, stamp: "" };
    try {
      stamp = sessionStorage.getItem("cc-login-stamp") || "";
      saved = JSON.parse(localStorage.getItem(`${STORE}${teacherId}`) || "null") || saved;
    } catch (err) {
      return undefined;
    }
    if (!stamp || saved.stamp === stamp || saved.index >= TIPS.length) return undefined;
    setTip({ ...TIPS[saved.index], index: saved.index, stamp });
    return undefined;
  }, [teacherId]);

  function dismiss() {
    if (!tip || !teacherId) return;
    try {
      localStorage.setItem(`${STORE}${teacherId}`, JSON.stringify({ index: tip.index + 1, stamp: tip.stamp }));
    } catch (err) {
      /* still close the card */
    }
    setTip(null);
  }

  function next() {
    if (!tip || !teacherId) return;
    const index = tip.index + 1;
    try {
      localStorage.setItem(`${STORE}${teacherId}`, JSON.stringify({ index, stamp: "" }));
    } catch (err) {
      /* still move on */
    }
    setTip(index < TIPS.length ? { ...TIPS[index], index, stamp: tip.stamp } : null);
  }

  if (!tip) return null;

  return (
    <section className="cc-sam-banner">
      <img src="/icons/sam/cosmic/helping-poster.png" alt="" />
      <div className="cc-sam-banner-copy">
        <div className="cc-eyebrow">S.A.M. · tip {tip.index + 1} of {TIPS.length}</div>
        <strong>{tip.title}</strong>
        <span>{tip.text}</span>
      </div>
      <div className="cc-sam-banner-actions">
        <Link className="cc-btn" href={tip.href} onClick={dismiss}>{tip.action}</Link>
        <button className="cc-btn secondary" type="button" onClick={dismiss}>Got it</button>
        {tip.index + 1 < TIPS.length && <button className="cc-btn quiet" type="button" onClick={next}>Next tip</button>}
      </div>
    </section>
  );
}
