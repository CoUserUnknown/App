import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLearningActivityDto } from './dto/createLearningActivity.dto';

@Injectable()
export class LearningActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLearningActivityDto) {
    return this.prisma.learningActivities.create({
      data: {
        Id: crypto.randomUUID(),
        AnalystId: data.analystId,
        CourseId: data.courseId,
        TrainerId: data.trainerId ?? null,
        DeliveryType: data.deliveryType,
        ActivityDate: new Date(data.activityDate),
        DurationHours: data.durationHours
      }
    });
  }

  bulkCreate(rows: CreateLearningActivityDto[]) {
    return this.prisma.learningActivities.createMany({
      data: rows.map(r => ({
        Id: crypto.randomUUID(),
        AnalystId: r.analystId,
        CourseId: r.courseId,
        TrainerId: r.trainerId ?? null,
        DeliveryType: r.deliveryType,
        ActivityDate: new Date(r.activityDate),
        DurationHours: r.durationHours
      }))
    });
  }

  findAll() {
    return this.prisma.learningActivities.findMany({
      where: { IsDeleted: false },
      orderBy: { CreatedAt: 'desc' }
    });
  }
}
