import Papa from 'papaparse';

export interface CsvLearningActivityRow {
  analystName: string;
  analystEmail: string;
  courseName: string;
  activityDate: string;
  durationHours: string;
  trainerName?: string;
}

export function parseCsvFile(
  file: File
): Promise<CsvLearningActivityRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      transformHeader: (header: string) =>
        header.trim().toLowerCase().replace(/\s+/g, ''),

      complete: (results: { data: unknown[]; errors: unknown[] }) => {
        console.log('CSV parsing completed:', results);
        if (results.errors.length > 0) {
          reject(results.errors);
          return;
        }

        const rows = results.data as Record<string, string>[];

        resolve(
          rows.map((row: Record<string, string>) => ({
            analystName: row.analystname ?? '',
            analystEmail: row.participant ?? '',
            courseName: row.trainingcourse ?? '',
            activityDate: row.completiondate ?? '',
            durationHours: row.totalhours ? row.totalhours : '0',
            trainerName: row.trainer || undefined
          }))
        );
      },

      error: (error: unknown) => {
        console.error('CSV parse error', error);
        reject(error);
      }
    });
  });
}
