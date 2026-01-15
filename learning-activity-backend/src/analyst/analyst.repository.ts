import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { analystsRecords } from '../../generated/prisma/client';


@Injectable()
export class AnalystRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllActive(): Promise<analystsRecords[]> {
    return this.prisma.analystsRecords.findMany({
      where: {
        IsActive: true
      },
      orderBy: {
        FullName: 'asc'
      }
    });
  }

  async findByName(name: string): Promise<analystsRecords | null> {
    return this.prisma.analystsRecords.findFirst({
      where: {
        FullName: {
          equals: name,
        },
        IsActive: true,
        }
    });
  }

  async findByEmail(Email: string): Promise<analystsRecords | null> {
    return this.prisma.analystsRecords.findUnique({
      where: { Email }
    });
  }
}
