import { useState } from 'react';
import { BulkLearningActivityUpload } from './src/components/bulkLearningActivityUpload';
import { ManualLearningActivityForm } from './src/components/manualLearningActivityform';
import type { RemovedAlertInput } from './src/components/bulkLearningActivityUpload';

export default function App() {
  const [mode, setMode] = useState<'bulk' | 'manual'>('bulk');
  const [rejectedRows, setRejectedRows] = useState<RemovedAlertInput[]>([]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Training App</h1>

      <nav style={{ marginBottom: 16 }}>
        <button onClick={() => setMode('bulk')}>
          Bulk CSV Import
        </button>
        <button onClick={() => setMode('manual')} style={{ marginLeft: 8 }}>
          Manual Entry
        </button>
      </nav>

      {mode === 'bulk' && <BulkLearningActivityUpload rejectedRows={rejectedRows} setRejectedRows={setRejectedRows} />}
      {mode === 'manual' && <ManualLearningActivityForm />}
    </div>
  );
}
