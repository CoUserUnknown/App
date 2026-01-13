import { NormalizedLearningActivityInput } from '../types/normalizedLearningActivity';
import { LearningActivityFieldErrors } from '../types/normalizedLearningActivity';


export type FieldErrors = Partial<
  Record<keyof NormalizedLearningActivityInput, string>
>;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
export function validateLearningActivity(
  value: NormalizedLearningActivityInput
): LearningActivityFieldErrors {
  const errors: LearningActivityFieldErrors = {};

  if (!value.analystName) {
    errors.analystName = 'Analyst name is required';
  }

  if (!value.analystEmail) {
    errors.analystEmail = 'Analyst email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.analystEmail)) {
    errors.analystEmail = 'Invalid email format';
  }

  if (!value.courseName) {
    errors.courseName = 'Course name is required';
  }

  if (!value.activityDate) {
    errors.activityDate = 'Activity date is required';
  }

  if (!value.durationHours) {
    errors.durationHours = 'Duration is required';
  } else if (Number(value.durationHours) <= 0) {
    errors.durationHours = 'Duration must be greater than zero';
  }

  return errors;
}
