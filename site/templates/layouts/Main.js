import Head from "../components/Head.js";

const Main = ({ content, props = {} }) => {
    return `<!doctype html>
<html lang="en">
    ${Head({})}
    <body class="body body--dark">

        {# {% include "sitewide-alert.njk" %} #}

        {% include "header-animation.html" %}

        <a class="skip-link screen-reader-text" href="#content">Skip to content</a>

        {% include "header.njk" %}

        ${content}

        <footer>
            {% include "tweet-widget.njk" %}

            <script src="/tomhazledine.app.js"></script>
            {% for script in scripts %}
                <script src="/tomhazledine.{{script}}.js"></script>
            {% endfor %}

            {% include "analytics.njk" %}
        </footer>

    </body>
</html>`;
};

export default Main;
