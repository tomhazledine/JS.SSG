const Head = ({ props = {} }) => {
    return `
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {%- if naked -%}
        <link href="/tomhazledine.naked.css" rel="stylesheet" data-naked="1">
    {%- else %}
        <link href="/tomhazledine.app.css" rel="stylesheet">
    {%- endif %}

    {%- if custom_stylesheet -%}
        <link href="{{custom_stylesheet | safe}}" rel="stylesheet">
    {%- endif %}

    <link rel="profile" href="//gmpg.org/xfn/11">
    <title>
        {%- if title and title != "Home" %}{{title}} | {% endif %}{{site.title}}</title>
    <link rel="canonical" href="{{site.url + page.url}}">
    <link rel="shortcut icon" href="/images/favicon.png">
    <link rel="shortcut icon" href="/images/favicon.ico">

    {%- if title and title != "Home" -%}
        {%- set cardType = "summary" -%}
        {%- set cardTitle = title -%}
        {%- set cardImage = site.url + "/images/pages_stack_bg.jpg" -%}
    {%- else -%}
        {%- set cardType = "summary_large_image" -%}
        {%- set cardTitle = site.title -%}
        {%- set cardImage = site.url + "/images/home_graph.png" -%}
    {%- endif -%}

    {%- if image -%}
        {%- set cardType = "summary_large_image" -%}
        {%- set cardImage = site.url + "/images" + image -%}
    {%- endif -%}

    {# Twitter card #}
    <meta name="twitter:card" content="{{cardType}}"/>
    <meta name="twitter:creator" content={{site.authorTwitterUrl}}/>
    <meta name="twitter:image" content="{{cardImage}}"/>
    {# Generic meta #}
    <meta property="og:url" content="{{site.url}}{{page.url}}"/>
    <meta property="og:title" content="{{cardTitle}}"/>
    <meta property="og:image" content="{{cardImage}}"/>
    {%- set description = site.summary -%}
    {%- if excerpt -%}
        {%- set description = excerpt -%}
    {%- endif -%}
    <meta name="description" content="{{description}}"/>
    <meta property="og:description" content="{{description}}"/>

    {% if custom_css %}
        <style type="text/css">
            {{custom_css | safe}}
        </style>
    {% endif %}

    {# Google+ #}
    <link href="//plus.google.com/111879829548102811838" rel="publisher"/>

    {# Apple icon (minimal) #}
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

</head>`;
};
export default Head;
