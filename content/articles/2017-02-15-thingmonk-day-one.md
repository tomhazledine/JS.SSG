---
permalink: /thingmonk-day-one/
layout: "article.njk"
title: "Notes from ThingMonk: Day One"
date: "2015-12-03"
excerpt: "Some of the leading figures in the IoT industry got together to talk shop. Here's what I thought of it all."
tags: articles
categories: ["events"]
---

[^1]ThingMonk was wall-to-wall interesting and inspiring. I took lots of notes, but naturally focused on the areas that interested me most, and was often too busy trying to take it all in to write anything down...

ThingMonk styles itself as a conference “for developers, designers, data wranglers and decision-makers that want to turn ideas and concepts into industrial scale systems”.

I was there with my web-developer hat on, but was keeping my eyes peeled for hints at the future of business-tech in general. I'm already deeply embedded in data-visualisation and dynamic analytics, but eager to connect my digital skills to a hardware framework.

# Day One

## Bullet-Proof & Profitable Things

Ubuntu guru and part-time space tourist [Mark Shuttleworth](http://canonical.com/) made for a high-profile, big-picture opening speaker. It was interesting to hear that his idea of "scale" was not massive super-computers costing exorbitant amounts of money, but rather lots and lots of cheap, tiny micro-computers all working in unison over a network.

-   It takes five to ten years to make an overnight success, and <em>now</em> is the time to be getting deep into IoT. Wait 12 months and the train will have left the station.
-   Real disruption comes from riding a wave of change, and the disaggregation and componentisation we're seeing in the IoT sphere at the moment will inevitably lead to the "hockey stick" graph of innovation.
-   Data can be a liability - you must have a responsible security strategy when handling lots of data. One mistake or hack can cripple a big-data company.
-   The next version of Ubuntu will be highly modular. Apps will be isolated and contained, and will each have a predefined area they can write to. This allows for robust version control across the system, and no more fear when updating the OS.
-   The “Internet of Toys” is going to be more influential than people realise. It's easier to innovate with things that won't kill people. Long-term projects will have to use standards already set by short-term projects.

---

## Coherent UX for Distributed Systems

User-experience expert [Claire Rowland](http://www.designingconnectedproducts.com/) had some fascinating insights into the challenges of managing UX in a world of connected "things".

-   We don't expect "things" to behave like the internet. Light bulbs shouldn't "buffer".
-   Interfaces (if they are honest) should introduce the concept of failure to users. Don't fake success when a user clicks a button in a low-connectivity area: show in interstitial "loading" state wherever possible.
-   You often have to choose between fuzzy-and-current or accurate-but-old. A cat-tracker can either say "Mrs. Tibbles was at this exact location 3 hours ago" or "Mrs. Tibbles is somewhere within this range right now".
-   Linking physical and digital interfaces takes special thought. A traditional dimmer-switch always knows it's ‘state’, where as a remotely-controlled version has to account for the fact that the ‘state’ of the bulb might have changed since it last checked.

---

## From 2 to 2 billion: How to Design for Scale.

Sam Winslet & Sophie Riches from IBM presented us with the "Seven Deadly Sins for Design of IoT":

-   Greed: designing for yourself.
-   Envy: being a copycat.
-   Gluttony: focusing on features & functions.
-   Wrath: assuming your users know what IoT is.
-   Lust: IoT for the sake of it, without any real ideas.
-   Pride: don't over-complicate and don't over-simplify. IBM use a strategy they call “Progressive Disclosure”: where an interface reveals deeper levels of detail as a user interacts with it.
-   Sloth: assuming users have ∞ patience or care about you/your product.

---

## Hacking NFC

Nick Ludlum from [Moo](<[Moo](http://moo.com/)>) gave (with a little help from colleague Kai Turner) one of the more engaging and tech-focused presentations of the event. The team at Moo have (after considerable time spent in R&D) figured out how to print NFC chips into business cards.

Every attendee at the conference was given a Moo business card on arrival, which was embedded with an NFC chip with tokens for free coffee and beer.

-   For NFC to work, you need a chip and an antenna. The chip is tiny – literally mm across – and the antenna gets printed between to laminated sheets of paper using conductive silver ink. This means the finished business card looks and feels just like a regular card - after all, it's still mostly just card and ink.
-   To build a reader, all you need is a "smarter" chip, an antenna, and a power source. Android phones have the ability to be NFC readers, but IOS ones do not.
-   `nfcpy` is the Python library for NFC.
-   The cards can store a variety of MIME-type information (webpages, lat. & lng. data, etc) but URLs are the most versatile (and can be re-purposed without reprogramming the card itself).
-   Security is still ongoing project, and the Moo team would welcome any insights or help in that area that the developer community can provide.

---

## The Things Network: London

Mark Hill, from [Open TRV](http://opentrv.org.uk/) (a company that makes smart Thermostatic Radiator Valves) got the short-straw: his talk was right before lunch, and therefore had to be shortened because the conf. was running over time.

-   [The Things Network](http://thethingsnetwork.org) is a low-power, wide-area network.
-   Crowdsourced a complete city-wide IoT data network in Amsterdam.
-   Launching the network in cities across the world. London had its network launched this month.
-   Powered by gateways installed on roofs of businesses, accessible to all. ($1000 - $1500 per gateway).

---

## Data Gravity & Time-series

Dave McCrory, allegedly famous for for coining the term “data gravity”, delivered an engaging talk with a charming hand-drawn slide-deck. He touched briefly on how data != information, but his main point was that dealing with time (in an IoT setting) is important but very, very hard.

-   Data Gravity: data has a 'weight' and can be hard to deal with. Some datasets might take 40 years to even upload, let alone process.</li>
-   `0` is just data. `0°C` is data with context. `0°C in London today` is information.
-   When you are working with real-time analytics, how do you deal with that data? System clocks become important - do you trust your machine, your cloud server, or the machine in the field?
-   Do you deliver a constant stream of data? Sometimes it might be better to time-stamp it and package it up, then send packets of data at regular intervals. That leads to less chance of drops in connection causing data loss.

---

## The Secret Life of Buildings

It was interesting to head Yodit Stanton's insights into working with “connected“ buildings, particularly some of the pitfalls and unexpected issues.

-   Her company [opensensors.io](https://www.opensensors.io/) deals with commercial spaces with pre-existing Building Management Systems (BMSs).
-   Automation in a machine-to-machine sense (M2M) has been around for years: office lights that turn on when you enter the room, automatic doors, etc.
-   Learning about a building's 'health' in the form of lighting-levels, environmental factors, footfall, etc. can give you insight into employee absenteeism, efficiency of your workforce, and on and on...
-   Average cost of one desk in London is £12k p.a. Small percentage increases in efficiency can reap big rewards.
-   Legacy protocols (`bacnet`, `dali`, `modbus`, `knx`) are building-data standards and will be around for a while. Contracts are typically 15-20 years long, and cost between £50k and £200k. They won't be thrown out anytime soon.
-   They lock down their data too much. None of those services have an API.
-   Open Source integrations are more sustainable and easier to manage.
-   Don't use WiFi - there are “edge dependencies” on people (in one example, an office manager unplugged the wi-fi router every night!).

---

## It's none of your effing business

The award for most curmudgeonly speaker at the event goes to Boris Adryan (according to ThingMonk host James Governor). Boris devoted a large portion of his talk to dissecting an article depicting a [near-future IoT-fueled wakeup routine](http://knowledge.openboxsoftware.com/blog/the-evolution-of-business-intelligence). The post is well-worth a read.

He also touched on machine learning, and I started craving a cup of tea and took fewer notes... In short, we need our systems to be smart because people instinctively lack an understanding of statistical p-values.

---

## Things, People, and Beer

Craig Cmehil, from [SAP](http://go.sap.com/uk/index.html), subtitled his talk “voice as an alternative user interface for analytics”. He gave a demonstration of the voice-activated Amazon Echo, essentially a programmable Siri in a large box.

He ran a mini competition, too, where he gave away an Echo (not yet available in Europe) which involved some live-coding: always a brave mood in a live presentation...

---

## IoT Device Management

Juan Perez (from Microsoft) said some stuff about Azure (a new MS Cloud platform or something-or-other). I may have slept through this one...

---

## Welcome to the Conversation

The official father of the term “Silicon Roundabout”, Matt Biddulph, closed day one with a talk about how 'conversation' can help solve some of the main issues with many IoT devices. He was very coy about his new venture, [Thington](http://thington.com/), but hinted that it will be using this concept of conversation in conjunction with the “social graph” when it launches in early 2016.

Traditional light-bulbs are an interface an messaging bus. A light-switch is a state messaging transport. Adding connectivity to a bulb (_a la_ Philips Hue) adds issues:

-   latency
-   state
-   consensus
-   trust
-   location
-   power

There's an 'old' scholarly article that outlines the 8 fallacies of distributed computing:

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

Matt's “New fallacies of Distributes _Services_”:

1. Devices are powered.
2. Devices are reachable.
3. Devices stay in one place.
4. Messages can be trusted.
5. Causality is unambiguous.
6. All device state is known.
7. There is one clock.

How do we solve these issues? Simple: a conversation. If the devices can 'talk' to one-another, they can iron out inconsistencies and neutralize many of the problems.

---

~~At some point in the next week or so (mid-late Dec 2015) I'll post my notes from day 2 of ThingMonk. I'll add the link here, but if you're really desperate not to miss out, drop me a line (tom@tomhazledine.com) and I'll add you to the slowly-growing list of people who I'll email when I've published the notes.~~ [^2]

[^1]: These are my notes from day one of the conference. You can read my [notes from the second day here](/thingmonk-day-two).
[^2]: You can read my [notes from the second day here](/thingmonk-day-two).
