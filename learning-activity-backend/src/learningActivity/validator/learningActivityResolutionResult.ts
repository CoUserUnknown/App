import { CreateLearningActivityDto } from '../dto/createLearningActivity.dto';

export type LearningActivityFieldErrors = Partial<
  Record<
    | 'analystEmail'
    | 'analystName'
    | 'courseName'
    | 'trainerName'
    | 'activityDate'
    | 'durationHours',
    string
  >
>;

export interface LearningActivityResolutionResult {
  dto?: CreateLearningActivityDto;
  fieldErrors?: LearningActivityFieldErrors;
}
