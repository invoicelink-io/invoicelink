import defaultTheme from 'tailwindcss/defaultTheme';

const preset = {
	theme: {
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
		},
	}
};

export default preset;
