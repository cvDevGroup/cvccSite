+++
title = "Building an Independent Search Engine That Beats Google (Maybe)"
date = 2026-03-01T00:05:06-06:00
draft = false
# sessionTime = "2:00-4:00 pm"
# location = "Room B"
# link = "sessions/modernGo"
weight = 10
layout = "session"
+++

[UWEC Student Association for Computing Machinery](/speakers/acmStudents)

We built an independent search engine with its own high-performance web index using web scrapers. The talk will walk through the whole engineering outline of our project, from the policy of our web scrapers, to the networking of our Kubernetes cluster, to the high capacity postgresql database that stores the data for millions of website pages.

In this talk we present [Stultus](https://github.com/ThisIsNotANamepng/search_engine), an open source, modular search engine built on top of its own independent web index. This includes our high-performance cluster of desktop server web scrapers, a high capacity postgresql database, the storage of the scraped web data, the search algorithm, and findings from our downloaded copy of scraped websites.