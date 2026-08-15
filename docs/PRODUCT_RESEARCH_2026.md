# G-Fondation — Product Research 2026

**Research date:** 2026-08-15  
**Starting market:** Switzerland  
**Category:** personal progression / habits / goals / routines

## Executive conclusion

The category is mature. G-Fondation should **not** launch as another generic habit tracker.

The working positioning is:

> **G-Fondation is a Swiss-first personal progression system that turns meaningful goals into realistic routines and today's actions, then shows progress without guilt.**

The differentiator is not feature count. It is the coherence of the loop:

**Goal → routine → today's action → completion → progress → next adjustment.**

## Competitive landscape

### Streaks
Strength: extremely simple daily completion loop and deep Apple ecosystem integration. It supports iPhone, Apple Watch, iPad, Mac and Vision Pro, plus automatic tracking for selected Apple Health goals.  
Lesson: completing today's action must remain extremely fast.

Source: https://streaksapp.com/

### Habitica
Strength: mature gamification. Habits, Dailies and To-Dos feed XP, Gold, character stats, rewards, quests and social accountability.  
Lesson: progression is powerful, but G-Fondation should use motivation without making missed days feel like punishment.

Sources: https://habitica.com/static/features and https://habitica.com/static/faq

### Habitify
Strength: cross-platform product, reminders, progress analytics, scheduling, integrations and social challenges. Its 2026 product direction explicitly emphasizes progress patterns, areas of life and cross-device continuity.  
Lesson: multi-device continuity and useful analytics are becoming baseline expectations.

Sources: https://habitify.me/ and https://feedback.habitify.me/changelog/all-new-progress-view-2

### Productive
Strength: polished habit/routine creation with schedules, goals, reminders and quantity/duration targets.  
Lesson: users need help translating an intention into a concrete routine, not only a checkbox.

Source: https://support.productiveapp.io/hc/en-us/articles/35963922804241-How-to-create-a-habit

### Oasa — Swiss competitor
Oasa is especially relevant because it is made in Switzerland, offers iOS and Android, hosts in Switzerland/Germany, and positions itself around calm productivity, privacy and fewer features. It deliberately avoids streaks and aggressive gamification.  
Lesson: Switzerland already has a credible privacy-first productivity product. G-Fondation therefore needs a distinct value proposition rather than relying only on “Swiss-made” or “privacy”.

Sources: https://oasa.app/ and https://oasa.app/blog/gamification-vs-gentle-progress-in-productivity-apps

## Strategic opportunity

The market exposes two broad extremes:

1. **Gamified systems** — powerful motivation but can become noisy or punitive.
2. **Calm productivity systems** — focused and respectful but often centered on work/tasks rather than whole-life progression.

G-Fondation can occupy the middle ground:

**serious personal progression + simple daily execution + measured gamification + calm UX.**

The product should help a user answer three questions quickly:

1. What matters to me?
2. What do I need to do today?
3. Am I actually progressing?

## Switzerland-first strategy

Switzerland is the initial market, not a cosmetic localization.

Requirements:

- CHF as default currency where monetary values exist.
- Europe/Zurich timezone by default.
- French first, with German/Italian/English localization architecture.
- Swiss privacy expectations built into the architecture.
- Privacy by design and privacy by default.
- Data minimisation.
- No health/biometric data in MVP unless there is a clear product reason and separate compliance/security review.
- Avoid unnecessary location tracking.

The Swiss Federal Data Protection and Information Commissioner explicitly identifies privacy by design and privacy by default as requirements under the revised FADP. Health data is also treated as sensitive personal data.  

Sources: https://www.edoeb.admin.ch/fr/la-nouvelle-loi-federale-sur-la-protection-des-donnees-du-point-de-vue-du-pfpdt and https://www.edoeb.admin.ch/en/smart-devices

## Device strategy

**Smartphone first → tablet second → desktop third.**

The application must feel native to touch interaction even though the first implementation is a web application.

Core requirements:

- touch-first controls;
- bottom navigation on narrow screens;
- no hover-dependent actions;
- minimum comfortable touch targets;
- readable typography;
- safe-area handling;
- short forms;
- fast feedback after completion;
- no horizontal scrolling in core flows;
- keyboard-aware forms;
- responsive tablet layouts;
- desktop layout for deeper review, not a separate product;
- graceful handling of slower connections;
- installable/PWA path considered after the core UX is stable.

## MVP product principles

### Must have

- onboarding that creates a first meaningful goal;
- life areas;
- goals;
- routines;
- today's actions;
- one-tap completion;
- progress history;
- simple weekly review;
- authentication and persistence;
- responsive mobile/tablet/desktop UI;
- privacy/account controls;
- French-first UX.

### Deliberately not MVP

- social network;
- public leaderboards;
- advanced AI coach;
- wearable integrations;
- complex financial tracking;
- location-based automation;
- large marketplace;
- elaborate RPG inventory/avatars;
- enterprise/team features.

These can be evaluated after retention and product-market signals exist.

## Monetisation hypothesis

The category supports free entry plus premium upgrades. Habitify currently offers a free tier and paid tiers, including annual/lifetime options, while other competitors use subscriptions or one-time purchases.  

G-Fondation should **not** lock the core daily loop behind a paywall. The hypothesis to validate later is:

- free: core goals, routines and daily progression;
- premium: advanced insights, automation, AI assistance and integrations.

Pricing should be tested in CHF rather than copied from US pricing.

Source: https://habitify.me/pricing

## Research status

**Phase 1 research: complete enough to define the product direction.**

Before implementation lock, the remaining product work is:

1. define the target user and first-use promise;
2. map the complete onboarding;
3. define information architecture and navigation;
4. specify the MVP screens and states;
5. define the progression model without punitive mechanics;
6. define the minimum data model;
7. define accessibility and responsive acceptance criteria;
8. perform technical architecture review;
9. perform security/privacy review;
10. then produce the first visual prototype.
