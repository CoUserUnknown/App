import { Injectable } from '@nestjs/common';
import { LearningActivityResolutionResult } from './learningActivityResolutionResult';
import { NormalizedLearningActivityInput } from '../../../../frontend/src/domain/types/normalizedLearningActivity';
import { AnalystRepository } from '../../analyst/analyst.repository';
import { CourseRepository } from '../../courses/courses.repository';
import { TrainerRepository } from '../../trainer/trainer.repository';

@Injectable()
export class LearningActivityResolver {
  constructor(
    private readonly analystRepo: AnalystRepository,
    private readonly courseRepo: CourseRepository,
    private readonly trainerRepo: TrainerRepository
  ) {}

  async resolve(
    input: NormalizedLearningActivityInput
  ): Promise<LearningActivityResolutionResult> {
    const errors: LearningActivityResolutionResult['fieldErrors'] = {};

    /* ---------- Analyst ---------- */
    const analyst = await this.analystRepo.findByEmail(
      input.analystEmail
    );

    if (!analyst) {
      errors.analystEmail =
        'Analyst not found or inactive';
    }

    /* ---------- Course ---------- */
    const course = await this.courseRepo.findByName(
      input.courseName
    );

    if (!course) {
      errors.courseName =
        'Course not found or inactive';
    }

    /* ---------- Trainer (optional) ---------- */
    let trainerId: string | undefined;

    if (input.trainerName) {
      const trainer =
        await this.trainerRepo.findByName(
          input.trainerName
        );

      if (!trainer) {
        errors.trainerName =
          'Trainer not found or inactive';
      } else {
        trainerId = trainer.Id;
      }
    }

    /* ---------- Short-circuit if errors ---------- */
    if (Object.keys(errors).length > 0) {
      return { fieldErrors: errors };
    }

    /* ---------- Build persistence DTO ---------- */
    return {
      dto: {
        analystId: analyst!.Id,
        courseId: course!.Id,
        trainerId,
        deliveryType: course!.DeliveryType,
        activityDate: input.activityDate,
        durationHours: Number(input.durationHours)
      }
    };
  }
}
