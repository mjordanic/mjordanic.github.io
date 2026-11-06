// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static build into dist/. The output folder must never be docs/: GitHub Pages for this
// repository currently points at main:/docs, which is kept empty so nothing is served.
export default defineConfig({
  site: "https://mjordanic.github.io",
  output: "static",
  outDir: "./dist",
  trailingSlash: "ignore",
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  build: {
    format: "directory",
  },
});
