import sequence from 'svelte-sequential-preprocessor';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess()]),
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false // added custom hook to handle csrf
		}
	}
};
export default config;
