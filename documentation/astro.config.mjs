// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://shaitanlyss.github.io',
	base: '/these',
	integrations: [
		starlight({
			title: 'Hecate',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ShaitanLyss/these' }],
			sidebar: [
				{
					label : 'Overview',
					autogenerate: { directory: 'overview' },
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
