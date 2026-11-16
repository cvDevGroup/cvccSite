# Runbook: Speakers

Step-by-step instructions for managing speaker entries on the CVCC site.

---

## Adding a New Speaker

1. Create a new `.md` file in `content/speakers/`. Name it using the speaker's identifier in camelCase (e.g., `janeSmith.md`). Hugo lowercases all paths, so the URL will be `/speakers/janesmith/`.

2. Add YAML frontmatter followed by the bio:

```yaml
---
title: 'Jane Smith'
date: 2026-03-01
draft: false
weight: 7
image: /img/speakers/jane-smith.jpg
---

Jane is a software engineer at Chippewa Valley Dev Group specializing in distributed systems.
She has spoken at numerous conferences and is the author of three books.
```

3. Place the speaker's photo in `static/img/speakers/`. Match the path used in `image:`.

4. The speaker will appear on `/speakers/` as soon as the site rebuilds.

---

## Frontmatter Field Reference

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Full display name shown on the card and in the bio overlay |
| `date` | Yes | Must be set to the **current conference year** (e.g., `2026-03-01`). Controls whether the speaker appears on the list. If this is a past year, the speaker will not show up. |
| `draft` | Yes | Set to `false` to publish. `true` hides the speaker from all pages. |
| `weight` | Yes | Integer sort order on the speakers page. Lower numbers appear first. |
| `image` | No | Path to a single profile photo in `static/`. Displayed on the card and in the bio overlay. |
| `images` | No | Array of photo paths for multi-person entries — see [Multi-Speaker Entries](#multi-speaker-entries) below. Takes precedence over `image`. |
| `keynote` | No | Set to `true` to display this speaker above the main grid with a gold border. Omit or set to `false` for regular speakers. |
| `companyLogo` | No | Path to a company/employer logo in `static/`. Only displayed when `showCompanyLogos` is enabled — see [Company Logos](#company-logos). |

---

## Editing an Existing Speaker

Open the speaker's `.md` file in `content/speakers/` and edit the frontmatter or bio text directly. There is no cache to clear — the site rebuilds from source.

---

## Removing a Speaker

Delete the speaker's `.md` file from `content/speakers/`. Also check `content/sessions/*.md` for any session files that link to that speaker and update or remove those links.

---

## Designating a Keynote Speaker

Add `keynote: true` to the speaker's frontmatter:

```yaml
---
title: 'Brian P. Hogan'
date: 2026-02-02
draft: false
weight: 5
keynote: true
image: /img/speakers/bpHogan.jpg
---
```

The speaker will appear above the main grid in a separate section with a gold border and "✦ Keynote Speaker" label. Multiple keynote speakers are supported — each will appear in the keynote section side by side. Their cards center automatically when they don't fill a full row.

To remove the keynote designation, delete the `keynote:` line or change it to `keynote: false`.

---

## Multi-Speaker Entries

For a single card representing two or more people (e.g., a co-presenting duo), use the `images` array instead of `image`:

```yaml
---
title: 'Lwin & Min Maung'
date: 2026-02-02
draft: false
weight: 16
images:
  - /img/speakers/lwin-maung.jpg
  - /img/speakers/min-maung.jpg
---
```

When `images` has two or more entries the card displays overlapping circular photos (Slack-style group avatar). If any photo file is missing, it automatically falls back to a faded CVCC logo placeholder for that slot.

> **Note:** `images` takes precedence over `image`. If both are set, `images` is used.

---

## Adding a Speaker Photo

1. Get a web-ready image (JPG or PNG). Square or portrait crops work best since photos are displayed as circles cropped to the top-center of the image.

2. Place the file in `static/img/speakers/` (e.g., `static/img/speakers/jane-smith.jpg`).

3. Reference it in the speaker's frontmatter:
   ```yaml
   image: /img/speakers/jane-smith.jpg
   ```

If no `image` or `images` is set, the card shows a faded CVCC logo as a placeholder.

---

## Company Logos

An optional company/employer logo can appear on each speaker card.

**To add a logo for a specific speaker:**
```yaml
companyLogo: /img/companies/acme.png
```
Place the logo file in `static/img/companies/`.

**To show logos globally**, set `showCompanyLogos: true` in `data/conference.yaml` (if that file exists). If the file does not exist, logos are hidden by default.

When `showCompanyLogos` is `true`:
- If the speaker has a `companyLogo` → the company logo is shown
- If the speaker has no `companyLogo` → the faded CVCC badge is shown as fallback

When `showCompanyLogos` is `false`:
- No logo of any kind is shown on any card

---

## Year-End: Archiving Speakers

At year-end, speakers are archived to `content/speakers/YEAR/` and removed from `content/speakers/`. The speakers list template uses `.RegularPages`, which only returns direct children of the speakers section — archived speakers in a year subdirectory are automatically excluded from the live list without any date changes needed.

See `docs/runbook-archive-sessions.md` for the full year-end archive process.
