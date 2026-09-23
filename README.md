# sedofihope.github.io

Personal academic homepage of Sèdofi Hope Lanmayikpohoue, served at <https://sedofihope.github.io>.

Built with Jekyll and deployed natively by GitHub Pages from the `main` branch (no external plugin).

## Layout

| Path | Role |
|---|---|
| `_data/content_en.yml` | English content, reference version (served at `/`) |
| `_data/content_fr.yml` | French translation (served at `/fr/`) |
| `_layouts/default.html` | Page shell: top bar, sidebar, footer |
| `_layouts/home.html` | Home page sections, rendered from either data file |
| `_layouts/news.html` | News archive grouped by year (not published yet, see below) |
| `_includes/head.html` | Title, description, hreflang, Open Graph, Twitter Card, JSON-LD |
| `_includes/icon.html` | Filled inline SVG icons |
| `assets/css/main.css` | Styles, light and dark themes |
| `assets/js/site.js` | Theme toggle, priority+ navigation, active section |
| `assets/photo.jpg` | Portrait, square, about 600 px: sidebar and `og:image` (initials shown until it exists) |
| `assets/cv-en.pdf`, `assets/cv-fr.pdf` | CV in each language; if only one exists, both pages link to it |
| `assets/memoire-ingenieur.pdf` | Engineering thesis, Education section |
| `assets/slides-bwai-2025.pdf` | BWAI 2025 slides, November 2025 news entry |
| `assets/publications/` | Paper PDFs, referenced by the `pdf` field of a publication |

Every link to a document stays hidden until the file is in the repository:
no dead link, no empty download icon.

## Editing content

1. Edit `_data/content_en.yml` first, then mirror the change in `_data/content_fr.yml`.
2. `draft: true` keeps an entry in the data without displaying it.
3. A section with no displayed entry is hidden, together with its navigation link.
4. Empty optional fields (`count`, `pdf`, `doi`) are not displayed.
5. Google Scholar and DBLP links: uncomment the keys in `_config.yml`.
6. Links written in Markdown in the data files (`[text](https://...)`) open in a new tab automatically.

## Publications and communications

Each entry has a `status`: `accepted` ("Accepted, to appear", or "Accepted
abstract" for a communication), `in_press` ("In press") or `published` (no
label). Titles and bibliographic references are not translated. The site
owner is marked `me: true` in `authors` and shown in bold.

## News

Each entry has a date, a bold `title`, a short `text` and optional `links`
(`url` for a web page, `file` for a document in the repository).

The home page shows the `news_limit` most recent entries (8, set in `_config.yml`).
Older entries sit in a native `<details>` element ("Show more" / "Voir plus"),
so they are part of the served HTML and visible to search engines.

### News archive

Planned once the list exceeds about thirty entries: a separate page per language,
grouped by year (the year is the last word of each `date`).

1. Create `news/index.html`:

   ```yaml
   ---
   layout: news
   lang_key: en
   path_suffix: news/
   title_key: news_page_title
   permalink: /news/
   ---
   ```

2. Create `fr/news/index.html` with `lang_key: fr` and `permalink: /fr/news/`.
3. Set `news_archive: true` in `_config.yml`.

The home page then replaces "Show more" with a link to the archive, and
`sitemap.xml` lists both archive pages with their language alternates.

## Search engines

- `robots.txt` allows everything and points to `sitemap.xml`, which lists both
  languages with `hreflang` alternates.
- Google Search Console, HTML file method: put the file Google provides
  (for example `google1234567890abcdef.html`) at the root of the repository,
  next to `index.html`, unchanged. Jekyll copies it as is.
- Meta tag method, as an alternative: set `google_site_verification` in `_config.yml`.

## Credits

Icons: [Phosphor Icons](https://phosphoricons.com) (Fill weight, MIT licence)
and [Simple Icons](https://simpleicons.org) for brand logos (CC0).

## Local preview

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```
