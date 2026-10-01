"use client";
import { useState } from "react";
import MakerStudioClient from "../../activity/[assignmentId]/MakerStudioClient";
import { MAKER_MODES } from "../../../lib/cases/maker-studio/modes";
export default function MakerPreview({ library }) {
  const [version,setVersion]=useState(0);
  const [set,setSet]=useState("sample");
  const [filled,setFilled]=useState(true);
  const enabledModes=set === "all" ? MAKER_MODES.map(m=>m.id) : ["write","sketch","poster"];
  const artwork=library.find(i=>/river-habitat-paper-collage/.test(i.url))?.url || library[0]?.url;
  const config={prompt:"Show how living things get what they need in a river habitat.",topic:"Design a habitat",enabledModes,finishN:enabledModes.length};
  const existingData=filled ? {version:2,modes:{write:{status:"done",text:"Plants, water, and shelter help living things thrive."},poster:{status:"in_progress",title:"A home for river life",caption:"Plants, water, and shelter help living things thrive.",imageDataUrl:artwork}}} : null;
  return <><div style={{background:"#101e3d",color:"white",padding:"10px 18px",display:"flex",gap:15,alignItems:"center",flexWrap:"wrap",font:"13px system-ui"}}><strong>Maker Studio design preview</strong><label>Activities <select value={set} onChange={e=>{setSet(e.target.value);setVersion(v=>v+1);}}><option value="sample">Sample assignment · 3 pieces</option><option value="all">Explore all 15 modes</option></select></label><label><input type="checkbox" checked={filled} onChange={e=>{setFilled(e.target.checked);setVersion(v=>v+1);}} /> Sample work</label><button onClick={()=>setVersion(v=>v+1)}>Reset preview</button><span>Saving stays in this preview. AI calls are off.</span></div><MakerStudioClient key={version} assignmentId="design-preview" config={config} existingData={existingData} publicCase={{title:"River habitat",modes:MAKER_MODES}} initialMode="poster" previewMode previewLibrary={library} /></>;
}
