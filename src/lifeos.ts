export type EnergyLevel = 'low' | 'medium' | 'high';

export type Goal = {
  id: string;
  title: string;
  area: 'sante' | 'travail' | 'famille' | 'apprentissage' | 'maison';
  importance: number;
  minutes: number;
};

export type Habit = {
  id: string;
  title: string;
  streak: number;
  doneToday: boolean;
};

export type Task = {
  id: string;
  title: string;
  goalId: string;
  minutes: number;
  energy: EnergyLevel;
  completed: boolean;
};

export type Constraints = {
  workHours: number;
  familyHours: number;
  sleepHours: number;
  phoneMinutes: number;
  energy: EnergyLevel;
};

export type LifeOSState = {
  constraints: Constraints;
  goals: Goal[];
  habits: Habit[];
  tasks: Task[];
};

export const defaultState: LifeOSState = {
  constraints: {
    workHours: 8,
    familyHours: 2,
    sleepHours: 7,
    phoneMinutes: 90,
    energy: 'medium'
  },
  goals: [
    { id: 'health', title: 'Retrouver une base physique stable', area: 'sante', importance: 5, minutes: 30 },
    { id: 'deep-work', title: 'Avancer sur un projet prioritaire', area: 'travail', importance: 4, minutes: 45 },
    { id: 'family', title: 'Créer un rituel familial sans téléphone', area: 'famille', importance: 5, minutes: 20 }
  ],
  habits: [
    { id: 'water', title: 'Boire 2 grands verres d’eau', streak: 3, doneToday: false },
    { id: 'walk', title: 'Marcher dehors 10 minutes', streak: 5, doneToday: true },
    { id: 'journal', title: 'Faire le bilan du jour', streak: 1, doneToday: false }
  ],
  tasks: [
    { id: 'task-health', title: 'Séance mobilité + respiration', goalId: 'health', minutes: 20, energy: 'low', completed: false },
    { id: 'task-focus', title: 'Bloc focus sans notifications', goalId: 'deep-work', minutes: 45, energy: 'high', completed: false },
    { id: 'task-family', title: 'Temps familial 100% présent', goalId: 'family', minutes: 20, energy: 'medium', completed: false }
  ]
};

const energyWeight: Record<EnergyLevel, number> = { low: 1, medium: 2, high: 3 };

export function calculateAvailableMinutes(constraints: Constraints): number {
  const fixedMinutes = (constraints.workHours + constraints.familyHours + constraints.sleepHours) * 60;
  const recoveryBuffer = constraints.energy === 'low' ? 120 : constraints.energy === 'medium' ? 75 : 45;
  const phoneRecovery = Math.max(0, constraints.phoneMinutes - 60) * 0.4;
  return Math.max(15, Math.round(24 * 60 - fixedMinutes - recoveryBuffer - phoneRecovery));
}

export function generateAdaptivePlan(state: LifeOSState): Task[] {
  const available = calculateAvailableMinutes(state.constraints);
  let budget = Math.min(available, 120);
  const userEnergy = energyWeight[state.constraints.energy];

  return [...state.tasks]
    .filter((task) => !task.completed && energyWeight[task.energy] <= userEnergy)
    .sort((a, b) => {
      const goalA = state.goals.find((goal) => goal.id === a.goalId)?.importance ?? 0;
      const goalB = state.goals.find((goal) => goal.id === b.goalId)?.importance ?? 0;
      return goalB - goalA || a.minutes - b.minutes;
    })
    .filter((task) => {
      if (task.minutes > budget) return false;
      budget -= task.minutes;
      return true;
    });
}

export function calculateLifeScore(state: LifeOSState): number {
  const completedTasks = state.tasks.filter((task) => task.completed).length;
  const doneHabits = state.habits.filter((habit) => habit.doneToday).length;
  const sleepScore = Math.min(1, state.constraints.sleepHours / 8);
  const phoneScore = Math.max(0, 1 - Math.max(0, state.constraints.phoneMinutes - 60) / 240);
  const raw = completedTasks * 18 + doneHabits * 12 + sleepScore * 25 + phoneScore * 20;
  return Math.min(100, Math.round(raw));
}

export function getCoachMessage(state: LifeOSState): string {
  const minutes = calculateAvailableMinutes(state.constraints);
  if (state.constraints.energy === 'low') {
    return `Énergie basse : LifeOS réduit ton plan à ${minutes} min disponibles et privilégie les actions récupératrices.`;
  }
  if (state.constraints.phoneMinutes > 150) {
    return 'Ton téléphone mange ton attention : commence par un bloc de 25 min en mode avion.';
  }
  return `Plan réaliste : ${minutes} min flexibles aujourd’hui, sans sacrifier sommeil ni famille.`;
}
