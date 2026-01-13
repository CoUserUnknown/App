import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import "dotenv/config";
import { PrismaMssql } from '@prisma/adapter-mssql';

const env = process.env.DATABASE_URL as string;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit
{
  constructor() {
    const adapter = new PrismaMssql(env)
          super({ adapter });
    }
   async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Enables graceful shutdown
   */
  async enableShutdownHooks(app: INestApplication) {
    process.on('SIGTERM', async () => {
      await app.close();
    });

    process.on('SIGINT', async () => {
      await app.close();
    });
  }
}
