'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDotsIcon as CalendarDots } from '@phosphor-icons/react/dist/csr/CalendarDots';
import { ChartLineUpIcon as ChartLineUp } from '@phosphor-icons/react/dist/csr/ChartLineUp';
import { CheckCircleIcon as CheckCircle } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { CircleIcon as Circle } from '@phosphor-icons/react/dist/csr/Circle';
import { CrownIcon as Crown } from '@phosphor-icons/react/dist/csr/Crown';
import { HouseIcon as House } from '@phosphor-icons/react/dist/csr/House';
import { ListChecksIcon as ListChecks } from '@phosphor-icons/react/dist/csr/ListChecks';
import { SparkleIcon as Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle';
import { TargetIcon as Target } from '@phosphor-icons/react/dist/csr/Target';
import { UserCircleIcon as UserCircle } from '@phosphor-icons/react/dist/csr/UserCircle';

type Routine = {
  id: number;
  title: string;
  time: string;
  duration: string;
  done: boolean;
};

const STORAGE_KEY = 'g-fondation:routines:v1';

const navItems = [
  { label: "Aujourd'hui", icon: House },
  { label: 'Objectifs', icon: Target },
  { label: 'Progression', icon: ChartLineUp },
  { label: 'Profil', icon: UserCircle },
];

const initialRoutines: Routine[] = [
  { id: 1, title: 'Planifier ma journée', time: '08:00', duration: '10 min', done: false },
  { id: 2, title: 'Bouger', time: '12:30', duration: '30 min', done: false },
  { id: 3, title: 'Travail concentré', time: '14:00', duration: '60 min', done: false },
  { id: 4, title: 'Apprendre', time: '19:00', duration: '20 min', done: false },
  { id: 5, title: 'Lecture', time: '21:00', duration: '20 min', done: false },
];

function getSwissDayKey(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isRoutineList(value: unknown): value is Routine[] {
  return Array.isArray(value) && value.every((item) =>
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.time === 'string' &&
    typeof item.duration === 'string' &&
    typeof item.done === 'boolean'
  );
}

export default function HomePage() {
  const [active, setActive] = useState("Aujourd'hui");
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);
  const [todayKey, setTodayKey] = useState('');
  const [todayLabel, setTodayLabel] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dayKey = getSwissDayKey(now);
    const label = new Intl.DateTimeFormat('fr-CH', {
      timeZone: 'Europe/Zurich',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);

    setTodayKey(dayKey);
    setTodayLabel(label.charAt(0).toLocaleUpperCase('fr-CH') + label.slice(1));

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          'day' in parsed &&
          parsed.day === dayKey &&
          'routines' in parsed &&
          isRoutineList(parsed.routines)
        ) {
          setRoutines(parsed.routines);
        }
      }
    } catch {
      // Keep the in-memory defaults when browser storage is unavailable or invalid.
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !todayKey) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: todayKey, routines }));
    } catch {
      // The daily routine checklist remains usable if storage is unavailable.
    }
  }, [hydrated, todayKey, routines]);

  const completed = useMemo(() => routines.filter((routine) => routine.done).length, [routines]);
  const score = routines.length === 0 ? 0 : Math.round((completed / routines.length) * 100);

  function toggleRoutine(id: number) {
    setRoutines((items) => items.map((item) => (
      item.id === id ? { ...item, done: !item.done } : item
    )));
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Crown size={20} weight="fill" /></span>
          <div><strong>G-FONDATION</strong><span>Clarté. Progression. Action.</span></div>
        </div>
        <nav className="side-nav" aria-label="Navigation principale">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={active === label ? 'nav-item active' : 'nav-item'}
              onClick={() => setActive(label)}
              aria-current={active === label ? 'page' : undefined}
            >
              <Icon size={19} weight={active === label ? 'fill' : 'regular'} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="side-quote">
          <Sparkle size={18} weight="fill" />
          <p>Construire des progrès durables.</p>
          <small>Un pas concret à la fois.</small>
        </div>
        <div className="profile-card">
          <UserCircle size={34} weight="duotone" />
          <div><strong>Ton espace</strong><span>Personnel et évolutif</span></div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="mobile-brand"><Crown size={18} weight="fill" /> G-FONDATION</div>
          <div className="top-actions"><span className="avatar" aria-label="Profil">G</span></div>
        </header>

        <div className="content">
          {active === "Aujourd'hui" ? (
            <>
              <div className="hero-row">
                <div>
                  <p className="eyebrow">TON ESPACE PERSONNEL</p>
                  <h1>Bienvenue <Crown className="title-crown" size={28} weight="fill" /></h1>
                  <p className="subtitle">Avance à ton rythme, un pas concret à la fois.</p>
                </div>
                <div className="date-pill"><CalendarDots size={18} /> {todayLabel || 'Date locale'}</div>
              </div>

              <div className="stats-grid">
                <StatCard label="Score du jour" value={`${score}%`} note="Calculé sur les routines cochées" icon={<Crown size={22} weight="fill" />} accent="gold" />
                <StatCard label="Routines" value={`${completed} / ${routines.length}`} note="Complétées aujourd'hui" icon={<CheckCircle size={22} weight="fill" />} accent="green" />
                <StatCard label="Temps de focus" value="Non suivi" note="Chronométrage à venir" icon={<ChartLineUp size={22} />} accent="blue" />
                <StatCard label="Série actuelle" value="À calculer" note="Historique en préparation" icon={<Sparkle size={22} />} accent="orange" />
              </div>

              <div className="dashboard-grid">
                <section className="panel routines-panel">
                  <div className="panel-heading">
                    <div><h2>Routines du jour</h2><span>{routines.length - completed} restantes</span></div>
                  </div>
                  <div className="routine-list">
                    {routines.map((routine) => (
                      <button
                        key={routine.id}
                        className="routine-row"
                        onClick={() => toggleRoutine(routine.id)}
                        aria-pressed={routine.done}
                      >
                        {routine.done
                          ? <CheckCircle className="routine-check done" size={23} weight="fill" />
                          : <Circle className="routine-check" size={23} />}
                        <span className="routine-main">
                          <strong>{routine.title}</strong>
                          <small>{routine.duration}</small>
                        </span>
                        <time>{routine.time}</time>
                      </button>
                    ))}
                  </div>
                  <p className="panel-note">Les coches sont enregistrées sur cet appareil et se réinitialisent chaque jour selon l'heure suisse.</p>
                </section>

                <section className="panel progress-panel">
                  <div className="panel-heading">
                    <div><h2>Progression hebdomadaire</h2><span>Ton historique réel apparaîtra ici</span></div>
                    <ChartLineUp size={22} />
                  </div>
                  <div className="empty-state">
                    <ChartLineUp size={28} />
                    <strong>Pas encore assez de données</strong>
                    <span>La progression sera calculée à partir de tes journées enregistrées.</span>
                  </div>
                </section>

                <section className="panel focus-panel">
                  <div className="panel-heading">
                    <div><h2>Focus du jour</h2><span>Sessions de concentration</span></div>
                    <Sparkle size={22} />
                  </div>
                  <div className="empty-state compact">
                    <strong>Suivi du focus à venir</strong>
                    <span>Aucune durée n'est affichée tant qu'une session réelle n'est pas enregistrée.</span>
                  </div>
                </section>

                <section className="panel goals-panel">
                  <div className="panel-heading">
                    <div><h2>Objectifs actifs</h2><span>Ce qui compte maintenant</span></div>
                    <Target size={22} />
                  </div>
                  <div className="empty-state compact">
                    <strong>Aucun objectif enregistré</strong>
                    <span>La création et le suivi des objectifs seront ajoutés dans cette section.</span>
                    <button className="secondary-button" onClick={() => setActive('Objectifs')}>Voir les objectifs</button>
                  </div>
                </section>
              </div>

              <section className="bottom-grid">
                <div className="principle-card">
                  <Sparkle size={22} weight="fill" />
                  <div><span>PRINCIPE DU JOUR</span><p>« La régularité se construit par de petites actions répétées. »</p></div>
                </div>
                <div className="secure-card">
                  <div><HeartIconPlaceholder /><strong>Conception</strong></div>
                  <span>Interface mobile-first. Les routines de démonstration restent stockées localement sur cet appareil.</span>
                </div>
              </section>
            </>
          ) : (
            <section className="panel section-placeholder">
              <p className="eyebrow">G-FONDATION / {active.toLocaleUpperCase('fr-CH')}</p>
              <h1>{active}</h1>
              <p className="subtitle">Cette section est en préparation. Elle sera activée après validation du parcours principal.</p>
              <button className="secondary-button" onClick={() => setActive("Aujourd'hui")}>Retour à Aujourd'hui</button>
            </section>
          )}
        </div>
      </section>

      <nav className="mobile-nav" aria-label="Navigation mobile">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={active === label ? 'mobile-nav-item active' : 'mobile-nav-item'}
            onClick={() => setActive(label)}
            aria-current={active === label ? 'page' : undefined}
          >
            <Icon size={20} weight={active === label ? 'fill' : 'regular'} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}

function StatCard({ label, value, note, icon, accent }: { label: string; value: string; note: string; icon: React.ReactNode; accent: string }) {
  return (
    <article className={`stat-card ${accent}`}>
      <div className="stat-icon">{icon}</div>
      <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
    </article>
  );
}

function HeartIconPlaceholder() {
  return <span aria-hidden="true" className="status-dot" />;
}
