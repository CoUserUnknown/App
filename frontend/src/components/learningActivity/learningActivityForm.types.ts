import { DeliveryType } from '../../domain/enums/deliveryType.enum';
import { NormalizedLearningActivityInput } from '../../domain/types/normalizedLearningActivity';

export type Analyst = {
  id: string;
  name?: string;
  fullName?: string;
};

export type Trainer = {
  id: string;
  name?: string;
  fullName?: string;
};

export type Course = {
  id: string;
  name: string;
  defaultDeliveryType: DeliveryType;
};

export type LearningActivityFormProps = {
  value: NormalizedLearningActivityInput;
  errors: string[];
  analysts: Analyst[];
  courses: Course[];
  trainers: Trainer[];
  onChange: <K extends keyof NormalizedLearningActivityInput>(
    key: K,
    value: NormalizedLearningActivityInput[K]
  ) => void;
};
