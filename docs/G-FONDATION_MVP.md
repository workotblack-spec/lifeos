# G-Fondation — MVP Definition

**Status:** Product definition in progress  
**Market:** Switzerland first  
**Primary surface:** Smartphone  
**Secondary:** Tablet / desktop

## Product promise

Help a person turn what matters into a realistic daily system and understand their progress without feeling punished by the app.

## Core loop

1. Choose what matters.
2. Define a goal.
3. Turn the goal into a routine.
4. Surface today's actions.
5. Complete actions quickly.
6. Show progress.
7. Review and adjust.

## MVP navigation

- **Aujourd'hui** — the default home; only what matters now.
- **Objectifs** — goals and their progress.
- **Progression** — history, consistency and weekly review.
- **Profil** — preferences, language, notifications, privacy and account.

A create/add action should be available without forcing users through deep navigation.

## MVP domains

Initial life areas should be configurable rather than hard-coded. Suggested defaults:

- Santé
- Travail / Études
- Relations / Famille
- Finances
- Développement personnel
- Projet personnel

The user can hide or rename areas.

## MVP entities

- User
- LifeArea
- Goal
- Routine
- RoutineOccurrence
- Completion
- WeeklyReview
- UserPreference

Do not introduce separate XP, achievements, inventory, social graph or AI-agent entities until the product need is validated.

## Progression model

The first version should use **progress, consistency and completion quality** rather than punishment.

No health loss for missed habits. No streak reset as the primary motivational mechanism.

A missed action should produce a neutral state such as **à reprendre**, not failure messaging.

## Onboarding target

The first session should produce a usable system, not a configuration project.

Target outcome:

- choose 1–3 life areas;
- define 1 meaningful goal;
- create 1–3 routines;
- see the first Today's screen;
- complete one action.

The user should reach a meaningful first action quickly.

## Responsive acceptance criteria

### Smartphone

- core flow works at narrow widths without horizontal scrolling;
- bottom navigation remains reachable by thumb;
- primary actions have comfortable touch targets;
- forms do not require precision tapping;
- important content remains readable without zoom;
- keyboard does not hide the active input/action.

### Tablet

- content uses additional space without becoming visually sparse;
- navigation remains simple;
- cards and lists can use two-column layouts where useful.

### Desktop

- wider content area for review/analytics;
- no desktop-only critical feature in MVP;
- same information architecture as mobile.

## Accessibility baseline

Target WCAG 2.2 AA principles from the beginning:

- keyboard operability;
- visible focus;
- semantic controls;
- sufficient contrast;
- reduced-motion support;
- labels for form fields;
- status/error messages that do not rely on color alone;
- screen-reader meaningful names for icon buttons.

## Non-goals

The MVP is not:

- a medical application;
- a financial advisor;
- a social network;
- a project-management suite;
- a game with a complex RPG economy;
- an AI life coach making high-stakes decisions.

## Build gate

Implementation can start when the following are approved internally:

- product promise;
- onboarding flow;
- navigation;
- MVP screens;
- progression rules;
- data model;
- responsive acceptance criteria;
- privacy/security baseline;
- technical stack.
