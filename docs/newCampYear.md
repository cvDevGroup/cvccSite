# Starting a New Camp Year

This document explains how to roll the site over from one Code Camp to the next.

## Overview

The current camp's content lives at the top of each section (`content/sessions/`, `content/sponsors/`). Past camps live in year folders (`content/sessions/2026/`). The **Sessions**, **Schedule** and **Speakers** pages all treat "top level" as current, so rolling over is mostly moving files.

## Steps

1. **Archive sessions.** Move the current sessions into `content/sessions/<year>/` and add an `_index.md`:

   ```toml
   +++
   title = 'Archived <year> Sessions'
   date = <event date>
   draft = false
   +++
   ```

   Leave reusable pages, like the call for speakers (`cfp.md`), at the top level.

2. **Archive sponsors.** Move the current sponsors into `content/sponsors/<year>/` with an `_index.md` (`title = '<year> Sponsors'`, `layout = "sponsorlist"`). Move the year's "Special Thanks" list there too.

3. **Add a recap.** Create `content/past_camps/<year>.md`.

4. **Bump the year.** Set `campYear` in `hugo.toml` to the new camp's year. It drives the "<year> Sessions" and "<year> Presenters" headings and the `{{< campYear >}}` shortcode.

5. **Leave speakers where they are.** Speakers aren't archived by year (see [speakers.md](speakers.md)). Returning speakers just get named in the new year's sessions.

## Things That Don't Depend on Dates

Which sessions and speakers count as "current" comes from **where files live**, not their `date`. A session dated in the future isn't published until that date, so don't date new-camp sessions ahead. Use the date you write them.
