import { defineConfig } from 'astro/config';

// Static output — works perfectly with Netlify's free tier
// Switch output to 'server' and add @astrojs/netlify adapter for SSR if needed later
export default defineConfig({
  output: 'static',
});
