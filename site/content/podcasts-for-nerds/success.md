---
layout: "article.njk"
title: "You've successfully signed up!"
date: "2020-05-29"
excerpt: "You've signed up for Podcasts for Nerds"
standalone: true
hide_twitter: true
hide_footer_signup: true
podcasts_for_nerds_logo: true
eleventyExcludeFromCollections: true
templateEngineOverride: njk
---

Thanks so much for signing up to the _Podcasts for Nerds_ newsletter. This started as a fun way of nagging my friends about the great podcasts I'd been listening to. To have people volutarily sign-up really does mean a lot! You can find out more about this project in [the launch article I wrote](/podcasts-for-nerds), where you can also find details of past issues.

## Here's this week's edition:

---

{% for article in collections.pfn | reverse %}
{% if loop.first %}
<div class="block block--newsletter">
<h2>{{ article.data.title }} ({{ article.data.subtitle }})</h2>
<div>{{ article.templateContent | safe }}</div>
</div>
{% endif %}
{% endfor %}

---

## What's next?

Now that you're on the list, you'll get the next issue of _Podcasts for Nerds_ sent to your email on Wednesdays.

_Thanks again!_
