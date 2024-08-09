import config from '@invoicelink/config/prettier';

export default {
	...config,
	svelteSortOrder: 'scripts-markup-styles-options',
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss']
};
