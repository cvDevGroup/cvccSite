+++
title = "Teach Your AI to Code Like You: A Hands-On Setup Workshop"
date = 2026-03-01T00:05:06-06:00
draft = false
sessionTime = "9:30 am"
location = "Workshop Track"
# link = "sessions/modernGo"
weight = 3
layout = "session"
+++

[Cory La Nou](/speakers/coryl)

You've spent years mastering how to design, debug, and build software. Your AI coding assistant has no idea. In this hands-on workshop, you'll teach it to work the way you work, and leave with a setup you can use Monday morning.

<!--more-->

Here's what most people get wrong about AI coding assistants: they install one and start prompting. The AI writes code based on whatever it thinks is best practice from the internet. You end up with spaghetti code that doesn't match your style, your patterns, or your architecture. So you decide AI is overhyped.

But you're still a software engineer. You've spent years learning how to design systems, debug problems, structure code, and make trade-offs. That knowledge is the most valuable thing you bring to the table. The secret to getting real value from AI isn't better prompts. It's teaching the AI to work the way you work.

An unconfigured AI codes like a junior developer who just read Stack Overflow. A properly configured AI codes like a teammate who understands your codebase, follows your conventions, and respects your decisions. The difference is setup.

This workshop teaches you that setup.

**What we'll build together:**

1. **Encoding your engineering standards**
   - Writing a CLAUDE.md / AGENTS.md / GEMINI.md that captures how you work
   - Defining the code quality standards you've learned matter
   - Setting up git workflow rules that match how your team actually operates

2. **Adding the guardrails you'd never skip**
   - Safety rules that reflect the discipline you've built over your career
   - Blocking force pushes, hard resets, and file overwrites
   - Requiring confirmation for the same things you'd double-check yourself

3. **Automating your workflow patterns**
   - Pre-tool hooks that validate before the AI acts
   - Post-tool hooks that catch errors and retry
   - CI integration that holds the AI to the same standards you hold yourself

4. **Building and finding skills**
   - Building your own custom slash commands that capture your repeated workflows
   - Auto-invoked skills that teach the AI your patterns without you having to ask
   - Finding and evaluating existing community skills so you're not reinventing the wheel

5. **Leveraging the ecosystem**
   - MCP servers already exist for Stripe, Railway, Supabase, Sentry, Docker, Linear, and dozens more
   - If you use a major service, there's probably an integration ready to go
   - How to find, evaluate, and connect these to your AI assistant
   - When to use an existing integration vs build your own

6. **The feedback loop**
   - Your config is a living document that grows as you learn
   - Every time the AI does something you wouldn't do, that's a rule you haven't written yet
   - Sharing configs across teams and projects

**What to bring:**

- A laptop with a terminal-based AI coding assistant installed. Any of these work:
  - **Claude Code** (recommended, requires Anthropic Pro subscription, $20/mo)
  - **Codex CLI** (requires ChatGPT Plus subscription, $20/mo)
  - **Gemini CLI** (free with a Google account)
- A project you're actively working on (we'll configure the AI for YOUR code)
- A GitHub account (for the workflow automation sections)

Don't have a paid subscription? No problem. Gemini CLI is completely free with a Google account and has generous rate limits. I'll teach with Claude Code but all instructions will include the equivalent steps for Codex CLI and Gemini CLI so everyone can follow along regardless of which tool they use.

**What you'll leave with:**

- A global configuration file that encodes your engineering standards and safety rules
- A project-level instruction file that teaches the AI one of your real projects
- At least one custom skill that captures a workflow pattern you use regularly
- MCP servers connected for services you already use
- A reference guide for continuing to grow your setup over time

No specific programming language required. The configuration patterns work across all languages.