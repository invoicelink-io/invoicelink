// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: {
					50: 'oklch(var(--color-dark-50) / <alpha-value>)',
					100: 'oklch(var(--color-dark-100) / <alpha-value>)',
					200: 'oklch(var(--color-dark-200) / <alpha-value>)',
					300: 'oklch(var(--color-dark-300) / <alpha-value>)',
					400: 'oklch(var(--color-dark-400) / <alpha-value>)',
					500: 'oklch(var(--color-dark-500) / <alpha-value>)'
				},
				primary: {
					50: 'oklch(var(--color-primary-50) / <alpha-value> )',
					100: 'oklch(var(--color-primary-100) / <alpha-value> )',
					200: 'oklch(var(--color-primary-200) / <alpha-value> )'
				},
				secondary: {
					50: 'oklch(var(--color-secondary-50) / <alpha-value> )',
					100: 'oklch(var(--color-secondary-100) / <alpha-value> )',
					200: 'oklch(var(--color-secondary-200) / <alpha-value> )'
				},
				error: {
					50: 'oklch(var(--color-error-50) / <alpha-value> )',
					100: 'oklch(var(--color-error-100) / <alpha-value> )',
					200: 'oklch(var(--color-error-200) / <alpha-value> )'
				},
				warning: {
					50: 'oklch(var(--color-warning-50) / <alpha-value> )',
					100: 'oklch(var(--color-warning-100) / <alpha-value> )',
					200: 'oklch(var(--color-warning-200) / <alpha-value> )'
				},
				success: {
					50: 'oklch(var(--color-success-50) / <alpha-value> )',
					100: 'oklch(var(--color-success-100) / <alpha-value> )',
					200: 'oklch(var(--color-success-200) / <alpha-value> )'
				}
			},
			fontFamily: {
				sans: ['Mona Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
