# GDF GLOBAL DIPLOMACY FORUM

A responsive React + Vite + Tailwind CSS + Framer Motion replica for the Global Diplomacy Forum platform.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Push this Arena branch

```bash
git status
git add .
git commit -m "Build Global Diplomacy Forum website"
git push origin arena/01a0d272-lucki-linesh-github-io
```

## Deploy to https://lucki-linesh.github.io/

1. In GitHub, open `https://github.com/Lucki-Linesh/lucki-linesh.github.io/settings/pages`.
2. Set **Build and deployment** source to **GitHub Actions**.
3. Merge the pull request from `arena/01a0d272-lucki-linesh-github-io` into `main`.
4. The `Deploy GDF site to GitHub Pages` workflow will build the Vite app and deploy `dist/`.
5. After the workflow completes, the site is available at `https://lucki-linesh.github.io/`.

If you need to redeploy without a new commit, open `Actions`, select `Deploy GDF site to GitHub Pages`, choose `Run workflow`, and run it from the `main` branch.
