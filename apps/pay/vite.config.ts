import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
const dev = process.env?.NODE_ENV === 'development';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/api': dev ? 'http://localhost:5173' : 'https://app.invoicelink.io'
		}
	}
});
