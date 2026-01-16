import { Injectable } from '@nestjs/common';
import { TrainerRepository } from './trainer.repository';
import { TrainerResponseDto } from './dto/trainerResponse.dto';

@Injectable()
export class TrainerService {
  constructor(private readonly repository: TrainerRepository) {}

  async getAll(): Promise<TrainerResponseDto[]> {
    const trainers = await this.repository.findAllActive();
    return trainers.map(TrainerResponseDto.fromEntity);
  }

  async getByName(name: string) {
    return this.repository.findByName(name);
  }
}
