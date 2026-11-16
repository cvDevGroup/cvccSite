# Speakers

This document explains how speaker pages work and how sessions are linked to the people who present them.

## Overview

Speakers are a Hugo [taxonomy](https://gohugo.io/content-management/taxonomies/). Each session lists its presenters in front matter, and Hugo uses that to connect the two:

- Each speaker has **one page** (`/speakers/<id>/`) no matter how many years they present.
- A speaker's page shows their bio, then every talk they've given, grouped by Code Camp year.
- The `/speakers/` page lists the current camp's presenters, then **Past Presenters** grouped by year.

Who presented when always comes from the sessions. A speaker page's `date` doesn't matter.

## Adding a Speaker

Create a **folder** with an `_index.md` inside it. The folder name is the speaker's ID:

```
content/speakers/janeD/_index.md
```

```markdown
---
title: Jane Doe
---

Jane's bio...

![Jane Doe](/img/speakers/janeD.jpg)
```

The page is published at `/speakers/janed/` (URLs are lowercase), even before Jane has a session. That makes it safe to add bios during the call for speakers.

> **Don't** create `content/speakers/janeD.md` as a single file. It takes over the speaker's URL and hides their talks, so the build stops with an error telling you to move it into a folder.

## Linking a Session to Its Speakers

List speaker IDs in the session's front matter:

```toml
+++
title = "My Talk"
speakers = ["janeD"]
+++
```

Panels and co-presented talks list everyone:

```toml
speakers = ["dougR", "bpHogan", "todd", "coryL"]
```

| Where the session lives | Where its speakers appear |
|-------------------------|---------------------------|
| `content/sessions/` (the current camp) | "**&lt;campYear&gt;** Presenters" on `/speakers/` |
| `content/sessions/<year>/` (an archive) | Under **&lt;year&gt;** in "Past Presenters" |

The current year comes from `campYear` in `hugo.toml`.

### Speakers Without a Bio

Naming someone with no `content/speakers/<id>/_index.md` still works: Hugo creates a page for them listing their talks. Because this can also mean a typo, the build prints a warning:

```
WARN  Speaker "sam sample" is named in a session but has no bio at content/speakers/sam sample/_index.md
```

Add a bio folder for them, or fix the ID in the session.

## Templates

| File | Renders |
|------|---------|
| `themes/codeCamp/layouts/_default/speakers.html` | `/speakers/`, plus the single-file check and the missing-bio warning |
| `themes/codeCamp/layouts/_default/term.html` | Each speaker page (bio + talks by year) |
