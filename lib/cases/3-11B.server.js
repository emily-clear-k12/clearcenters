// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.11B).

export const SERVER_CASE = {
  standard: "3.11B",
  title: "The Barrel Was Full in April",
  bigQuestion: "The barrel is down to 90 litres and no rain is coming for three weeks. What happens if nothing changes?",
  evidenceBank: [
    "The barrel was 400 litres in April and is 90 litres now",
    "That is about 60 litres used every week",
    "The barrel only fills when it rains on the roof",
    "There is no rain forecast for three weeks",
    "Class 3B measured out 6 litres a day and their beds are fine"
  ],
  trapLine: "It's a barrel, it fills back up. There's loads.",
  castNames: {
    reese: "Reese",
    barrel: "The Rain Barrel",
    chart: "The Lid Marks",
    bed: "The Sunflower Bed",
    hana: "Hana"
  },
  distractors: "Thinking a resource refills automatically whenever it is needed; assuming a supply that has never run out cannot run out; not connecting the rate of use to how long a supply will last; thinking conserving means going without rather than making a supply last.",
  mustInclude: [
    "The chat uses the level chart.",
    "It says how the barrel refills.",
    "It uses the forecast.",
    "It says what happens if nothing changes.",
    "It tells Hana why the rota should change."
  ],
};
