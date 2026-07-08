# CLAUDE.md — Chippewa Valley Code Camp Site

This file guides Claude Code when working in this repository.

---

## What This Repo Is

A Hugo static site for the annual Chippewa Valley Code Camp conference. Content authors (non-developers) manage speakers and sessions each year by editing Markdown files. The site builds to static HTML and is deployed as-is.

**Stack:**
- Hugo v0.155+ (static site generator)
- Theme: `themes/codeCamp/` (do not fork — override at site level instead)
- CSS framework: Spectre CSS (`themes/codeCamp/assets/css/spectre.min.css`) — treat as read-only
- Custom CSS: `themes/codeCamp/assets/css/main.css` — all site customizations live here

---

## Running the Site Locally

```bash
hugo serve
```

Access at `http://localhost:1313`. Draft pages are hidden by default. To include them:

```bash
hugo serve --buildDrafts
```

To test from other devices on your network:

```bash
hugo serve --bind <your-ip> --baseURL http://<your-ip>/ --buildDrafts
```

---

## Repository Structure

```
content/
  speakers/       # One .md per speaker (current year)
  sessions/       # One .md per session (current year)
  sessions/YEAR/  # Archived sessions from past years
  speakers/YEAR/  # Archived speakers from past years

layouts/
  _default/       # Site-level list templates (override theme)
  sessions/       # Site-level session single layout
  partials/       # Shared template logic (e.g. speaker-photo.html)

themes/codeCamp/
  assets/css/main.css   # All custom CSS lives here
  layouts/              # Theme base layouts — override at site level, don't edit

data/
  conference.yaml       # Site-wide config values (e.g. showCompanyLogos)
                        # NOT used for speaker or session data — see Design Decisions

docs/                   # Internal documentation — see below
```

---

## Content Patterns

### Speakers

Each speaker is a `.md` file in `content/speakers/`. Frontmatter is **YAML**. The `date` field must be set to the current conference year or the speaker will not appear on the list page.

Key frontmatter fields: `title`, `date`, `draft`, `weight`, `image`, `images` (multi-speaker), `keynote`, `companyLogo`.

See `docs/runbook-create-speakers.md` for full field reference and examples.

### Sessions

Each session is a `.md` file in `content/sessions/`. Frontmatter is **TOML**. The `date` field must be set to the current conference year.

Key frontmatter fields: `title`, `date`, `draft`, `weight`, `sessionTime`, `location`, `trackOrder`, `layout`, `speakers`, `endTime`, `spansInto`.

The `<!--more-->` tag splits content — everything before it appears in the overlay summary; everything after only appears on the full session detail page.

See `docs/runbook-create-sessions.md` for full field reference and examples.

### Year Filtering

- **Speakers list** (`layouts/_default/speakers.html`): filters `.RegularPages` by `PublishDate.Year == now.Year`. Only direct children of `content/speakers/` are included — pages in year subdirectories are automatically excluded.
- **Sessions list** (`layouts/_default/sessions.html`): filters `.Site.RegularPages` by `Section == "sessions"` and `PublishDate.Year == now.Year`. Year subdirectories (`2025/`, `2026/`) are their own sections and are automatically excluded.

### Year-End Archive

At year end, both speakers and sessions are copied to `content/speakers/YEAR/` and `content/sessions/YEAR/` respectively, then removed from the root directories. The year subdirectory approach is sufficient to exclude them from the live list — no date changes or flags needed.

See `docs/runbook-archive-sessions.md` for the full process and checklist.

---

## Template Patterns

### Overriding Theme Layouts

Never edit theme layout files. Instead, create a file at the same path under `layouts/` at the site root. Hugo resolves site-level layouts before theme layouts.

| Theme file | Site override |
|---|---|
| `themes/codeCamp/layouts/_default/speakers.html` | `layouts/_default/speakers.html` |
| `themes/codeCamp/layouts/_default/sessions.html` | `layouts/_default/sessions.html` |

### Shared Partial Logic

Reusable template fragments live in `layouts/partials/`. Call them with:

```gotemplate
{{ partial "partial-name.html" . }}           {{/* pass current context */}}
{{ partial "partial-name.html" $someValue }}  {{/* pass a specific value */}}
```

Current partials:
- `layouts/partials/speaker-photo.html` — renders a speaker's photo (single, stacked, or placeholder). Accepts a speaker page object as context. Used in both `speakers.html` and `sessions.html`.

When the same template block appears in more than one layout file, extract it to a partial.

### The `<template>` Overlay Pattern

Both the speakers and sessions pages use the HTML `<template>` element to power click-to-open overlays. Hugo renders the overlay content into inert `<template>` elements at build time; JavaScript clones the content into the visible overlay on click.

```gotemplate
{{/* Build time: Hugo writes one <template> per item */}}
<template id="session-{{ $id }}">
  <h2>{{ .Title }}</h2>
  ...
</template>

{{/* Runtime: JS clones the template content into the overlay on click */}}
const tmpl = document.getElementById(card.dataset.session);
content.appendChild(tmpl.content.cloneNode(true));
```

This pattern avoids network requests on click, defers image loading until the overlay opens, and sidesteps HTML escaping issues with data attributes. See `docs/deepdive-html-template-pattern.md` for a full walkthrough.

### CSS Conventions

All custom CSS is appended to `themes/codeCamp/assets/css/main.css`. New sections must begin with a comment marker in this format:

```css
/* ── Section Name ──────────────────────────────────── */
```

Use `data-*` attribute selectors for variant styling (e.g., location pill colors):

```css
.session-card-location[data-location="Workshop Track"] { ... }
```

---

## Design Decisions

Significant architectural decisions are recorded in `docs/design-decisions.md`. Before introducing a new approach that differs from existing patterns, check there first. If you make a decision with meaningful tradeoffs, add an entry.

**Key standing decision — DD-001:** Speaker and session data is stored as individual `.md` files. Hugo Content Adapters and a central `data/conference.yaml` for content were evaluated and rejected. Do not reintroduce that pattern without a new decision record. `data/conference.yaml` may still be used for site-wide config values (e.g., `showCompanyLogos`), not for per-speaker or per-session data.

---

## Documentation Requirements

This site is maintained by a small rotating team. When you add or change something non-trivial, update or create the appropriate doc so the next developer isn't starting from scratch.

### When to write a runbook

Write or update a runbook in `docs/runbook-*.md` any time you add or change a workflow that a content author or maintainer will need to repeat — adding a speaker, adding a session, archiving a year, etc. Runbooks are step-by-step and action-oriented.

### When to write a deep dive

Write or update a deep dive in `docs/deepdive-*.md` any time you introduce a new template mechanism, a non-obvious Hugo pattern, or a feature with enough moving parts that a new developer would struggle to follow it from code alone. Deep dives explain *how* and *why*, with annotated code examples.

**What makes something worth a deep dive:**
- It uses a Hugo feature that isn't obvious from the template alone (e.g., `site.GetPage`, `union`, `PublishDate.Year`)
- It involves coordinated behavior across Hugo, HTML, CSS, and JavaScript
- It has a "common mistake" that would be easy to introduce (e.g., the `spansInto` string format, exact `sessionTime` matching)
- A new developer reading the code would likely ask "why does this work this way?"

### When to add a design decision

Add an entry to `docs/design-decisions.md` when you make a choice between two reasonable approaches with real tradeoffs — especially if the rejected option might look attractive to a future developer.

### Doc file naming

| Type | Pattern | Example |
|---|---|---|
| Runbook | `docs/runbook-{topic}.md` | `docs/runbook-create-speakers.md` |
| Deep dive | `docs/deepdive-{topic}.md` | `docs/deepdive-sessions-page.md` |
| Design decisions | `docs/design-decisions.md` | (single file, add entries) |
