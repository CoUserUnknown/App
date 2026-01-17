import { Body, Controller, Get, Post } from '@nestjs/common';
import { LearningActivityService } from './learningActivity.service';
import { CreateLearningActivityDto } from './dto/createLearningActivity.dto';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';

@Controller('learning-activities')
export class LearningActivityController {
  constructor(private readonly service: LearningActivityService) {}

  @Post()
  create(
    @Body() dto: CreateLearningActivityDto
  ): Promise<LearningActivityResponseDto> {
    return this.service.create(dto);
  }

  @Post('bulk')
  bulkImport(
    @Body() rows: CreateLearningActivityDto[]
  ): Promise<BulkImportResultDto> {
    return this.service.bulkImport(rows);
  }

  @Get()
  getAll(): Promise<LearningActivityResponseDto[]> {
    return this.service.getAll();
  }
}
