"use client";
import React, { useEffect, useState } from 'react';
import {rememberTeacherClass} from '../../lib/teacherClass';
import TeacherHUD from '../TeacherHUD';
import './bridge.css';

function DemoBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try { setOn(window.localStorage.getItem("cc-demo") === "1"); } catch (err) { setOn(false); }
  }, []);
  if (!on) return null;
  function leave() {
    try { window.localStorage.removeItem("cc-demo"); } catch (err) { /* still leave the page */ }
    window.location.href = "/demo";
  }
  return (
    <div className="cc-demo-bar">
      <strong>Demo</strong>
      <span>Mrs. Barrons · Grade 4 · sample students, not a real class</span>
      <button type="button" onClick={leave}>Leave demo</button>
    </div>
  );
}

export function BridgePage({children,teacherEmail,teacherName}){
  useEffect(() => {
    const root = document.querySelector(".cc-workspace");
    if (!root) return;
    function place() {
      const nodes = root.querySelectorAll("p.cc-muted");
      for (const node of nodes) {
        if ((node.textContent || "").trim() !== "Choose a game first.") continue;
        if (node.parentElement?.querySelector("[data-word-list-link]")) continue;
        const link = document.createElement("a");
        link.href = "/teacher/word-lists";
        link.className = "cc-text-button";
        link.dataset.wordListLink = "true";
        link.textContent = "Use your own word list";
        node.insertAdjacentElement("afterend", link);
      }
    }
    place();
    const observer = new MutationObserver(place);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return <div className="cc-page"><DemoBar/><TeacherHUD compact teacherEmail={teacherEmail} teacherName={teacherName}/><main className="cc-workspace">{children}</main></div>
}
export function ClassTabs({classes,value,onChange,all=false}){return <div className="cc-classes" aria-label="Choose class">{all&&<button aria-pressed={value==='all'} onClick={()=>onChange('all')}>All classes</button>}{[...classes].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})).map(c=><button key={c.id} aria-pressed={value===c.id} onClick={()=>{rememberTeacherClass(c.id);onChange(c.id)}}>{c.name}</button>)}</div>}
export function PageHeading({title,subtitle,children}){return <div className="cc-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{children&&<div>{children}</div>}</div>}
export function Empty({children}){return <div className="cc-empty">{children}</div>}
