// Maker Studio halls — skins + spot skeletons (data only).
// Wave-1: three starter halls. Spots auto-spread for wallSize 4/5/6.

function spread(n) {
  const spots = [];
  for (let i = 0; i < n; i += 1) {
    const x = 12 + (i * (76 / Math.max(n - 1, 1)));
    spots.push({ id: "s" + (i + 1), x: Math.round(x), y: 58, label: "Spot " + (i + 1) });
  }
  return spots;
}

export const HALLS = [
  {
    id: "station",
    name: "Space Station Gallery",
    tag: "ClearCenters theme",
    image: "/maker/hall.jpg",
    wallColors: ["#f4f1fb", "#e8f4fb", "#fff4e6"],
  },
  {
    id: "stone",
    name: "Grand Stone Museum",
    tag: "Columns and marble",
    image: "/maker/hall.jpg",
    wallColors: ["#f7f2ea", "#ebe4d8", "#e8eef5"],
  },
  {
    id: "nature",
    name: "Nature Dome",
    tag: "Glass and plants",
    image: "/maker/sand.jpg",
    wallColors: ["#eef8ef", "#f4faf0", "#e8f4fb"],
  },
];

export function spotsForWallSize(wallSize) {
  const n = Number(wallSize) || 4;
  return spread(Math.min(Math.max(n, 4), 6));
}

export function publicHalls() {
  return HALLS.map(({ id, name, tag, image, wallColors }) => ({ id, name, tag, image, wallColors }));
}
