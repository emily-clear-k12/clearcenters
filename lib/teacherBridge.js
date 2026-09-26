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
 relay_station:{label:'ClearKeys',image:'/teacher/products/keys.jpg',description:'Typing on the ship. Students relay a message one letter at a time.'},
 classification_lab:{label:'Classification Lab',image:'/lab/room.jpg',description:'Sort by the card, not the obvious clue. Three sorts, about 20 minutes.'},
 exhibit_hall:{label:'Exhibit Hall',image:'/maker/hall.jpg',description:'Stamp each source, build a four-spot exhibit, and write the labels. About 20 minutes.'},
 expedition_station:{label:'Expedition Station',image:'/teacher/challenges/mission_map.jpg',description:'A 15-task quest on one planet. Station mode: four cards, then a challenge. About 15-20 minutes per act.'},
 maker_studio:{label:'Maker Studio',image:'/teacher/challenges/museum_exhibit.jpg',description:'Prompt plus make modes (Write, Sketch, Diagram, Poster, Comic, Voice). Students finish assigned modes, then submit for teacher review — not AI-graded.'},
};
export function engineInfo(key){return ENGINES[key]||ENGINES.group_chat}
export function assignmentBoard(assignment,engine){if(engine==='signal_defense')return `/teacher/signal-ops-board?assignmentId=${assignment.id}`;if(assignment.distress_call)return `/teacher/live-ops-board?assignmentId=${assignment.id}`;return `/teacher/assign?classId=${assignment.class_id}&assignmentId=${assignment.id}`}
