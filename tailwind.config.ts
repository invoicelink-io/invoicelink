import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import { invoicelinkTheme } from './invoicelink.theme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Mona Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [invoicelinkTheme]
				// preset: ['modern']
			}
		})
	]
} satisfies Config;

export default config;
