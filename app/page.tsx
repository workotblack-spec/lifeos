'use client';

import { useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  Brain,
  CalendarDots,
  ChartLineUp,
  CheckCircle,
  Circle,
  Crosshair,
  Crown,
  Gear,
  Heart,
  House,
  ListChecks,
  MagnifyingGlass,
  Moon,
  Plus,
  Sparkle,
  Target,
  Trophy,
  UserCircle,
  Wallet,
} from '@phosphor-icons/react';

const navItems = [
  { label: 'Accueil', icon: House },
  { label: 'Routines', icon: ListChecks },
  { label: 'Focus', icon: Crosshair },
  { label: 'Finance', icon: Wallet },
  { label: 'Santé', icon: Heart },
  { label: 'Projets', icon: Target },
  { label: 'Apprentissage', icon: BookOpen },
  { label: 'Journal', icon: BookOpen },
  { label: 'Statistiques', icon: ChartLineUp },
  { label: 'Paramètres', icon: Gear },
];

const initialRoutines = [
  { id: 1, title: 'Prière du matin', time: '06:00', duration: '10 min', done: true },
  { id: 2, title: 'Méditation', time: '06:20', duration: '15 min', done: true },
  { id: 3, title: 'Entraînement', time: '07:00', duration: '60 min', done: true },
  { id: 4, title: 'Travail profond', time: '09:00', duration: '90 min', done: false },
  { id: 5, title: 'Lecture', time: '21:00', duration: '20 min', done: true },
];

const projects = [
  { name: 'G-Fondation', progress: 68, detail: 'Construire le produit' },
  { name: 'Forme physique', progress: 72, detail: 'Atteindre un objectif personnel' },
  { name: 'Marque personnelle', progress: 40, detail: 'Lancer le contenu' },
];

export default function HomePage() {
  const [active, setActive] = useState('Accueil');
  const [routines, setRoutines] = useState(initialRoutines);
  const [focusStarted, setFocusStarted] = useState(false);

  const completed = useMemo(() => routines.filter((routine) => routine.done).length, [routines]);
  const score = Math.round((completed / routines.length) * 100);

  function toggleRoutine(id: number) {
    setRoutines((items) => items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Crown size={20} weight="fill" /></span>
          <div><strong>G-FONDATION</strong><span>Discipline. Foi. Action.</span></div>
        </div>
        <nav className="side-nav" aria-label="Navigation principale">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}>
              <Icon size={19} weight={active === label ? 'fill' : 'regular'} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="side-quote"><Sparkle size={18} weight="fill" /><p>Une vie alignée. Un impact durable.</p><small>Chaque petit effort compte.</small></div>
        <div className="profile-card"><UserCircle size={34} weight="duotone" /><div><strong>Profil</strong><span>Discipline • Excellence</span></div></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="mobile-brand"><Crown size={18} weight="fill" /> G-FONDATION</div>
          <label className="search"><MagnifyingGlass size={18} /><input aria-label="Rechercher" placeholder="Rechercher..." /></label>
          <div className="top-actions"><Bell size={19} /><Moon size={19} /><span className="avatar">G</span></div>
        </header>

        <div className="content">
          <div className="hero-row">
            <div><p className="eyebrow">TABLEAU DE BORD</p><h1>Bonjour <Crown className="title-crown" size={28} weight="fill" /></h1><p className="subtitle">Sois fidèle dans les petites choses.</p></div>
            <div className="date-pill"><CalendarDots size={18} /> Samedi 15 août 2026</div>
          </div>

          <div className="stats-grid">
            <StatCard label="Score global" value={`${score}%`} note="+8% cette semaine" icon={<Crown size={22} weight="fill" />} accent="gold" />
            <StatCard label="Routines" value={`${completed} / ${routines.length}`} note="complétées aujourd'hui" icon={<CheckCircle size={22} weight="fill" />} accent="green" />
            <StatCard label="Focus" value="4h 25m" note="temps profond" icon={<Crosshair size={22} weight="fill" />} accent="blue" />
            <StatCard label="Série actuelle" value="14 jours" note="meilleur : 28 jours" icon={<Trophy size={22} weight="fill" />} accent="orange" />
          </div>

          <div className="dashboard-grid">
            <section className="panel routines-panel">
              <div className="panel-heading"><div><h2>Routines du jour</h2><span>{routines.length - completed} restantes</span></div><button className="icon-button" aria-label="Ajouter une routine"><Plus size={18} /></button></div>
              <div className="routine-list">{routines.map((routine) => (
                <button key={routine.id} className="routine-row" onClick={() => toggleRoutine(routine.id)}>
                  {routine.done ? <CheckCircle className="routine-check done" size={23} weight="fill" /> : <Circle className="routine-check" size={23} />}
                  <span className="routine-main"><strong>{routine.title}</strong><small>{routine.duration}</small></span><time>{routine.time}</time>
                </button>
              ))}</div>
              <button className="secondary-button">Voir toutes les routines</button>
            </section>

            <section className="panel progress-panel">
              <div className="panel-heading"><div><h2>Progression hebdomadaire</h2><span>Ton rythme des 7 derniers jours</span></div><span className="badge">78%</span></div>
              <div className="chart" aria-label="Graphique de progression hebdomadaire">{[48, 62, 71, 66, 82, 78, 88].map((height, index) => <div className="bar-wrap" key={index}><div className="bar" style={{ height: `${height}%` }} /><span>{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}</span></div>)}</div>
            </section>

            <section className="panel focus-panel">
              <div className="panel-heading"><div><h2>Focus du jour</h2><span>Un bloc sans distraction</span></div><Brain size={22} /></div>
              <div className="focus-card"><div className="focus-ring"><span>90%</span></div><div><strong>Travail profond</strong><small>Objectif : 90 minutes</small></div></div>
              <button className="primary-button" onClick={() => setFocusStarted((value) => !value)}>{focusStarted ? 'Session en cours' : 'Démarrer le focus'}</button>
            </section>

            <section className="panel goals-panel">
              <div className="panel-heading"><div><h2>Objectifs actifs</h2><span>Ce qui compte maintenant</span></div><Target size={22} /></div>
              <div className="goal-list">{projects.map((project) => <div className="goal" key={project.name}><div className="goal-line"><strong>{project.name}</strong><span>{project.progress}%</span></div><small>{project.detail}</small><div className="progress-track"><div style={{ width: `${project.progress}%` }} /></div></div>)}</div>
            </section>
          </div>

          <section className="bottom-grid"><div className="principle-card"><Sparkle size={22} weight="fill" /><div><span>PRINCIPE DU JOUR</span><p>« La discipline est le pont entre tes objectifs et leur réalisation. »</p></div></div><div className="secure-card"><div><Heart size={22} weight="fill" /><strong>Suisse-first</strong></div><span>Conçu pour une expérience mobile simple, privée et accessible partout.</span></div></section>
        </div>
      </section>

      <nav className="mobile-nav" aria-label="Navigation mobile">{navItems.slice(0, 5).map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={() => setActive(label)}><Icon size={20} weight={active === label ? 'fill' : 'regular'} /><span>{label}</span></button>)}</nav>
    </main>
  );
}

function StatCard({ label, value, note, icon, accent }: { label: string; value: string; note: string; icon: React.ReactNode; accent: string }) {
  return <article className={`stat-card ${accent}`}><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></article>;
}
