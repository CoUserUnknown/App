export interface BulkImportResult {
  totalRows: number;
  inserted: number;
  blocked: number;
  warnings: number;
}
