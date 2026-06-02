---
title: Plexus Tech - Consulting, Technical Debt, and Mobile Development
date: 2024-03-22
tags: ["web-dev", "mobile-dev"]
description: Lessons learned working as a mobile developer in a consulting environment, managing legacy codebases, and balancing client demands with technical sustainability.
thumb:
  base: https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg
---

Working at Plexus Tech meant stepping into systems I didn't design, didn't choose and didn't fully understand at first. It was consulting work, and that meant one thing consistently: you rarely start from zero. I worked as a mobile developer across multiple client projects where the job wasn't just building features.

## The real work wasn't development

Accross projects the pattern was consistent: there was always a backlog of features, a backlog of technical issues and there was always a system that had accumulated years of decisions from different teams. The job was balancing all three.

## E-commerce mobile app: When scale becomes a performance problem

One of the projects was a grocery e-commerce app for a large retail chain.

The app worked, until usage increased, then performance issues started to surface in places that weren't obvious at first. Cart interactions slowed down when users added large numbers of items, state updates became expensive under load. Small ineficiences that didn't matter in testing became visible in production.

The hardest part wasn't fixing individual bugs, it was finding which layer was responsible. Frontend logic, backend response times, network behavior... Each issue required tracing the system end to end and in consulting projects, performance problems rarely have a single owner.

## Healthcare app: When upgrades break everything

Another project involded an existing React Native app in the healthcare space.

The task seemed simple: upgrade the Android SDK to be able to push new versions to the app stores. In practice, the issue wasn't isolated: one dependency required a newer Gradle version, which conflicted with another plugin, which depended on an older native module which had no active maintenance.

What looked like a routine upgrade turned into a dependency investigation. Small changes in one layer created cascading effects accross the entire build system.

In legacy mobile codebases nothing is truly independant.

## The consulting reality: Uncertainty is the default state

What stood out accross all projects was uncertainty. Documentation was incomplete or outdated, access to the original developers was limited and both business requirements and technical constraints were losely defined. This gap defines most consulting work: you don't get the full picture, you work with partial systems and incomplete context.

## What I took out of it

1. **Communication matters more than implementation**. Explaining why something is blocked became as important as fixing the issue. Stakeholders and clients don't see dependency graphs, they see delays and your job is to translate one into the other.

2. **Estimation is always probabilistic**. A bug is never just a bug, it is a hypothesis about where the system is broken. Sometimes the hypothesis is wrong and the work includes finding out why.

3. **Stability is a feature**. In consulting environments, systems already have users. This means that every changes carries risk and oftentimes the best solution is the one that introduces the least disruption for the final user.

4. **Technical debt is not theoretical**. You don't learn about technical debt in a book or a course, you observe it when a version upgrade takes two days instead of two hours.

## Final thoughts

In consulting, software is not something you design in isolation but something you inherit, stabilize and evolve in a short amount of time. The technical challenge is real but the bigger issue is working with systems that are already in motion.

That's what defines the job.