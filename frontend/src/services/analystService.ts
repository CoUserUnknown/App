import { Analyst } from '../domain/models/analyst';
import { mockDb } from './mockDb';

export const AnalystService = {
  getAll(): Analyst[] {
    return mockDb.analysts.filter(a => !a.isDeleted);
  },

  create(data: Omit<Analyst, 'id' | 'createdAt' | 'isDeleted'>): Analyst {
    const analyst: Analyst = {
      ...data,
      id: crypto.randomUUID(),
      isDeleted: false,
      createdAt: new Date().toISOString()
    };
    mockDb.analysts.push(analyst);
    return analyst;
  },

  softDelete(id: string): void {
    const analyst = mockDb.analysts.find(a => a.id === id);
    if (analyst) analyst.isDeleted = true;
  }
};
