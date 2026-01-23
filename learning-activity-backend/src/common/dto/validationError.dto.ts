export interface ValidationErrorResponse {
  message: 'VALIDATION_FAILED';
  fieldErrors: Record<string, string>;
}

