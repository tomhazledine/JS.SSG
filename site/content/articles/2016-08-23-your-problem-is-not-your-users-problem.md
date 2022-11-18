---
permalink: /your-problem-is-not-your-users-problem/
layout: Article
title: "Don't turn your problem into your users' problem"
date: "2016-08-23"
excerpt: "I'm noticing a tendency for organisations to pass their problems along to their customers, and I wish it didn't happen."
tags: articles
categories: ["career"]
---

I'm noticing a tendency for organisations to pass their problems along to their customers, and I wish it didn't happen. At its simplest, this issue can be demonstrated by a basic form asking a user to input their name. It's common to see two separate fields for first-name and surname, as opposed to one box. As a developer it's easier to parse and save structured data when it's more precise, so I can see why I'd want to receive a user's name in two parts[^1]. But all I'm doing is passing that task to the user and saving myself the tricky task of deciphering their potentially-vague input.

Generally speaking, anything worthwhile has complexity. The complexity has to live _somewhere_, and most of the time it's up to developers to decide where it goes. Any user-facing interface should strive to make the task as simple as possible for the user, above all other things. This is particularly relevant for e-commerce, where the simplicity of the users' experience correlates directly to money-made. Every obstacle you put in the users' path (an extra form-field to fill out, another button to press, an extra decision for them to make) can have a percentage-point impact on the conversion rate. The simpler your process, the fewer people will give up partway through.

Holiday letting companies are particular offenders in this area. Tied to systems that rely on fixed changeover-days but eager to maximise their availability, they resort to complex short-break rules. You can book on a Friday for three nights, provided that the preceding Monday is already booked and the booking doesn't cross a price-band boundary in the company's admin system... ouch! Making these clear to the user is a non-trivial task, and slap-dash implementations often leave the user stabbing in the dark and praying they aren't presented with yet another incomprehensible "your requested booking does not comply with short-break rules, please try again" message.

[^1]: Conversely, sometimes breaking the input into two-parts can _help_> the user. There's an argument to made for directing our users to the desired input: when presented with an ambiguous box, the user might not know whether you want their full name or just their first or last name, or their title, or maybe just their initials? Giving them a set of discrete input-fields can make their task clearer to them. This issue can also be addressed by adding sensible placeholder text to the one-box approach. This might all sound overly simplistic, but the same principles apply at all levels of complexity.
