export type TrainerType = 'INTERNAL' | 'EXTERNAL';

export interface Trainer {
  id: string;
  fullName: string;
  trainerType: TrainerType;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  email: string;
}
