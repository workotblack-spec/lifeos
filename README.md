# LifeOS

LifeOS est un MVP d’application web qui transforme la vraie vie en système de progression personnelle. Le tableau de bord adapte les objectifs aux contraintes réelles de l’utilisateur : travail, famille, sommeil, énergie et téléphone.

## Fonctionnalités MVP

- Tableau de bord responsive en français.
- Calcul local du temps flexible disponible.
- Plan d’actions adaptatif selon l’énergie et les priorités.
- Suivi d’habitudes avec séries journalières.
- Life Score borné entre 0 et 100.
- Persistance locale via `localStorage`.
- Application statique sans dépendance runtime.
- CI GitHub Actions pour lint, typecheck, tests et build.

## Démarrage

```bash
npm run build
npm run dev
```

Ouvrir <http://localhost:3000>.

## Qualité

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
