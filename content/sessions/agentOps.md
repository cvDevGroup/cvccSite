+++
date = 2026-01-19
draft = false
sessionTime = "1:30 pm"
location = "Presentation Track"
title = "AgentOps for Real: Evals, Tracing, and Regression Tests for AI Agents"
weight = 14
layout = "session"
+++

[Brian Haydin](/speakers/brianh)


Shipping an AI agent without observability is like deploying a distributed system with no logging. Learn how to implement evals, tracing, and regression testing so your agents don’t quietly degrade into chaos.

<!--more-->

AI agents behave probabilistically — and that breaks traditional testing assumptions.

So how do you:
- Detect drift?
- Prevent silent regressions?
- Prove your system still works after model updates?
- Debug weird edge-case behavior?


In this session, we’ll walk through a practical AgentOps stack:
- Structured evaluation datasets
- Golden test prompts
- Scoring strategies (semantic similarity, rule-based, hybrid)
- Trace capture and replay
- Logging intermediate reasoning steps
- Monitoring production agents
- Designing feedback loops


We’ll implement examples using Azure-based tooling and .NET, including how to structure regression tests for multi-step tool-using agents.

You’ll leave with a repeatable pattern for treating agents like real software — not magic.