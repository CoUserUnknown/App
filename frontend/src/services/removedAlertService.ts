import { RemovedAlert } from '../domain/models/removedAlert';
import { RemovedAlertInput } from '../domain/types/removedAlertInput';
import { mockDb } from './mockDb';

export const removedAlertService = {
  getAll(): RemovedAlert[] {
    return mockDb.removedAlerts;
  },

  create(data: Omit<RemovedAlert, 'id' | 'removedAt'>): RemovedAlert {
    const alert: RemovedAlert = {
      id: crypto.randomUUID(),
      removedAt: new Date().toISOString(),
      ...data
    };

    mockDb.removedAlerts.push(alert);
    return alert;
  },

  createMany(rows: RemovedAlertInput[]): RemovedAlert[] {
    const created: RemovedAlert[] = [];

    for (const row of rows) {
      const alert: RemovedAlert = {
        id: crypto.randomUUID(),
        learningActivityId: row.learningActivityId,
        removedAt: new Date().toISOString(),
        removalReason: row.reason,
        payload: row.rowSnapshot
      };

      mockDb.removedAlerts.push(alert);
      created.push(alert);
    }

    return created;
  },

  resolve(learningActivityId: string) {
  const alertIndex = this.getAll().findIndex(
    a => a.learningActivityId === learningActivityId
  );

  if (alertIndex >= 0) {
    this.getAll().splice(alertIndex, 1);
  }
}
};
