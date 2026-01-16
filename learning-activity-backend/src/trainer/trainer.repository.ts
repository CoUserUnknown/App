import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllActive() {
    return this.prisma.trainersList.findMany({
      where: { IsActive: true },
      orderBy: { FullName: 'asc' }
    });
  }

  findByName(name: string) {
    return this.prisma.trainersList.findFirst({
      where: {
        IsActive: true,
        FullName: {
          contains: name
        }
      }
    });
  }

  findById(id: string) {
    return this.prisma.trainersList.findUnique({
      where: { Id: id }
    });
  }
}
