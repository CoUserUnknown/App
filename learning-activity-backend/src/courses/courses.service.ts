import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './courses.repository';
import { CourseResponseDto } from './dto/coursesResponse.dto';
@Injectable()
export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async getAll(): Promise<CourseResponseDto[]> {
    const courses = await this.repository.findAll();

    return courses.map(c => ({
      id: c.Id,
      name: c.coursename,
      durationHours: Number(c.duration),
      defaultDeliveryType: c.DeliveryType,
      productName: c.ProductName,
      technology: c.Tecnology,
    }));
  }

  async getById(id: string): Promise<CourseResponseDto> {
    const course = await this.repository.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      id: course.Id,
      name: course.coursename,
      durationHours: Number(course.duration),
      defaultDeliveryType: course.DeliveryType,
      productName: course.ProductName,
      technology: course.Tecnology,
    };
  }
}
