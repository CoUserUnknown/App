

export async function createLearningActivity(payload) {
  return fetch('/api/learning-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(r => r.json());
}
