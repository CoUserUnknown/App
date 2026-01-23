import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException
} from '@nestjs/common';
import { LearningActivityService } from './learningActivity.service';
import { CreateLearningActivityDto } from './dto/createLearningActivity.dto';
import { LearningActivityResponseDto } from './dto/responseLearningActivity.dto';
import { BulkImportResultDto } from '../bulkImport/dto/bulkImportResult.dto';
import { ValidationErrorResponse } from '../common/dto/validationError.dto';

@Controller('learning-activities')
export class LearningActivityController {
  constructor(
    private readonly service: LearningActivityService
  ) {}

  @Post()
  async create(
    @Body() dto: CreateLearningActivityDto
  ): Promise<LearningActivityResponseDto> {
    try {
      return await this.service.create(dto);
    } catch (error: any) {
      /**
       * Standardized validation error handling
       */
      if (
        error?.message === 'VALIDATION_FAILED' &&
        error?.fieldErrors
      ) {
        const payload: ValidationErrorResponse = {
          message: 'VALIDATION_FAILED',
          fieldErrors: error.fieldErrors
        };

        throw new BadRequestException(payload);
      }

      throw error;
    }
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
