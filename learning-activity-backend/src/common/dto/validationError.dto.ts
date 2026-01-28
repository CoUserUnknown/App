export interface ValidationErrorResponse {
  message: 'VALIDATION_FAILED';
  fieldErrors: Record<string, string>;
}

export class ValidationErrorDto {
  fieldErrors: Record<string, string> | undefined;
}
