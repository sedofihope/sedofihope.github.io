# sedofihope.github.io

Personal academic homepage of Sèdofi Hope Lanmayikpohoue, served at <https://sedofihope.github.io>.

Built with Jekyll and deployed natively by GitHub Pages from the `main` branch (no external plugin).

## Layout

| Path | Role |
|---|---|
| `_data/content_en.yml` | English content, reference version (served at `/`) |
| `_data/content_fr.yml` | French translation (served at `/fr/`) |
| `_layouts/home.html` | Single layout rendering either data file |
| `_includes/head.html` | Title, description, hreflang, Open Graph, Twitter Card, JSON-LD |
| `assets/css/main.css` | Styles, light and dark themes |
| `assets/js/theme.js` | Theme toggle |
| `assets/photo.jpg` | Portrait, square, about 600 px (initials shown until it exists) |
| `assets/cv.pdf` | CV (the sidebar link appears once the file exists) |
| `assets/publications/` | Paper PDFs |

## Editing content

1. Edit `_data/content_en.yml` first, then mirror the change in `_data/content_fr.yml`.
2. `draft: true` keeps an entry in the data without displaying it.
3. A section with no displayed entry is hidden, together with its navigation link.
4. Empty optional fields (`count`, `pdf`) are not displayed.
5. Google Scholar and DBLP links: uncomment the keys in `_config.yml`.

## Local preview

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```
