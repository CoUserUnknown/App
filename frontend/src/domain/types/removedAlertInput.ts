import { CsvLearningActivityRow } from '../../utils/csvParser';
import { NormalizedLearningActivityInput, LearningActivityFieldErrors } from './normalizedLearningActivity';

export interface RemovedAlertInput {
  /**
   * Original CSV row that was rejected.
   * Preserved for debugging, auditing, and traceability.
   */
  rowSnapshot: CsvLearningActivityRow;

  /**
   * Normalized version of the CSV row.
   * This is what feeds the manual correction form.
   */
  normalizedSnapshot: NormalizedLearningActivityInput;

  /**
   * Field-level validation errors produced during import.
   * Keys match NormalizedLearningActivityInput fields.
   */
  fieldErrors: LearningActivityFieldErrors;

  /**
   * Optional reference to a learning activity if the alert
   * was generated after partial creation.
   * For CSV imports this is usually synthetic.
   */
  learningActivityId: string;

  /**
   * High-level reason for rejection (summary).
   * Detailed issues live in `fieldErrors`.
   */
  reason: string;

  /**
   * Origin of the removal.
   */
  source: 'CSV_IMPORT';
}
