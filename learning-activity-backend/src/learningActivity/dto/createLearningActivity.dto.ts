import { IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateLearningActivityDto {
  @IsString()
  analystId!: string;

  @IsString()
  courseId!: string;

  @IsOptional()
  @IsString()
  trainerId?: string;

  @IsString()
  deliveryType!: string;

  @IsDateString()
  activityDate!: string;

  @IsNumber()
  durationHours!: number;
}
