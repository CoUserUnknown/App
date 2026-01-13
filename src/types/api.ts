export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface BulkImportResult {
  totalRows: number;
  inserted: number;
  blocked: number;
  warnings: number;
}
