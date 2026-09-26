"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import "./teacher/bridge.css";

const NAV = [["Today","/teacher"],["Assign","/teacher/assign/new"],["Grades","/teacher/grade"],["Reports","/teacher/reports"],["Resources","/teacher/resources"]];
export default function TeacherHUD({title,subtitle,teacherName,teacherEmail,actions,compact=false}) {
 const router=useRouter(), pathname=usePathname();
 const [open,setOpen]=useState(false),[signingOut,setSigningOut]=useState(false);
 const ref=useRef(null),trigger=useRef(null);
 useEffect(()=>{const away=e=>{if(!ref.current?.contains(e.target))setOpen(false)};const esc=e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}};document.addEventListener('pointerdown',away);document.addEventListener('keydown',esc);return()=>{document.removeEventListener('pointerdown',away);document.removeEventListener('keydown',esc)}},[]);
 useEffect(()=>setOpen(false),[pathname]);
 const name=teacherName || (teacherEmail?.split('@')[0] || 'Teacher').replace(/[._-]/g,' ');
 const active=href=> href==='/teacher'?pathname===href:href==='/teacher/assign/new'?pathname.startsWith('/teacher/assign'):pathname.startsWith(href);
 async function logout(){setSigningOut(true);const {error}=await supabase.auth.signOut();if(error){setSigningOut(false);return}router.push('/login')}
 return <><header className="cc-console"><Link className="cc-brand" href="/teacher"><img src="/icons/crystal_logo.png" alt=""/>ClearCenters</Link><nav aria-label="Teacher navigation">{NAV.map(([label,href])=><Link key={label} className="cc-nav-link" href={href} aria-current={active(href)?'page':undefined}>{label}</Link>)}</nav><div ref={ref} className="cc-account"><button ref={trigger} className="cc-account-trigger" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="cc-account-menu"><img src="/icons/sam/cosmic/idle-poster.png" alt=""/><span style={{textTransform:'capitalize'}}>{name.split(' ')[0]}</span><span aria-hidden="true">⌄</span></button>{open&&<div id="cc-account-menu" className="cc-account-menu"><strong>This class</strong><Link href="/teacher/roster">Roster</Link><Link href="/teacher/badges">Badges</Link><Link href="/teacher/settings">Class settings</Link><strong>Account</strong><Link href="/teacher/messages">Notes</Link><Link href="/teacher/slo">SLOs</Link><Link href="/teacher/settings">Settings</Link><button onClick={logout} disabled={signingOut}>{signingOut?'Signing out…':'Sign out'}</button></div>}</div></header>{!compact&&title&&<div className="cc-console-title"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>{actions}</div>}</>;
}
