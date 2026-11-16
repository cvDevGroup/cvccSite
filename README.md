# Chippewa Valley Code Camp site


## prerequisites


install hugo - https://gohugo.io/installation/windows/

We're using this CSS lib: [spectre](https://picturepan2.github.io/spectre/getting-started.html)


## how to use this repo
build site
```
git clone https://github.com/cvDevGroup/cvccSite.git
cd cvccSite
hugo serve
```

if you want to test from other devices on your wifi:
run dev server with `--bind` and `basURL` flags.

Any posts with `draft=true` at the top won't render, but if you want to run a dev build and test that content, you need to run `--buildDrafts` and those posts will display.
```
hugo serve --bind 192.168.1.20 baseURL http://192.168.1.20/ --buildDrafts
```

Access on http://localhost:1313

## Speakers and sessions

Speakers are a Hugo [taxonomy](https://gohugo.io/content-management/taxonomies/): sessions say who presented them, and each speaker page lists that speaker's talks across every Code Camp year automatically.

### Adding a speaker
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
The page is published at `/speakers/janed/` (lowercase), even before Jane has a session.

> **Don't** create `content/speakers/janeD.md` as a single file. It would hide Jane's talks, so the build stops with an error telling you to move it into a folder.

### Linking a session to its speakers
List speaker IDs in the session's front matter:
```toml
+++
title = "My Talk"
speakers = ["janeD"]          # panels: ["janeD", "coryL", "bpHogan"]
+++
```
- Sessions directly in `content/sessions/` are the current camp (`campYear` in `hugo.toml`). Their speakers appear under "Presenters" on `/speakers/`.
- Sessions in `content/sessions/<year>/` are archives. Their speakers appear under that year in "Past Presenters".
- Naming someone without a bio still works: they get a page listing their talks, and the build prints a warning in case it's a typo.

## Rolling over to a new year
1. Move the current sessions into `content/sessions/<year>/` (add an `_index.md` with `title = 'Archived <year> Sessions'`), and the same for sponsors in `content/sponsors/<year>/`.
2. Bump `campYear` in `hugo.toml`.
3. Speakers stay where they are. Returning speakers just get named in the new year's sessions.


## Event TODO
- Nail down start/end times and update
    - home page
    - eventbrite
    - Papercall?
- Get an afterparty spot
    - sent a message to [WILD](https://www.visiteauclaire.com/listing/wild%3a-a-feral-kitchen-by-livegreatfood/4942/#tab-map)
        - they haven't got back
- Sponsor Page: list items we need
    - Coffee
        - $100
    - Breakfast
        - $200
    - Lunch
        - $600
    - Afterparty
        - $1000
    - Speaker Swag
        - And T-shirts?!
- Nail down event time with CVTC!
    - official start and end times
        - update Eventbrite, Volume1, papercall, WEAU event page, and website
    

## Site Todo
- Schedule page
    - The schedule page should be just a `<table>` element
    - The rows consist of talk titles, names, and locations from `/sessions` posts
        - put a var in `/sessions` for talk time
            - list the specific times in each session post?
            - maybe specify talk order in there?
                - lunch is likely going to be the 3rd item on the list
                - eg. list 4 for third talk that day?
    - At the end of the day, i'd love to be able to just edit posts in `/sessions`, and have a table built out that shows everything
- CSS editing 
    - I'm only loading a main.css and a spectre.min.css file
    - [spectre docs](https://picturepan2.github.io/spectre/getting-started.html)
- Page templates that need to be did
    - Speakers
    - Sessions
    - schedule
        - Template that reads each .md in sessions folder
        - grabs 'sessionTime' metadata
        - creates a schedule list like https://archive.chippewavalleycodecamp.com/2023/schedule.html


Base layout nees reworking
 - all links relative


 


