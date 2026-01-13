import { Analyst } from '../domain/models/analyst';
import { Trainer } from '../domain/models/trainer';
import { Course } from '../domain/models/course';
import { LearningActivity } from '../domain/models/learningActivity';
import { RemovedAlert } from '../domain/models/removedAlert';
import { removedAlertService } from './removedAlertService';


export const mockDb = {
  analysts: [] as Analyst[],
  trainers: [] as Trainer[],
  courses: [] as Course[],
  learningActivities: [] as LearningActivity[],
  removedAlerts: [] as RemovedAlert[],
};
