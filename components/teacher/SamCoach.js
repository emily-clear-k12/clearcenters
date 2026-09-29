"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TIPS = [
  { title: "Start from the standard", text: "On Assign, pick the standard first. Every activity for it is on that page.", href: "/teacher/assign/new", action: "Open Assign" },
  { title: "Three marks, then your numbers", text: "Mark work Got it, Almost, or Not yet. Open the gradebook when you want the class grid and an average.", href: "/teacher/grade", action: "Open Grades" },
  { title: "Sign-in cards", text: "Students use the class code and their 4-digit number. Print the cards from the class page.", href: "/teacher/class", action: "Open Class" },
  { title: "The Star Chart", text: "Words and facts from Frequency Rush show up as stars, for you and for the student.", href: "/teacher/star-chart", action: "Open Star Chart" },
];

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
      saved = JSON.parse(localStorage.getItem(`cc-sam-coach:${teacherId}`) || "null") || saved;
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
      localStorage.setItem(`cc-sam-coach:${teacherId}`, JSON.stringify({ index: tip.index + 1, stamp: tip.stamp }));
    } catch (err) {
      /* still close the card */
    }
    setTip(null);
  }

  if (!tip) return null;

  return (
    <section className="cc-panel cc-attention" style={{ marginBottom: 16 }}>
      <div className="cc-attention-heading">
        <img src="/icons/sam/cosmic/helping-poster.png" alt="" />
        <div>
          <div className="cc-eyebrow">S.A.M. · tip {tip.index + 1} of {TIPS.length}</div>
          <h2>{tip.title}</h2>
        </div>
      </div>
      <p>{tip.text}</p>
      <div className="cc-row">
        <Link className="cc-btn" href={tip.href} onClick={dismiss}>{tip.action}</Link>
        <button className="cc-btn secondary" type="button" onClick={dismiss}>Got it</button>
      </div>
    </section>
  );
}
