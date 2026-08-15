# G-Fondation — Product Specification v0.1

**Date:** 2026-08-15  
**Market de départ:** Suisse  
**Platform priority:** Smartphone → tablette → desktop  
**Status:** Discovery / definition — **not ready for full implementation yet**

## 1. Product vision

G-Fondation is a personal progression system designed to help a person turn intentions into consistent daily actions, without becoming another overloaded productivity dashboard.

The product must answer three questions immediately:

1. What matters today?
2. What should I do next?
3. Am I progressing?

## 2. Product principles

- Mobile-first and touch-first.
- One primary action per screen where possible.
- Fast daily check-in; minimal typing.
- Progress should motivate, not create guilt.
- Personalization before complexity.
- Privacy by design and privacy by default.
- Swiss-first foundations: CHF, Europe/Zurich, French first; architecture ready for German, Italian and English.
- Accessible and usable on small phones, large phones, tablets and desktop.
- Offline-tolerant where practical; sync when connection returns.
- AI is optional and useful, never required for basic daily use.

## 3. Core user model

A user has:

- Profile
- Life areas
- Goals
- Routines
- Habits/actions
- Daily plan
- Progress history
- Achievements / levels
- Preferences and notification settings

## 4. Proposed information architecture

### Primary mobile navigation

- **Aujourd'hui** — daily actions, progress and next step.
- **Objectifs** — goals and milestones.
- **Progression** — trends, streaks, consistency and achievements.
- **Profil** — preferences, account and personalization.

Secondary features should be reached contextually rather than through a large navigation menu.

## 5. MVP candidate

The first usable version should contain only:

1. Onboarding
2. User profile
3. Life areas
4. Goal creation
5. Habit/routine creation
6. Today view
7. Completion tracking
8. Daily score/progress
9. History and basic statistics
10. Local persistence + account sync architecture
11. Notifications architecture
12. Privacy/settings

AI, social features, advanced financial features, wearable integrations and complex gamification remain post-MVP until validated.

## 6. Gamification direction

Use a restrained progression system:

- XP for completed actions
- levels
- streaks as a secondary signal
- milestones
- weekly consistency

Avoid punitive mechanics. Missing one day should not make the system feel like a failure.

## 7. AI direction

Future AI capabilities should include:

- converting a goal into realistic routines;
- adapting a day when the user's schedule changes;
- identifying overloaded routines;
- weekly reflection;
- suggesting one next action;
- answering questions about the user's own progress.

AI must operate with explicit user permissions and minimum necessary data.

## 8. Switzerland-first requirements

- Default currency: CHF.
- Default timezone: Europe/Zurich.
- French UI first; localization architecture from day one.
- Swiss privacy requirements must be considered in architecture and product copy.
- Avoid collecting sensitive personal information unless there is a clear product need.
- If health-related features are introduced later, perform a separate legal/privacy review before implementation.

## 9. Responsive requirements

### Smartphone
- Primary target.
- Thumb-friendly controls.
- Bottom navigation.
- No horizontal scrolling for core flows.
- Safe-area support.
- Keyboard-aware forms.
- Fast first interaction.

### Tablet
- Preserve mobile simplicity while using available space for context and statistics.
- Optional two-column layouts.

### Desktop
- Wider analytics and management surfaces.
- Same information architecture and data model.

## 10. Quality gates before implementation

G-Fondation should not enter full feature development until:

- the product flow is defined;
- the MVP is frozen;
- mobile screens are designed;
- responsive behavior is specified;
- data model is agreed;
- authentication/storage architecture is agreed;
- privacy requirements are documented;
- acceptance criteria exist for each MVP feature;
- the current repository architecture has been consolidated.

## 11. Current technical baseline

The repository currently contains a small Next.js `app/` surface and a separate TypeScript domain prototype under `src/`. The domain prototype already models habits, daily rollover and scoring. These are foundations to preserve conceptually, not evidence that the final architecture is complete.

## 12. Explicit non-goals for MVP

- Social network
- Public leaderboard
- Complex marketplace
- Full calendar replacement
- Medical diagnosis
- Financial advice
- Large AI agent framework before the core loop is validated

## 13. Definition of "ready to build"

The project is ready for implementation when the MVP flows can be represented as a small set of mobile-first screens with unambiguous states, actions, data and acceptance criteria.
