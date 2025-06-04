// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import markdoc from '@astrojs/markdoc';
import rehypeMermaid from '@beoe/rehype-mermaid';
import catppucin from '@catppuccin/starlight';
import { getCache } from '@beoe/cache';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import starlightAutoSidebar from 'starlight-auto-sidebar';

import svelte from '@astrojs/svelte';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import devtoolsJson from 'vite-plugin-devtools-json';

const cache = await getCache();

// https://astro.build/config
export default defineConfig({
  site: 'https://shaitanlyss.github.io',
  base: '/these',
  vite: {
    plugins: [
      // vitePluginWasmPack([], ['@selenial/hecate']),
      wasm(),
      topLevelAwait(),
      devtoolsJson(),
    ]

  },
  markdown: {
    remarkPlugins: [
      [remarkMath, {}]

    ],
    rehypePlugins: [
      [rehypeMermaid,
        {
          strategy: "dataUrl",
          fsPath: "public/beoe",
          webPath: "/these/beoe",
          darkScheme: "class",
          cache
        }
      ],
      [rehypeKatex, {}]
    ]
  },
  integrations: [starlight({
    editLink: {
      baseUrl: 'https://github.com/ShaitanLyss/these/edit/main/documentation',
    },
    head: [{
      tag: "link",
      attrs: {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"

      }

      

    }],
    title: 'Thèse',
    favicon: '/crescent-moon.svg',
    customCss: [
      './src/styles/custom.css'
    ],
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ShaitanLyss/these' }],
    plugins: [
      starlightAutoSidebar(),
      // catppucin({
      //   dark: {
      //     flavor: "macchiato"
      //   },
      //   // light: {
      //   //   // accent: "sky",
      //   //   flavor: "latte"
      //   // }
      // })
    ],
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
  }), markdoc(), svelte()],
});
