import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerRepository } from './trainer.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository],
  exports: [TrainerService]
})
export class TrainerModule {}
