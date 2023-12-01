import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user, session } = await locals?.lucia.validate();

	if (!session) {
		throw redirect(303, '/login');
	}

	return {
		session,
		user
	};
}) satisfies LayoutServerLoad;
