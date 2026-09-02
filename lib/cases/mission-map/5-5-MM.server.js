// Mission Map — "Rights Case File" — SERVER ONLY.
// Never import this from a client component. See 5-5-MM.public.js for the
// TEKS 5.19A alignment.

export const SERVER_CASE = {
  standard: "5.5-MM",
  title: "Rights Case File",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The petition case passes the Two-Question Test because a government official (a city official) is the one acting, and a specific right — assembly and petition — is clearly affected by blocking the group's peaceful gathering. The remote-control dispute does not pass the test because no government official or government action is involved at all; it's just a disagreement between siblings, so even though it might feel unfair, it isn't a Bill of Rights case. The specific right involved in the real case is the right to assembly and petition, which protects people's ability to gather peacefully and petition the government.",

  mustInclude: [
    "Applies the Two-Question Test to the petition case (government action + specific right = a real case)",
    "Applies the Two-Question Test to the remote-control dispute (no government action = not a rights case)",
    "Names the specific right involved in the petition case (assembly and/or petition)",
  ],
};
