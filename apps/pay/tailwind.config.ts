import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				['clip-path']: 'shapeShift 20s ease infinite'
			},
			keyframes: {
				shapeShift: {
					'0%': {
						clipPath: 'polygon(0 0, 100% 0%, 50% 100%, 50% 100%)'
					},
					'25%': {
						clipPath: 'polygon(0 0, 100% 0%, 0 100%, 100% 100%);'
					},
					'50%': {
						clipPath: 'polygon(0 0, 80% 15%, 100% 100%, 15% 80%);'
					},
					'75%': {
						clipPath: 'polygon(15% 15%, 100% 0, 85% 85%, 0 100%);'
					},
					'100%': {
						clipPath: 'polygon(0 0, 100% 0%, 50% 100%, 50% 100%)'
					}
				}
			},
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
					primary: 'oklch(58.5% 0.204 277deg)',
					'primary-content': 'oklch(100% 0 0deg)',
					secondary: '#9563f2',
					'secondary-content': 'oklch(100% 0 0deg)',
					accent: 'oklch(58.5% 0.204 277deg)',
					'accent-content': 'oklch(100% 0 0deg)',
					neutral: '#55575e',
					'neutral-content': 'oklch(15.4% 0 0deg)',
					'base-100': 'oklch(100% 0 0deg)',
					'base-200': 'oklch(96.1% 0 0deg)',
					'base-300': 'oklch(94.1% 0 0deg)',
					'base-content': 'oklch(15.4% 0 0deg)',
					info: 'oklch(58.5% 0.204 277deg)',
					'info-content': '#000b15',
					success: '#a4cc38',
					'success-content': 'oklch(15.4% 0 0deg)',
					warning: '#fb6b02',
					'warning-content': 'oklch(15.4% 0 0deg)',
					error: '#d3263c',
					'error-content': 'oklch(100% 0 0deg)'
				},
				dark: {
					primary: 'oklch(58.5% 0.204 277deg)',
					'primary-content': 'oklch(100% 0 0deg)',
					secondary: '#9563f2',
					'secondary-content': 'oklch(100% 0 0deg)',
					accent: 'oklch(58.5% 0.204 277deg)',
					'accent-content': 'oklch(100% 0 0deg)',
					neutral: '#55575e',
					'neutral-content': 'oklch(100% 0 0deg)',
					'base-100': 'oklch(15.4% 0 0deg)',
					'base-200': 'oklch(24.4% 0.01 268deg)',
					'base-300': 'oklch(28% 0.01 268deg)',
					'base-content': 'oklch(100% 0 0deg)',
					info: 'oklch(58.5% 0.204 277deg)',
					'info-content': 'oklch(100% 0 0deg)',
					success: '#a4cc38',
					'success-content': 'oklch(100% 0 0deg)',
					warning: '#fb6b02',
					'warning-content': 'oklch(100% 0 0deg)',
					error: '#d3263c',
					'error-content': 'oklch(100% 0 0deg)'
				}
			},
			'cupcake',
			'black',
			'dracula'
		]
	}
} satisfies Config;

export default config;
