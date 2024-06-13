import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Mona Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#6366f1',
					'primary-content': '#ffffff',
					secondary: '#9563f2',
					'secondary-content': '#ffffff',
					accent: '#6366f1',
					'accent-content': '#ffffff',
					neutral: '#55575e',
					'neutral-content': '#0c0c0c',
					'base-100': '#ffffff',
					'base-200': '#f2f2f2',
					'base-300': '#dedede',
					'base-content': '#0c0c0c',
					info: '#6366f1',
					'info-content': '#000b15',
					success: '#a4cc38',
					'success-content': '#0c0c0c',
					warning: '#fb6b02',
					'warning-content': '#0c0c0c',
					error: '#d3263c',
					'error-content': '#ffffff'
				}
			},
			'dark',
			'black',
			'cupcake',
			'lofi',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'pastel',
			'fantasy',
			'luxury',
			'dracula'
		]
	}
} satisfies Config;

export default config;
