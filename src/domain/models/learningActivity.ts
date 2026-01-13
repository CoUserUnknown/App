import { DeliveryType } from '../enums/deliveryType.enum';

export interface LearningActivity {
  id: string;
  analystId: string;
  courseId: string;
  trainerId?: string;
  deliveryType: DeliveryType;
  activityDate: string;        // YYYY-MM-DD
  durationHours: number;
  isDeleted: boolean;
  createdAt: string;
}

