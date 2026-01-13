import { NormalizedLearningActivityInput } from "../../domain/types/normalizedLearningActivity";
import { LearningActivityFieldErrors }from "../../domain/types/normalizedLearningActivity";


interface LearningActivityFormProps {
  value: NormalizedLearningActivityInput;
  errors: LearningActivityFieldErrors;
  onChange: <K extends keyof NormalizedLearningActivityInput>(
    field: K,
    value: NormalizedLearningActivityInput[K]
  ) => void;
}

export function LearningActivityForm({
  value,
  errors,
  onChange
}: LearningActivityFormProps) {
  return (
    <div>
      {/* Analyst name */}
      <div>
        <label>Analyst name</label>
        <input
          type="text"
          value={value.analystName}
          onChange={e => onChange('analystName', e.target.value)}
        />
        {errors.analystName && (
          <div style={{ color: 'red' }}>{errors.analystName}</div>
        )}
      </div>

      {/* Analyst email */}
      <div>
        <label>Analyst email</label>
        <input
          type="email"
          value={value.analystEmail}
          onChange={e => onChange('analystEmail', e.target.value)}
        />
        {errors.analystEmail && (
          <div style={{ color: 'red' }}>{errors.analystEmail}</div>
        )}
      </div>

      {/* Course name */}
      <div>
        <label>Course name</label>
        <input
          type="text"
          value={value.courseName}
          onChange={e => onChange('courseName', e.target.value)}
        />
        {errors.courseName && (
          <div style={{ color: 'red' }}>{errors.courseName}</div>
        )}
      </div>

      {/* Trainer name (optional) */}
      <div>
        <label>Trainer name (optional)</label>
        <input
          type="text"
          value={value.trainerName ?? ''}
          onChange={e =>
            onChange(
              'trainerName',
              e.target.value || undefined
            )
          }
        />
      </div>

      {/* Activity date */}
      <div>
        <label>Activity date</label>
        <input
          type="date"
          value={value.activityDate}
          onChange={e => onChange('activityDate', e.target.value)}
        />
        {errors.activityDate && (
          <div style={{ color: 'red' }}>{errors.activityDate}</div>
        )}
      </div>

      {/* Duration */}
      <div>
        <label>Duration (hours)</label>
        <input
          type="number"
          min={0}
          step={0.25}
          value={value.durationHours}
          onChange={e =>
            onChange('durationHours', e.target.value)
          }
        />
        {errors.durationHours && (
          <div style={{ color: 'red' }}>{errors.durationHours}</div>
        )}
      </div>
    </div>
  );
}
