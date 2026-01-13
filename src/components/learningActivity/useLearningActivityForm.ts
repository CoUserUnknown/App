import { useState } from 'react';
import {
  NormalizedLearningActivityInput,
  LearningActivityFieldErrors
} from '../../domain/types/normalizedLearningActivity';
import { validateLearningActivity } from '../../domain/validation/learningActivityImport.validator';

export function useLearningActivityForm(
  initial?: Partial<NormalizedLearningActivityInput>
) {
  const [form, setForm] =
    useState<NormalizedLearningActivityInput>({
      analystName: '',
      analystEmail: '',
      courseName: '',
      trainerName: undefined,
      activityDate: '',
      durationHours: '',
      ...initial
    });

  const [errors, setErrors] =
    useState<LearningActivityFieldErrors>({});

  const updateField = <
    K extends keyof NormalizedLearningActivityInput
  >(
    key: K,
    value: NormalizedLearningActivityInput[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validate = () => {
    const validationErrors =
      validateLearningActivity(form);

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const reset = () => {
    setForm({
      analystName: '',
      analystEmail: '',
      courseName: '',
      trainerName: undefined,
      activityDate: '',
      durationHours: ''
    });
    setErrors({});
  };

  return {
    form,
    errors,
    updateField,
    validate,
    reset
  };
}
