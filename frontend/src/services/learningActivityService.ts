import { NormalizedLearningActivityInput } from '../domain/types/normalizedLearningActivity';

export async function createLearningActivity(
  payload: NormalizedLearningActivityInput
): Promise<void> {
  const response = await fetch('/api/learning-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to create learning activity');
  }
}
