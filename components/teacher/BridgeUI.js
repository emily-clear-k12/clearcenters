"use client";
import React from 'react';
import TeacherHUD from '../TeacherHUD';
import './bridge.css';
export function BridgePage({children,teacherEmail,teacherName}){return <div className="cc-page"><TeacherHUD compact teacherEmail={teacherEmail} teacherName={teacherName}/><main className="cc-workspace">{children}</main></div>}
export function ClassTabs({classes,value,onChange,all=false}){return <div className="cc-classes" aria-label="Choose class">{all&&<button aria-pressed={value==='all'} onClick={()=>onChange('all')}>All classes</button>}{[...classes].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})).map(c=><button key={c.id} aria-pressed={value===c.id} onClick={()=>onChange(c.id)}>{c.name}</button>)}</div>}
export function PageHeading({title,subtitle,children}){return <div className="cc-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{children&&<div>{children}</div>}</div>}
export function Empty({children}){return <div className="cc-empty">{children}</div>}
