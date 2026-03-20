# Runbook: Year-End Archive

How to archive the current year's sessions and speakers, and set up for the next conference year.

---

## Overview

Both session pages and speaker pages are archived by copying them to year-specific subdirectories. This keeps past conferences permanently accessible at `/sessions/YEAR/` and `/speakers/YEAR/` without affecting the current year's list pages.

**Why subdirectories work as archives:**

- The sessions list template filters on `"Section" "sessions"`, which only matches direct children of the sessions section. Pages in `content/sessions/2026/` belong to the `2026` subsection and are automatically excluded.
- The speakers list template uses `.RegularPages` on the speakers section page, which only returns direct children — pages in `content/speakers/2026/` are in a subsection and are automatically excluded.

No manual date-filtering or toggling is needed. Moving files to a year subdirectory is sufficient to remove them from the live list.

---

## Step 1 — Create the Archive Directories

```
content/sessions/YEAR/
content/speakers/YEAR/
```

For example, archiving 2026:
```
content/sessions/2026/
content/speakers/2026/
```

---

## Step 2 — Add Section Indexes

Create `content/sessions/YEAR/_index.md`:

```toml
+++
title = 'Archived 2026 Sessions'
date = 2026-03-01T00:00:00-06:00
draft = false
+++
```

Create `content/speakers/YEAR/_index.md`:

```toml
+++
title = 'Archived 2026 Speakers'
date = 2026-03-01T00:00:00-06:00
draft = false
+++
```

These make `/sessions/2026/` and `/speakers/2026/` browsable listings.

---

## Step 3 — Create an Archive File for Each Session

For each `.md` file in `content/sessions/` (excluding `_index.md` and `cfp.md`), create a corresponding file in `content/sessions/YEAR/`.

Name the file the same as the original (e.g., `keynote.md`, `workshop1.md`).

Copy the frontmatter and content. You can remove `trackOrder`, `spansInto`, `endTime`, and `speakers` since they are only used by the list page template — the archive uses a different layout.

**Template for an archive session file:**

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

## Keynote By Brian P. Hogan

Brian P. Hogan is a technical content expert, software developer, teacher, and musician...

[Full bio and session description copied here]
```

> **Tip on speaker links:** Links like `/speakers/bphogan/` will 404 if that speaker isn't presenting next year. To make archive pages fully self-contained, paste the speaker's bio text directly into the archived session description instead of linking to their speaker page.

Once all session files are in `content/sessions/YEAR/`, they become permanently accessible at `/sessions/YEAR/{id}/`.

---

## Step 4 — Create an Archive File for Each Speaker

For each `.md` file in `content/speakers/` (excluding `_index.md` and `cfp.md`), create a corresponding file in `content/speakers/YEAR/`.

Name the file the same as the original (e.g., `bpHogan.md`, `coryl.md`).

Copy the full frontmatter and bio content. You can remove `weight`, `keynote`, and `companyLogo` since they are only used by the speakers list template. Keep `title`, `date`, `draft`, and `image`/`images`.

**Template for an archive speaker file:**

```yaml
---
title: 'Brian P. Hogan'
date: 2026-03-01
draft: false
image: /img/speakers/bpHogan.jpg
---

Brian P. Hogan is a technical content expert, software developer, teacher, and musician...

[Full bio copied here]
```

Once all speaker files are in `content/speakers/YEAR/`, they become permanently accessible at `/speakers/YEAR/{id}/`.

---

## Step 5 — Remove Current Session Files

Delete all session `.md` files from `content/sessions/` (everything except `_index.md` and `cfp.md`).

Do **not** delete the year subdirectories.

---

## Step 6 — Remove Current Speaker Files

Delete all speaker `.md` files from `content/speakers/` (everything except `_index.md` and `cfp.md`).

Do **not** delete the year subdirectories.

---

## Step 7 — Add New Speakers and Sessions

1. Add new speaker `.md` files to `content/speakers/`. Set `date` to the new conference year. See `docs/runbook-create-speakers.md`.
2. Add new session `.md` files to `content/sessions/`. Set `date` to the new conference year. See `docs/runbook-create-sessions.md`.

Returning speakers must be re-added as new files with the updated conference year date. Speaker files in the archive subdirectory are self-contained records and are not reused for the live list.

---

## Checklist

- [ ] Created `content/sessions/YEAR/` directory
- [ ] Created `content/sessions/YEAR/_index.md`
- [ ] Created one archive `.md` per session in `content/sessions/YEAR/`
- [ ] Verified speaker links in session archive files (replaced with inline text where needed)
- [ ] Deleted old session `.md` files from `content/sessions/`
- [ ] Created `content/speakers/YEAR/` directory
- [ ] Created `content/speakers/YEAR/_index.md`
- [ ] Created one archive `.md` per speaker in `content/speakers/YEAR/`
- [ ] Deleted old speaker `.md` files from `content/speakers/`
- [ ] Added new speaker files for upcoming conference
- [ ] Added new session files for upcoming conference
- [ ] Verified `/sessions/YEAR/` renders correctly
- [ ] Verified `/speakers/YEAR/` renders correctly
- [ ] Verified `/speakers/` shows only current year speakers
- [ ] Verified `/sessions/` shows only current year sessions
- [ ] Verified `/schedule/` shows correct sessions
