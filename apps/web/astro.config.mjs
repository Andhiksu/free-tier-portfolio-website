import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { PRODUCTION_ORIGIN } from "./src/lib/routes.ts";

export default defineConfig({
  output: "static",
  site: PRODUCTION_ORIGIN,
  trailingSlash: "always",
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
