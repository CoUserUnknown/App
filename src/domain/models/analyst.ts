export interface Analyst {
  id: string;
  fullName: string;
  email: string;
  team?: string;
  wave?: string;
  role?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}
