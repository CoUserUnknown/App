import { Module } from '@nestjs/common';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { CourseRepository } from './courses.repository';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
