export interface Habit {
  id: string;
  label: string;
  completed: boolean;
}

export interface LifeOSState {
  currentDay: string;
  score: number;
  habits: Habit[];
}

export function formatLocalDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function createInitialState(habits: Habit[], now = new Date()): LifeOSState {
  return {
    currentDay: formatLocalDay(now),
    score: 0,
    habits: habits.map((habit) => ({ ...habit, completed: false })),
  };
}

export function rolloverDailyState(state: LifeOSState, now = new Date()): LifeOSState {
  const today = formatLocalDay(now);

  if (state.currentDay === today) {
    return state;
  }

  return {
    ...state,
    currentDay: today,
    score: 0,
    habits: state.habits.map((habit) => ({ ...habit, completed: false })),
  };
}

export function completeHabit(state: LifeOSState, habitId: string, now = new Date()): LifeOSState {
  const stateForToday = rolloverDailyState(state, now);
  const habit = stateForToday.habits.find((candidate) => candidate.id === habitId);

  if (!habit || habit.completed) {
    return stateForToday;
  }

  return {
    ...stateForToday,
    score: stateForToday.score + 1,
    habits: stateForToday.habits.map((candidate) => (
      candidate.id === habitId ? { ...candidate, completed: true } : candidate
    )),
  };
}
