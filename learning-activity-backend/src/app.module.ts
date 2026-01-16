import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AnalystModule } from './analyst/analyst.module';
import { CourseModule } from './courses/course.module';
import { TrainerModule } from './trainer/trainer.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }),
    AnalystModule, CourseModule, TrainerModule
  ]  
})
export class AppModule {}