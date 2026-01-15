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
  // Accept YYYY-MM-DD or DD/MM/YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [d, m, y] = value.split('/');
    return `${y}-${m}-${d}`;
  }

  return '';
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