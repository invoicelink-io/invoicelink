import config from '@invoicelink/config/prettier';

export default {
	...config,
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
