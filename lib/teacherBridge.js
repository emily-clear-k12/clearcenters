import { ACTIVITY_FACTS } from "./activityFacts";
export const SUBJECTS = {
 Science:{color:'#39D97A',ink:'#087c43',glow:'#39D97A30'},
 'Social Studies':{color:'#FFDD40',ink:'#786000',glow:'#FFDD4038'},
 Math:{color:'#368cfa',ink:'#165bab',glow:'#368cfa30'},
 ELAR:{color:'#ee5264',ink:'#b42b3a',glow:'#ee526430'},
};
export function subjectStyle(subject){const s=SUBJECTS[subject]||{color:'#b49bdd',ink:'#683cab',glow:'#b49bdd20'};return {'--subject':s.color,'--subject-ink':s.ink,'--subject-glow':s.glow}}
export const ENGINES=Object.fromEntries(Object.entries(ACTIVITY_FACTS).map(([key,facts])=>[key,{label:facts.label,image:facts.image,description:facts.sentence}]));
export function engineInfo(key){return ENGINES[key]||ENGINES.group_chat}
export function assignmentBoard(assignment,engine){if(engine==='signal_defense')return `/teacher/signal-ops-board?assignmentId=${assignment.id}`;if(assignment.distress_call)return `/teacher/live-ops-board?assignmentId=${assignment.id}`;return `/teacher/assign?classId=${assignment.class_id}&assignmentId=${assignment.id}`}
