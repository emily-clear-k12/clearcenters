// SERVER ONLY - Weigh-In rubric for 3.7A-SC-WI.

export const SERVER_CASE = {
  standard: "3.7A-SC-WI",
  title: 'Filter Fall Weigh-In',
  caseShape: "weigh_in",
  stemMode: "dropdown",
  correctSideId: "B",
  rulingMustInclude: [
    'gravity',
    'air',
    'shape',
  ],
  modelAnswer:
    'Side B - gravity still pulls. Filter always lands; crumpled falls faster. Shape/air resistance changed the time, not gravity skipping.',
};
