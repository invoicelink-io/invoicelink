import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const invoicelinkTheme: CustomThemeConfig = {
	name: 'invoicelink',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Mona Sans, system-ui`,
		'--theme-font-family-heading': `Mona Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '12 12 12',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #6366f1
		'--color-primary-50': '232 232 253', // #e8e8fd
		'--color-primary-100': '224 224 252', // #e0e0fc
		'--color-primary-200': '216 217 252', // #d8d9fc
		'--color-primary-300': '193 194 249', // #c1c2f9
		'--color-primary-400': '146 148 245', // #9294f5
		'--color-primary-500': '99 102 241', // #6366f1
		'--color-primary-600': '89 92 217', // #595cd9
		'--color-primary-700': '74 77 181', // #4a4db5
		'--color-primary-800': '59 61 145', // #3b3d91
		'--color-primary-900': '49 50 118', // #313276
		// secondary | #9563f2
		'--color-secondary-50': '239 232 253', // #efe8fd
		'--color-secondary-100': '234 224 252', // #eae0fc
		'--color-secondary-200': '229 216 252', // #e5d8fc
		'--color-secondary-300': '213 193 250', // #d5c1fa
		'--color-secondary-400': '181 146 246', // #b592f6
		'--color-secondary-500': '149 99 242', // #9563f2
		'--color-secondary-600': '134 89 218', // #8659da
		'--color-secondary-700': '112 74 182', // #704ab6
		'--color-secondary-800': '89 59 145', // #593b91
		'--color-secondary-900': '73 49 119', // #493177
		// tertiary | #9563f2
		'--color-tertiary-50': '239 232 253', // #efe8fd
		'--color-tertiary-100': '234 224 252', // #eae0fc
		'--color-tertiary-200': '229 216 252', // #e5d8fc
		'--color-tertiary-300': '213 193 250', // #d5c1fa
		'--color-tertiary-400': '181 146 246', // #b592f6
		'--color-tertiary-500': '149 99 242', // #9563f2
		'--color-tertiary-600': '134 89 218', // #8659da
		'--color-tertiary-700': '112 74 182', // #704ab6
		'--color-tertiary-800': '89 59 145', // #593b91
		'--color-tertiary-900': '73 49 119', // #493177
		// success | #a4cc38
		'--color-success-50': '241 247 225', // #f1f7e1
		'--color-success-100': '237 245 215', // #edf5d7
		'--color-success-200': '232 242 205', // #e8f2cd
		'--color-success-300': '219 235 175', // #dbebaf
		'--color-success-400': '191 219 116', // #bfdb74
		'--color-success-500': '164 204 56', // #a4cc38
		'--color-success-600': '148 184 50', // #94b832
		'--color-success-700': '123 153 42', // #7b992a
		'--color-success-800': '98 122 34', // #627a22
		'--color-success-900': '80 100 27', // #50641b
		// warning | #fb6b02
		'--color-warning-50': '254 233 217', // #fee9d9
		'--color-warning-100': '254 225 204', // #fee1cc
		'--color-warning-200': '254 218 192', // #fedac0
		'--color-warning-300': '253 196 154', // #fdc49a
		'--color-warning-400': '252 151 78', // #fc974e
		'--color-warning-500': '251 107 2', // #fb6b02
		'--color-warning-600': '226 96 2', // #e26002
		'--color-warning-700': '188 80 2', // #bc5002
		'--color-warning-800': '151 64 1', // #974001
		'--color-warning-900': '123 52 1', // #7b3401
		// error | #d3263c
		'--color-error-50': '248 222 226', // #f8dee2
		'--color-error-100': '246 212 216', // #f6d4d8
		'--color-error-200': '244 201 206', // #f4c9ce
		'--color-error-300': '237 168 177', // #eda8b1
		'--color-error-400': '224 103 119', // #e06777
		'--color-error-500': '211 38 60', // #d3263c
		'--color-error-600': '190 34 54', // #be2236
		'--color-error-700': '158 29 45', // #9e1d2d
		'--color-error-800': '127 23 36', // #7f1724
		'--color-error-900': '103 19 29', // #67131d
		// surface | #55575e
		'--color-surface-50': '255 255 255', // #ffffff
		'--color-surface-100': '242 242 242', // #f2f2f2
		'--color-surface-200': '222 222 222', // #dedede
		'--color-surface-300': '163 163 163', // #a3a3a3
		'--color-surface-400': '128 128 128', // #808080
		'--color-surface-500': '85 87 94', // #55575e
		'--color-surface-600': '56 58 64', // #383a40
		'--color-surface-700': '32 32 32', // #202020
		'--color-surface-800': '30 32 37', // #1e2025
		'--color-surface-900': '12 12 12' // #0c0c0c
	}
};
