import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, locals, cookies, url }) => {
	await parent();
	const { user } = locals;

	if (url.pathname === '/settings') {
		redirect(301, '/settings/general');
	}

	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme')
	};
}) satisfies PageServerLoad;
