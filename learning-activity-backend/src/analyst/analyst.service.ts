import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalystRepository } from './analyst.repository';

@Injectable()
export class AnalystService {
  constructor(private readonly repository: AnalystRepository) {}

  async getAllActive() {
    return this.repository.findAllActive();
  }

  async resolveByNameOrFail(name: string) {
    const analyst = await this.repository.findByName(name);

    if (!analyst) {
      throw new NotFoundException(
        `Analyst "${name}" not found or inactive`
      );
    }

    return analyst;
  }

  async resolveByName(name: string) {
    return this.repository.findByName(name);
  }
}
