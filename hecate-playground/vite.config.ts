import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasmPack from 'vite-plugin-wasm-pack';

export default defineConfig({
  ssr: {
    external: ["@selenial/terraform-tactics-rs"]
  },
  plugins: [
    wasm(), 
    topLevelAwait(),
    // wasmPack([], ['@selenial/terraform-tactics-rs']),
    tailwindcss(), sveltekit()]
});
