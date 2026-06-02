---
title: How I built my media tracker
date: 2026-02-22
tags: ["web-dev", "media"]
description: In order to manage all the media I interact with, I created a managed system which tracks and stores the information in an external database that I can later consume in any of my applications.
thumb:
  base: https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&h=450&fit=crop
---

I wanted a single place to track the media I consumed. Games, achievements, books, shows, and eventually whatever else I decided to care about.

The simplest solution was to fetch data directly from external APIs and render it on my personal website.

That worked surprisingly well until it didn't.

As I added more integrations, the website slowly took on responsibilities it was never designed for:

* Fetching data
* Synchronizing external services
* Resolving conflicts
* Normalizing formats
* Storing state
* Serving content

The presentation layer had quietly become a data pipeline and at that point I realized I had two separate concerns hiding inside one application: collecting and managing media data and displaying media data.

They shouldn't have been the same system so I split them apart.

What started as a website feature became a standalone media tracking service.

## The shift that simplified everything

The most important decision wasn't choosing TypeScript or Supabase, it was deciding that the website would become a consumer instead of an owner. Once I made that decision, the architecture became obvious.

External APIs feed a synchronization service, the synchronization service owns the data and applications consume the resulting dataset.

The website no longer needs to know how Steam formats its responses, it no longer cares about synchronization schedules. It simply reads the normalized data and displays it as needed.

## The real problem wasn't syncrhonization

Fetching data from APIs turnet out to be straightforward, but modeling the data was harder. Every service describes media differently: games have achievements, shows have seasons and episodes, books have chapters, albums have tracks. Each platform makes up its own structure and my first implementations mirrored whatever API I happened to be integrating.

That woked until I added a second provider, and then a third. Eventually I stopped modeling APIs and started modeling concepts. Instead of "Steam games" or "Youtube videos", I introduced a small set of domain primitives:

- Entities
- Relatioships
- Metadata
- Source identities
- Progress state

Everything else was built around those concepts. Games and achievements became entities, but the connection between them became a relationship. The same relationship system can later represent seasons, episodes, tracks, chapters or anything else I decide to track.

The tracker is not coupled with specific providers anymore, now it just understands the concept of media and adapts the providers to itself.