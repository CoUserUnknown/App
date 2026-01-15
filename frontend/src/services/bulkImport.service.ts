export async function bulkImport(rows, dryRun) {
  return fetch(`/api/bulk-import?dryRun=${dryRun}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rows)
  }).then(r => r.json());
}
