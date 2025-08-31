// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
   output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Geist",
        cssVariable: "--font-geist",
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Geist[wght].woff2"]
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/fonts/Geist-Italic[wght].woff2"]
          }
        ]
      },
      {
        provider: "local",
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/GeistMono[wght].woff2"]
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/fonts/GeistMono-Italic[wght].woff2"]
          }
        ]
      }
    ]
  },

  adapter: vercel()
});