# Simulation Lab

Student UI: `app/activity/[assignmentId]/SimulationLabClient.js` is a thin
wrapper around `components/simulation-lab/SimLabStudio.js`, the animated scene
design. **That design is canonical for every case. Do not restore the old form
layout** (`ClearCenters_STATE.md` §9 rule 22). `components/simulation-lab/README.md`
explains how to add a scene.

`dev/` is a local-only harness (`/simulation-lab/dev?case=3.8B-SL&fresh=1`),
which returns 404 in production.

Shared art: `public/simulation-lab/console.jpg` and `background.jpg`.
