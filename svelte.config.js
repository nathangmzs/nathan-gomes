import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: node()
	}
};

export default config;
