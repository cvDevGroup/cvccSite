# Runbook: Sessions

Step-by-step instructions for managing session entries on the CVCC site.

---

## Adding a New Session

1. Create a new `.md` file in `content/sessions/`. Name it using a short camelCase identifier (e.g., `myNewTalk.md`). Hugo lowercases the path, so the URL will be `/sessions/mynewtalk/`.

2. Add TOML frontmatter followed by the description:

```toml
+++
title = "My New Talk Title"
date = 2026-03-01
draft = false
sessionTime = "10:30 am"
location = "Presentation Track"
weight = 5
trackOrder = 2
layout = "session"
speakers = ["janesmith"]
+++

[Jane Smith](/speakers/janesmith)

A short summary of the session that appears in the overlay when a user clicks the card.

<!--more-->

The full description continues here. Everything after <!--more--> only appears on the
full session detail page, not in the overlay.
```

3. The session will appear on `/sessions/` grouped under its time slot, and on `/schedule/`.

---

## Frontmatter Field Reference

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Full session title shown on the card and overlay |
| `date` | Yes | Must be set to the **current conference year**. Controls year filtering on the sessions list. |
| `draft` | Yes | Set to `false` to publish |
| `sessionTime` | Yes | Time string exactly as it should appear (e.g., `"9:30 am"`). Must match exactly across all sessions in the same slot — used for grouping. |
| `location` | Yes | Track or room name (e.g., `"Workshop Track"`, `"Presentation Track"`, `"Commons"`) |
| `weight` | Yes | Integer sort order. Determines the order of time slots on the page and intra-slot order when `trackOrder` values are equal. Lower = earlier. |
| `trackOrder` | Yes | Controls the left-to-right order of cards within a time slot. Use `1` for Workshop Track, `2` for Presentation Track, `3` for Commons/other. |
| `layout` | Yes | Always `"session"` — uses the session single-page layout |
| `speakers` | No | Array of speaker IDs (matching `content/speakers/` filenames, lowercased). Used to display speaker photos and names on the card and in the overlay. |
| `endTime` | No | End time string (e.g., `"3:30 pm"`). Shown as "Continues until 3:30 pm" on the card. Required if using `spansInto`. |
| `spansInto` | No | Array of time slot strings this session continues into. Triggers a continuation card in each listed slot. See [Multi-Slot Sessions](#multi-slot-sessions). |

---

## Track Order Values

| `trackOrder` | Track |
|---|---|
| `1` | Workshop Track |
| `2` | Presentation Track |
| `3` | Commons, Growler Guys, or any non-track session |

Within each time slot, cards are sorted by `trackOrder` ascending, so Workshop always appears before Presentation Track — even for continuation cards.

---

## Linking to a Speaker

In the session description (below the frontmatter), link to the speaker using a plain markdown link with the speaker's lowercased ID:

```markdown
[Jane Smith](/speakers/janesmith)
```

> **Important:** Use lowercased IDs in URLs. Hugo lowercases all paths, so `/speakers/JaneSmith` will 404 — use `/speakers/janesmith`.

The speaker's photo is pulled separately via the `speakers` frontmatter array and displayed in the overlay. The inline link in the description is for attribution text in the full session page.

---

## The `<!--more-->` Divider

The `<!--more-->` tag controls what appears in the overlay vs. the full session page:

- **Everything before `<!--more-->`** → shown in the overlay when a user clicks the card (`Summary`)
- **Everything after `<!--more-->`** → only visible on the full session detail page (`/sessions/mynewtalk/`)

The overlay also shows a "Read full description →" link to the full page.

If there is no `<!--more-->` tag, the entire content is shown in the overlay.

---

## Multi-Slot Sessions

For sessions that run longer than one time slot (e.g., a workshop from 9:30 am to 12:00 pm):

1. Add `endTime` with the session's end time.
2. Add `spansInto` with an array of each additional time slot the session occupies.

```toml
sessionTime = "9:30 am"
endTime = "12:00 pm"
spansInto = ["10:30 am", "11:30 am"]
```

> **Common mistake:** `spansInto = ["10:30 am, 11:30 am"]` is **wrong** — that's a single string with a comma inside it, not two entries. Each time slot must be its own quoted string separated by a comma.

The session will then show:
- A **normal card** at its `sessionTime` slot with "Continues until 12:00 pm" at the bottom
- A **continuation card** (dashed border, slightly muted, "▶ Still in session until 12:00 pm") at each slot listed in `spansInto`

The continuation cards link to the same session page and show the same overlay as the original card.

---

## Editing an Existing Session

Open the session's `.md` file in `content/sessions/` and edit directly. Changes take effect on the next build.

---

## Removing a Session

Delete the session's `.md` file from `content/sessions/`. It will be removed from both the sessions list and the schedule automatically.

---

## Adding a Session Without a Speaker

Sessions like Lunch, Closing Remarks, and Afterparty don't have speakers. Simply omit the `speakers` field. The overlay will show the title and description but no photo section.

```toml
+++
title = "Lunch"
date = 2026-01-19
draft = false
sessionTime = "12:15 pm"
location = "Commons"
weight = 10
trackOrder = 3
layout = "session"
+++

Erbs & Gerbs sandwiches with chips.
```
