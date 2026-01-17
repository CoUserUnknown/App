import { Module } from '@nestjs/common';
import { LearningActivityController } from './learningActivity.controller';
import { LearningActivityService } from './learningActivity.service';
import { LearningActivityRepository } from './learningActivity.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LearningActivityController],
  providers: [LearningActivityService, LearningActivityRepository],
  exports: [LearningActivityService]
})
export class LearningActivityModule {}
