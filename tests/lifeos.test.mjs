import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateAvailableMinutes, calculateLifeScore, defaultState, generateAdaptivePlan, getCoachMessage } from '../dist-ts/lifeos.js';

test('keeps at least a small realistic time budget', () => {
  assert.equal(calculateAvailableMinutes({ workHours: 14, familyHours: 6, sleepHours: 4, phoneMinutes: 300, energy: 'low' }), 15);
});

test('filters tasks that require more energy than the user has', () => {
  const plan = generateAdaptivePlan({ ...defaultState, constraints: { ...defaultState.constraints, energy: 'low' } });
  assert.equal(plan.every((task) => task.energy === 'low'), true);
});

test('computes a bounded life score', () => {
  assert.ok(calculateLifeScore(defaultState) >= 0);
  assert.ok(calculateLifeScore(defaultState) <= 100);
});

test('explains low energy adaptations', () => {
  assert.match(getCoachMessage({ ...defaultState, constraints: { ...defaultState.constraints, energy: 'low' } }), /Énergie basse/);
});
