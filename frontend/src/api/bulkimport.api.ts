import { NormalizedLearningActivityInput } from '../domain/types/normalizedLearningActivity';
import { BulkImportResult } from '../domain/types/bulkImportResult';

const API_BASE_URL = '/api';

export interface BulkImportResponse {
  result: BulkImportResult;
  preview: NormalizedLearningActivityInput[];
}

export const bulkImportApi = {
  async import(
    rows: NormalizedLearningActivityInput[],
    dryRun: boolean
  ): Promise<BulkImportResponse> {
    /**
     * NOTE:
     * - dryRun is still sent for compatibility
     * - backend currently ignores it
     * - frontend preview logic remains unchanged
     */

    const response = await fetch(
      `${API_BASE_URL}/learning-activities/bulk`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rows)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Bulk import failed');
    }

    const result: BulkImportResult = await response.json();

    return {
      result,
      preview: rows
    };
  }
};
