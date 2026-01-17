export class LearningActivityResponseDto {
  readonly id!: string;
  readonly analystId!: string;
  readonly courseId!: string;
  readonly trainerId?: string;
  readonly deliveryType!: string;
  readonly activityDate!: string;
  readonly durationHours!: number;
  readonly createdAt!: string;

  static fromEntity(entity: any): LearningActivityResponseDto {
    return {
      id: entity.Id,
      analystId: entity.AnalystId,
      courseId: entity.CourseId,
      trainerId: entity.TrainerId ?? undefined,
      deliveryType: entity.DeliveryType,
      activityDate: entity.ActivityDate.toISOString().split('T')[0],
      durationHours: Number(entity.DurationHours),
      createdAt: entity.CreatedAt.toISOString()
    };
  }
}
