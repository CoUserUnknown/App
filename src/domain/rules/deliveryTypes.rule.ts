import { Course } from '../models/course';
import { DeliveryType } from '../enums/deliveryType.enum';

export function resolveDeliveryTypeFromCourse(course: Course): DeliveryType {
  return course.defaultDeliveryType;
}
