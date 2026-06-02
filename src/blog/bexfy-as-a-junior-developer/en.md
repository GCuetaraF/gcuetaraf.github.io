---
title: Bexfy - Learning to Build Cross-Platform Solutions as a Junior Developer
date: 2023-11-05
tags: ["web-dev", "software-dev"]
description: Reflections on inheriting and extending a multi-platform digital signage system across web, mobile, and touch interfaces as my first professional role.
thumb:
  base: https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg
---

Bexfy was my first job as a developer.

Like many junior developers, I arrived expecting a senior team where I could be mentored and learn while adding small features. Instead, I inherited three existing applications that were already running in production.

- An Angular admin dashboard.
- A cross-platform media player.
- A React touchscreen kiosk.

Each application had real users, product requirements, and years of decisions made by developers who were no longer around to explain them.

This job threw me into battle from the moment I stepped into the office and taught me a lesson I believe in to this day: most software is not about creating systems, it's about understanding systems that already exist.


## Read Before You Write

As a junior developer you don't have a well developed sense of urgency yet. Time is the motivator of all decisions: you want to ship new features as fast as possible, you want deliverables ready for each review, and client-facing teams push for a faster turn-around.

But I soon learned that production code carries history. The fastest way to break a system is to change something you don't fully understand, and that's specially true when there's nobody around to explain the technical or business decisions that lead to any specific implementation.

So every time I had a new task, I learned to find similar features first; before refactoring, I learned to analyze why the current code looked the way it did.

## The media player changed how I think about software

The most valuable (and painful) project I worked on was Bexfy's media player.

It's job sounded simple: Download content, store it locally and play it on a screen.

In reality, it operated in environments developers rarely think about: retail stores with unstable internet, devices that reboot unexpectedly, corrupted downloads, misconfigured hardware or locations that nobody from the IT department could physically visit.

The player taught me about the improtance of reliability. When a web application crashes, the user may just refresh the page but when a digital signage player crashes, the whole screen goes blank and customers, store managers and clients notice fast.


In this way I learned to never think of the happy path as the only path. What happens if the download stops halfway through? What happens if storage runs out? What happens if the device loses connectivity for hours?

The main goal of the media player was to create a piece of software that reacted gracefully whenever a failure occurred.

## Looking back

When I joined Bexfy, I thought the most important skill I could develop was learning new technologies and writing good code. I spent time learning Angular, React, Cordova, AWS Services, and deployment pipelines. And while those skills were valuable, they weren't the most important thing I learned.

The real lesson was learning how to work with existing systems, read unfamiliar code, understand decisions made by other developers and how to make changes without introducing unnecessary risk.

These lessons were harder to teach than any new technology, and they're also the lessons I've relied most throughout my career.