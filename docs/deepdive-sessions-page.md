# Internals: Sessions Page

Technical reference for how the `/sessions/` page works. Intended for developers maintaining or extending the feature.

---

## Files Involved

| File | Purpose |
|---|---|
| `layouts/_default/sessions.html` | Main list layout — overrides the theme's sessions.html |
| `layouts/sessions/single.html` | Single session detail page layout |
| `content/sessions/*.md` | One file per session |
| `content/sessions/_index.md` | Section index; sets the template to `sessions` |
| `themes/codeCamp/assets/css/main.css` | All session card and overlay CSS (search for `/* ── Session`) |

---

## How the Session List Is Built

The template loads all regular pages in the sessions section filtered to the current year:

```gotemplate
{{ $allPages := where (where .Site.RegularPages "Section" "sessions") "PublishDate.Year" (now.Year) }}
{{ $sorted   := sort $allPages "Params.weight" "asc" }}
```

The double `where` is needed because `"Section" "sessions"` matches only direct children of the sessions section — it excludes archived subdirectories (`2025/`, `2026/` etc.) which are their own sections. The year filter then removes anything whose `date` is not the current year.

The result is sorted by `weight` ascending. Weight is the primary chronological ordering mechanism — lower weights appear earlier in the day.

---

## How Time Slots Are Grouped

After sorting, the template makes a single pass to collect unique time slot strings in the order they first appear:

```gotemplate
{{ $times := slice }}
{{ range $sorted }}
  {{ $t := .Param "sessionTime" }}
  {{ if and $t (not (in $times $t)) }}
    {{ $times = $times | append $t }}
  {{ end }}
{{ end }}
```

This produces an ordered list like `["9:00 am", "9:30 am", "10:30 am", ...]`. Because `$sorted` is already weight-ordered, the time slots emerge in chronological order naturally.

> **Important:** The `sessionTime` string must match exactly across all sessions in the same slot. `"9:30 am"` and `"9:30 AM"` would be treated as two different slots. Always use the same format.

---

## How Each Time Group Renders

For each time slot, the template:

1. Filters sessions that start at this time (`$group`)
2. Finds sessions from other slots that `spansInto` this time (`$continuing`)
3. Merges both into one slice and sorts by `trackOrder`
4. Renders each card, using `in $continuing .` to determine card style

```gotemplate
{{ $combined := union $group $continuing }}
{{ $ordered  := sort $combined "Params.trackOrder" "asc" }}
{{ range $ordered }}
  {{ $isContinuing := in $continuing . }}
  <div class="session-card{{ if $isContinuing }} session-card--continuing{{ end }}" ...>
```

---

## The `trackOrder` Field

`trackOrder` is an integer in session frontmatter that controls the left-to-right order of cards within a time slot.

| Value | Track |
|---|---|
| `1` | Workshop Track |
| `2` | Presentation Track |
| `3` | other |

**Why this exists:** Sorting by `weight` alone is sufficient for chronological ordering, but within a single time slot, two sessions may have arbitrary weight values that don't reflect the desired visual column order. For example, workshop1 has weight 3 and speakingc has weight 4 — the weight difference is intentional for ordering but doesn't mean "workshop goes left." `trackOrder` provides an explicit, stable column order.

Crucially, `trackOrder` is also applied to **continuation cards**. A continuation card inherits the `trackOrder` of its original session, so a Workshop Track session that spans into a later slot always appears in column 1 of that later slot — even though its weight value belongs to an earlier time slot.

---

## Multi-Slot Sessions (Continuation Cards)

Sessions that run longer than one time slot use two frontmatter fields:

```toml
endTime = "3:30 pm"
spansInto = ["2:30 pm"]
```

For each time slot listed in `spansInto`, the template checks all sorted pages:

```gotemplate
{{ range $sorted }}
  {{ if in (.Param "spansInto") $time }}
    {{ $continuing = $continuing | append . }}
  {{ end }}
{{ end }}
```

A continuation card is identical to the original card but with:
- `.session-card--continuing` CSS class (dashed border, reduced opacity)
- `"▶ Still in session until X:XX pm"` badge instead of the normal continues label

Both the original and continuation cards share the same `<template>` overlay content, so clicking either opens the same session details.

**Common mistake:** `spansInto = ["10:30 am, 11:30 am"]` (one string with a comma) vs. `spansInto = ["10:30 am", "11:30 am"]` (two separate strings). The template uses `in` for exact string matching — the comma-joined version will never match any time slot.

---

## The Hidden Template Pattern

Before the card grid renders, the template outputs one `<template>` element per session:

```html
<template id="session-keynote">
  <h2 class="session-overlay-title">Opening Remarks & Keynote</h2>
  [speaker photos]
  <div class="session-overlay-content">[summary HTML]</div>
  <a href="/sessions/keynote/" class="session-overlay-readmore">Read full description →</a>
</template>
```

This is the same pattern used on the speakers page. `<template>` elements are parsed but not rendered by the browser. When a card is clicked, JavaScript clones the template content into the visible overlay. This is efficient — no re-rendering, no fetch, no HTML escaping issues.

---

## Speaker Photos in the Overlay

The overlay template looks up each speaker in `speakers` via `site.GetPage`, then delegates photo rendering to the shared partial:

```gotemplate
{{ range .Params.speakers }}
{{ $speaker := site.GetPage (printf "/speakers/%s" .) }}
{{ if $speaker }}
<div class="session-overlay-speaker">
  {{ partial "speaker-photo.html" $speaker }}
  <p class="session-overlay-speaker-name">{{ $speaker.Title }}</p>
</div>
{{ end }}
{{ end }}
```

`site.GetPage "/speakers/bphogan"` returns the page object for that speaker. That object is passed directly to `layouts/partials/speaker-photo.html` as its context, giving the partial access to `image`, `images`, and `Title` — the same fields it uses when called from the speakers page. The stacked, single, and placeholder cases are all handled in one place.

Sessions without a `speakers` field skip this block entirely and show no photos.

---

## Summary vs. Full Content

The overlay shows `.Summary` — Hugo's auto-generated excerpt, which is everything before the `<!--more-->` tag in the content. The full session description (`.Content`) is only visible on the individual session page at `/sessions/{id}/`.

A "Read full description →" link at the bottom of the overlay navigates to the full page.

If a session has no `<!--more-->` tag, `.Summary` equals `.Content` — the entire description appears in the overlay.

---

## Session Card CSS

**Card base (`.session-card`):**
```css
flex: 0 0 calc(33.333% - 0.834rem);  /* 3-column layout */
border-radius: 12px;
border: 1px solid #e0e0e0;
transition: transform 0.2s ease, box-shadow 0.2s ease;
cursor: pointer;
```

The 3-column calculation: `3 × card_width + 2 × 1.25rem = 100%` → `card_width = calc(33.333% - 0.834rem)`.

**Location pill (`.session-card-location`):**
Each track has a distinct color applied via the `data-location` attribute:

| Location | Background | Text |
|---|---|---|
| Presentation Track | `#e8f0fe` (light blue) | `#1a56bb` (dark blue) |
| Workshop Track | `#e6f4ea` (light green) | `#1e7e34` (dark green) |
| Commons | `#fef3e2` (light amber) | `#b45309` (dark amber) |
| Any other | `#f0f0f0` (light gray) | `#555` (dark gray) |

CSS selector:
```css
.session-card-location[data-location="Presentation Track"] { ... }
```

To add a new location with a custom color, add a matching CSS rule using the exact location string as the attribute value.

**Continuation card (`.session-card--continuing`):**
```css
opacity: 0.75;
border-style: dashed;
```
On hover, opacity returns to 1. The dashed border and reduced opacity visually signal that this is not a new session starting at this time.

**Time slot header (`.sessions-time-header`):**
```css
font-size: 0.8rem;
text-transform: uppercase;
letter-spacing: 0.1em;
color: #888;
```
The header has a decorative line extending to the right:
```css
.sessions-time-header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}
```
This is achieved by making the header a flex container and letting the pseudo-element fill remaining space.

**Mobile breakpoint (`max-width: 600px`):**
```css
.session-card { flex: 0 0 calc(50% - 0.375rem); }
```
Collapses to 2 columns. `2 × card_width + 1 × 0.75rem = 100%` → `card_width = calc(50% - 0.375rem)`.

---

## Session Overlay CSS

The session overlay reuses the same flip animation as the speaker overlay:

```css
.session-bio-panel {
  transform: perspective(1200px) rotateY(-90deg);
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
}
#session-overlay.open .session-bio-panel {
  transform: perspective(1200px) rotateY(0deg);
}
```

The panel is wider than the speaker bio panel (`min(680px, 92vw)` vs. the speaker panel) to accommodate session content with speaker photos side by side.

---

## Overlay JavaScript

The overlay JS follows the same pattern as the speakers page:

```js
function openSession(card) {
  const tmpl = document.getElementById(card.dataset.session);
  content.appendChild(tmpl.content.cloneNode(true));
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';   // prevent background scroll
  setTimeout(() => closeBtn.focus(), 60);    // move focus into overlay
}

function closeSession() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { content.innerHTML = ''; }, 500);  // clear after animation
  if (lastFocused) lastFocused.focus();      // return focus to card
}
```

The 60ms delay before focusing the close button allows the flip animation to begin before focus moves, preventing a jarring visual jump.

The 500ms delay before clearing content matches the CSS transition duration so the content doesn't disappear before the panel finishes animating closed.

---

## Single Session Page

Individual session pages use `layouts/sessions/single.html` (site-level override of the theme):

```gotemplate
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ with .Param "sessionTime" }}<span>at {{ . }}</span>{{ end }}
  {{ with .Param "location" }}<span>in {{ . }}</span>{{ end }}
  {{ if or (.Param "sessionTime") (.Param "location") }}<hr/>{{ end }}
  {{ .Content }}
{{ end }}
```

This renders the full `.Content` (not `.Summary`), so the complete session description is visible on the detail page.

---

## Accessibility

- Session cards use `role="button"` and `tabindex="0"`
- `aria-label="View details for {title}"` provides context for screen readers
- Keyboard: `Enter` and `Space` open the overlay; `Escape` closes it
- Focus moves to the close button on open; returns to the card on close
- `aria-modal="true"` on the overlay
- The "Read full description →" link inside the overlay is a real `<a>` tag and is reachable by keyboard when the overlay is open
