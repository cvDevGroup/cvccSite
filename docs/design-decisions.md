# Design Decisions

This document records significant technical and architectural decisions made during the development of the CVCC site. Each entry includes the context that drove the decision, what was chosen, and the tradeoffs accepted.

---

## Decision Index

| ID | Title | Status | Date |
|---|---|---|---|
| DD-001 | Content data strategy: individual `.md` files vs. Hugo Content Adapters | Accepted | 2026-03 |
| DD-002 | _Placeholder: Theme customization approach_ | _Proposed_ | — |
| DD-003 | _Placeholder: CSS architecture_ | _Proposed_ | — |

---

## DD-001 — Content Data Strategy

**Status:** Accepted
**Date:** 2026-03

### Context

Speaker and session data needs to be authored and maintained by non-developers each year. Two approaches were evaluated:

**Option A — Individual `.md` files** (current approach)
Each speaker and session is a separate Markdown file in `content/speakers/` or `content/sessions/`. Frontmatter holds structured data (name, photo, time slot, track, etc.); the file body holds free-form content (bio, session description).

**Option B — Hugo Content Adapters + `data/conference.yaml`**
All speakers and sessions are defined in a single `data/conference.yaml` file. Hugo Content Adapters (`_content.gotmpl`) generate virtual pages from that data at build time. No individual `.md` files exist for speakers or sessions.

Option B was fully implemented on the `SkylerSchedule` branch before the team evaluated both approaches side by side.

### Decision

The team chose **Option A — individual `.md` files**.

### Reasons

- **Lower barrier to entry.** Content authors can create or edit a speaker or session by opening a single file. The file structure (frontmatter + body) is self-explanatory without knowledge of YAML anchors, Hugo data templates, or the adapter mechanism.
- **Hugo's native editing experience.** Individual `.md` files integrate directly with Hugo's content workflow — draft previews, `hugo new`, and the file-per-page mental model all work as expected.
- **Simpler debugging.** When a speaker doesn't appear on the page, the problem is isolated to one file. With a central YAML file, a formatting error anywhere in the file can silently break all speakers or sessions.
- **Avoids a non-standard Hugo feature.** Content Adapters were introduced in Hugo v0.126. The feature is less documented and less familiar than standard content files. Keeping the site on conventional patterns reduces onboarding friction for future maintainers.
- **No meaningful duplication problem to solve.** The concern Content Adapters address (centralizing shared data) applies when the same data is referenced from many templates. On this site, speaker and session data each have one primary consumer (their respective list template), so a central file adds indirection without eliminating real duplication.

### Tradeoffs Accepted

- Year-end maintenance requires updating many individual files rather than editing one YAML file.
- There is no single file to audit all speakers or sessions at a glance — you must look across the `content/speakers/` directory.
- Adding a new structured field to all speakers requires editing every speaker file individually.

### Consequences

- `content/speakers/*.md` and `content/sessions/*.md` remain the canonical source for all speaker and session data.
- `data/conference.yaml` may still be used for site-wide configuration values (e.g., `showCompanyLogos`) that are not per-speaker or per-session.
- If the number of speakers or sessions grows significantly, or if the same data needs to be rendered in more than two or three places, this decision should be revisited.

### References

- `docs/deepdive-speakers-page.md` — how the speakers list template consumes individual `.md` files
- `docs/deepdive-sessions-page.md` — how the sessions list template consumes individual `.md` files
- `/Users/Skyler/Desktop/Skyler_Dev_Stuff/data-strategy-comparison.md` — full side-by-side comparison document produced during evaluation

---

## DD-002 — Theme Customization Approach

**Status:** _Placeholder — decision not yet documented_

### Context

_Describe the problem or question that required a decision. For example: how to customize the codeCamp theme without forking it, and what the risks of each approach are._

### Decision

_State what was decided._

### Reasons

_List the reasons this option was chosen over the alternatives._

### Tradeoffs Accepted

_List what was given up or accepted as a cost of this decision._

### Consequences

_Describe how this decision shapes future work or constrains future choices._

---

## DD-003 — CSS Architecture

**Status:** _Placeholder — decision not yet documented_

### Context

_Describe the problem or question that required a decision. For example: whether to use scoped component CSS, a utility framework, or a single growing stylesheet appended to the theme._

### Decision

_State what was decided._

### Reasons

_List the reasons this option was chosen over the alternatives._

### Tradeoffs Accepted

_List what was given up or accepted as a cost of this decision._

### Consequences

_Describe how this decision shapes future work or constrains future choices._
