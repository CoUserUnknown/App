import { Injectable } from '@nestjs/common';
import { LearningActivityRepository } from './learningActivity.repository';
import { CreateLearningActivityDto } from './dto/createLearningActivity.dto';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';

@Injectable()
export class LearningActivityService {
  constructor(private readonly repository: LearningActivityRepository) {}

  async create(
    dto: CreateLearningActivityDto
  ): Promise<LearningActivityResponseDto> {
    const entity = await this.repository.create(dto);
    return LearningActivityResponseDto.fromEntity(entity);
  }

  async bulkImport(
    rows: CreateLearningActivityDto[]
  ): Promise<BulkImportResultDto> {
    const totalRows = rows.length;

    const result = await this.repository.bulkCreate(rows);

    return {
      totalRows,
      inserted: result.count,
      blocked: 0,
      warnings: 0
    };
  }

  async getAll(): Promise<LearningActivityResponseDto[]> {
    const entities = await this.repository.findAll();
    return entities.map(LearningActivityResponseDto.fromEntity);
  }
}
