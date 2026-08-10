import { EnergyLevel, LifeOSState, calculateAvailableMinutes, calculateLifeScore, defaultState, generateAdaptivePlan, getCoachMessage } from './lifeos.js';

const storageKey = 'lifeos-state-v1';
let state: LifeOSState = loadState();

function loadState(): LifeOSState {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) as LifeOSState : structuredClone(defaultState);
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function setConstraint(key: keyof LifeOSState['constraints'], value: number | EnergyLevel) {
  state = { ...state, constraints: { ...state.constraints, [key]: value } };
  saveState();
  render();
}

function toggleTask(taskId: string) {
  state = { ...state, tasks: state.tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task) };
  saveState();
  render();
}

function toggleHabit(habitId: string) {
  state = { ...state, habits: state.habits.map((habit) => habit.id === habitId ? { ...habit, doneToday: !habit.doneToday, streak: habit.doneToday ? Math.max(0, habit.streak - 1) : habit.streak + 1 } : habit) };
  saveState();
  render();
}

function render() {
  const root = document.querySelector<HTMLDivElement>('#app');
  if (!root) return;
  const plan = generateAdaptivePlan(state);
  root.innerHTML = `
    <main class="shell">
      <header class="hero">
        <p class="eyebrow">LifeOS MVP</p>
        <div class="hero-grid">
          <div><h1>Pilote ta vie comme un système adaptatif.</h1><p>Objectifs, habitudes, sommeil, énergie, famille, travail et téléphone sont réunis dans un tableau de bord local-first.</p></div>
          <aside class="score"><span>Life Score</span><strong>${calculateLifeScore(state)}</strong><small>${getCoachMessage(state)}</small></aside>
        </div>
      </header>
      <section class="grid">
        <article class="card"><h2>Contraintes réelles</h2><p>${calculateAvailableMinutes(state.constraints)} min flexibles estimées</p>${range('workHours','Travail',0,14,'h')}${range('familyHours','Famille',0,8,'h')}${range('sleepHours','Sommeil',4,10,'h')}${range('phoneMinutes','Téléphone',0,300,'min')}<label class="field">Énergie<select id="energy"><option value="low">Basse</option><option value="medium">Moyenne</option><option value="high">Haute</option></select></label></article>
        <article class="card"><h2>Plan adaptatif</h2><p>Priorisé selon ton énergie</p>${plan.length ? plan.map((task) => `<button class="task" data-task="${task.id}"><b>${task.title}</b><span>${task.minutes} min · énergie ${task.energy}</span></button>`).join('') : '<p class="muted">Aucune action compatible. Récupération recommandée.</p>'}</article>
        <article class="card"><h2>Habitudes</h2><p>Micro-victoires du jour</p>${state.habits.map((habit) => `<label class="habit"><span><b>${habit.title}</b><small>Série : ${habit.streak} jours</small></span><input data-habit="${habit.id}" type="checkbox" ${habit.doneToday ? 'checked' : ''}></label>`).join('')}</article>
      </section>
    </main>`;
  bindEvents();
}

function range(key: keyof LifeOSState['constraints'], label: string, min: number, max: number, unit: string) {
  const value = state.constraints[key];
  return `<label class="field">${label}: <strong>${value}${unit}</strong><input id="${key}" type="range" min="${min}" max="${max}" value="${value}"></label>`;
}

function bindEvents() {
  (['workHours', 'familyHours', 'sleepHours', 'phoneMinutes'] as const).forEach((key) => {
    document.querySelector<HTMLInputElement>(`#${key}`)?.addEventListener('input', (event) => setConstraint(key, Number((event.target as HTMLInputElement).value)));
  });
  const energy = document.querySelector<HTMLSelectElement>('#energy');
  if (energy) {
    energy.value = state.constraints.energy;
    energy.addEventListener('change', (event) => setConstraint('energy', (event.target as HTMLSelectElement).value as EnergyLevel));
  }
  document.querySelectorAll<HTMLButtonElement>('[data-task]').forEach((button) => button.addEventListener('click', () => toggleTask(button.dataset.task ?? '')));
  document.querySelectorAll<HTMLInputElement>('[data-habit]').forEach((input) => input.addEventListener('change', () => toggleHabit(input.dataset.habit ?? '')));
}

render();
