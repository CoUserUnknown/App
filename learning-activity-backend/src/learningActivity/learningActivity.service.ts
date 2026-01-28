import { Injectable } from '@nestjs/common';
import { LearningActivityRepository } from './learningActivity.repository';
import { LearningActivityResolver } from './validator/learningActivity.resolver';
import { NormalizedLearningActivityInput } from '../../../frontend/src/domain/types/normalizedLearningActivity';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';

@Injectable()
export class LearningActivityService {
  constructor(
    private readonly repository: LearningActivityRepository,
    private readonly resolver: LearningActivityResolver
  ) {}

  async createFromNormalized(
    input: NormalizedLearningActivityInput
  ): Promise<
    | LearningActivityResponseDto
    | { fieldErrors: Record<string, string> }
  > {
    const resolution = await this.resolver.resolve(
      input
    );

    if (resolution.fieldErrors) {
      return { fieldErrors: resolution.fieldErrors };
    }

    const entity =
      await this.repository.create(
        resolution.dto!
      );

    return LearningActivityResponseDto.fromEntity(
      entity
    );
  }

  async bulkImport(
    inputs: NormalizedLearningActivityInput[]
  ): Promise<BulkImportResultDto> {
    let inserted = 0;
    let blocked = 0;

    for (const input of inputs) {
      const resolution =
        await this.resolver.resolve(input);

      if (resolution.fieldErrors) {
        blocked++;
        continue;
      }

      await this.repository.create(
        resolution.dto!
      );
      inserted++;
    }

    return {
      totalRows: inputs.length,
      inserted,
      blocked,
      warnings: 0
    };
  }

  async getAll(): Promise<LearningActivityResponseDto[]> {
    const entities = await this.repository.findAll();
    return entities.map(entity =>
      LearningActivityResponseDto.fromEntity(entity)
    );
  }
}
