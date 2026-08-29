const test = require('node:test');
const assert = require('node:assert/strict');
const { validateEvent } = require('../src/validation');

test('accepts a valid symptom event', () => {
  assert.deepEqual(validateEvent({ symptomName: 'Fatigue', severity: 7, notes: 'After lunch' }).value, {
    symptomName: 'Fatigue', severity: 7, notes: 'After lunch'
  });
});

test('requires a symptom name', () => {
  assert.equal(validateEvent({ severity: 5 }).error, 'A symptom name is required.');
});

test('limits severity to whole numbers from one through ten', () => {
  assert.equal(validateEvent({ symptomName: 'Pain', severity: 0 }).error, 'Severity must be a whole number from 1 to 10.');
  assert.equal(validateEvent({ symptomName: 'Pain', severity: 7.5 }).error, 'Severity must be a whole number from 1 to 10.');
});
