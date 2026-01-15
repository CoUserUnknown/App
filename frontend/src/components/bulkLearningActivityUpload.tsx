import { useState, ChangeEvent } from 'react';
import { RemovedAlertInput } from '../domain/types/removedAlertInput';
import { LearningActivityFieldErrors } from '../domain/types/normalizedLearningActivity';
import { ManualLearningActivityForm } from './manualLearningActivityform';
import { removedAlertService } from '../services/removedAlertService';
import { parseCsvFile } from '../utils/csvParser';
import { normalizeLearningActivity } from '../domain/types/normalizedLearningActivity';
import { validateLearningActivity } from '../domain/validation/learningActivityImport.validator';

export type { RemovedAlertInput };

/* =========================
   Types
   ========================= */

type Props = {
  rejectedRows: RemovedAlertInput[];
  setRejectedRows: React.Dispatch<
    React.SetStateAction<RemovedAlertInput[]>
  >;
};

/* =========================
   Component
   ========================= */

export function BulkLearningActivityUpload({
  rejectedRows,
  setRejectedRows
}: Props) {
  const [selectedRows, setSelectedRows] =
    useState<RemovedAlertInput[]>([]);

  const [bulkFixIndex, setBulkFixIndex] =
    useState<number | null>(null);

  const [rowBeingEdited, setRowBeingEdited] =
    useState<RemovedAlertInput | null>(null);

  const [importing, setImporting] = useState(false);

  /* =========================
     Helpers
     ========================= */

  function toggleRow(row: RemovedAlertInput, checked: boolean) {
    setSelectedRows(prev =>
      checked ? [...prev, row] : prev.filter(r => r !== row)
    );
  }

  /* =========================
     CSV Upload Handler
     ========================= */

  async function handleFileUpload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);

    try {
      const rows = await parseCsvFile(file);

      const newRejected: RemovedAlertInput[] = [];

      rows.forEach((row, index) => {
        const normalized = normalizeLearningActivity(row);
        const errors: LearningActivityFieldErrors =
          validateLearningActivity(normalized);

        if (Object.keys(errors).length > 0) {
          newRejected.push({
            learningActivityId: `csv-${Date.now()}-${index}`,
            rowSnapshot: row,
            normalizedSnapshot: normalized,
            fieldErrors: errors,
            reason: 'Validation failed',
            source: 'CSV_IMPORT'
          });
        }
      });

      setRejectedRows(prev => [...prev, ...newRejected]);

      if (newRejected.length === 0) {
        alert('All rows imported successfully.');
      }
    } catch (error) {
      console.error('CSV import failed', error);
      alert('Failed to process CSV file.');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  }

  /* =========================
     Render
     ========================= */

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Bulk Learning Activity Upload</h2>

      <input
        type="file"
        accept=".csv"
        disabled={importing}
        onChange={handleFileUpload}
      />

      {importing && <p>Importing CSV…</p>}

      {/* =========================
         Rejected Rows
         ========================= */}

      <h2>Rejected CSV Rows</h2>

      {rejectedRows.length === 0 && (
        <p>No rejected rows.</p>
      )}

      {rejectedRows.length > 0 && (
        <>
          <table border={1} cellPadding={6}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === rejectedRows.length
                    }
                    onChange={e =>
                      setSelectedRows(
                        e.target.checked ? [...rejectedRows] : []
                      )
                    }
                  />
                </th>
                <th>Reason</th>
                <th>Errors</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rejectedRows.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={e =>
                        toggleRow(row, e.target.checked)
                      }
                    />
                  </td>

                  <td>{row.reason}</td>

                  <td>
                    <ul>
                      {Object.entries(row.fieldErrors ?? {}).map(
                        ([field, msg]) => (
                          <li key={field}>
                            <strong>{field}</strong>: {msg}
                          </li>
                        )
                      )}
                    </ul>
                  </td>

                  <td>
                    <button onClick={() => setRowBeingEdited(row)}>
                      Fix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedRows.length > 0 && bulkFixIndex === null && (
            <button
              style={{ marginTop: 16 }}
              onClick={() => setBulkFixIndex(0)}
            >
              Fix Selected ({selectedRows.length})
            </button>
          )}
        </>
      )}

      {/* =========================
         Single Fix Mode
         ========================= */}

      {rowBeingEdited && (
        <div style={{ marginTop: 24 }}>
          <h3>Fix Rejected Learning Activity</h3>

          <ManualLearningActivityForm
            initialValue={rowBeingEdited.normalizedSnapshot}
            onSuccess={() => {
              setRejectedRows(prev =>
                prev.filter(r => r !== rowBeingEdited)
              );

              removedAlertService.resolve(
                rowBeingEdited.learningActivityId
              );

              setRowBeingEdited(null);
            }}
            onCancel={() => setRowBeingEdited(null)}
          />
        </div>
      )}

      {/* =========================
         Bulk Fix Mode
         ========================= */}

      {bulkFixIndex !== null && selectedRows[bulkFixIndex] && (
        <div style={{ marginTop: 32 }}>
          <h3>
            Fixing row {bulkFixIndex + 1} of {selectedRows.length}
          </h3>

          <ManualLearningActivityForm
            initialValue={
              selectedRows[bulkFixIndex].normalizedSnapshot
            }
            onSuccess={() => {
              const current = selectedRows[bulkFixIndex];
              if (!current) return;

              removedAlertService.resolve(
                current.learningActivityId
              );

              setRejectedRows(prev =>
                prev.filter(r => r !== current)
              );

              if (bulkFixIndex + 1 < selectedRows.length) {
                setBulkFixIndex(bulkFixIndex + 1);
              } else {
                setBulkFixIndex(null);
                setSelectedRows([]);
              }
            }}
            onCancel={() => setBulkFixIndex(null)}
          />
        </div>
      )}
    </div>
  );
}
