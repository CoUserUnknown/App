
import { Course } from '../domain/models/course';
import { DeliveryType } from '../domain/enums/deliveryType.enum';

/** Mirror of server-side DTO (keep in sync with backend) */
interface CourseResponseDto {
  id: string;
  name: string;
  durationHours: number;
  defaultDeliveryType: string | null; // DB column allows nulls
  productName: string;
  technology: string;
}

/** Normalize labels: trim, lowercase, collapse spaces, remove hyphens/pipes */
function normalizeLabel(raw: string): string {
  return raw
    .normalize('NFKC')
    .trim()
    .replace(/-/g, ' ')      // treat follow-up ~ follow up as identical
    .replace(/\|/g, ' ')     // defensive: remove pipes if they ever appear
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** Authoritative mapping: which DB labels are trainer-led */
const TRAINER_LED_KEYS = new Set<string>([
  'virtual session',
  'classroom training session',
  'follow up', // normalizeLabel converts "Follow-Up" -> "follow up"
]);

/** Map DB free-text deliveryType into your enum */
function mapDbDeliveryToEnum(raw: string | null | undefined): DeliveryType {
  if (!raw) return DeliveryType.SELF_GUIDED;
  const key = normalizeLabel(raw);
  return TRAINER_LED_KEYS.has(key)
    ? DeliveryType.TRAINER_LED
    : DeliveryType.SELF_GUIDED;
}

/** Convert server DTO to client Course model */
function mapDtoToCourse(dto: CourseResponseDto): Course {
  return {
    id: dto.id,
    name: dto.name,
    defaultDeliveryType: mapDbDeliveryToEnum(dto.defaultDeliveryType),
  };
}

function assertOk(res: Response, context: string) {
  if (!res.ok) {
    const err = new Error(`${context} (HTTP ${res.status})`);
    (err as any).status = res.status;
    throw err;
  }
}

class CourseService {
  /** GET /api/courses → Course[] */
  async list(): Promise<Course[]> {
    const res = await fetch('/api/courses', { method: 'GET' });
    assertOk(res, 'Failed to fetch courses');
    const data = (await res.json()) as CourseResponseDto[];
    return data.map(mapDtoToCourse);
  }

  /** GET /api/courses/:id → Course | undefined */
  async getById(id: string): Promise<Course | undefined> {
    const res = await fetch(`/api/courses/${encodeURIComponent(id)}`, { method: 'GET' });
    if (res.status === 404) return undefined;
    assertOk(res, 'Failed to fetch course by id');
    const dto = (await res.json()) as CourseResponseDto;
    return mapDtoToCourse(dto);
  }

  /**
   * Since the API doesn't expose a name query, do a client-side lookup.
   * If you add /api/courses?name= in the future, we can switch this to the server.
   */
  async getByName(name: string): Promise<Course | undefined> {
    const normalized = name.trim().toLowerCase();
    const list = await this.list();
    return list.find(c => c.name?.trim().toLowerCase() === normalized);
  }

  async resolveDeliveryType(courseId: string): Promise<Course['defaultDeliveryType']> {
    const course = await this.getById(courseId);
    if (!course) throw new Error('Course not found');
    return course.defaultDeliveryType;
  }

  /** Used by bulk import; no isActive logic */
  async validateCourse(name: string): Promise<{ course?: Course; error?: string }> {
    const course = await this.getByName(name);
    if (!course) return { error: `Course '${name}' does not exist` };
    return { course };
  }
}

export const courseService = new CourseService();
