const ts=require("/opt/node22/lib/node_modules/typescript"),fs=require("fs");
require.extensions[".js"]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,"utf8"),{compilerOptions:{module:1,target:7,esModuleInterop:true},fileName:f+"x"}).outputText,f);
const RS=require("/home/claude/cc/lib/cases/relay-station/index.js");
function syl(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(!w)return 0;if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
function sents(t){const o=[];t.split(/\n/).forEach(line=>{let l=line.replace(/^\t+/,"").trim();if(!l)return;
  l=l.replace(/^(?:[A-Z][A-Za-z.' ]{0,18}|S\.A\.M\.):\s*/,"").replace(/^\d+\.\s*/,"");
  if(!/[.!?]$/.test(l)){if(l.split(/\s+/).length<=8)return;}
  l.split(/(?<=[.!?]["”']?)\s+/).forEach(s=>{s=s.trim();if(/[a-z]/i.test(s))o.push(s);});});return o;}
// Strip what a reader does NOT decode cold: proper nouns (mid-sentence
// capitals) and the content vocabulary the standard is actually teaching.
const CONTENT=/^(conductor|conductors|insulator|insulators|electricity|electrical|material|materials|temperature|magnetism|property|properties|erosion|deposition|weathering|evaporation|condensation|precipitation|mission|missions|revolution|reconstruction|amendment|constitution|independence|government|citizenship|scarcity|resources|expedition|territory|vaccine|laboratory|ecosystem|organisms|adaptation|adaptations|environment|environments|energy|matter|solution|solutions|mixture|mixtures|orbit|rotation|magnetic|volcano|volcanoes|earthquake|earthquakes|economy|economic|industry|industries|population|region|regions|settlement|settlements|agriculture|barbed|longhorn|vessels|surgical|operations|marshals|polio|directions|direction|cardinal|intermediate|northeast|northwest|southeast|southwest|community|communities|responsibility|responsibilities|volunteer|volunteers|disabilities|disability|graduate|graduated|illness|decisions|citizen|citizens)$/i;
function fkPair(text){
  const S=sents(text); const words=S.join(" ").split(/\s+/).filter(w=>/[a-z]/i.test(w));
  const keep=words.filter((w,i)=>{
    const bare=w.replace(/[^A-Za-z-]/g,"");
    const midSentenceCap=/^[A-Z]/.test(bare)&&i>0&&!/[.!?]["”']?$/.test(words[i-1]);
    return !(midSentenceCap||CONTENT.test(bare));
  });
  const f=(ws)=>{const W=ws.length||1,SS=S.length||1,sy=ws.reduce((n,w)=>n+syl(w),0);
    return +(0.39*(W/SS)+11.8*(sy/W)-15.59).toFixed(1);};
  return { raw:f(words), syntax:f(keep), stripped:words.length-keep.length, words:words.length };
}
const BAND={3:4.2,4:5.6,5:7.2};
const rows=[];
for(const l of RS.listRelayStationLessons()){
  if(!l.text||["track","race","daily","vocabulary","numbers"].includes(l.kind)) continue;
  if(!["paragraph","log","letter"].includes(l.kind)) continue;
  const r=fkPair(l.text); if(r.raw<=BAND[l.grade]) continue;
  rows.push({code:l.code,grade:l.grade,...r});
}
console.log("Readings still above their FK ceiling, with proper nouns and target vocabulary removed:\n");
console.log("case         grade  FK as written   FK on syntax alone   ceiling   words stripped");
rows.sort((a,b)=>b.raw-a.raw).forEach(r=>console.log(
  `${r.code.padEnd(12)} ${r.grade}      ${String(r.raw).padStart(5)}          ${String(r.syntax).padStart(6)}            ${BAND[r.grade]}      ${r.stripped}/${r.words}`));
const stillHigh=rows.filter(r=>r.syntax>BAND[r.grade]);
console.log(`\n${rows.length} readings read high as written; ${stillHigh.length} are still high once the content words come out.`);
if(stillHigh.length) stillHigh.forEach(r=>console.log(`   genuinely dense: ${r.code} (syntax FK ${r.syntax})`));
