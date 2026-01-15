export interface ImportedActivityRow {
  rowNumber: number;
  analystName: string;
  courseName: string;
  activityDate: string;
  durationHours: number;
  trainerName?: string;
  errors: string[];
  warnings: string[];
}
