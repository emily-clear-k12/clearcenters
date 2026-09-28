# Expedition Station — Whole-Number Math Visuals

Added Sept 27, 2026. Code: `app/activity/[assignmentId]/ExpeditionVisuals.js` (drawn by the student screen), styles in `expedition-station.css`.

Any task, or any part of a `parts` task, can carry a `visual` (debate and sort tasks show it too). Visuals never hold answers; the answer still lives in `answer`. Interactive visuals fill in the student's answer as they work, and the student can also type it.

| `visual.type` | What the student sees | Interactive? | Pair with answer kind | Good for |
| --- | --- | --- | --- | --- |
| `blocks` | Base-ten blocks: thousands cubes, hundreds flats, tens rods, ones cubes | `mode: "build"` (default): steppers per place build the number · `mode: "show"`: fixed `counts` | `number` | 3.2A, 3.2B, 4.2B, regrouping |
| `array` | Rows × columns of dots (or `style: "tiles"` for square units) | build: tap a cell to set rows × columns (a model; the student still types the answer) · `mode: "show"`: fixed `rows`, `cols`; `perimeter: true` outlines the edge; `sideLabels: { top, left }` | `number` | 3.4D–3.4K, 3.6C–3.6E area, 3.7B perimeter, 4.5D |
| `bars` | Bar graph, vertical or `orientation: "horizontal"`, with a scale (`step`, `max`, `axis`) | show only | `number`, `choice` | 3.8A/B, 4.9A/B, 5.9A–C |
| `pictograph` | Picture graph with a key (`icon`, `per`, `unit`); half icons for half values | show only | `number`, `choice` | 3.8A/B |
| `dotplot` | Dot plot / line plot (`values`, `min`, `max`, `labels`, `axis`) | show only | `number`, `choice` | 4.9A, 5.9A |
| `numline` | Whole-number line from `min` to `max` by `step`, optional gold `marks` | `pick: true`: tap a tick to answer | `number` | rounding, comparing, 3.2C/D, 4.2C/D, elapsed time |
| `money` | Coins and bills (`kinds` from p, n, d, q, b1, b5, b10, b20) | build (default): tap to add, tap in the tray to remove; value is dollars (3.45) · `mode: "show"`: fixed `show` list | `number` (dollars) | 3.4C, 4.10, 5.10 |
| `angle` | Two-scale protractor (outer scale starts at 0 on the left, inner at 0 on the right) with an angle drawn (`degrees`, `from: "right"` or `"left"`) | show only | `number` (degrees) | 4.7C/D/E |
| `coords` | First-quadrant grid (`max`, labelled `points`) | `pick: true`: tap an intersection | `point` `{ x, y }` | 5.8A–C |

## Answer kind `point`

`answer: { kind: "point", x: 3, y: 5 }` · body `{ point: { x, y } }` · wrong entries `{ point: { x: 5, y: 3 }, hint: "..." }` (for example, the switched-order mistake).

## Examples

```js
// Build a number with base-ten blocks
{ question: "Build 346 with the crystal bundles.", visual: { type: "blocks", places: ["hundreds", "tens", "ones"], title: "Crystal bundles" }, answer: { kind: "number", value: 346 } }

// Area with square tiles and side labels
{ question: "What is the area of the greenhouse floor?", unit: "square meters",
  visual: { type: "array", mode: "show", style: "tiles", rows: 5, cols: 7, sideLabels: { top: "7 m", left: "5 m" } },
  answer: { kind: "number", value: 35 } }

// Bar graph read in one part, then a choice
parts: [{ prompt: "How many more jaguars than sloths?", visual: { type: "bars", categories: [{ label: "Jaguars", value: 30 }, { label: "Sloths", value: 12 }], step: 6, axis: "Number seen" } }, ...]

// Pay an exact amount
{ question: "Pay exactly $3.45.", unit: "dollars", visual: { type: "money", kinds: ["b1", "q", "d", "n", "p"] }, answer: { kind: "number", value: 3.45 } }

// Plot a point
{ question: "Drop the probe at (3, 5).", visual: { type: "coords", max: 8, pick: true, points: [{ x: 6, y: 2, label: "Base" }] },
  answer: { kind: "point", x: 3, y: 5 }, wrong: [{ point: { x: 5, y: 3 }, hint: "Go across first (x), then up (y)." }] }
```

## Testing

The playthrough test drives the blocks steppers, the number-line ticks, the money tray, and the coordinate grid the way a student would, so a visual that can't produce the right answer fails the check.
