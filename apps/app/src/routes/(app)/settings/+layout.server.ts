import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = locals;

	const gateways = [
		{
			name: 'coinbase',
			href: '/settings/gateway/coinbase'
		},
		{
			name: 'payfast',
			href: '/settings/gateway/payfast'
		},
		{
			name: 'stripe',
			href: '/settings/gateway/stripe'
		},
		{
			name: 'yoco',
			href: '/settings/gateway/yoco'
		}
	];

	return {
		user,
		gateways,
		title: 'Settings',
		theme: cookies.get('colortheme')
	};
}) satisfies LayoutServerLoad;
