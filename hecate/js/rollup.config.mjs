// @ts-nocheck
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-import-css';
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'rollup'

import { minify } from 'rollup-plugin-esbuild-minify'

// rollup.config.mjs
export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'es',
    inlineDynamicImports: true,
    compact: true
  },

  plugins: [
    svelte({ emitCss: false, }),
    css({ transform: () => '' }), json(), commonjs(), nodeResolve({

      exportConditions: ['svelte'],
    }),
    minify()
  ]
});
