import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { session } = await locals.lucia.validate();
	if (!session) {
		throw redirect(302, '/login?message=You are not logged in');
	}

	await lucia.invalidateSession(session.id);
	locals.lucia.deleteSessionCookie();

	throw redirect(302, '/login?message=You have been logged out');
};
