import { Module } from '@nestjs/common';
import { LearningActivityController } from './learningActivity.controller';
import { LearningActivityService } from './learningActivity.service';
import { LearningActivityRepository } from './learningActivity.repository';
import { LearningActivityResolver } from './validator/learningActivity.resolver';
import { AnalystModule } from '../analyst/analyst.module';
import { CourseModule } from '../courses/courses.module';
import { TrainerModule } from '../trainer/trainer.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AnalystModule, CourseModule, TrainerModule],
  controllers: [LearningActivityController],
  providers: [LearningActivityService, LearningActivityRepository, LearningActivityResolver],
  exports: [LearningActivityService]
})
export class LearningActivityModule {}
