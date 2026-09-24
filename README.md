# GDF GLOBAL DIPLOMACY FORUM

A responsive React + Vite + Tailwind CSS + Framer Motion replica for the Global Diplomacy Forum platform.

## Local development

```bash
npm install
npm run dev
```

The Vite source app lives in `app/`. The repository-root `index.html` and `assets/` folder are the committed static export used by the current GitHub Pages configuration.

## Production build

```bash
npm run build
npm run preview
```

## Refresh the GitHub Pages static export

```bash
npm run export:pages
```

This rebuilds the Vite app and copies the generated `dist/index.html` and `dist/assets/` output to the repository root so GitHub Pages can serve it from `main` / `/`.

## Push this Arena branch

```bash
git status
git add .
git commit -m "Build Global Diplomacy Forum website"
git push origin arena/01a0d272-lucki-linesh-github-io
```

## Deploy to https://lucki-linesh.github.io/

The repository is currently configured on GitHub Pages as legacy publishing from `main` / `/`. Because of that configuration, the committed root `index.html` and `assets/` directory are ready to deploy directly.

1. Merge the pull request from `arena/01a0d272-lucki-linesh-github-io` into `main`.
2. GitHub Pages will publish the root static export automatically.
3. After the Pages build completes, the site is available at `https://lucki-linesh.github.io/`.

If the repository owner later switches Pages to **GitHub Actions**, the included workflow already verifies the Vite build and can be extended to upload `dist/` as the Pages artifact.
