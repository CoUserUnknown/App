import { CsvLearningActivityRow } from '../../utils/csvParser';

export interface NormalizedLearningActivityInput {
  analystName: string;
  analystEmail: string;
  courseName: string;
  trainerName?: string;
  activityDate: string;
  durationHours: string;
}

export function normalizeLearningActivity(
  row: CsvLearningActivityRow
): NormalizedLearningActivityInput {
  return {
        analystName: row.analystName?.trim() ?? '',
    analystEmail: row.analystEmail?.trim().toLowerCase() ?? '',
    courseName: row.courseName?.trim() ?? '',
    activityDate: normalizeDate(row.activityDate),
    durationHours:
      row.durationHours !== undefined && row.durationHours !== null
        ? String(row.durationHours)
        : '',
    trainerName: row.trainerName?.trim() || undefined
  };
}


function normalizeDate(value: string | undefined): string {
  if (!value) return '';

  const trimmed = value.trim();
  if (!trimmed) return '';

  // Accept separators "/" or "-"
  const sep = trimmed.includes('/') ? '/' : (trimmed.includes('-') ? '-' : null);
  if (!sep) return '';

  const parts = trimmed.split(sep);
  if (parts.length !== 3) return '';

  // Zero-pad helper
  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  // Try a few patterns: DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD (and "-")
  const tryBuild = (d: number, m: number, y: number) => {
    // Basic sanity checks
    if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) return '';
    if (y < 1000 || y > 9999) return '';
    if (m < 1 || m > 12) return '';
    if (d < 1 || d > daysInMonth(y, m)) return '';
    return `${pad2(d)}/${pad2(m)}/${y}`;
  };

  // Convert parts to numbers
  const [p1, p2, p3] = parts.map((p) => Number(p));
  if ([p1, p2, p3].some((n) => Number.isNaN(n))) return '';

  // Pattern 1: YYYY/MM/DD
  if (parts[0].length === 4) {
    const y = p1, m = p2, d = p3;
    const res = tryBuild(d, m, y);
    if (res) return res;
  }

  // Pattern 2: DD/MM/YYYY (unambiguous if last part is 4-digit year)
  if (parts[2].length === 4) {
    // We must still disambiguate DD/MM/YYYY vs MM/DD/YYYY.
    // Heuristic: if p1 > 12, it must be DD/MM/YYYY. If p2 > 12, it must be MM/DD/YYYY.
    // If both <= 12, prefer DD/MM/YYYY only if it results in a valid date (same for MM/DD/YYYY).
    const y = p3;

    // First try DD/MM/YYYY
    let res = tryBuild(p1, p2, y);
    if (res) return res;

    // Then try MM/DD/YYYY
    res = tryBuild(p2, p1, y);
    if (res) return res;
  }

  // If we got here, it might still be MM/DD/YYYY with 2-digit year (not supported) or invalid
  return '';

  // --- helpers ---
  function daysInMonth(year: number, month: number): number {
    // month is 1-based
    if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(month)) return 30;
    return 31;
  }
  function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}


export type LearningActivityFieldErrors =
  Partial<Record<keyof NormalizedLearningActivityInput, string>>;

  /**
 * Validation result contract
 */
export interface LearningActivityValidationResult {
  valid: boolean;
  errors: string[];
  fieldErrors: LearningActivityFieldErrors;
}