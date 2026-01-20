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

  const rawParts = trimmed.split(sep);
  if (!hasThreeParts(rawParts)) return ''; // <- tuple guard

  // Now parts is a [string, string, string] tuple
  const [s1, s2, s3] = rawParts;

  // Convert parts to numbers (safe: s1/s2/s3 are guaranteed strings)
  const p1 = Number(s1);
  const p2 = Number(s2);
  const p3 = Number(s3);
  if ([p1, p2, p3].some((n) => Number.isNaN(n))) return '';

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

  // Pattern 1: YYYY/MM/DD (unambiguous if first token is 4-digit year)
  if (s1.length === 4) {
    const y = p1, m = p2, d = p3;
    const res = tryBuild(d, m, y);
    if (res) return res;
  }

  // Pattern 2: DD/MM/YYYY or MM/DD/YYYY (unambiguous if last token is 4-digit year)
  if (s3.length === 4) {
    const y = p3;

    // First try DD/MM/YYYY
    let res = tryBuild(p1, p2, y);
    if (res) return res;

    // Then try MM/DD/YYYY
    res = tryBuild(p2, p1, y);
    if (res) return res;
  }

  // If we got here, it might be unsupported (e.g., 2-digit year) or invalid
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

/** Type guard: turns string[] into [string, string, string] when length is 3 */
function hasThreeParts(a: string[]): a is [string, string, string] {
  return a.length === 3;
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