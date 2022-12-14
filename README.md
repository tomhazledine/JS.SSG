# JS.SSG

A "just the way I like it" static site generator built with Node.js

Docs can be found at [jsssg.org](<[./ssg/README.md](https://jsssg.org/)>)

## Roadmap

-   [x] Convert markdown files into html files
-   [x] Format pages with template files
-   [x] Read frontmatter from markdown files, and expose it to templates
-   [x] Configure with an external configuration file
-   [x] Include "public" files in build (images, assets, etc.)
-   [x] Serve the built result
-   [x] Watch files for changes and re-build
-   [x] Nest templates
-   [x] "Include" other files (components) in templates
-   [x] Set permalinks in frontmatter
-   [x] Accept script args (for "serve", "watch" etc).
-   [x] Group pages internally ("categories","tags", etc.)
-   [~] ~~In-markdown includes~~ handled by MDX components
-   [x] Pagination between pages (based on grouping)
-   [x] Built-in image optimisation (optional)
-   [x] Built-in css/scss handling (optional)
-   [ ] Built-in JS pipeline (optional)
-   [ ] Generate a search index
-   [x] Sitemap xml file
-   [x] RSS feed
-   [x] Support MDX (~~in markdown~~) files
-   [x] Use JSX for templates
-   [ ] Default theme
-   [x] Build pipeline for SSG itself (webpack? raw Babel? Something else?)
-   [ ] Short demo video on YouTube
-   [x] Code block highlighting
-   [ ] Documentation site
    -   [x] url?
    -   [x] theme
    -   [x] Getting Started
    -   [ ] Using Templates (JS and JSX)
    -   [ ] Using Markdown and MDX
    -   [ ] Custom Taxonomies
    -   [ ] Pagination
    -   [x] Config
