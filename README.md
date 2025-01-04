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

if you want to test from mobile
```
hugo serve --bind 192.168.1.20 baseURL http://192.168.1.20/
```

Access on http://localhost:1313


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


 


