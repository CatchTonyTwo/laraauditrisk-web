import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://laraauditrisk.com',
  build: { format: 'directory' },
  integrations: [react()]
});
