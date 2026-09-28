import { getPublicCase } from "./cases/index.public";
import { getSignalCheckPublicCase } from "./cases/signal-check/index.public";
import { getMissionMapPublicCase } from "./cases/mission-map/index.public";
import { getSimulationLabPublicCase } from "./cases/simulation-lab/index.public";
import { ACTIVITY_CHECKS } from "./selfCheckLists";

export function selfCheckFor(engine, caseStandard) {
  if (engine === "fact_check_desk") {
    return getSignalCheckPublicCase(caseStandard)?.selfCheckQuestions || [];
  }
  if (engine === "mission_map") {
    return getMissionMapPublicCase(caseStandard)?.selfCheckQuestions || [];
  }
  if (engine === "simulation_lab") {
    return getSimulationLabPublicCase(caseStandard)?.selfCheckQuestions || [];
  }
  if (ACTIVITY_CHECKS[engine]) return ACTIVITY_CHECKS[engine];
  const entry = getPublicCase(caseStandard);
  return entry?.publicCase?.selfCheckQuestions || [];
}
