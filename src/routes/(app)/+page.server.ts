import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { session, user } = await locals.lucia.validate();
	return { session, user, title: 'Home' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('colortheme', theme, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/'
			});
		}

		redirect(303, redirectTo ?? '/');
	}
};
