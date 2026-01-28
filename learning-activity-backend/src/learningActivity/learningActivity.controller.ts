import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { LearningActivityService } from './learningActivity.service';
import { NormalizedLearningActivityInput } from '../../../frontend/src/domain/types/normalizedLearningActivity';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';
import { ValidationErrorDto } from '../common/dto/validationError.dto';

@Controller('learning-activities')
export class LearningActivityController {
  constructor(
    private readonly service: LearningActivityService
  ) {}

  @Post()
  async create(
    @Body() input: NormalizedLearningActivityInput
  ): Promise<LearningActivityResponseDto> {
    const result =
      await this.service.createFromNormalized(input);

    if ('fieldErrors' in result) {
      throw new HttpException(
        result as ValidationErrorDto,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    return result;
  }

  @Post('bulk')
  async bulkImport(
    @Body() rows: NormalizedLearningActivityInput[]
  ): Promise<BulkImportResultDto> {
    return this.service.bulkImport(rows);
  }

  @Get()
  getAll(): Promise<LearningActivityResponseDto[]> {
    return this.service.getAll();
  }
}
