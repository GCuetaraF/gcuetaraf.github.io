---
title: "Storimake: 3 Years Building a Creative Platform"
date: 2026-06-02
tags: ["architecture", "platform", "nextjs"]
description: Architecture, challenges, and lessons from scaling a content production platform connecting clients with creative professionals.
thumb:
  base: https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg
---

Three years ago, I joined Storimake as the only frontend engineer in the company.

Storimake is a platform that connects clients with photographers, videographers, editors, and other creative professionals to produce content at scale. At first, the workflow seems simple: a client requests a project, a team of professionals executes it, and the content is delivered. However, behind this apparent simplicity lies a considerable amount of operational complexity.

Over time, I became responsible for three production applications, a shared design system, the frontend deployment infrastructure, the platform's internationalization, analytics integrations, GDPR compliance, and a permission model that had to work consistently across different user types.

Looking back, the most important lessons I take away from those years have little to do with React, Next.js, or TypeScript. What had the biggest impact on my day-to-day work were the decisions that allowed a single person to keep developing new features without each change becoming more costly than the last.

## The real challenge

It's easy to think that the work consists primarily of writing code, but in projects that grow over several years, the real challenge tends to be something else. Every new feature introduces new states, new exceptions, and new dependencies between parts of the system that were previously isolated. At first, it's barely noticeable. Months later, however, you start encountering seemingly simple tasks that require modifications in multiple places, and deployments that generate more uncertainty than they should.

Since I didn't have a frontend team behind me to delegate responsibility to, many decisions ended up passing through a simple filter:

"Will I still want to maintain this six months from now?"

That constraint ended up shaping a large part of the architecture.

## Why a monorepo

Very early on, it became clear that the platform would eventually consist of multiple applications. Clients, professionals, and the internal team all had different needs, and each required its own interface.

The most obvious alternative was to separate each application into its own repository, but there was a problem: even though the interfaces were different, the domain was largely the same. Projects were projects, users were users, and the permission rules affected all products equally.

Whenever an important business workflow changed, the impact was usually felt across multiple applications. Maintaining independent repositories would have meant duplicating components, types, domain models, and parts of the business logic. For a large organization, that might not have been a significant issue. For a single person, it was.

That's why the monorepo wasn't a technological preference. It was a practical decision to reduce duplication and maintain a single source of truth for the platform's most important concepts.

## Where the real complexity was

Interestingly, the most difficult code to maintain wasn't the UI.

When you explain the product in a conversation, everything sounds straightforward: a client requests content, professionals do the work, and the client approves the final result. The problem is that real systems rarely operate according to such simple rules.

An editor can't work on files that haven't been uploaded yet. A client can't approve content that hasn't been delivered. Professionals can only access specific projects. Some services require multiple professionals working across different stages of production. Others allow revisions, partial deliveries, or workflows that vary depending on the type of production.

Most of the significant bugs weren't related to buttons, forms, or visual styling. They usually appeared when a business rule failed to account for a specific edge case, or when two parts of the system interpreted the same process differently.

Over time, I realized that a large portion of the work consisted of modeling these rules correctly and ensuring they were applied consistently throughout the platform.

## What I would do differently

Not every decision turned out to be the right one.

Some packages grew larger than they should have. Some responsibilities were poorly defined, and we were too slow to invest in tools that would have improved the developer experience. Storybook was introduced later than ideal, and we never established a solid end-to-end testing strategy.

We also weren't particularly good at documenting architectural decisions. There was plenty of documentation explaining how specific implementations worked, but much less explaining why certain decisions were made. Over time, that information often becomes more valuable than the implementation details themselves.

None of these issues were catastrophic on their own. The interesting thing is that they all shared the same characteristic: they didn't create immediate problems. They simply made development slightly slower, slightly more difficult, or slightly more expensive every month.

## What I learned from these three years

After three years, my conclusion is that architecture has less to do with technical sophistication than we're often led to believe.

The most valuable decisions weren't the most clever or the most complex. They were the ones that allowed us to maintain a healthy development pace as the product continued to grow.

Over time, I stopped focusing on how much time a decision would save me today and started focusing on how much time it would save a year from now. In long-lived projects, that difference becomes significant.

When you're the only person maintaining a large part of the platform, the ability to keep moving without being slowed down by complexity isn't an advantage. It's a necessity.
