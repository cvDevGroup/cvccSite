+++
title = "Build Your Own Private ChatGPT: Local AI with Docker, Ollama, Open WebUI, and ZImage Turbo"
date = 2026-03-01T00:05:06-06:00
draft = false
sessionTime = "1:30 pm"
location = "Workshop Track"
weight = 12
layout = "session"
+++

[Lwin & Min Maung](/speakers/maungs)


Everyone is experimenting with AI — but most organizations are sending sensitive data to third-party cloud services without fully understanding the tradeoffs.

What if you could run your own private ChatGPT-style system locally (and even hook up additional agents and management systems like OpenClaw)?

<!--more-->

In this hands-on, live-build session, we’ll create a fully functional private Chat AI assistant that will create code, images, and talk to you via chat and voice interfaces using:
- Docker
- Ollama
- Open WebUI
- Local LLMs
- Local image generation (Z-Image Turbo)
- TTS using Kokoro AI

Using only a laptop and open-source tools, we’ll build a system that:

- Runs entirely on your own machine
- Keeps company data private
- Remembers conversation history
- Supports multiple models
- Generates images locally
- Can be extended for team use

No enterprise AI budget required. No cloud lock-in. No sending your data to the internet.

By the end of this session, you’ll understand how local AI actually works — and how you can deploy it yourself or inside your organization.

This is not theory.
We will build it live.


## Workshop pre-requisites:
Working computer with:
- Reasonable CPU running reasonable OS
    - Windows (Intel 8th gen or newer)
    - Linux (Intel 8th gen or newer)
    - Mac (Intel 8th gen or newer or M1 or newer)
- Reasonable RAM 
    - 16 GB or RAM would be a good starting point
- Reasonable GPU
    - While not required for basics... 
        - Basic ML inference recommends: 12GB of vRAM
        - ZImage Turbo: 24GB of vRAM
- Software preinstalled (we can configure it in workshop)
    - Docker
    - Ollama
    - Git
    - GIT-LFS (optional)
    - Curl (on linux)

The Maungs are going to be working and performing their workshop demos on Intel NUC 10th Gen i5  with 16GB of DDR4 for basic setup.
Basic setup:

- Docker
- Ollama
- Kokoro TTS
- Open WebUI
- Basic models that can run on CPU with 16GB of RAM


They will demo / show you steps on how to enable Image creation using ZImage Turbo and add that feature on to OpenWebUI.
This will be demoed on MacBook Pro M3 with 128GB of vRAM (and / or) Nvidia DGX Spark (128GB of vRAM), (and / or) Ubuntu Server with Undisclosed NVidia GPUs. ;)