import test from 'node:test';
import assert from 'node:assert/strict';
import { completeHabit, createInitialState, rolloverDailyState } from '../dist/src/app.js';

test('rolloverDailyState resets daily habits and score on day change', () => {
  const yesterday = new Date(2026, 7, 9, 23, 59);
  const today = new Date(2026, 7, 10, 0, 1);
  const state = completeHabit(createInitialState([{ id: 'water', label: 'Drink water', completed: false }], yesterday), 'water', yesterday);

  const rolledOver = rolloverDailyState(state, today);

  assert.equal(rolledOver.currentDay, '2026-08-10');
  assert.equal(rolledOver.score, 0);
  assert.deepEqual(rolledOver.habits, [{ id: 'water', label: 'Drink water', completed: false }]);
});

test('completeHabit does not count previous-day completions in the new day score', () => {
  const yesterday = new Date(2026, 7, 9, 10);
  const today = new Date(2026, 7, 10, 10);
  const state = completeHabit(createInitialState([{ id: 'read', label: 'Read', completed: false }], yesterday), 'read', yesterday);

  const completedToday = completeHabit(state, 'read', today);

  assert.equal(completedToday.currentDay, '2026-08-10');
  assert.equal(completedToday.score, 1);
  assert.equal(completedToday.habits[0]?.completed, true);
});
