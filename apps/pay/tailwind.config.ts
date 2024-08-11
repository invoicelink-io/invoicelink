import daisyui from 'daisyui';
import { tailwind as invoicelinkPreset, themes as invoicelinkThemes } from '@invoicelink/config';
import type { Config } from 'tailwindcss';

const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@invoicelink/ui/dist/**/*.{html,js,svelte,ts}'
	],
	plugins: [daisyui],
	presets: [invoicelinkPreset],
	daisyui: {
		themes: [invoicelinkThemes, 'cupcake', 'dracula']
	}
} satisfies Config;

export default config;
