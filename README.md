# Global Diplomacy Forum | GDF Oman | Smart Diplomacy Hub

The official GDF website, rebuilt **1:1 from the source PDF** (`Global Diplomacy Forum | GDF Oman | Smart Diplomacy Hub`, 4 pages).
Built with React + Vite + Tailwind CSS + Framer Motion, deployed on GitHub Pages.

## Structure — one route per PDF page

| PDF page | Route      | Contents                                                                     |
| -------- | ---------- | ---------------------------------------------------------------------------- |
| 1        | `#/`       | Announcement bar, hero, intro, Virtual MUN Experiences, Glo DIs I–VIII, Our Partners |
| 2        | `#/about`  | Youth-led intro, Vision and Mission Statements, Our Vision, Our Mission, Letter From Our Leader |
| 3        | `#/axis`   | GDF AXIS MUN CIRCUIT                                                          |
| 4        | `#/team`   | Core Team (14 members)                                                        |

The footer (`CONNECT TO WHAT COUNTS` / `DEBATE. NEGOTIATE. LEAD THE WORLD` / PHONE / EMAIL / SOCIAL)
repeats on every page, exactly as it does on every page of the PDF.

Hash routing is used so the whole site stays a single static `index.html` — no GitHub Pages
404/rewrite configuration is required, and every route is deep-linkable.

## Content source of truth

All copy lives in [`app/src/content.js`](app/src/content.js), transcribed verbatim from the PDF.

Several PDF strings are stored with broken subset-font encodings; they are decoded in that file:

| PDF raw string                | Real text                       |
| ----------------------------- | ------------------------------- |
| `9LVLRQDQG0LVVLRQ 6WDWHPHQWV` | `Vision and Mission Statements` |
| `2XU9LVLRQ` / `2XU0LVVLRQ`    | `Our Vision` / `Our Mission`    |
| `The Future of Diplomacy in OPDn.` | `The Future of Diplomacy in Oman.` |
| `WeOFome ... GORbal DipORmacy` | `Welcome ... Global Diplomacy`  |
| `ekal“c_a pl^e[h`             | `info@gdf.social`               |

## Local development

```bash
npm install
npm run dev
```

The Vite source app lives in `app/`. The repository-root `index.html` and `assets/` folder are the
committed static export served by GitHub Pages.

## Production build

```bash
npm run build
npm run preview
```

## Refresh the GitHub Pages static export

```bash
npm run export:pages
```

This rebuilds the Vite app and copies `dist/index.html` and `dist/assets/` to the repository root so
GitHub Pages can serve it from `main` / `/`. Assets are emitted with relative paths (`./assets/...`),
so the export also works when opened directly from disk.

## Deploy to https://lucki-linesh.github.io/

Pages is configured to publish from `main` / `/`.

1. Merge this branch into `main`.
2. GitHub Pages republishes the root static export automatically.
3. The site goes live at `https://lucki-linesh.github.io/`.
