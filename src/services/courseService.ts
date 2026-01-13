import { Course } from '../domain/models/course';
import { coursesMock } from '../mock/data/courses.mock';

class CourseService {
  async listActive(): Promise<Course[]> {
    return coursesMock.filter(c => c.isActive);
  }

  async getById(id: string): Promise<Course | undefined> {
    return coursesMock.find(c => c.id === id && c.isActive);
  }

  async getByName(name: string): Promise<Course | undefined> {
    return coursesMock.find(
      c => c.name.trim().toLowerCase() === name.trim().toLowerCase()
         && c.isActive
    );
  }

  /**
   * DELIVERY TYPE RESOLUTION (AUTHORITATIVE)
   */
  async resolveDeliveryType(courseId: string) {
    const course = await this.getById(courseId);

    if (!course) {
      throw new Error('Course not found or inactive');
    }

    return course.defaultDeliveryType;
  }

  /**
   * Used by bulk import
   */
  async validateCourse(name: string): Promise<{
    course?: Course;
    error?: string;
  }> {
    const course = await this.getByName(name);

    if (!course) {
      return { error: `Course '${name}' does not exist or is inactive` };
    }

    return { course };
  }
}

export const courseService = new CourseService();
