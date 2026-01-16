import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.coursesList.findMany({
      orderBy: {
        coursename: 'asc',
      },
    });
  }

  findById(id: string) {
    return this.prisma.coursesList.findUnique({
      where: { Id: id },
    });
  }

  findByName(name: string) {
    return this.prisma.coursesList.findFirst({
      where: {
        coursename: name,
      },
    });
  }
}
