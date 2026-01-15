import { CsvLearningActivityRow } from '../utils/csvParser';
import { NormalizedLearningActivityInput } from '../domain/types/normalizedLearningActivity';

export function rejectedRowToFormInput(
  row: CsvLearningActivityRow
): Partial<NormalizedLearningActivityInput> {
  return {
    analystName: row.analystName,
    analystEmail: row.analystEmail,
    courseName: row.courseName,
    trainerName: row.trainerName,
    activityDate: row.activityDate,
    durationHours: String(row.durationHours)
  };
}
