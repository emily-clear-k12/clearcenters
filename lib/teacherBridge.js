export const SUBJECTS = {
 Science:{color:'#39D97A',ink:'#087c43',glow:'#39D97A30'},
 'Social Studies':{color:'#FFDD40',ink:'#786000',glow:'#FFDD4038'},
 Math:{color:'#368cfa',ink:'#165bab',glow:'#368cfa30'},
 ELAR:{color:'#ee5264',ink:'#b42b3a',glow:'#ee526430'},
};
export function subjectStyle(subject){const s=SUBJECTS[subject]||{color:'#b49bdd',ink:'#683cab',glow:'#b49bdd20'};return {'--subject':s.color,'--subject-ink':s.ink,'--subject-glow':s.glow}}
export const ENGINES={
 mission_map:{label:'Mission Map',image:'/teacher/challenges/mission_map.jpg',description:'Investigate clues and build a reasoning chain.'},
 group_chat:{label:'Group Chat',image:'/teacher/challenges/group_chat.jpg',description:'Take a role and explain with evidence.'},
 fact_check_desk:{label:'Signal Check',image:'/teacher/challenges/fact_check_desk.jpg',description:'Evaluate a claim using evidence.'},
 assembly_deck:{label:'Assembly Deck',image:'/teacher/challenges/repair_desk.jpg',description:'Build the whole piece and explain your choices.'},
 frequency_rush:{label:'Frequency Rush',image:'/teacher/challenges/frequency_rush.jpg',description:'Practice vocabulary through play.'},
 simulation_lab:{label:'Simulation Lab',image:'/teacher/challenges/simulation_lab.jpg',description:'Change a variable and explore the results.'},
 signal_defense:{label:'Signal Ops',image:'/teacher/challenges/signal_defense.jpg',description:'Work together to defend the class base.'},
 relay_station:{label:'Relay Station',image:'/teacher/challenges/relay_station.jpg',description:'Build typing fluency with purposeful practice.'},
};
export function engineInfo(key){return ENGINES[key]||ENGINES.group_chat}
export function assignmentBoard(assignment,engine){if(engine==='signal_defense')return `/teacher/signal-ops-board?assignmentId=${assignment.id}`;if(assignment.distress_call)return `/teacher/live-ops-board?assignmentId=${assignment.id}`;return `/teacher/assign?classId=${assignment.class_id}&assignmentId=${assignment.id}`}
