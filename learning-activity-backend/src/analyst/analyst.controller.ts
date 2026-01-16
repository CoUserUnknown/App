import { Controller, Get } from '@nestjs/common';
import { AnalystService } from './analyst.service';
import { AnalystResponseDto } from './dto/analystResponse.dto';

@Controller('analysts')
export class AnalystController {
  constructor(private readonly service: AnalystService) {}

  @Get()
  async getAll(): Promise<AnalystResponseDto[]> {
    const analysts = await this.service.getAllActive();

    return analysts.map(a => ({
      id: a.Id,
      name: a.FullName,
      email: a.Email
    }));
  }
}
