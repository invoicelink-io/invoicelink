import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { lucia } from '$lib/server/auth';

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		redirect(303, '/login');
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (!session) {
		redirect(303, '/login');
	}

	return {
		session,
		user
	};
}) satisfies LayoutServerLoad;
