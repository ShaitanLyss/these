// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://shaitanlyss.github.io',
	base: '/these',
	integrations: [
		starlight({
			editLink: {
				baseUrl: 'https://github.com/ShaitanLyss/these/edit/main/documentation',
			},
			title: 'Hecate',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ShaitanLyss/these' }],
			sidebar: [
				{
					label : 'Overview',
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
		}),
	],
});
