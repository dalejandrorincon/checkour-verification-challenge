import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@locales": "/src/locales",
      "@utils": "/src/utils",
      "@shared": "/src/shared",
      "@hooks": "/src/hooks",
    },
  },
});
