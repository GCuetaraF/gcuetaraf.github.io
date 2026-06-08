---
title: Bexfy - Learning to Build Cross-Platform Solutions as a Junior Developer
date: 2023-11-05
tags: ["web-dev", "software-dev"]
description: Reflections on inheriting and extending a multi-platform digital signage system across web, mobile, and touch interfaces as my first professional role.
thumb:
  base: https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg
---

Bexfy was my first job as a developer.

I joined with fairly typical expectations for someone just starting out. I thought I was going to work with senior developers, take on small tasks at first, and learn the product step by step while building confidence. Instead, I found an environment with three production applications, and my job was to maintain and develop them.

There was an Angular dashboard for administrators, a multimedia multiplatform player, and a React application for touch screens. Each one had real users, decisions accumulated over the years, and a level of complexity that wasn't obvious at first glance. A large part of those decisions were not documented, and some had been made by people who no longer worked at the company.

Over time, I understood that this was the most important part of the job. Not just building new things, but learning to move inside existing systems without breaking them.

## Read before touching anything

At first, I had a fairly typical urgency for someone just starting out. I wanted to progress fast, close tasks, and feel like I was contributing. It's easy to fall into the idea that progress in software development is tied to writing code as quickly as possible and delivering features.

But working with production systems changes your pace. Every change has context behind it. Sometimes it's a technical decision, other times it's a product limitation or a temporary solution that was never replaced. Most of the time, that context is not recorded anywhere.

I remember changing things too quickly at first. I saw a piece of code I didn't understand and assumed it was wrong or could be simplified. Over time, I learned that this is one of the easiest ways to introduce bugs into systems you don't fully understand.

I changed my workflow. Before modifying anything, I tried to find parts of the system that worked in a similar way. I followed workflows instead of isolated functions. Before refactoring something, I tried to understand what problem that implementation solved, even when that process felt slow or uncomfortable.

It's not always possible to get a clear answer, but simply spending more time understanding the system before changing it reduced early mistakes.

## The multimedia player and reliability

The project that had the biggest impact on me was the multimedia player.

In theory, it was a straightforward application. It downloaded content, stored it locally, and played it on a screen. Nothing particularly complex from a web development perspective.

But the context was very different. These devices were installed in stores with unstable internet connections, uncontrolled hardware, and environments where an IT team could not easily intervene. Sometimes they restarted without warning. Other times they lost connection for hours. In some cases, storage filled up or downloads stopped midway without anyone noticing immediately.

I started to realize that many assumptions in web development did not apply here. If something failed on a website, the user could refresh or retry the action. Here, there was no safety net. If the player failed, the screen stopped showing content, and the issue was visible to anyone passing by.

From that point on, I started thinking less about the happy path and more about failure points. What happens if a download is interrupted. What happens if a file is corrupted. What happens if the device runs out of storage. What happens if the app cannot update content for hours.

The goal stopped being that the system works when everything goes well. It became ensuring the system behaves reasonably when something eventually breaks.

## What I took from it

When I started at Bexfy, I thought the most important part would be learning new technologies and writing better code. And in part, it was. I worked with Angular, React, Cordova, AWS, and deployment pipelines I had never seen before. But over time, I realized this was not what created the most long-term value.

The most important thing was learning to work inside existing systems. Learning to read code you did not write without changing it too quickly. Learning to recognize that most decisions have a story behind them, even when they are undocumented. And learning that a large part of a developer's job is not building new systems, but maintaining existing ones without introducing additional problems.

These lessons were not immediate or comfortable, but they are the ones that shaped my work the most.