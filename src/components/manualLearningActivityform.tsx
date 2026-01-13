import { useState } from 'react';
import {
  NormalizedLearningActivityInput,
  LearningActivityFieldErrors
} from '../domain/types/normalizedLearningActivity';
import { validateLearningActivity } from '../domain/validation/learningActivityImport.validator';

export type ManualLearningActivityFormProps = {
  initialValue?: Partial<NormalizedLearningActivityInput>;
  onSubmit?: (value: NormalizedLearningActivityInput) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function ManualLearningActivityForm({
  initialValue,
  onSubmit,
  onCancel
}: ManualLearningActivityFormProps) {
  const [form, setForm] = useState<NormalizedLearningActivityInput>({
    analystName: initialValue?.analystName ?? '',
    analystEmail: initialValue?.analystEmail ?? '',
    courseName: initialValue?.courseName ?? '',
    trainerName: initialValue?.trainerName,
    activityDate: initialValue?.activityDate ?? '',
    durationHours: initialValue?.durationHours ?? ''
  });

  const [fieldErrors, setFieldErrors] =
    useState<LearningActivityFieldErrors>({});

  const updateField = <
    K extends keyof NormalizedLearningActivityInput
  >(
    key: K,
    value: NormalizedLearningActivityInput[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const validationErrors = validateLearningActivity(form);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div>
      <h2>Manual Learning Activity Entry</h2>

      {/* Analyst name */}
      <div>
        <label>Analyst name</label>
        <input
          value={form.analystName}
          onChange={e =>
            updateField('analystName', e.target.value)
          }
          style={{
            borderColor: fieldErrors.analystName ? 'red' : undefined
          }}
        />
        {fieldErrors.analystName && (
          <small style={{ color: 'red' }}>
            {fieldErrors.analystName}
          </small>
        )}
      </div>

      {/* Analyst email */}
      <div>
        <label>Analyst email</label>
        <input
          value={form.analystEmail}
          onChange={e =>
            updateField('analystEmail', e.target.value)
          }
          style={{
            borderColor: fieldErrors.analystEmail ? 'red' : undefined
          }}
        />
        {fieldErrors.analystEmail && (
          <small style={{ color: 'red' }}>
            {fieldErrors.analystEmail}
          </small>
        )}
      </div>

      {/* Course name */}
      <div>
        <label>Course name</label>
        <input
          value={form.courseName}
          onChange={e =>
            updateField('courseName', e.target.value)
          }
          style={{
            borderColor: fieldErrors.courseName ? 'red' : undefined
          }}
        />
        {fieldErrors.courseName && (
          <small style={{ color: 'red' }}>
            {fieldErrors.courseName}
          </small>
        )}
      </div>

      {/* Trainer name (optional) */}
      <div>
        <label>Trainer name (optional)</label>
        <input
          value={form.trainerName ?? ''}
          onChange={e =>
            updateField(
              'trainerName',
              e.target.value || undefined
            )
          }
        />
      </div>

      {/* Date */}
      <div>
        <label>Date</label>
        <input
          type="date"
          value={form.activityDate}
          onChange={e =>
            updateField('activityDate', e.target.value)
          }
          style={{
            borderColor: fieldErrors.activityDate ? 'red' : undefined
          }}
        />
      </div>

      {/* Duration */}
      <div>
        <label>Duration (hours)</label>
        <input
          type="number"
          min={0}
          step={0.25}
          value={form.durationHours}
          onChange={e =>
            updateField('durationHours', e.target.value)
          }
          style={{
            borderColor: fieldErrors.durationHours ? 'red' : undefined
          }}
        />
        {fieldErrors.durationHours && (
          <small style={{ color: 'red' }}>
            {fieldErrors.durationHours}
          </small>
        )}
      </div>

      <button onClick={handleSubmit}>
        Submit
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
