import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseResponseDto } from './dto/coursesResponse.dto';
@Controller('courses')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Get()
  getAll(): Promise<CourseResponseDto[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.service.getById(id);
  }
}
