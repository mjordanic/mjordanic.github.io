# mjordanic.github.io

Personal CV and portfolio site for Mislav Jordanić, meant for https://mjordanic.github.io.

Published at https://mjordanic.github.io. GitHub Pages is set to the **GitHub Actions** source, and
`.github/workflows/deploy.yml` builds and deploys the site on every push to `main`. Do not create a top-level
`docs/` folder; the build output is `dist/`.

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

The email shown is `contact.email`. Setting it to `null` replaces the link with a visible "to be confirmed"
marker.

To regenerate the Open Graph image or the icons after editing the SVGs:

```bash
rsvg-convert -w 1200 -h 630 design/og.svg -o public/og.png
rsvg-convert -w 32 -h 32 public/favicon.svg -o public/favicon-32.png
rsvg-convert -w 180 -h 180 -b '#1d4ed8' public/favicon.svg -o public/apple-touch-icon.png
```

## Publishing

The build writes to `dist/`, which is git-ignored. `.github/workflows/deploy.yml` checks out the repository,
installs Node from `.node-version`, runs `npm ci` and `npm run build`, uploads `dist/` with
`actions/upload-pages-artifact` and publishes it with `actions/deploy-pages`. It runs on pushes to `main` and
can also be started by hand from the Actions tab (`workflow_dispatch`).

The repository's **Settings → Pages → Source** must be **GitHub Actions**.

`astro.config.mjs` already sets `site: "https://mjordanic.github.io"`, so canonical URLs, the sitemap and
`robots.txt` are correct for that address. No `base` path is needed because this is the user site at the
domain root.
