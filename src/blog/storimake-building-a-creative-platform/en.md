---
title: Storimake - 3 Years Building a Creative Platform
date: 2026-06-02
tags: ["web-dev"]
description: This article shares the architecture, challenges, and lessons learned from developing a platform connecting clients with creative professionals to produce content at scale.
thumb:
  base: https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg
---

Three years ago, I joined Storimake as the only frontend engineer.

Storimake is a marketplace for creative production where clients create projects; photographers, videographers, editors, and other contributors complete the work and the platform coordinates the entire process.

Behind that workflow sat three different products, multiple user roles, complex permissions, file uploads, payment processing, and thousands of small product decisions.

Over the next three years, I became responsible for all of it.

By the time I left, I had built and maintained:

- Three production applications
- A shared design system
- Deployment infrastructure
- Internationalization
- Analytics and GDPR compliance
- A permission model spanning multiple user types

Looking back, the most valuable lessons had very little to do with React, Next.js, or TypeScript. It's about the engineering decisions that allowed one person to keep shipping without drowning in complexity.

## The real challenge

The hardest part wasn't writing sensible code, it was preventing the platform from becoming harder to change every month.

Every feature introduced new workflows, every workflow introduced new edge cases, every edge case introduced new maintenance costs.

Without a team to fall back on, I couldn't afford solutions that worked today but created problems six months later and that constraint shaped almost every architectural decision I made.

## Why we built a monorepo

Early on, it became clear that the platform served very different users. The obvious solution would have been separate applications with separate codebases, but the problem is that the underlying concepts were identical. Projects were still  projects, users were still users and permissions were still permissions.

Every duplicated component would need to be maintained multiple times and every workflow change would need to be implemented multiple times.

As a solo developer, I couldn't afford that. The monorepo wasn't a technical preference, it was a survival strategy.

## The challenge of business logic

The most difficult code I wrote wasn't UI code, It was workflow logic.

Creative production sounds straightforward when you describe it in a sentence:

A client requests photos, the photographer takes the photos, the editor edits them and the client reviews the final result.

But inreality, every step depends on another step.

Editors can't edit files that haven't been uploaded. Reviewers can't approve content that hasn't been delivered and contributors shouldn't access projects they aren't assigned to.

Once multiple user roles, project states, and service types entered the picture, the complexity grew quickly. Most bugs weren't visual, they came from missing business rules.

The UI was often the easy part. Modeling the workflow correctly was the real challenge.

## What I'd do differently

Not every decision aged well. Some packages became too large, some responsibilities became unclear. We waited too long to invest in Storybook, we never established a strong end-to-end testing strategy, we documented implementation details more than architectural decisions.

None of those problems were catastrophic, but became more expensive over time. That's one of the recurring themes of software engineering: few decisions fail immediately and instead accumulate interest you will have to pay up at some point.

## What three years taught me

After three years, my biggest takeaway is that architecture is really about preserving momentum. The best technical decisions weren't the most sophisticated, they were the decisions that reduced future work.

As engineers, we often focus on what we build but over time, I've become more interested in what I don't have to build again. That's where leverage comes from.

And when you're the only frontend engineer supporting an entire platform, leverage becomes one of the most important tools you have.