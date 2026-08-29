const COMMON_SYMPTOMS = ['Fatigue', 'Pain', 'Headache', 'Nausea', 'Dizziness', 'Brain fog', 'Shortness of breath', 'Joint stiffness'];

function validateEvent(input) {
  const symptomName = String(input.symptomName || '').trim();
  const severity = Number(input.severity);
  const notes = String(input.notes || '').trim();

  if (!symptomName) return { error: 'A symptom name is required.' };
  if (symptomName.length > 100) return { error: 'Symptom name must be 100 characters or fewer.' };
  if (!Number.isInteger(severity) || severity < 1 || severity > 10) {
    return { error: 'Severity must be a whole number from 1 to 10.' };
  }
  if (notes.length > 2000) return { error: 'Notes must be 2,000 characters or fewer.' };
  return { value: { symptomName, severity, notes: notes || null } };
}

module.exports = { COMMON_SYMPTOMS, validateEvent };
