import { Controller, Get } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerResponseDto } from './dto/trainerResponse.dto';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly service: TrainerService) {}

  @Get()
  async getAll(): Promise<TrainerResponseDto[]> {
    return this.service.getAll();
  }
}
