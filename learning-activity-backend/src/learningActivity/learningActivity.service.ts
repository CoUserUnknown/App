import { Injectable } from '@nestjs/common';
import { LearningActivityRepository } from './learningActivity.repository';
import { CreateLearningActivityDto } from './dto/createLearningActivity.dto';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';
import { validateLearningActivity } from '../../../frontend/src/domain/validation/learningActivityImport.validator';

@Injectable()
export class LearningActivityService {
  constructor(
    private readonly repository: LearningActivityRepository
  ) {}

  async create(
    dto: CreateLearningActivityDto
  ): Promise<LearningActivityResponseDto> {
    /**
     * Step 1: Validate input
     */
    const fieldErrors = validateLearningActivity(dto);

    if (Object.keys(fieldErrors).length > 0) {
      throw {
        message: 'VALIDATION_FAILED',
        fieldErrors
      };
    }

    /**
     * Step 2: Persist
     */
    const entity = await this.repository.create(dto);

    /**
     * Step 3: Map to response
     */
    return LearningActivityResponseDto.fromEntity(entity);
  }

  async bulkImport(
    rows: CreateLearningActivityDto[]
  ): Promise<BulkImportResultDto> {
    const totalRows = rows.length;

    let inserted = 0;
    let blocked = 0;

    for (const row of rows) {
      const fieldErrors = validateLearningActivity(row);

      if (Object.keys(fieldErrors).length > 0) {
        blocked++;
        continue;
      }

      await this.repository.create(row);
      inserted++;
    }

    return {
      totalRows,
      inserted,
      blocked,
      warnings: 0
    };
  }

  async getAll(): Promise<LearningActivityResponseDto[]> {
    const entities = await this.repository.findAll();
    return entities.map(
      LearningActivityResponseDto.fromEntity
    );
  }
}
