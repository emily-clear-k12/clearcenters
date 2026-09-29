// How a class turns Got it / Almost / Not yet into gradebook numbers.
// The mark on the work stays 2, 1, or 0. Only the book and the export change.

export const GRADEBOOK_SCALES = [
  { id: "points", label: "Points", got: 2, almost: 1, notyet: 0 },
  { id: "percent", label: "Percent", got: 100, almost: 75, notyet: 50 },
  { id: "four", label: "4-point", got: 4, almost: 2, notyet: 1 },
  { id: "custom", label: "Custom", got: 2, almost: 1, notyet: 0 },
];

function asNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function scaleNumbers(row) {
  const id = row?.gradebook_scale || "points";
  const preset = GRADEBOOK_SCALES.find((item) => item.id === id) || GRADEBOOK_SCALES[0];
  if (id === "custom") {
    return {
      got: asNumber(row?.gradebook_got, 2),
      almost: asNumber(row?.gradebook_almost, 1),
      notyet: asNumber(row?.gradebook_notyet, 0),
    };
  }
  return { got: preset.got, almost: preset.almost, notyet: preset.notyet };
}

export function gradebookValue(teacherGrade, numbers) {
  if (teacherGrade == null || teacherGrade === "") return "";
  const mark = Number(teacherGrade);
  if (mark === 2) return numbers.got;
  if (mark === 1) return numbers.almost;
  if (mark === 0) return numbers.notyet;
  return "";
}

export function gradebookAverage(values) {
  const nums = values.filter((value) => value !== "" && value != null).map(Number);
  if (!nums.length) return "";
  const average = nums.reduce((sum, value) => sum + value, 0) / nums.length;
  return Number.isInteger(average) ? String(average) : average.toFixed(1);
}
