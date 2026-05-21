/** Earliest allowed project date (inclusive). */
export const PROJECT_MIN_DATE = "2000-01-01";

const DATE_INPUT_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Today in local time as `YYYY-MM-DD` for `<input type="date">` max values. */
export function getProjectMaxDate(referenceDate = new Date()): string {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, "0");
  const day = String(referenceDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isProjectDateInput(value: string): boolean {
  if (!DATE_INPUT_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}
