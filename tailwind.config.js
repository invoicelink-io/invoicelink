const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: {
					50: '#C7CAD1',
					100: '#9CA2AF',
					200: '#5B6271',
					300: '#272F3F',
					400: '#1D232F',
					500: '#0A0C10'
				},
				primary: {
					50: '#ECECF9',
					100: '#D0D1FA',
					200: '#6366F1'
				},
				secondary: {
					50: '#FBFAD0',
					100: '#F7F5A1',
					200: '#F1EF63'
				}
			},
			fontFamily: {
				sans: ['Mona Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
