# Deep Dive: The HTML `<template>` Pattern

How the sessions (and speakers) pages use the browser's native `<template>` element to power click-to-open overlays — built at Hugo compile time, activated at runtime with a handful of JavaScript.

---

## What Is a `<template>` Element?

`<template>` is a standard HTML element. Its contents are parsed by the browser into a real DOM tree, but that tree is **inert** — nothing in it renders, executes, or loads:

```html
<template id="session-keynote">
  <h2>Opening Remarks & Keynote</h2>
  <img src="/img/speakers/bpHogan.jpg">   <!-- this image does NOT load -->
  <p>Brian P. Hogan is a technical content expert...</p>
</template>
```

When the browser parses this, it builds the DOM for the `<h2>`, `<img>`, and `<p>` — but they live in a detached `DocumentFragment` called the template's **content**. They are invisible, the image request is never made, and any `<script>` tags inside would not run.

This is fundamentally different from `display: none`. A hidden element still loads resources and occupies the DOM. A `<template>` element does neither until you explicitly clone its content into the live document.

---

## Step 1 — Hugo Builds the Templates at Compile Time

Before any card grid is rendered, the sessions template loops over every session and outputs one `<template>` element per session. This happens entirely at build time — no JavaScript involved yet.

**The Hugo template loop (from `layouts/_default/sessions.html`):**

```gotemplate
{{ range $sorted }}
{{ $id := .RelPermalink | strings.TrimRight "/" | path.Base }}
<template id="session-{{ $id }}">
  <h2 class="session-overlay-title">{{ .Title }}</h2>

  {{ with .Params.speakers }}
  <div class="session-overlay-speakers">
    {{ range . }}
    {{ $speaker := site.GetPage (printf "/speakers/%s" .) }}
    {{ if $speaker }}
    <div class="session-overlay-speaker">
      {{ partial "speaker-photo.html" $speaker }}
      <p class="session-overlay-speaker-name">{{ $speaker.Title }}</p>
    </div>
    {{ end }}
    {{ end }}
  </div>
  {{ end }}

  <div class="session-overlay-content">
    {{ .Summary }}
  </div>
  <a href="{{ .RelPermalink }}" class="session-overlay-readmore">Read full description &rarr;</a>
</template>
{{ end }}
```

**What Hugo evaluates for the keynote session:**

- `$id` → `"keynote"` (derived from `/sessions/keynote/` by trimming the trailing slash and taking the last path segment)
- `.Title` → `"Opening Remarks & Keynote"`
- `.Params.speakers` → `["bphogan"]`
- `site.GetPage "/speakers/bphogan"` → the Brian P. Hogan page object
- `$speaker.Params.image` → `"/img/speakers/bpHogan.jpg"`
- `$speaker.Title` → `"Brian P. Hogan"`
- `.Summary` → everything before `<!--more-->` in `keynote.md`
- `.RelPermalink` → `"/sessions/keynote/"`

**The rendered HTML output in the page source:**

```html
<template id="session-keynote">
  <h2 class="session-overlay-title">Opening Remarks &amp; Keynote</h2>

  <div class="session-overlay-speakers">
    <div class="session-overlay-speaker">
      <img src="/img/speakers/bpHogan.jpg" alt="Brian P. Hogan" class="speaker-card-photo">
      <p class="session-overlay-speaker-name">Brian P. Hogan</p>
    </div>
  </div>

  <div class="session-overlay-content">
    <p>Brian P. Hogan opens the conference with remarks followed by a keynote on...</p>
  </div>
  <a href="/sessions/keynote/" class="session-overlay-readmore">Read full description →</a>
</template>
```

This HTML is sitting in the page when it loads. The browser has parsed it. But none of it is visible and the image has not been fetched.

---

## Step 2 — Cards Reference Their Template by ID

Each session card carries a `data-session` attribute that matches the `id` of its corresponding `<template>`:

```gotemplate
{{ $id := .RelPermalink | strings.TrimRight "/" | path.Base }}
<div class="session-card"
     data-session="session-{{ $id }}"
     role="button"
     tabindex="0"
     aria-label="View details for {{ .Title }}">
  ...
</div>
```

For the keynote session, this renders as:

```html
<div class="session-card"
     data-session="session-keynote"
     role="button"
     tabindex="0"
     aria-label="View details for Opening Remarks & Keynote">
  <span class="session-card-location" data-location="Commons">Commons</span>
  <p class="session-card-title">Opening Remarks &amp; Keynote</p>
  <p class="session-card-speaker">Brian P. Hogan</p>
</div>
```

The card itself contains only what's visible on the grid. All the rich overlay content — the full photo, bio summary, and read-more link — lives in the separate `<template>` element, not in the card.

---

## Step 3 — The Overlay Container

At the bottom of the page (after all the cards) there is an empty overlay panel:

```html
<div id="session-overlay" role="dialog" aria-modal="true">
  <div class="session-bio-panel" id="session-bio-panel">
    <div class="session-bio-top">
      <button class="session-bio-close" id="session-bio-close" aria-label="Close">&times;</button>
    </div>
    <div id="session-bio-content"></div>  <!-- empty; content is injected here on click -->
  </div>
</div>
```

`#session-bio-content` starts completely empty. It has no content until a card is clicked.

---

## Step 4 — JavaScript Connects the Pieces

The JavaScript wires together the three parts: the card click, the `<template>` lookup, and the overlay injection.

```js
(function () {
  const overlay  = document.getElementById('session-overlay');
  const panel    = document.getElementById('session-bio-panel');
  const content  = document.getElementById('session-bio-content');
  const closeBtn = document.getElementById('session-bio-close');
  let lastFocused = null;

  function openSession(card) {
    const tmpl = document.getElementById(card.dataset.session); // (A)
    if (!tmpl) return;
    content.innerHTML = '';                                      // (B)
    content.appendChild(tmpl.content.cloneNode(true));          // (C)
    lastFocused = card;
    overlay.classList.add('open');                              // (D)
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 60);                    // (E)
  }

  function closeSession() {
    overlay.classList.remove('open');                           // (F)
    document.body.style.overflow = '';
    setTimeout(() => { content.innerHTML = ''; }, 500);        // (G)
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.session-card').forEach(card => {
    card.addEventListener('click', () => openSession(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSession(card); }
    });
  });

  closeBtn.addEventListener('click', closeSession);
  overlay.addEventListener('click', e => { if (!panel.contains(e.target)) closeSession(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSession();
  });
}());
```

---

## Annotated Click Trace

When a user clicks the keynote card, here is exactly what happens line by line:

### (A) — Template Lookup

```js
const tmpl = document.getElementById(card.dataset.session);
```

`card.dataset.session` reads the `data-session="session-keynote"` attribute from the clicked card. `getElementById("session-keynote")` returns the `<template>` element with that ID. At this point `tmpl` is the `<template>` DOM node — not its content, just the container.

### (B) — Clear Previous Content

```js
content.innerHTML = '';
```

If the overlay was previously opened for a different session, this removes that session's content before injecting the new one. On first open, this is a no-op (the container is already empty).

### (C) — Clone and Inject

```js
content.appendChild(tmpl.content.cloneNode(true));
```

This is the core of the pattern. Breaking it down:

- **`tmpl.content`** — every `<template>` element has a `.content` property that returns its `DocumentFragment`. This is the inert DOM tree that was parsed at load time but never rendered.

- **`.cloneNode(true)`** — creates a deep copy of the entire `DocumentFragment` and all its descendants. The `true` argument means "deep clone" (include all child nodes). The original `DocumentFragment` is left completely intact — the template is not consumed or emptied.

- **`content.appendChild(...)`** — moves the cloned fragment's children into `#session-bio-content`. At the moment of append, the browser treats this content as live — images start loading, the text becomes visible, the link becomes clickable.

**Before the clone:**

```
#session-bio-content  (empty div in live DOM)

<template id="session-keynote">  (inert, not rendered)
  └── DocumentFragment
       ├── <h2 class="session-overlay-title">Opening Remarks & Keynote</h2>
       ├── <div class="session-overlay-speakers">...</div>
       ├── <div class="session-overlay-content">...</div>
       └── <a href="/sessions/keynote/" ...>Read full description →</a>
```

**After the clone:**

```
#session-bio-content  (now contains live DOM)
  ├── <h2 class="session-overlay-title">Opening Remarks & Keynote</h2>
  ├── <div class="session-overlay-speakers">...</div>
  ├── <div class="session-overlay-content">...</div>
  └── <a href="/sessions/keynote/" ...>Read full description →</a>

<template id="session-keynote">  (still intact, unchanged)
  └── DocumentFragment
       ├── <h2 ...>...</h2>   ← original still here
       ...
```

The template survives every click. The user can open the same session's overlay multiple times — each time a fresh clone is created from the same intact template.

### (D) — Open the Overlay

```js
overlay.classList.add('open');
```

Adding the `open` class triggers the CSS transition:

```css
.session-bio-panel {
  transform: perspective(1200px) rotateY(-90deg);   /* edge-on: invisible */
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
}
#session-overlay.open .session-bio-panel {
  transform: perspective(1200px) rotateY(0deg);     /* facing forward: visible */
}
```

The panel flips from edge-on to face-forward over 500ms with a spring overshoot.

### (E) — Delay Focus by 60ms

```js
setTimeout(() => closeBtn.focus(), 60);
```

Focus is moved to the close button, but with a 60ms delay. If focus moved immediately (synchronously with adding `.open`), the browser would jump focus before the flip animation had started, causing a jarring scroll or visual jump. The 60ms lets the animation begin first.

### (F) — Close: Remove the Class

```js
overlay.classList.remove('open');
```

Removing `.open` reverses the CSS transition — the panel flips back to edge-on over 500ms.

### (G) — Delay Content Clearing by 500ms

```js
setTimeout(() => { content.innerHTML = ''; }, 500);
```

The content is not cleared immediately. If it were, the panel would be visibly empty while it animates closed. The 500ms matches the CSS `transition` duration exactly, so the panel finishes animating before the DOM is cleared.

---

## Why `<template>` Instead of Alternatives

### Alternative 1: Data Attributes

```html
<div class="session-card" data-title="Keynote" data-summary="Brian P. Hogan opens...">
```

This breaks immediately with arbitrary HTML. Speaker bios contain links, line breaks, image tags, and special characters. Escaping all of that into a single attribute value is fragile and verbose. Hugo's `safeHTMLAttr` doesn't help with multi-line content.

### Alternative 2: Fetch on Click

```js
card.addEventListener('click', () => {
  fetch(`/sessions/${card.dataset.id}/`).then(r => r.text()).then(html => { ... });
});
```

This adds a network round-trip to every overlay open, introduces loading state (spinner or flash), and requires parsing the returned HTML to extract just the overlay content. It also means the overlay can't open instantly.

### Alternative 3: Render All Overlays as Visible Divs, Show/Hide with CSS

```html
<div id="overlay-keynote" style="display:none">...</div>
```

This is the simplest mental model but has two costs: all images load immediately on page load (even if the user never opens an overlay), and the DOM grows proportionally with the number of sessions.

### Why `<template>` Wins

| | `<template>` | Data attributes | Fetch | Hidden divs |
|---|---|---|---|---|
| Images load on demand | Yes | N/A | Yes | No |
| Supports arbitrary HTML | Yes | No | Yes | Yes |
| Instant open (no network) | Yes | Yes | No | Yes |
| DOM size | Low (inert) | Low | Low | High |
| Template survives re-open | Yes | Yes | N/A | Yes |

`<template>` combines the zero-network-cost of pre-rendered HTML with the deferred image loading of fetch, without the escaping limitations of data attributes.

---

## The Continuation Card Case

Sessions with `spansInto` appear as both a regular card and one or more continuation cards. Both card types carry the same `data-session` value pointing to the same `<template>`:

```html
<!-- Regular card at 1:30 pm -->
<div class="session-card" data-session="session-workshop2">
  <p class="session-card-title">Build Your Own Private ChatGPT...</p>
</div>

<!-- Continuation card at 2:30 pm -->
<div class="session-card session-card--continuing" data-session="session-workshop2">
  <span class="session-card-continuing-badge">▶ Still in session until 3:30 pm</span>
  <p class="session-card-title">Build Your Own Private ChatGPT...</p>
</div>
```

Both point to `session-workshop2`. Clicking either card calls `getElementById("session-workshop2")` and clones the same `<template>`. The overlay content is identical regardless of which card was clicked — only the card's visual presentation differs.

---

## The Same Pattern on the Speakers Page

The speakers page uses an identical mechanism. The only differences are:

- Template IDs use `bio-{id}` instead of `session-{id}`
- Cards use `data-bio` instead of `data-session`
- The overlay content is the speaker's bio (`.Content`) rather than a session summary

```html
<!-- Speaker template -->
<template id="bio-bphogan">
  <h2>Brian P. Hogan</h2>
  <p>Brian P. Hogan is a technical content expert...</p>
</template>

<!-- Speaker card -->
<div class="speaker-card" data-bio="bio-bphogan" role="button">
  ...
</div>
```

The JavaScript `openBio` function is structurally identical to `openSession` — it reads `card.dataset.bio`, looks up the template, clones it into the overlay content div, and adds `.open` to the overlay.
