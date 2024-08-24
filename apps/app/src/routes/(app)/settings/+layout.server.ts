import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, locals, cookies, url }) => {
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

	if (url.pathname === '/settings') {
		redirect(301, '/settings/general');
	}

	return {
		user,
		gateways,
		title: 'Settings',
		theme: cookies.get('colortheme')
	};
}) satisfies LayoutServerLoad;
