# mjordanic.github.io

Personal CV and portfolio site for Mislav Jordanić, meant for https://mjordanic.github.io.

**Not published yet.** GitHub Pages for this repository is deliberately pointed at `main:/docs`, and that
folder does not exist, so nothing is served. Keep it that way until the site is approved: do not create a
top-level `docs/` folder and do not add a Pages deploy workflow before then. The steps to switch publishing on
are under [Publishing](#publishing-after-approval).

A static [Astro](https://astro.build) site with no server runtime and no client-side JavaScript. The dark
variant follows the visitor's system setting.

## Run it locally

Needs Node.js 22.23.4 or newer (`.node-version` pins 24.22.2).

```bash
npm ci
npm run dev       # http://localhost:4321, live reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Where things live

| What | Where |
| --- | --- |
| Profile, experience, education, skills, publications, contact links, photo | `src/content/cv.json` |
| Projects (text, tech, links, image file names) | `src/content/projects.json` |
| Project images (converted to AVIF/WebP at build time) | `src/assets/projects/<slug>/` |
| Colours, type, spacing and shared styles | `src/styles/global.css` |
| Pages (`/` is the CV, `/projects/` the project write-ups) | `src/pages/` |
| Portrait photo (AVIF/WebP) | `public/images/` |
| Open Graph image | `public/og.png`, rendered from `design/og.svg` |

To update the content, edit the two JSON files. The career chart on the home page is drawn from the
`experience` and `education` entries (`short` is the label it shows).

The email address is not set yet: `contact.email` is `null`, and the page shows a visible "to be confirmed"
marker in its place. Set it to the address to show and the marker becomes a `mailto:` link.

To regenerate the Open Graph image or the icons after editing the SVGs:

```bash
rsvg-convert -w 1200 -h 630 design/og.svg -o public/og.png
rsvg-convert -w 32 -h 32 public/favicon.svg -o public/favicon-32.png
rsvg-convert -w 180 -h 180 -b '#1d4ed8' public/favicon.svg -o public/apple-touch-icon.png
```

## Publishing (after approval)

Do this only once the site has been approved. The build writes to `dist/`, which is git-ignored, so the
recommended route is to let GitHub Actions build and deploy it:

1. Add the official Astro Pages workflow as `.github/workflows/deploy.yml` (see
   [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)). It uses
   `withastro/action` to build and `actions/deploy-pages` to publish, and runs on pushes to `main`.
2. In the repository, open **Settings → Pages** and change **Source** from "Deploy from a branch"
   (`main` / `/docs`) to **GitHub Actions**.
3. Merge the workflow to `main`, or run it from the Actions tab, and check https://mjordanic.github.io.

`astro.config.mjs` already sets `site: "https://mjordanic.github.io"`, so canonical URLs, the sitemap and
`robots.txt` are correct for that address. No `base` path is needed because this is the user site at the
domain root.

The alternative is to commit a built copy and serve it from a branch folder, but that means rebuilding and
committing on every change; the Actions route avoids that.
