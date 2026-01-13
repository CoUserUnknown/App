import { Analyst } from '../domain/models/analyst';
import { Course } from '../domain/models/course';
import { Trainer } from '../domain/models/trainer';
import { CsvLearningActivityRow } from '../utils/csvParser';
import {
  NormalizedLearningActivityInput,
  LearningActivityFieldErrors
} from '../domain/types/normalizedLearningActivity';
import { RemovedAlertInput } from '../domain/types/removedAlertInput';
import { validateLearningActivity } from '../domain/validation/learningActivityImport.validator';

interface NormalizeCsvParams {
  rows: CsvLearningActivityRow[];
  analysts: Analyst[];
  courses: Course[];
  trainers: Trainer[];
}

export function normalizeCsvLearningActivities({
  rows,
  analysts,
  courses,
  trainers
}: NormalizeCsvParams): {
  valid: NormalizedLearningActivityInput[];
  rejected: RemovedAlertInput[];
} {
  const valid: NormalizedLearningActivityInput[] = [];
  const rejected: RemovedAlertInput[] = [];

  for (const row of rows) {
    const analyst = analysts.find(
      a =>
        a.fullName.toLowerCase() === row.analystName.toLowerCase() ||
        a.email.toLowerCase() === row.analystEmail.toLowerCase()
    );

    const course = courses.find(
      c => c.name.toLowerCase() === row.courseName.toLowerCase()
    );

    const normalized: NormalizedLearningActivityInput = {
      analystName: row.analystName,
      analystEmail: row.analystEmail,
      courseName: row.courseName,
      trainerName: row.trainerName,
      activityDate: row.activityDate,
      durationHours: String(row.durationHours)
    };

    const fieldErrors: LearningActivityFieldErrors =
      validateLearningActivity(normalized);

    const isValid = Object.keys(fieldErrors).length === 0;

    if (!analyst || !course || !isValid) {
      rejected.push({
        learningActivityId: '',
        rowSnapshot: row,
        normalizedSnapshot: normalized,
        fieldErrors,
        reason: !analyst || !course
          ? 'Analyst or course not found'
          : 'Validation failed',
        source: 'CSV_IMPORT'
      });

      continue;
    }

    valid.push(normalized);
  }

  return { valid, rejected };
}
