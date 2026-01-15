import { Module } from '@nestjs/common';
import { AnalystController } from './analyst.controller';
import { AnalystService } from './analyst.service';
import { AnalystRepository } from './analyst.repository';

@Module({
  controllers: [AnalystController],
  providers: [AnalystService, AnalystRepository],
  exports: [AnalystService]
})
export class AnalystModule {}
