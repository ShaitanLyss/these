// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import markdoc from '@astrojs/markdoc';
import rehypeMermaid from '@beoe/rehype-mermaid';
import { getCache } from '@beoe/cache';

const cache = await getCache();

// https://astro.build/config
export default defineConfig({
  site: 'https://shaitanlyss.github.io',
  base: '/these',
  markdown: {
    rehypePlugins: [
      [rehypeMermaid,
        {
          strategy: "dataUrl",
          fsPath: "public/beoe",
          webPath: "/these/beoe",
          darkScheme: "class",
          cache
        }
      ]
    ]
  },
  integrations: [starlight({
    editLink: {
      baseUrl: 'https://github.com/ShaitanLyss/these/edit/main/documentation',
    },
    title: 'Hecate',
    customCss: [
      './src/styles/custom.css'
    ],
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ShaitanLyss/these' }],
    sidebar: [
      {
        label: 'Overview',
        autogenerate: { directory: 'overview' },
      },
      {
        label: 'Guides',
        autogenerate: { directory: 'guides' },
      },
      {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
      },
      {
        label: 'Research',
        autogenerate: { directory: 'research' },
      },
    ],
  }), markdoc()],
});
