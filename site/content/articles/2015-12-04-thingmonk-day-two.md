---
permalink: /thingmonk-day-two/
layout: "article"
title: "Notes from ThingMonk: Day Two"
date: "2015-12-04"
excerpt: "The second installment of my notes from the ThinkMonk IoT conference."
tags: articles
categories: ["events"]
---

[^1]ThingMonk is a conference “for developers, designers, data wranglers and decision-makers that want to turn ideas and concepts into industrial scale systems".

If day one of ThingMonk was mostly about the internet of things at near-scale - IoT for our daily routine, in our houses and in our offices – day two had a more “big picture” focus to it. The headline talks were about large thorny environmental problems, and how big-industry is using IoT to make enormous efficiency savings.

---

# Day Two

## The Ambient Kettle Project

Andy Stanford-Clark, from IBM, kicked-off day two by introducing us to the _Hy Pi Zero_. The original _Hy Pi_ had debuted at ThingMonk 2014 and was a Raspberry Pi powered by a hydrogen fuel cell. The _Hy Pi Zero_ was the same concept, only this time using the newly-released _Raspberry Pi Zero_. It had taken the team at Arcola all the preceding day to get it up-and-running, and was now powering the slide-deck for the presentation.

He then handed us over to his colleague, Laura Cowen, who talked us through the "Ambient Kettle" she and Andy had been working on.

-   It had started when Laura made her kettle post to a custom twitter account every time she made a cup of tea.
-   Her mum then started following the kettle's account, and Laura tried to think of ways to streamline the "ambient intimacy" her and her mum were experiencing.
-   By abstracting the fundamental characteristics of the experience, Laura and Andy then experimented putting those elements together independently of the act of making a cup of tea itself.
-   They identified many UX facets: the sound of the water boiling and the click of the kettle, the shape and feel of the physical object, the colour of the kettle's indicator lights as it boiled, the fact that the experience needed no configuration at all.
-   Iterating over various prototypes, they built a pseudo-kettle that severed as a remote indicator that someone (presumably someone you care about) has just made a cup of tea.
-   The end result was a tiny dolls-house scale 3D-printed kettle with an LED and speaker.

---

## The Convergence of IoT and Energy

The real show-stopper talk of the conference was given by Tom Raftery, an analyst at GreenMonk (the environment-focused arm of RedMonk; the event organisers).

-   Energy networks are built around spikes and "peak load" (_Bake Off_ finishes, and everyone up and down the country puts the kettle on and flushes the loo).
-   _2°C_ = cap for global warming set by 2009 Copenhagen Climate Accord.
-   _565GtCO<sub>2</sub>_ = Gigatons of CO<sub>2</sub> needed to reach a 2°C increase (a carbon budget that leaves us with 20-30 years at current emissions rates).
-   _2795GtCO<sub>2</sub>_ = Proven reserves.
-   We've now passed the 400 parts-per-million CO<sub>2</sub> threshold in the atmosphere, and will never cross it again. The [stats from the Scripps Institution of Oceanography](https://scripps.ucsd.edu/programs/keelingcurve/) make for scary reading.
-   Electricity Grids are dumb. They only learn about outages when customers phone up to complain. They then need a truck-roll (apparently the biz-speak for “sending a truck”) to diagnose the problem, and then a second truck-roll with the specialist equipment to deal with the issue.
-   The grid is provisioned for 'hits' – the two weeks of the year with peak-demand dictate the infrastructure for the whole system.
-   Wind and solar are unpredictable – you can't just order-up more capacity to match demand. However, Denmark already meets 140% of its energy demand with wind-power, allowing them to sell-on excess supply.
-   Nuclear doesn't scale easily: there's a 10-20 year runway for new projects.
-   1GW is roughly the output of one nuclear power station. China are building 700GW worth of solar production.
-   Industrial IoT is often divided into two concerns: _Predictive Maintenance_ and _Demand Management_. Dynamic management of energy demand could be the silver-bullet to deal with the problem of un-environmental energy production.
-   Connected devices can look at energy prices, and when the price drops suck up all the energy they can store. Increased storage capacity helps even out the miss-match between supply and demand.
-   Energy from renewables is always cheaper: fixed costs mean 'old' providers drop out of the market when the price drops below a certain point. Renewables can sell at any price.

---

## Becoming a Digital Industrial Company

Jeremiah Stone from GE spoke about how his company is transitioning from a traditional heavy-industry & manufacturing company into one that fully realises the potential of 'digital'. His colleague Stephan King then gave a demo of their new IoT cloud platform (all buzz-words, little substance, very boring).

-   GE are adding analytics infrastructure to their <em>massive</em> fleet of trains \* Data fuels insight: using their new analytics, they discovered they needed to wash jet engines that operate in dusty environments, saving themselves expensive replacements (and avoiding potential fleet-grounding from the FAA) and saving $7m p.a. in fuel costs.
-   Every extra 1mph in capacity generated on the US rail network equates to $200k in savings.
-   In windfarms, turbines create a cone of turbulence behind them. Using 'smart' blades that can adjust their angle based on live data means they can reduce turbulence and increase efficiency across the whole farm.

---

## Log, I Am Your Father

James Hodge & Matt Davies came from Splunk (one of the event sponsors). Splunk deal with data analytics.

-   A lot of data already exists, unused, in log files: we just don't know we have it.
-   Data like this can fuel the “Build->Measure->Learn” cycle: Have an idea, build a product, measure the data that product creates, and learn from that data to generate new ideas.

---

## We Need to Talk About Telco

Keith O'Byrne works at Asavie, a large-scale telecommunications infrastructure company.

-   Connectivity is a big issue for IoT projects.
-   No-one will run a copper cable into a power station. In that scenario, connectivity <em>must</em> be wireless.
-   All IoT plans start like this: “step one: assume internet”.
-   Tesla (the electric car people) addressed this problem badly - they routed the in-car WiFi hotspot through Spain. It seemed an economical solution, but had side-effects: Google was in Spanish, and location-based services (such as BBC iPlayer in the UK) would not work.
-   If you need to use a SIM in your project, use a Global Sim. They have better connectivity because they can use any network, the support and API is much better, and there's safety in numbers - most big systems use them. The only downside is they don't have a phone number, so take a bit more tech-savvy to get them working.

---

## Industry Things at Scale

Redmonk analyst Tomas Grassl spoke about the difference between consumer and business IoT. Consumer IoT has many areas (health, household appliances, toys, etc.) but the business space is where the revolutionary work is being done.

-   Big ports cannot simply build new roads into big cities. They need to leverage efficiencies in order to grow. E.g. routing trucks to overflow carparks based on live data.
-   Smart bathrooms in sports-stadia allow for efficient management of supply (water, soap, loo-roll etc.) to deal with massive demand in short time-windows.
-   $447bn is spent annually on maintenance.
-   Pirelli tires for trucks now measure speed, heat, pressure, etc. They can be replaced <em>before</em> they fail, and the company has changed to a new business model: leasing the tires rather than selling them.
-   [James Gosling's IoT talk](https://www.youtube.com/watch?v=O1Rzyn2OIkI) is well worth a watch, apparently.

---

## Brought to You by the Number Ten

Recent AWS aqui-hiree Kyle Roche recreates the [Eames' famous Powers of Ten video](https://www.youtube.com/watch?v=0fKBhvDjuy0), but talking about IoT tech at the different scales, with various insights along the way.

-   When automatic gunshot detectors were installed in New Jersey, authorities discovers that only 38% of gunshots were reported by humans.
-   The F-35 jet's HUD allows the pilot to see 360° 'through' the plane. It also orders its own replacement parts.
-   From source to house, the US mains loses 16% of its water.

---

## From Killer Robot to Killer Product

Pat Patterson is a “Developer Evangelist Architect” for event-sponsor SalesForce. His job sounds amazing: traveling from event to event showcasing interesting techy things.

-   A snazzy demo can be very useful and powerful as a tool to drive engagement (his main example was an industrial robotic arm, normally used for manufacturing, that he'd taught to do a dance).
-   We're living in an age of cheap components - creating a working prototype for an IoT project can be very quick and very affordable.

---

[^2]On the whole, ThingMonk 2015 was amazing. I met loads of people working on all sorts of interesting projects, and it hammered home to me that the IoT revolution has already started. I've come away inspired to get even more stuck-in to my IoT side-projects, and with a feeling that it is now essential to start bringing IoT concepts into my day-to-day work too.

[^1]: These are my notes from day two of the conference. If you want to catch-up, read [my notes from the first day of ThingMonk](/thingmonk-day-one).
[^2]: If you missed them, don't forget to check out [my notes from day one of ThingMonk](/thingmonk-day-one).
