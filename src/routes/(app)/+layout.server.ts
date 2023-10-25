import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/login');
	}

	return {
		user: locals?.session?.user
	};
}) satisfies LayoutServerLoad;
