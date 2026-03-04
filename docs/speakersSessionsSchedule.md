# Content Management Guide

This document explains how speakers, sessions, and the schedule are managed on the CVCC site, and how to archive a year and start fresh for the next conference.

---

## How It Works

### The Single Source of Truth: `data/conference.yaml`

All speakers and sessions for the **current year** live in one file:

```
data/conference.yaml
```

Editing this file is all you need to do to add, update, or remove a speaker or session. The site reads from it automatically — no other files need to be touched for current-year content.

---

### How Speakers Are Generated

```
data/conference.yaml
    ↓ (read by)
content/speakers/_content.gotmpl   ← Hugo content adapter
    ↓ (generates virtual pages)
/speakers/{id}/                     ← individual speaker pages
/speakers/                          ← speaker list page
```

The content adapter (`_content.gotmpl`) loops over every entry in the `speakers` list and creates a page for each one. Hugo lowercases the `id` field to form the URL, so `id: bpHogan` becomes `/speakers/bphogan/`.

The speaker list page at `/speakers/` shows only speakers whose date falls in the current year, so the `date` field in each speaker entry should always be set to the current conference year.

---

### How Sessions Are Generated

```
data/conference.yaml
    ↓ (read by)
content/sessions/_content.gotmpl   ← Hugo content adapter
    ↓ (generates virtual pages)
/sessions/{id}/                     ← individual session pages
/sessions/                          ← session list page
```

Same pattern as speakers. Each session entry in the YAML becomes a page. The session layout (`layouts/sessions/single.html`) renders the `sessionTime` and `location` fields in a header above the description.

---

### How the Schedule Works

```
data/conference.yaml
    ↓ (read directly by the template)
themes/codeCamp/layouts/_default/schedule.html
    ↓ (renders)
/schedule/
```

The schedule template reads the `sessions` list directly from the data file and sorts by `weight` (ascending). It does **not** go through virtual pages — it reads the data file directly. This means the schedule always matches the YAML exactly.

> The schedule page is currently set to `draft: true` in `content/schedule/_index.md`. Remove that line to publish it.

---

### Speakers Page UI

The `/speakers/` list page renders as an interactive card grid:

- **Layout:** 4-column grid on desktop, 2 columns on mobile
- **Card front:** circular speaker photo (or a faded CVCC logo placeholder if no photo is set), the speaker's name, and a small CVCC logo badge at the bottom. A "click to read bio" hint appears on hover.
- **Click interaction:** clicking a card triggers a flip animation that expands the card fullscreen. The bio panel flips in from the side and fills the screen with the speaker's full rendered bio. Close with the **×** button, by clicking outside the panel, or by pressing **Escape**.
- **Keynote speakers:** displayed separately above the regular grid, with a gold border and glow. The label reads "✦ Keynote Speaker" for one or "✦ Keynote Speakers" for multiple. Keynote cards use the same column widths as the regular grid and center themselves when they don't fill a full row. Set with `keynote: true` in the YAML — see below.
- **Company logos:** an optional per-speaker company/employer logo can be shown beneath the speaker's name. Controlled by `showCompanyLogos` at the top of `data/conference.yaml` — set to `true` to enable globally, `false` to hide all logos regardless of whether the field is set.

The layout file is at `layouts/_default/speakers.html` (site-level override of the theme).

---

## Editing the YAML

### Adding or Updating a Speaker

Open `data/conference.yaml` and add or edit an entry under `speakers:`:

```yaml
showCompanyLogos: false      # Set to true to show companyLogo on speaker cards

speakers:
  - id: janesmith            # Lowercase, URL-safe → /speakers/janesmith/
    name: "Jane Smith"       # Displayed on the page and in the list
    weight: 5                # Sort order on the speaker list (lower = higher up)
    date: 2027-01-01         # Must be current conference year for list to show them
    keynote: true            # Optional — omit for regular speakers. Multiple allowed.
    image: /img/speakers/janesmith.jpg      # Optional — omit the line entirely if no photo
    companyLogo: /img/companies/acme.png    # Optional — shown when showCompanyLogos is true
    bio: |
      Jane is a software engineer at Acme Corp specializing in distributed systems.
      She has spoken at numerous conferences and is the author of three books.

      ![Jane Smith](/img/speakers/janesmith.jpg)
```

To designate a keynote speaker, add `keynote: true` to their entry. They will be pulled out of the regular grid and displayed above the other speakers with a gold outline. Multiple keynote speakers are supported — their cards share the same row(s) and center when they don't fill a complete row. To remove the keynote designation, delete the `keynote:` line entirely (or set it to `false`).

Speaker photos go in `static/img/speakers/`. If no photo is available, just leave out the `image:` line.

The bio field uses YAML's literal block scalar (`|`), which preserves line breaks and lets you write multi-line markdown freely. Indent all bio content consistently.

---

### Adding or Updating a Session

Add or edit an entry under `sessions:`:

```yaml
sessions:
  - id: distributed-systems      # Lowercase, URL-safe → /sessions/distributed-systems/
    title: "Distributed Systems: A Beginner's Guide"
    sessionTime: "10:30 am"      # Displayed in schedule and on the session page
    location: "Presentation Track"
    weight: 6                    # Sort order in the schedule (lower weight = earlier slot)
    description: |
      [Jane Smith](/speakers/janesmith/)

      In this session, Jane walks through the fundamentals of distributed systems
      and how to avoid the most common pitfalls.
```

To link to a speaker from a session description, use a plain markdown link:
```markdown
[Jane Smith](/speakers/janesmith/)
```
Use the speaker's `id` (lowercased) in the URL, with a trailing slash.

The `weight` field controls the order in the schedule. Assign weights in rough chronological order — lower numbers appear first.

---

## Year-End: Archiving and Starting Fresh

When the conference year ends, you want to:
1. Preserve this year's sessions as permanent archive pages
2. Clear the YAML and fill it with next year's data

Speaker pages (`/speakers/{id}/`) are **not archived** as individual pages — they only exist for the year they're in the YAML. The speaker bio is preserved inside the archived session description text, so the session record stands on its own even if the speaker doesn't return.

---

### Step 1: Create the Archive Directory

Create a new folder for the year being archived:

```
content/sessions/YEAR/
```

Replace `YEAR` with the actual year (e.g., `2026`).

---

### Step 2: Add a Section Index File

Create `content/sessions/YEAR/_index.md`:

```toml
+++
title = 'Archived YEAR Sessions'
date = YEAR-03-01T00:00:00-06:00
draft = false
+++
```

This makes `/sessions/YEAR/` a browseable section listing all archived sessions for that year.

---

### Step 3: Create a .md File for Each Session

For each session in `data/conference.yaml`, create a corresponding `.md` file in `content/sessions/YEAR/`. Name the file after the session's `id` (e.g., `keynote.md`, `panel.md`).

The format matches the existing 2025 archive sessions. Here's a template:

```toml
+++
title = "SESSION TITLE HERE"
date = YEAR-03-01T00:00:00-06:00
draft = false
sessionTime = "TIME HERE"
location = "LOCATION HERE"
weight = WEIGHT_HERE
layout = "session"
+++

DESCRIPTION CONTENT HERE (copied from the YAML description field)
```

Example — `content/sessions/2026/keynote.md`:

```toml
+++
title = "Opening Remarks & Keynote"
date = 2026-03-01T00:00:00-06:00
draft = false
sessionTime = "9:00 am"
location = "Commons"
weight = 2
layout = "session"
+++

Opening remarks followed by:

## Keynote By Brian Hogan
[Brian P. Hogan](/speakers/bphogan/)
```

> **Note on speaker links in archives:** Links like `/speakers/bphogan/` point to the current year's speaker page. If that speaker doesn't present in a future year, the link will 404. To make archived session pages fully self-contained, you can paste the speaker's bio text directly into the archived session description rather than linking to their speaker page.

Once all session `.md` files are created, those sessions will be permanently accessible at `/sessions/YEAR/{id}/` — completely independent of the YAML.

---

### Step 4: Update `data/conference.yaml`

Replace the `speakers` and `sessions` lists in `data/conference.yaml` with the new year's data. The old sessions are now preserved in the archive directory you just created, so it's safe to overwrite the YAML.

Update the `date` fields on all speaker entries to the new conference year.

---

## Quick Reference: YAML Field Definitions

### Top-Level Fields

| Field | Default | Description |
|-------|---------|-------------|
| `showCompanyLogos` | `false` | Set to `true` to display `companyLogo` images on speaker cards. Set to `false` to hide all company logos globally. |

### Speaker Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Lowercase, URL-safe identifier. Becomes the page URL: `/speakers/{id}/` |
| `name` | Yes | Full display name shown on pages and in the list |
| `weight` | Yes | Integer sort order on the speaker list page (lower = first) |
| `date` | Yes | Set to current conference year (e.g. `2027-01-01`). Controls which year's list shows this speaker |
| `image` | No | Path to profile photo in `/static/`, e.g. `/img/speakers/photo.jpg` |
| `images` | No | Path to multiple profile photos in `/static/`, e.g. `/img/speakers/photo.jpg`  `/img/speakers/photo2.jpg` |
| `bio` | Yes | Multiline markdown bio. Use `|` block scalar. May include an `![alt](image-path)` at the end |
| `keynote` | No | Set to `true` to display the speaker above the main grid with a gold outline. Multiple keynote speakers are supported. |
| `companyLogo` | No | Path to a company/employer logo in `/static/`, e.g. `/img/companies/acme.png`. Only shown when `showCompanyLogos: true`. |

### Session Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Lowercase, URL-safe identifier. Becomes the page URL: `/sessions/{id}/` |
| `title` | Yes | Full display title |
| `sessionTime` | Yes | Time string displayed on the session page and schedule (e.g. `"9:30 am"`) |
| `location` | Yes | Room or track name (e.g. `"Presentation Track"`, `"Commons"`) |
| `weight` | Yes | Integer sort order in the schedule (lower = earlier). Assign chronologically |
| `description` | Yes | Multiline markdown content. Use `|` block scalar. Start with a speaker link, then the session abstract |
